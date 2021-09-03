const BASE = "/ecs_business/v1";

function getOptions(base_url: string, met:(string | any),url:string, data:any = null) {
    if (met === "GET" || met === "DELETE"){
        return {
            method: met,
            url: base_url + url,
            params: data
        }
    }else{
        return {
            method: met,
            url: base_url + url,
            data
        }
    }
}

export const getEcsOptions = (met:(string | any),url:string,data:any = null) => {
  return getOptions(BASE, met, url, data)
}