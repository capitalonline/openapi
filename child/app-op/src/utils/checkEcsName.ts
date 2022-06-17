export function checkEcsName(name) {
  let flag = true;
  let msg = '';
  if (name && (name.length < 2 || name.length > 60)) {
    msg = '长度应为2-60位之间';
    flag = false;
  }
  return { flag, msg };
}