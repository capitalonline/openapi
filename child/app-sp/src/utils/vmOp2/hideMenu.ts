export function hideMenu(){
  // 隐藏菜单的逻辑
  let menu = document.querySelector("#menu") as HTMLElement;
  if (menu) {
    menu.style.display = "none";
  }
}
