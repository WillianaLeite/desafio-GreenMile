var square = document.querySelector('.square');

var pressTimer = 500;

square.addEventListener("mouseup", () => {
    
    clearTimeout(pressTimer);

})

square.addEventListener("mousedown", (e) => {

    if(e.which == 1) {//Para garantir que só o longo clique do botão esquerdo será considerado, caso o direito também seja, acrescente no if: || e.which == 3
    
        pressTimer = window.setTimeout(() => {

            e.target.classList.toggle('expand');
        
        },500);
    
    }

})


