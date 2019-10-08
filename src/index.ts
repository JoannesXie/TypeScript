let a: number = 123;

const h1 = document.createElement("h1");
h1.innerHTML = "Hello, I am Joannes";
document.body.appendChild(h1);

let bool: boolean = false;
console.log(bool);
enum Roles {
  SUPER_ADMIN = 1,
  ADMIN,
  USER = 7,
  hh,
}
console.log(Roles.ADMIN);
console.log(Roles.hh);
const merge = <T, U>(arg1: T, arg2: U): T & U => {
  let res = {} as T & U;
  res = Object.assign(arg1, arg2);
  return res;
};
const info1 = {
  name: "lison",
};
const info2 = {
  age: 18,
};
const lisonInfo = merge(info1, info2);
console.log(lisonInfo.age);
