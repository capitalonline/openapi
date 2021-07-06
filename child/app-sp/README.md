# app-op

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

### 测试环境部署
> docker run -p 6124:80 -v /root/data/cloud-os-sp-front:/app -d --name pre-cloud-os-sp-front  cloud-os-sp-front:v2 sh -c "cd /app/app-sp;bash run_api.sh test"
