function validateGokartForm() {
    const brandInput = document.getElementById('brand')
    const modelInput = document.getElementById('model')
    const colorInput = document.getElementById('color')
    const powerInput = document.getElementById('horse_power')
    const weightInput = document.getElementById('weight')
    const fuelConsumptionInput = document.getElementById('fuel_consumption')

    const errorBrand = document.getElementById('errorBrand')
    const errorModel = document.getElementById('errorModel')
    const errorColor = document.getElementById('errorColor')
    const errorPower = document.getElementById('errorPower')
    const errorWeight = document.getElementById('errorWeight')
    const errorFuelConsumption = document.getElementById('errorFuelConsumption')

    resetErrors([brandInput, modelInput, colorInput, powerInput, weightInput, fuelConsumptionInput], [errorBrand, errorModel, errorColor, errorPower, errorWeight, errorFuelConsumption]);

    let valid = true;

    if (!checkRequired(brandInput.value)) {
        valid = false;
        addErrorMessage(brandInput, errorBrand, "Pole jest wymagane");
    } else if (!checkTextLengthRange(brandInput.value, 2, 20)) {
        valid = false;
        addErrorMessage(brandInput, errorBrand, "Pole powinno zawierać od 2 do 20 znaków");
    }

    if (!checkRequired(modelInput.value)) {
        valid = false;
        addErrorMessage(modelInput, errorModel, "Pole jest wymagane");
    } else if (!checkTextLengthRange(modelInput.value, 2, 50)) {
        valid = false;
        addErrorMessage(modelInput, errorModel, "Pole powinno zawierać od 2 do 20 znaków");
    }

    if (!checkRequired(colorInput.value)) {
        valid = false;
        addErrorMessage(colorInput, errorColor, "Pole jest wymagane");
    } else if (!checkTextLengthRange(colorInput.value, 2, 20)) {
        valid = false;
        addErrorMessage(colorInput, errorColor, "Pole powinno zawierać od 2 do 20 znaków");
    }

    if (!checkRequired(weightInput.value)) {
        valid = false;
        addErrorMessage(weightInput, errorWeight, "Pole jest wymagane");
    } else if (!checkNumber(weightInput.value)) {
        valid = false;
        addErrorMessage(weightInput, errorWeight, "Waga musi być liczbą");
    }else if (weightInput.value < 0) {
        valid = false;
        addErrorMessage(weightInput, errorWeight, "Waga nie może być ujemna");
    }

    if (!checkRequired(powerInput.value)) {
        valid = false;
        addErrorMessage(powerInput, errorPower, "Pole jest wymagane");
    } else if (!checkNumber(powerInput.value)) {
        valid = false;
        addErrorMessage(powerInput, errorPower, "Pole musi być liczbą");
    }else if (powerInput.value < 0) {
        valid = false;
        addErrorMessage(powerInput, errorPower, "Moc nie może być ujemna");
    }

    if (checkRequired(fuelConsumptionInput.value) && !checkPositive(fuelConsumptionInput.value)) {
        valid = false;
        addErrorMessage(fuelConsumptionInput, errorFuelConsumption, "Wartość nie może być ujemna");
    }

    return valid;
}
