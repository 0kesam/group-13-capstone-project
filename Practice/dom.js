const heading= document.getElementById("main-heading");
console.log(heading);

const content= document.getElementById("content");
console.log(content);

const headings= document.querySelector("#main-heading");
console.log(headings);

const firstItem= document.querySelector(".item");
console.log(firstItem);

const Items= document.querySelectorAll(".item");
console.log(Items);

const item2=document.getElementsByClassName("item");
console.log(item2);

const example=document.getElementById("example");
console.log(example.textContent);
console.log(example.innerHTML);

example.textContent="new text "
console.log(example.textContent);

example.innerHTML="<a>new link</a>"
console.log(example.innerHTML);





