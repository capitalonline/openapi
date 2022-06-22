export function trans(list:any,oldLable:string,oldValue:string,newLable:string,newVal:string):any{
    let arr:any = []
    list.map(ele=>{
        arr.push({[newLable]:ele[oldLable],[newVal]:ele[oldValue]})
    })
    return arr;
   
}
export function deal_list(list,label_list,key_list,other={}){//label_list表示替换后的字段名，key_list表示原来数组的字段名
    let temp=[]
    list.map(item=>{
        let obj={}
        label_list.map((inn,index)=>{
            obj[inn] =item[key_list[index]]
        })
        temp.push({...obj,...other})
        
        
    })
    return temp
}
export function deal_fee_info(billing_info,isCreate:boolean=false){
    let temp_bill={}
    for(let i in billing_info){
        const {billing_scheme_id,billing_cycle_id,billing_items,gic_goods_id} = billing_info[i];
        let temp_items = {}
        for(let j in billing_items){
            let obj={
                attr_id:billing_items[j].attr_id,
                name:billing_items[j].name,
            }
            let common = {
                id:billing_items[j].id,
                key:j
            }
            temp_items[j] =isCreate  ? {...obj,...common} : common
        }
        temp_bill[i]={
            billing_scheme_id,
            billing_cycle_id,
            billing_items:temp_items,
            gic_goods_id:isCreate ? gic_goods_id : undefined
        }
    }
    return temp_bill
}
export function get_featrues(list,id){
    return list.map(item=>item[id])
}
export function paramsSerializer(obj){
    let str=""
    for (let i in obj){
        if(obj[i]){
            str =str+`${i}=${obj[i]}&`
        }
    }
    return str==="" ? "" : `?${str.slice(0,str.length-1)}`
}