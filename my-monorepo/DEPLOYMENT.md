# Deployment (Mikrus + Cloudflare Full (strict) + Docker Compose)

This repo uses "Option A": Nginx runs in Docker and is the only public entrypoint.

## Prerequisites

- A Linux VPS ("mikrus") with Docker Engine and Docker Compose v2 plugin.
- A domain managed in Cloudflare.
- Cloudflare **SSL/TLS mode: Full (strict)** (orange cloud enabled).

Assumptions:

- The server runs the production stack with Docker Compose and pulls images from GHCR.
- The server does not need a full repo checkout.
- TLS is terminated on the server by the nginx container using a Cloudflare Origin Certificate.

## Cloudflare setup (app subdomain)

This setup assumes you will serve the app on a dedicated subdomain (e.g. `app.your-domain`).

In Cloudflare:

1. DNS

- Create an `AAAA` record named `app` pointing to your server IPv6.
- Proxy status: **Proxied** (orange cloud).

2. SSL/TLS

- SSL/TLS → Overview → **Encryption mode: Full (strict)**.
- SSL/TLS → Edge Certificates:
  - Enable **Always Use HTTPS**.
  - (Optional) Enable **Automatic HTTPS Rewrites**.
  - (Optional, advanced) Consider HSTS only after everything works reliably.

3. Origin Server (Origin Certificate)

- SSL/TLS → Origin Server → **Create certificate**.
- Hostnames: include at least `app.your-domain`.
- Install the generated cert/key on the server as described in section 4.

## Cloudflare hardening (recommended)

These are optional but useful defaults once the site is working.

1. WAF

- Security → WAF → Managed rules: enable Cloudflare managed rules (defaults are usually fine).
- (Optional) Enable Bot protection features (depends on your plan).

2. Rate limiting (protect API)

Add a rate limit rule for your API paths (example: `/api/*`). Start conservative (so you don’t block yourself) and tune later.

3. Caching rules

- Ensure API responses are not cached:
  - Cache Rule: if URI path starts with `/api/` → **Bypass cache**.
- For the web app itself you can keep caching enabled for static assets (usually safe), but avoid caching HTML if your app is dynamic.

4. (Advanced) Lock down origin access to Cloudflare only

If you want extra hardening, restrict inbound `80/443` on the server to **Cloudflare IP ranges only**.
This reduces direct-to-origin attacks, but requires you to keep the Cloudflare IP list up to date (IPv4 + IPv6).

Workflow:

- Keep SSH reachable from your trusted IP(s) (or via VPN).
- Allow `80/443` only from Cloudflare IP ranges.
- Deny `80/443` from everywhere else.

## 1) Create a deploy user (server)

Run as `root` once:

```bash
adduser deploy
usermod -aG docker deploy

# Optional but recommended: allow sudo for admin tasks !!! D A N G E R !!!
usermod -aG sudo deploy
```

Harden SSH (recommended):

- Disable password auth
- Disable root login

Edit `/etc/ssh/sshd_config`:

```text
PermitRootLogin no
PasswordAuthentication no
PubkeyAuthentication yes
```

Then reload:

```bash
systemctl reload ssh
```

## 2) SSH key for GitHub Actions

On your local machine:

```bash
ssh-keygen -t ed25519 -C "github-actions-deploy" -f ./turbo-adam-deploy
```

- Copy the **public** key (`turbo-adam-deploy.pub`) to the server:

```bash
sudo -u deploy mkdir -p /home/deploy/.ssh
sudo -u deploy chmod 700 /home/deploy/.ssh
sudo -u deploy tee -a /home/deploy/.ssh/authorized_keys < ./turbo-adam-deploy.pub
sudo -u deploy chmod 600 /home/deploy/.ssh/authorized_keys
```

- Put the **private** key content into GitHub Secrets as `DEPLOY_SSH_KEY`.

## 3) App directory on the server

Note on paths:

- In this setup, your website is served from containers (nginx → web container). You will not put an `index.html` into host `/var/www`.
- We use `/var/lib/turbo-adam` as a convenient place for application state on the server (compose file, env, cert mounts).

