function validateDriverGokartForm() {
    const driverInput = document.getElementById('driver_id')
    const gokartInput = document.getElementById('gokart_id')
    const lapTimeInput = document.getElementById('lap_time')
    const wetTrackInput = document.getElementById('wet')
    const dryTrackInput = document.getElementById('dry')

    const errorDriver = document.getElementById('errorDriver')
    const errorGokart = document.getElementById('errorGokart')
    const errorLapTime = document.getElementById('errorLapTime')
    const errorTrackConditions = document.getElementById('errorTrackConditions')

    resetErrors([driverInput, gokartInput, lapTimeInput, wetTrackInput, dryTrackInput], [errorDriver, errorGokart, errorLapTime, errorTrackConditions]);

    let valid = true;

    if(driverInput.value === ""){
        valid = false;
        addErrorMessage(driverInput, errorDriver, "Wybierz kierowcę");
    }

    if(gokartInput.value === ""){
        valid = false;
        addErrorMessage(gokartInput, errorGokart, "Wybierz gokart");
    }

    if (!checkRequired(lapTimeInput.value)) {
        valid = false;
        addErrorMessage(lapTimeInput, errorLapTime, "Pole jest wymagane");
    } else if (!checkNumber(lapTimeInput.value)) {
        valid = false;
        addErrorMessage(lapTimeInput, errorLapTime, "Wartość musi być liczbą");
    }else if (!checkPositive(lapTimeInput.value)) {
        valid = false;
        addErrorMessage(lapTimeInput, errorLapTime, "Czas przejazdu nie może być ujemna");
    }

    if(!checkRequired(dryTrackInput) && !checkRequired(wetTrackInput)){
        valid = false;
        addErrorMessage(dryTrackInput, errorTrackConditions, "Pole jest wymagane");
    }


    return valid;
}
