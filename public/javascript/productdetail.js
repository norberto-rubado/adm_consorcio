window.addEventListener("load",function() {
    const cantidad_menos = document.getElementById('imagen_cantidad_menos');
    const cantidad_mas = document.getElementById('imagen_cantidad_mas');
    const cantidad = document.getElementById('quantity');

    cantidad_menos.addEventListener("click",function() {
        valorMenos = Number.parseInt(cantidad.value)
        if (valorMenos > 1 ) {
            valorMenos = valorMenos - 1
            cantidad.value = valorMenos
        }
    })

    cantidad_mas.addEventListener("click",function() {
        valorMas = Number.parseInt(cantidad.value)
        if (valorMas <= 1000 ) {
            valorMas = valorMas + 1
            cantidad.value = valorMas
        }
    })
})