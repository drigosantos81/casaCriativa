function onOff(){
    document.querySelector("#modal").classList.toggle("hide");

    document.querySelector("body").classList.toggle("hideScroll");

    document.querySelector("modal").classList.toggle("addScroll");
}

function checkFields(event) {
    const valuesToCheck = [
        "title",
        "category",
        "image",
        "description",
        "link",
    ]

    const isEmpty = valuesToCheck.find(function(value) {
        const checkIfIsString = typeof event.target[value].value === "string";
        const checkIsEmpty = !event.target[value].value.trim();
        
        if (checkIfIsString && checkIsEmpty) {
            return true;
        }

        if (checkIfIsString && true) {
            
        }
    })

    if (isEmpty) {
        event.preventDefault();
        alert("Por favor, preecha todos os campos");
    };
    

    // for (let value of valuesToCheck) {
    //     console.log(event.target[value].value);
    // }

}
