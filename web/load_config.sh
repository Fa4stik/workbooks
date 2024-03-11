#!/bin/sh

echo "Hello work!"
envsubst '${NGINX_SERVER_PATH},${NGINX_SERVER_PORT_HTTP},${NGINX_SERVER_PORT_HTTPS}' < /etc/nginx/nginx.conf.template > /etc/nginx/nginx.conf
rm -f /etc/nginx/nginx.conf.template
cat /etc/nginx/nginx.conf

nginx -g 'daemon off;'