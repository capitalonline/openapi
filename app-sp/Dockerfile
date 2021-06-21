FROM harbor.capitalonline.net/base/nodejs:v12.2.0
ENV   DEPLOY_TYPE pro
ENV   SETTINGS_ENV pro
RUN cp /usr/share/zoneinfo/Asia/Shanghai  /etc/localtime
COPY  nginx.conf /etc/nginx/conf.d/vue.conf
COPY . /app
WORKDIR /app
RUN npm install && npm run build && rm -rf /etc/nginx/sites-enabled/default
# RUN nginx
CMD ["nginx", "-g", "daemon off;"]