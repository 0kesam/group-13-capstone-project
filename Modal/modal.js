const openButtons=document.querySelectorAll(".modal-btn");
const modal=document.querySelector(".modal-overlay");
const closeIcon=document.getElementById("close-icon");

openButtons.forEach(button=>{
    button.addEventListener("click",()=>{
        modal.style.display="flex";
    });
});
// openButtons.addEventListener("click",function(event){
//     if(event.target.tagName==="BUTTON"){
//         modal.style.display="flex"; 
//     }
// })
closeIcon.addEventListener("click", ()=>{
    modal.style.display="none";
})