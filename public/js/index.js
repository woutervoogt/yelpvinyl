const menuButton = document.getElementById("hamburger-btn");
const menu = document.querySelector(".nav-btns");

menuButton.addEventListener("click", menuButtonToggle, false);


function menuButtonToggle() {
    if (menu.style.display === "block") {
      menu.style.display = "none";
    } else {
      menu.style.display = "block";
      document.addEventListener("click", hideMenu, true);
    }
  } 
  
  function hideMenu(){
      if(menu.style.display !== "none" && event.target.className !== "menu"  && event.target.className !== "menu-item"){
        menu.style.display = "none";
        document.removeEventListener("click", hideMenu, true);
     }
  }