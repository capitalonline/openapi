export function trans(list:any,oldLable:string,oldValue:string,newLable:string,newVal:string):any{
    let arr:any = []
    list.map(ele=>{
        arr.push({[newLable]:ele[oldLable],[newVal]:ele[oldValue]})
    })
    return arr;
   
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