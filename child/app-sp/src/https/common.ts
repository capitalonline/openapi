import qs from 'qs';
const BASE = "/ecs_business/v1";
const MONITOR_BASE = "/monitor/api/v1/metric";
const SNAPSHOT_BASE = "/snapshot/api/v1/";
const ALARM_BASE = '/alarm/api/v1';
const GPU_MONITOR_BASE = "/gpu_monitor/api/v1/metric";
const NAS_BASE = "/nas_union_business/v1"
const USED_BASE = "/monitor/api/v1";
const NAS1_BASE = "/nas_op/v1"
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
function getDownOptions(base_url: string, met:('GET'|'POST'|'PUT'|'DELETE'), url: string, data: any = null,downType) {
    return {
      method: met,
      url: base_url + url,
      params: data,
      paramsSerializer: params => qs.stringify(params),
      responseType: downType
    }

}

export const getEcsOptions = (met:(string | any), url: string, data: any = null) => {
  return getOptions(BASE, met, url, data)
}

export const getMonitorOptions = (met:(string | any), url: string, data: any = null) => {
    return getOptions(MONITOR_BASE, met, url, data)
}
export const getGpuMonitorOptions = (met:(string | any), url: string, data: any = null) => {
    return getOptions(GPU_MONITOR_BASE, met, url, data)
}
export const getAlarmOptions = (met:(string | any), url: string, data: any = null) => {
    return getOptions(ALARM_BASE, met, url, data)
}
export const getHostOptions = (met:(string | any), url: string, data: any = null) => {
    return getOptions(BASE, met, url, data)
}
export const getNasOptions = (met:(string | any), url: string, data: any = null) => {
    return getOptions(NAS_BASE, met, url, data)
}
export const getNas1Options = (met:(string | any), url: string, data: any = null) => {
    return getOptions(NAS1_BASE, met, url, data)
}
export const getSnapshotOptions = (met:(string | any), url: string, data: any = null) => {
    return getOptions(SNAPSHOT_BASE, met, url, data)
}
export const getUsedOptions = (met:(string | any), url: string, data: any = null) => {
    return getOptions(USED_BASE, met, url, data)
}
export const getImportOptions = (met:(string | any), url: string, data: any = null,downType) => {
  return getDownOptions(BASE, met, url, data,downType)
}
