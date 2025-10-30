const toggle = document.getElementById("toggle");
const navbar = document.getElementById("navbar");
const body = document.getElementsByTagName("body")

toggle.addEventListener("click", () => {
   if(navbar.style.display ==  "block"){
      navbar.style.display = "none";
   }else{
      navbar.style.display = "block";
   }
});