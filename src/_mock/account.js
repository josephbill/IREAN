// ----------------------------------------------------------------------


const username = localStorage.getItem("username");
console.log("USERNAME IN ACCOUNT MOCK ")
console.log(username)
const account = {
  displayName: "username",
  email: 'demo@minimals.cc',
  photoURL:'/assets/logo.svg' ,
};

export default account;
