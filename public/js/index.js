const menuButton = document.getElementById("hamburger-btn");
const menu = document.querySelector(".nav-btns");

menuButton.addEventListener("click", menuButtonToggle, true);


function menuButtonToggle() {
    if (menu.style.display !== "block") {
      menu.style.display = "block";
      document.addEventListener("click", hideMenu, true);
    }
} 
  
function hideMenu(e){
    if(menu.style.display !== "none"){
      e.stopPropagation();
      menu.style.display = "none";
      document.removeEventListener("click", hideMenu, true);
    }
}