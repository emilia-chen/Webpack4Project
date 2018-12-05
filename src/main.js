//main.js 
const greeter = require('./Greeter.js');
var d=new greeter();
d.b()

document.getElementById("study").innerHTML=greeter();

var a = () => {console.log(6)};  


a();