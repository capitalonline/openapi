export function trans(list:any,oldLable:string,oldValue:string,newLable:string,newVal:string):any{
    let arr:any = []
    list.map(ele=>{
        arr.push({[newLable]:ele[oldLable],[newVal]:ele[oldValue]})
    })
    return arr;
   
}
export function deal_list(list,label_list,key_list,other={}){//[{disk_size:disk_size}]
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
// export function trans_index(list:any,oldLabel:Array<string>,newLabel:Array<string>):any{
//     if(list.length===0 || !list){
//         return [];
//     }
//     list.map(item=>{
//         oldLabel.map((label,index)=>{
//             item[newLabel[index]] = item[label];
//         })
//         return item;
//     })
//     return list
// }
export function get_featrues(list,id){
    return list.map(item=>item[id])
}