import qs from 'qs';
const BASE = "/ecs_business/v1";
const MONITOR_BASE = "/api/v1/metric";

function getOptions(base_url: string, met:('GET'|'POST'|'PUT'|'DELETE'), url: string, data: any = null) {
    if (met === "GET" || met === "DELETE"){
        return {
            method: met,
            url: base_url + url,
            params: data,
            paramsSerializer: params => qs.stringify(params)
        }
    }else{
        return {
            method: met,
            url: base_url + url,
            data
        }
    }
}

export const getEcsOptions = (met:(string | any), url: string, data: any = null) => {
  return getOptions(BASE, met, url, data)
}

export const getMonitorOptions = (met:(string | any), url: string, data: any = null) => {
return getOptions(MONITOR_BASE, met, url, data)
}