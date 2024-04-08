export function rightClick(row,column,event){
  //组织浏览器默认右键菜单弹出
  event.preventDefault();
  let menu = document.querySelector("#menu") as HTMLElement;
  if(menu) {
    menu.style.left = event.clientX - 258 + "px";
    menu.style.top = event.clientY - 75 + "px";
    menu.style.display = "block";
    menu.style.zIndex = '1000';
  }
}
