FROM harbor.capitalonline.net/base/nodejs:v12.2.0
RUN cp /usr/share/zoneinfo/Asia/Shanghai  /etc/localtime
# COPY . /app
WORKDIR /app