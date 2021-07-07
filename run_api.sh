#!/bin/sh
cd /app/app-main
npm install
npm run build
cd /app/child/app-sp
npm install
npm run build
cd /app/child/app-op
npm install
npm run build
##
# sed -i 's/user  nginx/user  root/g' /etc/nginx/nginx.conf

rm -rf /etc/nginx/sites-enabled/default

backend=http://10.128.22.12:9000

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
        root   /app/app-main/dist/;
        try_files $uri $uri/ /index.html last;
        index  index.html;
    }

    # location /child/app-sp/ {
    #     root   /app/;
    #     try_files $uri $uri/ /child/app-sp/index.html last;
    #     index  index.html;
    # }

    # location /child/app-op/ {
    #     root   /app/;
    #     try_files $uri $uri/ /child/app-op/index.html last;
    #     index  index.html;
    # }

    location /api/ {
        proxy_pass   ${backend};
    }
}
EOF

service nginx stop
nginx -g "daemon off;"
