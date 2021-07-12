FROM harbor.capitalonline.net/base/nodejs:v12.2.0
RUN cp /usr/share/zoneinfo/Asia/Shanghai  /etc/localtime
RUN npm install -g cnpm -registry=https://registry.npm.taobao.org
# RUN   mkdir /app
# COPY . /app


# RUN   mkdir /build
# COPY  . /build
# RUN   cd /build && /usr/bin/npm install && \
#      /usr/bin/npm run build && mv /build/dist/* /app/ && mv /build/kubernetes /app/