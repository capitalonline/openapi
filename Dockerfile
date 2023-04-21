FROM harbor.capitalonline.net/base/nginx-nodejs:v13
ENV   DEPLOY_TYPE pro
ENV   SETTINGS_ENV pro
RUN cp /usr/share/zoneinfo/Asia/Shanghai  /etc/localtime

RUN   mkdir /build
COPY  . /build
RUN mkdir -p /app/app-main/
RUN mkdir -p /app/child/app-sp/
RUN mkdir -p /app/child/app-op/

RUN cd /build/app-main

RUN npm install && \
npm run build 

RUN mv /build/app-main/dist/* /app/app-main/

RUN cd /build/child/app-sp && \
npm install && \
npm run build && \
mv /build/child/app-sp/dist/* /app/child/app-sp/


RUN cd /build/child/app-op && \
/usr/bin/npm install && \
/usr/bin/npm run build && \
mv /build/child/app-op/dist/* /app/child/app-op/ && \
cp /app/kubernetes/nginx_test.conf /etc/nginx/nginx.conf
