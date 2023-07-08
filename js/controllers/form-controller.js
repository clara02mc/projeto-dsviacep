import Address from "../models/address.js"
import * as addressService from '../services/address-service.js'
import * as listController from "./list-controllers.js"


function State() {

    this.address = new Address();

    this.btnSave = null;
    this.btnClear = null;

    this.inputCep = null;
    this.inputStreet = null;
    this.inputNumber = null;
    this.inputCity = null;

    this.errorCep = null;
    this.errorNumber = null;
}


const state = new State();


export function init(){
    
    state.inputCep = document.forms.newAddress.cep;
    state.inputStreet = document.forms.newAddress.street;
    state.inputNumber = document.forms.newAddress.number;
    state.inputCity = document.forms.newAddress.city;

    state.btnSave = document.forms.newAddress.btnSave;
    state.btnClear = document.forms.newAddress.btnClear;

    state.errorCep = document.querySelector('[data-error="cep"]')
    state.errorNumver = document.querySelector('[data-error="number"]')
    console.log(state);

    state.inputNumber.addEventListener('change', handleImputNamberChange);
    state.inputNumber.addEventListener('keyup', handleImputNamberKeyup);
    state.btnClear.addEventListener("click", handleBtnClearClick);
    state.btnSave.addEventListener("click", handleBtnSaveClick);
    state.inputCep.addEventListener('change', handleInputCepChange);
}
   
function handleImputNamberKeyup(event){
    state.address.number = event.target.value;
}

function handleImputNamberChange(event){
    if(event.target.value == ""){
        setFormError("number", "campo requerido")
       
    } else{
            setFormError("number", "")
        }
}


async function handleInputCepChange(event){
        const cep = event.target.value;
         try{const address = await addressService.findByCep(cep);

        state.inputStreet.value = address.street;
        state.inputCity.value = address.city;
        state.address = address

        setFormError("cep", "")
        state.inputNumber.focus()

        console.log(address)}
        catch (e){
            state.inputStreet.value = "";
            state.inputCity.value = "";
    setFormError("cep", "Informe um CEP válido")
}
}


 async function handleBtnSaveClick(event) {
    event.preventDefault();
  const erros = addressService.getErrors(state.address)

  const keys = Object.keys(errors)

  if (keys.lenght > 0) {
    for (let i = 0; i< keys.length; i++) {
      setFormError = (keys[i], errors[keys[i]]);
       
    }
    
  } else{
    listController.addCard(state.address)
  clearForm()
  }

        
  
}


function handleBtnClearClick(event){
    event.preventDefaull();
    clearForm();
}

 function clearForm(){
    state.inputCep.value = "";
    state.inputCity.value = "";
    state.inputNumber.value = "";
    state.inputStreet.value = "";

    setFormError("cep", "")
    setFormError("number", "");

    state.address = new Address()

    state.inputCep.focus();
}

function setFormError(key, value) {
    const element = document.querySelector(`[data-error="${key}"]`);
    element.innerHTML = value;
} 