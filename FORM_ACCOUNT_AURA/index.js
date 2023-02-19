const $formulario = document.getElementById("formulario");
const $inputs = document.querySelectorAll("#formulario input")

// --------- EXPRESIONES REGULARES ---------------
const expresiones = {
  nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, 
  password: /^.{8,10}$/, 
  correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/, 
  password2: /^.{8,10}$/, 
};

const campos = {
  nombre: false,
  password: false,
  correo: false,
  password2: false,
};

// --------- SWITCH PARA SELECCIONAR EL INPUT DONDE ÉSTE HACIENDO FOCO EL USUARIO  ---------------
const validarFormulario = (e) => {
    switch(e.target.name) {       
        case "nombre":
            validarCampo(expresiones.nombre, e.target, "nombre");
        break;
        case "password":
            validarCampo(expresiones.password, e.target, "password");
            validarPassword2();
        break;          
        case "password2":
            validarCampo(expresiones.password2, e.target, "password2");
            validarPassword2();       //encontrar forma de cambio de color e icon alert para campo vacio😭           
        break;
        case "correo":
            validarCampo(expresiones.correo, e.target, "correo");
        break;
       
    }
}
// -------------- VALIDAMOS INPUTS ------------------------
const validarCampo = (expresion, input, campo) => {
    if (expresion.test(input.value)){
        document.getElementById(`grupo__${campo}`).classList.remove("formulario__grupo-incorrecto");
        document.getElementById(`grupo__${campo}`).classList.add("formulario__grupo-correcto");
        document.querySelector(`#grupo__${campo} span`).classList.remove("error");
        document.querySelector(`#grupo__${campo} span`).classList.add("success");
        document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.remove("formulario__input-error-activo");
        campos[campo] = true;
        //console.log("Funciona");
    } else {
           document.getElementById(`grupo__${campo}`).classList.add("formulario__grupo-incorrecto");
           document.getElementById(`grupo__${campo}`).classList.remove("formulario__grupo-correcto");
           document.querySelector(`#grupo__${campo} span`).classList.add("error");
           document.querySelector(`#grupo__${campo} span`).classList.remove("success");
           document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.add("formulario__input-error-activo");
           campos[campo] = false;
           //console.log("No valida");
        }
}
// --------- VALIDAMOS CONTRASEÑAS ---------------
const validarPassword2 = () => {
    let inputPassword1 = document.getElementById("password");
    let inputPassword2 = document.getElementById("password2");

    if (inputPassword1.value !== inputPassword2.value) {
        document.getElementById(`grupo__password2`).classList.add("formulario__grupo-incorrecto");
        document.getElementById(`grupo__password2`).classList.remove("formulario__grupo-correcto");
        document.querySelector(`#grupo__password2 span`).classList.add("error");
        document.querySelector(`#grupo__password2 span`).classList.remove("success");
        document.querySelector(`#grupo__password2 .formulario__input-error`).classList.add("formulario__input-error-activo");
        campos['password'] = false;
        campos['password2'] = false;
        console.log("NO ENVIA");
    } else {
        document.getElementById(`grupo__password2`).classList.remove("formulario__grupo-incorrecto");
        document.getElementById(`grupo__password2`).classList.add("formulario__grupo-correcto");
        document.querySelector(`#grupo__password2 span`).classList.remove("error");
        document.querySelector(`#grupo__password2 span`).classList.add("success");
        document.querySelector(`#grupo__password2 .formulario__input-error`).classList.remove("formulario__input-error-activo");
        campos['password'] = true;
        campos['password2'] = true;
        console.log("--- ENVIA");
    }
}
// --------- CAPTURAR CADA VEZ QUE EL USUARIO PRESIONA UNA TECLA ---------------
$inputs.forEach((input) => {
    input.addEventListener("keyup", validarFormulario);
    input.addEventListener("blur", validarFormulario);
});

// --------- VALIDAR TODO NUESTRO FORMULARIO ---------------
$formulario.addEventListener("submit", (e) => {
    e.preventDefault();

    console.log(campos);
    if(campos.nombre && campos.password && campos.password2 && campos.correo) {
        //formulario.reset();
        alert("El formulario se envió correctamente"); //alert por default JS        
             
        document.querySelectorAll(".formulario__grupo--correcto").forEach ((icono) => {
            icono.classList.remove("formulario__grupo--correcto");
        });
        
        setTimeout(() => {
            location.reload();
        }, 5000);

    } else {
        document.getElementById("formulario__mensaje").classList.add("formulario__mensaje-activo");
    }
});