# Deployment (Cloudflare Full (strict) + Docker Compose)

This repo supports "Option A": Nginx runs in Docker and is the only public entrypoint.

## Prerequisites

- A Linux VPS ("mikrus") with Docker Engine and Docker Compose v2 plugin.
- A domain managed in Cloudflare.
- Cloudflare **SSL/TLS mode: Full (strict)** (orange cloud enabled).

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

Copy these files into `/var/lib/turbo-adam`:

- `docker-compose.production.yml`
- `certs/origin.pem` and `certs/origin.key` (see next section)

Important:

- `origin.key` is a secret. Do **not** commit it to Git.
- Keep these files on the server (host filesystem). They are mounted into the nginx container.

## 4) Cloudflare Origin Certificate (Full strict)

In Cloudflare:

- SSL/TLS → Origin Server → **Create certificate**
- Hostnames: your domain (and optionally `*.your-domain`)

On the server:

```bash
mkdir -p /var/lib/turbo-adam/certs
# Paste the certificate to:
# /var/lib/turbo-adam/certs/origin.pem
# Paste the private key to:
# /var/lib/turbo-adam/certs/origin.key
chmod 700 /var/lib/turbo-adam/certs
chmod 600 /var/lib/turbo-adam/certs/origin.key
chmod 644 /var/lib/turbo-adam/certs/origin.pem
chown -R deploy:deploy /var/lib/turbo-adam/certs
```

### Where do the files go?

The production reverse proxy expects:

- `/var/lib/turbo-adam/certs/origin.pem` (certificate)
- `/var/lib/turbo-adam/certs/origin.key` (private key)

In production compose we mount `./certs` from the app directory into nginx as read-only:

- host: `/opt/turbo-adam/certs/*`
- host: `/var/lib/turbo-adam/certs/*`
- container: `/etc/nginx/certs/*`

### Copying the files to the server (recommended)

From your local machine (replace host/port if needed):

```bash
scp -P 22 ./origin.pem deploy@YOUR_SERVER:/var/lib/turbo-adam/certs/origin.pem
scp -P 22 ./origin.key deploy@YOUR_SERVER:/var/lib/turbo-adam/certs/origin.key
```

Then fix permissions on the server:

```bash
sudo chown deploy:deploy /var/lib/turbo-adam/certs/origin.pem /var/lib/turbo-adam/certs/origin.key
sudo chmod 644 /var/lib/turbo-adam/certs/origin.pem
sudo chmod 600 /var/lib/turbo-adam/certs/origin.key
```

### Apply changes (restart nginx only)

After adding or rotating certs, restart nginx:

```bash
cd /var/lib/turbo-adam
docker compose -f docker-compose.production.yml up -d nginx
```

### Key gotcha

Cloudflare shows the **private key** only at certificate creation time. If you lose `origin.key`, you must generate a new Origin Certificate.

## 5) Firewall (IPv4 + IPv6)

Open only SSH + HTTP/HTTPS.

If you use UFW:

```bash
ufw allow 22/tcp
ufw allow 80/tcp
ufw allow 443/tcp
ufw enable
```

Ensure IPv6 is enabled in `/etc/default/ufw` (`IPV6=yes`).

## 6) GitHub Actions secrets

In GitHub repo settings → Secrets and variables → Actions → **Secrets**:

- `DEPLOY_HOST` (IPv6 or hostname)
- `DEPLOY_PORT` (usually `22`)
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

## 7) First run (server)

Once the compose file and certs exist on the server:

```bash
cd /var/lib/turbo-adam
docker compose -f docker-compose.production.yml up -d
```

## 8) CI/CD

Workflow: `.github/workflows/deploy-production.yml`

- On push to `main`, it builds images and pushes them to GHCR.
- Then it SSHes into the server and runs `docker compose pull && up -d`.

## Notes

- With Cloudflare orange cloud enabled, your origin should still accept connections on `80/443`.
- Consider restricting `80/443` inbound to Cloudflare IP ranges for extra hardening.
- Avoid keeping certs inside the repo (e.g. under `apps/nginx/certs/`). Keep them only on the server.
