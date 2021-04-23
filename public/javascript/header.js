
window.addEventListener("load",function(){

    const btnToggle = document.querySelector('.menu-hamburguesa'); 

    btnToggle.addEventListener('click', function () {

    document.getElementById('sidebar').classList.toggle('active');

    });

})