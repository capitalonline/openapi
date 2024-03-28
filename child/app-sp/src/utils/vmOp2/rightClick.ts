export function rightClick(row, column, event) {
  // 阻止浏览器默认右键菜单弹出
  event.preventDefault();
  // 获取菜单元素
  document.addEventListener('contextmenu', (event) => {
  if (event.target.closest('.el-table')) {
    let menu = document.querySelector("#menu") as HTMLElement;
    if (menu) {
      menu.style.display = 'block';
      // 计算菜单的高度和宽度
      let menuHeight = menu.offsetHeight;
      let menuWidth = menu.offsetWidth;
      console.log('menuHeight', menuHeight)

      // 获取当前页面的高度和宽度
      let pageHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
      let pageWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;


      // 获取鼠标的位置
      let mouseX = event.clientX;
      let mouseY = event.clientY;

      //定义菜单出现的位置变量
      let posX = mouseX
      let posY = mouseY
      // 检查是否会溢出屏幕右侧，如果是，则将菜单镜像到左侧
      if (pageWidth < mouseX + menuWidth) {
        posX = mouseX - menuWidth;
      }

      // 检查是否会溢出屏幕底部，如果是，则整体向上移动菜单
      if (pageHeight < mouseY + menuHeight) {
        posY = pageHeight - menuHeight
      }

      // 设置菜单的位置
      menu.style.left = posX - 250 + "px";
      menu.style.top = posY - 50 + "px";
      menu.style.display = "block";
      menu.style.zIndex = '1000';
    }
  }
  })
}