```bash
mkdir -p /var/lib/turbo-adam
chown -R deploy:deploy /var/lib/turbo-adam
```

What goes into this directory:

- The deploy workflow uploads the production compose and infra config on each deploy:
  - `infrastructure/compose/production.server.yml`
  - `infrastructure/redis/redis.conf`
  - `infrastructure/postgres/init/` (used only on first DB initialization)
- TLS certs are **not** uploaded by the workflow (by design). You will add them manually in the next step.

Do NOT copy any dev-only compose files to the server.

Important:

- `origin.key` is a secret. Do **not** commit it to Git.
- Keep these files on the server (host filesystem). They are mounted into the nginx container.

## 4) Cloudflare Origin Certificate (Full strict)

In Cloudflare:

- SSL/TLS → Origin Server → **Create certificate**
- Hostnames: include your app subdomain (e.g. `app.your-domain`) (and optionally `*.your-domain`)

On the server:

```bash
sudo mkdir -p /var/lib/turbo-adam/certs
# Paste the certificate to:
# /var/lib/turbo-adam/certs/origin.pem
# Paste the private key to:
# /var/lib/turbo-adam/certs/origin.key
sudo chown -R root:root /var/lib/turbo-adam/certs
sudo chmod 700 /var/lib/turbo-adam/certs
sudo chmod 600 /var/lib/turbo-adam/certs/origin.key
sudo chmod 644 /var/lib/turbo-adam/certs/origin.pem
```

### Where do the files go?

The production reverse proxy expects:

- `/var/lib/turbo-adam/certs/origin.pem` (certificate)
- `/var/lib/turbo-adam/certs/origin.key` (private key)

In production compose we mount the app directory certs folder into nginx as read-only:

- host: `/var/lib/turbo-adam/certs/*`
- container: `/etc/nginx/certs/*`

### Copying the files to the server (recommended)

From your local machine (replace host/port if needed):

```bash
scp -P <YOUR_SSH_PORT> ./origin.pem admin@YOUR_SERVER:/var/lib/turbo-adam/certs/origin.pem
scp -P <YOUR_SSH_PORT> ./origin.key admin@YOUR_SERVER:/var/lib/turbo-adam/certs/origin.key
```

Then fix permissions on the server:

```bash
sudo chown root:root /var/lib/turbo-adam/certs/origin.pem /var/lib/turbo-adam/certs/origin.key
sudo chmod 644 /var/lib/turbo-adam/certs/origin.pem
sudo chmod 600 /var/lib/turbo-adam/certs/origin.key
```

### Apply changes (restart nginx only)

After adding or rotating certs, restart nginx:

```bash
cd /var/lib/turbo-adam
docker compose -f infrastructure/compose/production.server.yml up -d nginx
```

### Key gotcha

Cloudflare shows the **private key** only at certificate creation time. If you lose `origin.key`, you must generate a new Origin Certificate.

## 5) Firewall (IPv4 + IPv6)

Open only SSH + HTTP/HTTPS.

If you use UFW:

```bash
ufw allow <YOUR_SSH_PORT>/tcp
ufw allow 80/tcp
ufw allow 443/tcp
ufw enable
```

Ensure IPv6 is enabled in `/etc/default/ufw` (`IPV6=yes`).

Extra notes:

- If you don’t need SSH from “anywhere”, restrict port `22` to your trusted IP(s).
- Avoid exposing Postgres/Redis on the host in production (this repo’s production compose does not publish them).

## 5a) Automatic security updates (recommended)

On Ubuntu/Debian you can enable unattended security updates:

```bash
sudo apt-get update
sudo apt-get install -y unattended-upgrades
sudo dpkg-reconfigure -plow unattended-upgrades
```

## 6) Fail2ban (recommended)

Install and enable `fail2ban` to reduce SSH brute-force noise.

On Ubuntu/Debian:

```bash
sudo apt-get update
sudo apt-get install -y fail2ban
sudo systemctl enable --now fail2ban
```

At minimum, ensure the SSH jail is enabled (defaults are often OK). You can check status:

```bash
sudo fail2ban-client status
sudo fail2ban-client status sshd
```

## 7) Account hardening (recommended)

