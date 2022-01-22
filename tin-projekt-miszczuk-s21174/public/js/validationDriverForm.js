function validateDriverForm() {
    const firstNameInput = document.getElementById('first_name')
    const lastNameInput = document.getElementById('last_name')
    const birthdateInput = document.getElementById('birthdate')
    const weightInput = document.getElementById('weight')
    const telephoneInput = document.getElementById('phone_number')

    // const secondNameInput = document.getElementById('second_name')
    // const errorSecondName = document.getElementById('errorSecondName')

    const errorFirstName = document.getElementById('errorFirstName')
    const errorLastName = document.getElementById('errorLastName')
    const errorBirthdate = document.getElementById('errorBirthdate')
    const errorWeight = document.getElementById('errorWeight')
    const errorTelephone = document.getElementById('errorTelephone')

    resetErrors([firstNameInput, lastNameInput, birthdateInput, weightInput, telephoneInput], [errorFirstName, errorLastName, errorBirthdate, errorWeight, errorTelephone]);

    let valid = true;

    if (!checkRequired(firstNameInput.value)) {
        valid = false;
        addErrorMessage(firstNameInput, errorFirstName, "Pole jest wymagane");
    } else if (!checkTextLengthRange(firstNameInput.value, 2, 20)) {
        valid = false;
        addErrorMessage(firstNameInput, errorFirstName, "Pole powinno zawierać od 2 do 20 znaków");
    }

    if (!checkRequired(lastNameInput.value)) {
        valid = false;
        addErrorMessage(lastNameInput, errorLastName, "Pole jest wymagane");
    } else if (!checkTextLengthRange(lastNameInput.value, 2, 20)) {
        valid = false;
        addErrorMessage(lastNameInput, errorLastName, "Pole powinno zawierać od 2 do 20 znaków");
    }
    //
    // if (!secondNameInput.value) {
    //     valid = true;
    // } else if(!checkTextLengthRange(secondNameInput.value, 2, 20)){
    //     valid = false;
    //     addErrorMessage(secondNameInput, errorSecondName, "Pole powinno zawierać od 2 do 20 znaków");
    // }

    if (!checkRequired(birthdateInput.value)) {
        valid = false;
        addErrorMessage(birthdateInput, errorBirthdate, "Pole jest wymagane");
    } else if (!checkDateInPast(birthdateInput.value)) {
        valid = false;
        addErrorMessage(birthdateInput, errorBirthdate, "Data musi być z przeszłości")
    }

    if (!checkRequired(weightInput.value)) {
        valid = false;
        addErrorMessage(weightInput, errorWeight, "Pole jest wymagane");
    } else if (!checkNumber(weightInput.value)) {
        valid = false;
        addErrorMessage(weightInput, errorWeight, "Waga musi być liczbą");
    }else if (!checkPositive(weightInput.value)) {
        valid = false;
        addErrorMessage(weightInput, errorWeight, "Waga nie może być ujemna");
    }

    return valid;
}
