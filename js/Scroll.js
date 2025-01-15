let fscroll = document.querySelector('.solarsys');
let fscroll2 = document.querySelector('.solar2');

window.addEventListener('scroll', function()  {
    if(window.scrollY >0){
        fscroll.classList.remove('hide');
    }
    else{
        fscroll.classList.add('hide');
    }
    
})
 window.addEventListener('scroll', function()  {
      if(window.scrollY > 500){
          fscroll2.classList.remove('hide2');
      }
     else{
          fscroll2.classList.add('hide2');
      }
 })