- Enable 2FA for the Mikrus panel/account.
- Use strong passwords and keep server packages updated.

Also recommended:

- Keep Docker itself updated.
- Monitor disk usage (Postgres volume + logs can fill disks).
- Back up Postgres (at least `pg_dump`) and test restoring.

## 8) GitHub Actions secrets

In GitHub repo settings → Secrets and variables → Actions → **Secrets**:

- `DEPLOY_HOST` (IPv6 or hostname)
- `DEPLOY_PORT` (your SSH port; on Mikrus it's typically a 5-digit port)
- `DEPLOY_USER` (usually `deploy`)
- `DEPLOY_SSH_KEY` (private key from `ssh-keygen`)
- `DEPLOY_APP_DIR` (e.g. `/var/lib/turbo-adam`)

App secrets (example, adjust to your needs):

- `POSTGRES_USER`
- `POSTGRES_PASSWORD`
- `POSTGRES_DB`
- `DATABASE_URL`

Optional (only if GHCR packages are private):

- `GHCR_PAT` (a GitHub Personal Access Token with `read:packages`)

## 9) Database migrations (safe approach)

Production deploy runs migrations as a separate one-off container before updating the app.

Why:

- The backend runtime image is kept minimal (no Prisma CLI in runtime).
- Migrations can fail fast without partially updating the app.

In practice, the workflow does:

- `docker compose pull`
- `docker compose up -d postgres`
- wait for Postgres readiness
- `docker compose run --rm migrate` (runs `prisma migrate deploy`)
- `docker compose up -d --remove-orphans`

## 10) First deploy (server)

Before the first deploy, ensure:

- `/var/lib/turbo-adam/certs/origin.pem` and `/var/lib/turbo-adam/certs/origin.key` exist with correct permissions.
- Docker + Docker Compose v2 plugin are installed.
- Ports 80/443 are open on the firewall.

Trigger the GitHub Actions workflow (recommended):

- Push to `main` or run the workflow manually (workflow_dispatch).

If you want to do a manual first start on the server (after copying the files):

```bash
cd /var/lib/turbo-adam
docker compose -f infrastructure/compose/production.server.yml pull
docker compose -f infrastructure/compose/production.server.yml up -d postgres
docker compose -f infrastructure/compose/production.server.yml run --rm migrate
docker compose -f infrastructure/compose/production.server.yml up -d --remove-orphans
```

## 11) CI/CD

Workflow: `.github/workflows/deploy-production.yml`

- On push to `main`, it builds images and pushes them to GHCR.
- Then it SSHes into the server, runs migrations, and updates containers.

## 12) Verify after deploy

On the server:

```bash
cd /var/lib/turbo-adam

# Container status
docker compose -f infrastructure/compose/production.server.yml ps

# Tail logs (nginx + backend are usually most important)
docker compose -f infrastructure/compose/production.server.yml logs -n 200 --no-color nginx
docker compose -f infrastructure/compose/production.server.yml logs -n 200 --no-color backend

# Check local ports on the server
curl -I http://localhost/
curl -Ik https://localhost/
```

From your machine (or any external box):

```bash
curl -I https://app.your-domain/
```

If HTTPS returns errors:

- Check that `/var/lib/turbo-adam/certs/origin.pem` and `/var/lib/turbo-adam/certs/origin.key` exist with correct permissions.
- Inspect nginx logs and confirm it can read `/etc/nginx/certs/origin.pem` and `/etc/nginx/certs/origin.key` inside the container.

## Notes

- With Cloudflare orange cloud enabled, your origin should still accept connections on `80/443`.
- Consider restricting `80/443` inbound to Cloudflare IP ranges for extra hardening.
- Avoid keeping certs inside the repo. Keep them only on the server.

Troubleshooting quick commands (server):

- Show containers: `docker ps`
- Show compose status: `docker compose -f infrastructure/compose/production.server.yml ps`
- Logs: `docker compose -f infrastructure/compose/production.server.yml logs -n 200 --no-color`
- Migrations logs (last run): `docker compose -f infrastructure/compose/production.server.yml logs -n 200 --no-color migrate`

Note: on the server we use `infrastructure/compose/production.server.yml`.
