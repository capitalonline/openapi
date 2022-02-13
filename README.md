### 运维+运营系统

### 单独运行运维系统
```
cd child/app-sp

```

### 测试环境部署
> docker run -p 6120:80 -v /root/data/cloud-os-sp-front:/build -d --name pre-cloud-os-sp-front-dev  cloud-os-sp-front:v2 sh -c "cd /build;/bin/bash run_api.sh test"



```
预生产
集群内部地址：  http://cds-os-sp-front
集群外部地址：  http://cds-os-sp-front.gic.pre   本地访问需绑定hosts  10.13.103.34

```