export function trans(list:any,oldLable:string,oldValue:string,newLable:string,newVal:string):any{
    let arr:any = []
    list.map(ele=>{
        arr.push({[newLable]:ele[oldLable],[newVal]:ele[oldValue]})
    })
    return arr;
}