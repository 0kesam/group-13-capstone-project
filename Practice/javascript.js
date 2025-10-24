//let name="jubril"
//console.log(name);

//name=`peepy`;
//console.log(name);

let firstName = "Noimot";
let lastName = "Oladimeji";
console.log("My name is:", lastName + " " + firstName);

let addition = 5+11;
console.log("The addition of 5 and 11 is:",addition);
addition = addition + 4;
console.log(addition);

const pie = 22/7;
console.log(pie);

let length = 30;
let breadth = 20;
const area = length * breadth;
console.log("The area of the rectangle is:", area);

let width=5;
const volume=width*width;
console.log("The volume of the rectangle is:", volume);

function greet(){
    console.log("Hello,welcome to Techcrush!");
}
 greet();

//function greetPerson(name){
   // console.log("Hello,",name,"welcome to Techcrush!");
//}
// let name = prompt("Enter your name");
// greetPerson(name);

// //Addition 
// function addNumbers(x,y) {
//     return x+y;
// }

// const addedNumbers= addNumbers(10,10);
// console.log(addedNumbers);
// // let x=Number(prompt("enter the first value"));
// // let y=Number(prompt("enter the second value"));
// // const addedNumbers= addNumbers(x,y);
// // console.log(addedNumbers);

// //Multiplication
// function multiplyNumbers(x,y) {
//     return x*y;
// }
// const multipliedNumbers= multiplyNumbers(10,10);
// console.log(multipliedNumbers);

// //Subtraction
// function subtractNumbers(x,y) {
//     return x-y;
// }
// const subtractedNumbers=subtractNumbers(10,10);
// console.log(subtractedNumbers);

// //Division
// function divideNumbers(x,y) {
//     return x/y;
// }
// const dividedNumbers= divideNumbers(10,10);
// console.log(dividedNumbers);


// function add(a,b){
//     return a+b;
// }

// function subtract(a,b){
//     return a-b;
// }

// function divide(a,b){
//     return a/b;
// }

// function multiply(a,b){
//     return a*b;
// }


// let calculation= prompt("which operation would like to perform?");
// let a = Number(prompt("enter value for first number"));
// let b = Number(prompt("enter value for second number"));
// if(calculation==="addition"){
//     console.log(add);
// }else if (calculation==="subtraction"){
//     console.log(subtract);
// }
// let operation=prompt("what type of operation do you want to perform?");
// let num1= Number(prompt("Enter the first value"));
// let num2= Number(prompt("Enter the second value"));

// function calculation(operation,num1,num2){
//     if (operation==="add"){
//         return num1+num2;
//     }
//     else if (operation==="subtract"){
//         return num1-num2;
//     }
//     else if (operation==="multiply"){
//         return num1*num2;
//     }
//     else if (operation==="divide"){
//         if (num2!==0){
//         return num1/num2;
//     }else{
//         return "Error:Division by zero is not allowed";
//     }}else{
//         return "Error:Invalid operation. Please choose from add,subtract,multiply,or divide."
//     }
// }
// const subtractedNumbers=num1-num2;
// console.log(subtractedNumbers);

// const multipliedNumbers=num1*num2;
// console.log(multipliedNumbers);

// const dividedNumbers=num1/num2;
// console.log(dividedNumbers);

// if(operation==="add"){
//     const addedNumbers=num1+num2;
//     console.log(addedNumbers);
// }

// let operation=prompt("What type of operation would you like to perform?");
// let num1= Number(prompt("Enter the First Number"));
// let num2= Number(prompt("Enter the Second Number"));
// function calculation(operation,num1,num2){
//     if (operation==="add"){
//         return num1+num2;
//     }
//     if (operation==="subtract"){
//         return num1-num2;
//     }
//      if (operation==="multiply"){
//         return num1*num2;
//     }
//     else if (operation==="divide"){
//         if (num2!==0){
//         return num1/num2;
//     }else{
//          return "Error:Division by zero is not allowed";
//      }}else{
//          return "Error:Invalid operation. Please choose from add,subtract,multiply,or divide."
//      }
// }
// const calculatedNumbers=calculation(operation,num1,num2);
// console.log(calculatedNumbers);

// const multipliedNumbers=num1*num2;
// console.log(multipliedNumbers);

// const dividedNumbers=num1/num2;
// console.log(dividedNumbers);

// for(let a=1; a<=5; a++){
//     console.log(a);
// }

// let name=prompt("enter your name");
// function greetUser(name){
//     console.log(`Hello ${name}!`);
// }
// greetUser(name);

// let rectangleLength = Number(prompt("enter the rectangle length"));
// let rectangleWidth = Number(prompt("enter the rectangle width"));
// function calculateArea(rectangleLength,rectangleWidth){
//     return rectangleLength*rectangleWidth;
// }
// const RectangleArea=calculateArea(rectangleLength,rectangleWidth);
// console.log(RectangleArea);


// let num1= Number(prompt("Enter the First Number"));
// let num2= Number(prompt("Enter the Second Number"));
// function largerNumber(num1,num2) {
//     if (num1>num2) {
//         console.log(`${num1} is larger than ${num2}`);
//     }else if (num2>num1){
//         console.log(`${num2} is larger than ${num1}`);
//     }
// }
// largerNumber(num1,num2);

const text = "Hello World";
console.log(text.toLowerCase().includes("h"));

function isValidEmail(email){
    return email.toLowerCase().includes("@")&&email.toLowerCase().includes(".");
}
console.log(isValidEmail("Lukman@yahoo.com"));

console.log(document);
console.log(document.title);
console.log(document.URL);