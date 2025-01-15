window.addEventListener("scroll",function(){
    const header = document.querySelector('header');
    header.classList.toggle('change',window.scrollY > 0);
    });