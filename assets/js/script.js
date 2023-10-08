const body = document.querySelector("body"),
      modeToggle = body.querySelector(".mode-toggle");
      sidebar = body.querySelector("nav");
      btnActive = body.querySelector("#btn");
      btnClose = body.querySelector("#close");
      form = body.querySelector(".token-form");
      sidebarToggle = body.querySelector(".sidebar-toggle");

let getMode = localStorage.getItem("mode");
if(getMode && getMode ==="dark"){
    body.classList.toggle("dark");
}

let getStatus = localStorage.getItem("status");
if(getStatus && getStatus ==="close"){
    sidebar.classList.toggle("close");
}

modeToggle.addEventListener("click", () =>{
    body.classList.toggle("dark");
    if(body.classList.contains("dark")){
        localStorage.setItem("mode", "dark");
    }else{
        localStorage.setItem("mode", "light");
    }
});

sidebarToggle.addEventListener("click", () => {
    sidebar.classList.toggle("close");
    if(sidebar.classList.contains("close")){
        localStorage.setItem("status", "close");
    }else{
        localStorage.setItem("status", "open");
    }
})
btnActive.addEventListener("click", () => {
    form.classList.add("active");
    if(form.classList.contains("active")){
        localStorage.setItem("formDisplay", "active");
    }else{
        localStorage.setItem("formDisplay", "open");
    }
})
btnClose.addEventListener("click", () => {
    form.classList.remove("active");
    if(form.classList.contains("active")){
        localStorage.setItem("formDisplay", "active");
    }else{
        localStorage.setItem("formDisplay", "open");
    }
})

form.addEventListener('submit', (e)=> {
  e.preventDefault();
  console.log('form has been submited to the api');
})