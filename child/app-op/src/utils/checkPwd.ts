export function checkPwd(password) {
  let regCapital = /[A-Z]+/;
  let regNumber = /\d+/;
  let regLower = /[a-z]+/;
  let regSpecial = /[~`·！!@#￥$%……^&*()（）——+=【】[\]{}|、\\：:;；"”“’''<>《》,，。.?？/].*/;
  let pwdSecurityFlag = 0;
  let flag = true;
  let msg = '';
  if (regCapital.test(password)) {
    // 大写字母
    pwdSecurityFlag++;
  }
  if (regNumber.test(password)) {
    // 数字
    pwdSecurityFlag++;
  }
  if (regLower.test(password)) {
    // 小写字母
    pwdSecurityFlag++;
  }
  if (regSpecial.test(password)) {
    // 特殊符号
    pwdSecurityFlag++;
  }
  if (password.length < 8 || password.length > 30) {
    msg = '长度应为8-30位之间';
    flag = false;
  }
  if (pwdSecurityFlag < 3) {
    msg = '需要包含大小写字母、数字、特殊符号中的任意三项';
    flag = false;
  }
  return { flag, msg };
}