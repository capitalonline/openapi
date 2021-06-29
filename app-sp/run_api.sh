#!/bin/sh
npm install
npm run build
##
sed -i 's/user  nginx/user  root/g' /etc/nginx/nginx.conf

rm -rf /etc/nginx/sites-enabled/default

backend=http://172.20.3.34:8900

if [[ $# -ge 1 ]]; then
    if [[ $1 != 'pro' ]] && [[ $1 != 'pre' ]] && [[ $1 != 'dev' ]] && [[ $1 != 'test' ]]; then
        echo 'usage: ./run_api.sh [pro|pre|dev|test]'
    fi
    if [[ $1 == 'test' ]]; then
        backend=http://10.128.22.12:9000
    fi
    if [[ $1 == 'pre' ]]; then
        backend=http://cckbackend.default.svc.cluster.local
    fi
    if [[ $1 == 'pro' ]]; then
        backend=http://cckbackend.default.svc.cluster.local
    fi
fi

cat > /etc/nginx/conf.d/vue.conf <<EOF
server {
    listen       80;
    server_name  localhost;

    charset utf-8;

    location / {
        root   /app/app-sp/dist/;
        try_files tempuri tempuri/ /index.html last;
        index  index.html;
    }

    location /api/ {
        proxy_pass   ${backend};
        proxy_http_version 1.1;
        proxy_set_header   Host             temphost;
        proxy_set_header   X-Real-IP        tempremote_addr;
        proxy_set_header   X-Forwarded-For  tempproxy_add_x_forwarded_for;
    }
}
EOF

sed -i 's/temp/$/g' /etc/nginx/conf.d/vue.conf
service nginx stop
nginx -g "daemon off;"
