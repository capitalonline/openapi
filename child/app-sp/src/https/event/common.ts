const BASE="/ecs_business/v1"
export const getOptions=(met:(string | any),url:string,data:any)=>{
    if(met==="GET" || met==="DELETE"){
        return {
            method:met,
            url:BASE+url,
            params:data
        }
    }else{
        return {
            method:met,
            url:BASE+url,
            data
        }
    }
}