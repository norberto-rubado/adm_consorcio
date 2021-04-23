window.addEventListener("load", function () {
    const form = document.getElementById('form');
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const reveal = document.getElementById('reveal')

    // Validación - Blur

    email.addEventListener('blur', e => {
        validarEmail();
    })

    password.addEventListener('blur', e => {
        validarPassword();
    })

    // Validación - Submit

    form.addEventListener('submit', e => {
        let errores = []
        if (validarEmail() == false){
            errores.push('El email ingresado no es válido');
        };
        if (validarPassword() == false) {
            errores.push('La contraseña debe tener al menos 8 caracteres válidos');
        }
        if (errores.length > 0) {
            e.preventDefault();
        }
    });

    //Ver password

    reveal.addEventListener('click', function() {
        password.type = password.type == 'password' ? 'text' : 'password';
    })

    // Funciones auxiliares (Helpers)

    function validarEmail() {
        const valorEmail = email.value.trim(); // Usamos trim para sacar los espacios en blanco

        if (valorEmail === '') {
            setError(email, 'Este campo es obligatorio');
            return false;
        } else 
        if (!esEmail(valorEmail)) {
            setError(email, 'El email ingresado no es válido');
            return false;
        } else {
            setSuccess(email);
            return true;
        }
    }

    function validarPassword() {
        const valorPassword = password.value.trim().length;
        if (valorPassword <= 5) {
            setError(password, 'La contraseña debe tener al menos 6 caracteres válidos');
            return false;
        } else {
            setSuccess(password);
            return true;
        }
    }

    function setError(input, error) {
        const parentElement = input.parentElement;
        let small = parentElement.querySelector('small');
        parentElement.className = 'form-control error';
        small.innerText = error;
    }

    function setSuccess(input) {
        const formControl = input.parentElement;
        formControl.className = 'form-control success';
    }

    function esEmail(email) {
        return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
    }
})