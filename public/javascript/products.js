window.addEventListener("load",function() {

    let form = document.getElementById("formulario-producto")
    
//  Campos Inputs 
    const name = document.getElementById('name');
    const supplier_id = document.getElementById('supplier_id');
    const price = document.getElementById('price');
    const discount = document.getElementById('discount');
    const category_id = document.getElementById('category_id');
    const image = document.getElementById('image');
    const life_date_from = document.getElementById('life_date_from');
    const life_date_to = document.getElementById('life_date_to');
    const expiration_days = document.getElementById('expiration_days');
    const share = document.getElementById('share');
    const stock = document.getElementById('stock');
    const status = document.getElementById('status');
    const description = document.getElementById('description');

    //  Campos Errores 
    const name_error = document.getElementById('name-error');
    const supplier_error = document.getElementById('supplier-error');
    const price_error = document.getElementById('price-error');
    const discount_error = document.getElementById('discount-error');
    const category_error = document.getElementById('category-error');
    const image_error = document.getElementById('image-error');
    const life_date_from_error = document.getElementById('life_date_from-error');
    const life_date_to_error = document.getElementById('life_date_to-error');
    const expiration_days_error = document.getElementById('expiration_days-error');
    const share_error = document.getElementById('share-error');
    const stock_error = document.getElementById('stock-error');
    const status_error = document.getElementById('status-error');
    const description_error = document.getElementById('description-error');

    const product = {
        name : "",
        supplier_id : "",
        price : "",
        discount : "",
        category_id : "",
        image : "",
        life_date_to : "",
        life_date_from : "",
        expiration_days : "",
        share : "",
        stock : "",
        status : "",
        description : ""
    } 

    if (name_error.innerHTML.trim() != "") {
        setError(name, name_error, name_error.innerHTML.trim());
    }
    if (supplier_error.innerHTML.trim() != "") {
        setError(supplier_id, supplier_error, supplier_error.innerHTML.trim());
    }
    if (price_error.innerHTML.trim() != "") {
        setError(price, price_error, price_error.innerHTML.trim());
    }
    if (discount_error.innerHTML.trim() != "") {
        setError(discount, discount_error, discount_error.innerHTML.trim());
    }
    if (category_error.innerHTML.trim() != "") {
        setError(category_id, category_error, category_error.innerHTML.trim());
    }
    if (image_error.innerHTML.trim() != "") {
        setError(image, image_error, image_error.innerHTML.trim());
    }
    if (life_date_from_error.innerHTML.trim() != "") {
        setError(life_date_from, life_date_from_error, life_date_from_error.innerHTML.trim());
    }
    if (life_date_to_error.innerHTML.trim() != "") {
        setError(life_date_to, life_date_to_error, life_date_to_error.innerHTML.trim());
    }
    if (expiration_days_error.innerHTML.trim() != "") {
        setError(expiration_days, expiration_days_error, expiration_days_error.innerHTML.trim());
    }
    if (share_error.innerHTML.trim() != "") {
        setError(share, share_error, share_error.innerHTML.trim());
    }
    if (stock_error.innerHTML.trim() != "") {
        setError(stock, stock_error, stock_error.innerHTML.trim());
    }
    if (status_error.innerHTML.trim() != "") {
        setError(status, status_error, status_error.innerHTML.trim());
    }
    if (description_error.innerHTML.trim() != "") {
        setError(description, description_error, description_error.innerHTML.trim());
    }


    if (document.getElementById('store-success').innerHTML.trim() != "" && document.getElementById('store-success') !='undefined') {
        document.getElementById("store-success").classList.add("store-success")
    }
    
    name.addEventListener("blur",function() {
        validarName()
    })

    function validarName() {

        const valorName = name.value.trim()

        if (valorName != "" && validator.isLength(valorName,{min:5,max:50})){
            setSuccess(name, name_error, valorName);
            return true
        } else {
            setError(name, name_error, 'El nombre del producto debe tener minimo 5 caracteres y maximo 50');
            return false
        }

    }

    supplier_id.addEventListener("blur",function() {
        validarSupplier_id()
    })

    function validarSupplier_id() {
        const valorSupplier_id = supplier_id.value.trim()
        if (valorSupplier_id.value === "" || validator.isEmpty(valorSupplier_id)){
            setError(supplier_id, supplier_error, 'El producto debe tener asignado un proveedor');
            return false
        } else {
            setSuccess(supplier_id, supplier_error, valorSupplier_id);
            return true
        }
    }

    price.addEventListener("blur",function() {
        validarPrice()
    })

    function validarPrice() {
        const valorPrice = price.value.trim()

        if (validator.isDecimal(valorPrice) && price.value >= 0 ){
            setSuccess(price, price_error, valorPrice);
            return true
        } else {
            setError(price, price_error, 'El precio del producto debe ser numerico mayor o igual a 0');
            return false
        }
    }

    discount.addEventListener("blur",function() {
        validarDiscount()
    })

    function validarDiscount() {
        const valorDiscount = discount.value.trim()

        if (validator.isDecimal(valorDiscount) && valorDiscount >= 0 && valorDiscount < 100){
            setSuccess(discount, discount_error, valorDiscount);
            return true
        } else {
            setError(discount, discount_error, 'El descuento del producto debe ser mayor o igual a 0 y menor que 100');
            return false
        }
    }

    category_id.addEventListener("blur",function() {
        validarCategory_id()
    })

    function validarCategory_id() {
        const valorCategory_id = category_id.value.trim()

        if (valorCategory_id == "" || validator.isEmpty(valorCategory_id)){
            setError(category_id, category_error, 'El producto debe tener asociada una categoria');
            return false
        } else {
            setSuccess(category_id, category_error, valorCategory_id);
            return true
        }
    }

    image.addEventListener("blur",function() {
        validarImage()
    })

    function validarImage() {
        let valorImage = image.value.trim()

        if (
            (!validator.isEmpty(valorImage) && window.location.pathname.includes("crear") && image.files.length <= 5 ) || 
            ((validator.isEmpty(valorImage) || image.files.length <= 5) && window.location.pathname.includes("editar"))) {
            if (validator.isEmpty(valorImage)) {
                valorImage = 0
            }
            setSuccess(image, image_error, valorImage);
            return true
        } else {
            setError(image, image_error, 'Debe seleccionar como minimo una imagen y como maximo 5');
            return false
        }
    }

    life_date_from.addEventListener("blur",function() {
        validarLife_date_from()
    })

    function validarLife_date_from() {
        const valorLife_date_from = life_date_from.value.trim()

        let fecha_actual = new Date()

        fecha_actual = fecha_actual.getFullYear() + "-" + ("0" + (fecha_actual.getMonth() + 1)).slice(-2) + "-" + ("0" + fecha_actual.getDate()).slice(-2)

        if (valorLife_date_from == "" || (valorLife_date_from < fecha_actual && !window.location.pathname.includes("editar"))) {
            setError(life_date_from, life_date_from_error, 'El producto debe tener asignada una fecha de vigencia desde mayor o igual a hoy');
            return false
        } else {
            setSuccess(life_date_from, life_date_from_error, valorLife_date_from);
            return true
        }
    }

    life_date_to.addEventListener("blur",function() {
        validarLife_date_to()
    })

    function validarLife_date_to() {
        const valorLife_date_to = life_date_to.value.trim()

        if (valorLife_date_to == "" || valorLife_date_to < life_date_from.value){
            setError(life_date_to, life_date_to_error, 'El producto debe tener asignada una fecha de vigencia hasta mayor a la fecha desde');
            return false
        } else {
            setSuccess(life_date_to, life_date_to_error, valorLife_date_to);
            return true
        }
    }

    expiration_days.addEventListener("blur",function() {
        validarExpiration_days()
    })

    function validarExpiration_days() {

        const valorExpiration_days = expiration_days.value.trim()

        if (validator.isInt(valorExpiration_days) && valorExpiration_days >= 0){
            setSuccess(expiration_days, expiration_days_error, valorExpiration_days);
            return true
        } else {
            setError(expiration_days, expiration_days_error, 'Los dias de vencimiento del producto debe mayor o igual a 0');
            return false
        }
    }

    share.addEventListener("blur",function() {
        validarShare()
    })

    function validarShare() {
        const valorShare = share.value.trim()

        if (valorShare == "" || validator.isEmpty(valorShare)){
            setError(share, share_error, 'El producto debe tener asignado si es para compartir');
            return false
        } else {
            setSuccess(share, share_error, valorShare);
            return true
        }
    }
    
    stock.addEventListener("blur",function() {
        validarStock()
    })

    function validarStock() {
        const valorStock = stock.value.trim()

        if (validator.isInt(valorStock) && valorStock >= 0 ){
            setSuccess(stock, stock_error, valorStock);
            return true
        } else {
            setError(stock, stock_error, 'El stock del producto debe ser mayor o igual a 0');
            return false
        }
    }

    status.addEventListener("blur",function() {
        validarStatus()
    })

    function validarStatus() {
        const valorStatus = status.value.trim()

        if (valorStatus == "" || validator.isEmpty(valorStatus)){
            setError(status, status_error, 'El estado del producto debe tener asignado un valor');
            return false
        } else {
            setSuccess(status, status_error, valorStatus);
            return true
        }
    }

    description.addEventListener("blur",function() {
        validarDescription()
    }) 

    function validarDescription() {
        const valorDescription = description.value.trim()

        if (valorDescription != "" && validator.isLength(valorDescription,{min:20,max:300})){
            setSuccess(description, description_error, valorDescription);
            return true
        } else {
            setError(description, description_error, 'La descripcion del producto debe tener minimo 20 caracteres y maximo 300');
            return false
        }
    }

    form.addEventListener("submit",function(event) {

        validarName()
        validarSupplier_id() 
        validarPrice() 
        validarDiscount() 
        validarCategory_id() 
        validarImage() 
        validarLife_date_from() 
        validarLife_date_to() 
        validarExpiration_days() 
        validarShare() 
        validarStock() 
        validarStatus() 
        validarDescription() 

/*      codigo para actualizar sin API */

/*         if (product.name === "" ||
            product.supplier_id === "" ||
            product.price === "" ||
            product.discount === "" ||
            product.category_id === "" ||
            product.image === "" ||
            product.life_date_to === "" ||
            product.life_date_from === "" ||
            product.expiration_days === "" ||
            product.share === "" ||
            product.stock === "" ||
            product.status === "" ||
            product.description === "") {
            event.preventDefault()
        }  */


/*      codigo para actualizar via API */
        
        event.preventDefault()

        if (product.name === "" ||
            product.supplier === "" ||
            product.price === "" ||
            product.discount === "" ||
            product.category === "" ||
            product.life_date_to === "" ||
            product.life_date_from === "" ||
            product.expiration_days === "" ||
            product.share === "" ||
            product.stock === "" ||
            product.status === "" ||
            product.description === "") {
            document.getElementById("store-success").classList.add("store-success")
            document.getElementById("store-success").innerHTML = "Debe Completar los campos indicados con error"
        } else {

            let input = document.querySelector('input[type="file"]') // es del ejemplo

            let data = new FormData()

            for (const file of input.files) { 
                data.append('files',file,file.name) 
            } 

            data.append('name', product.name)
            data.append('supplier_id', product.supplier_id)
            data.append('price', product.price)
            data.append('discount', product.discount)
            data.append('category_id', product.category_id)
            data.append('life_date_to', product.life_date_to)
            data.append('life_date_from', product.life_date_from)
            data.append('expiration_days', product.expiration_days)
            data.append('share', product.share)
            data.append('stock', product.stock)
            data.append('status', product.status)
            data.append('description', product.description)

            fetch ('http://localhost:3001/api/productos/crear', {
            method : 'POST', 
/*          body : JSON.stringify(product), */
            body : data,
/*          headers : {'Content-Type' : 'application/json'} */
/*          headers : {'Content-Type': 'multipart/form-data'} */
            })
            .then(res => res.json())
            .then(data => {
                form.name.value = ""
                form.supplier_id.value = ""
                form.price.value = ""
                form.discount.value = ""
                form.category_id.value = ""
                form.life_date_to.value = ""
                form.life_date_from.value = ""
                form.expiration_days.value = ""
                form.share.value = ""
                form.stock.value = ""
                form.status.value = ""
                form.description.value = ""

                document.getElementById("store-success").classList.add("store-success")
                document.getElementById("store-success").innerHTML = "¡Tu producto fue dado de alta exitosamente!"

            })
            .catch(error => {console.log(error)})
        }

    })

    function setError(input, input_error, error) {
        input.style.borderColor = "tomato"
        input_error.innerHTML = error
        switch(input.id) {
            case "name":
                product.name = ""
            case "supplier_id":
                product.supplier_id = ""
            case "price":
                product.price = ""
            case "discount":
                product.discount = ""
            case "category_id":
                product.category_id = ""
            case "image":
                product.image = ""
            case "life_date_from":
                product.life_date_from = ""
            case "life_date_to":
                product.life_date_to = ""
            case "expiration_days":
                product.expiration_days = ""
            case "share":
                product.share = ""
            case "stock":
                product.stock = ""
            case "status":
                product.status = ""
            case "description":
                product.description = ""
        }
    }

    function setSuccess(input,input_error,valor) {
        input.style.borderColor = "teal"
        input_error.innerHTML = ""
        switch(input.id) {
            case "name":
                product.name = valor
            case "supplier_id":
                product.supplier_id = valor
            case "price":
                product.price = valor
            case "discount":
                product.discount = valor
            case "category_id":
                product.category_id = valor
            case "image":
                product.image = valor
            case "life_date_from":
                product.life_date_from = valor
            case "life_date_to":
                product.life_date_to = valor
            case "expiration_days":
                product.expiration_days = valor
            case "share":
                product.share = valor
            case "stock":
                product.stock = valor
            case "status":
                product.status = valor
            case "description":
                product.description = valor
        }
    }

})