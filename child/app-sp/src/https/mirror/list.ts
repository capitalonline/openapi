// 镜像列表
import service from "../http"
import {getOptions}from '../event/common'

export default{
    //获取镜像列表
    get_mirror_list(req){
        return service(getOptions('POST','/ebs/api_image_list/',req))
    }
}
    