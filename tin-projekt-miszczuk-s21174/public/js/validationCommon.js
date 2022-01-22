function addErrorMessage(input, error, message){
    input.classList.add("error-input");
    error.classList.add("errors-text");
    error.innerText = message;
}

function resetErrors(inputs, errorTexts){
    for(let i=0; i<inputs.length; i++){
        inputs[i].classList.remove("error-input");
    }
    for(let i=0; i<errorTexts.length; i++){
        errorTexts[i].innerText= "";
    }
}

function checkRequired(value){
    if(!value){
        return false;
    }
    value = value.toString().trim();

    return value !== "";
}

function checkTextLengthRange(value, min, max){
    if(!value){
        return false;
    }
    value = value.toString().trim();
    const length = value.length;
    if(max && length > max){
        return false;
    }
    if(min && length < min){
        return false;
    }
    return true;
}

function checkDateInPast(value){
    let dateNow = new Date();
    let selectedDate = new Date(value);

    return selectedDate < dateNow;
}

function checkNumber(value){
    if(!value){
        return false;
    }else if(isNaN(value)){
        return false;
    }
    return true;
}

function checkPositive(value){
    if(!checkNumber(value)){
        return false;
    }else if(value < 0){
        return false;
    }

    return true;
}
