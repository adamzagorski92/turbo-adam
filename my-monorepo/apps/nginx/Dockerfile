FROM nginx:1.27-alpine

# Bake the production reverse-proxy config into the image so the server
# doesn't need a repo checkout for nginx config changes.
COPY apps/nginx/nginx.prod.conf /etc/nginx/conf.d/default.conf
