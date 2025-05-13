### 运维+运营系统

### 单独运行系统
```
运维：cd child/app-sp
运营：cd child/app-op

```
# cloud-os-sp-front

## 描述

```
GPU云主机后台运维运营系统

app-main:主系统

child/app-op:运营系统

child/app-sp：运维系统

child/app-sp/src/views/vmOp2目录为新版运维系统

```

## 本地运行

```
环境依赖：node版本 v14

下载依赖包：npm install

项目启动：npm run serve

```

## 环境地址及部署方式

#### 测试环境

```
需要本地打包后提交到git上
打包命令：npm run build

部署：http://10.4.16.99:8080/job/Cloudos-sp-front-build/

地址：
      运维：http://cloudos-sp-front.gic.test/under-app-sp/
      运营：http://cloudos-sp-front.gic.test/under-app-op/

配置host：10.4.16.210 cloudos-sp-front.gic.test
         10.4.16.210 mcsso.gic.test
```

#### 预生产

```
需要本地打包后提交到git上
打包命令：npm run build

部署：https://devops-cds.capitalonline.net/task/中的cds-os-sp-front服务

地址： http://cds-os-sp-front.gic.pre/under-app-sp/instance

配置host：10.13.103.34 cds-os-sp-front.gic.pre
         10.13.103.34 mcsso.gic.pre


```

#### 生产

```
需要本地打包后提交到git上
打包命令：npm run build

部署：运维更新

地址：https://cds-os-sp-front.capitalonline.net/under-app-sp/instance

```