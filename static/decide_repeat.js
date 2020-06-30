console.log('Hello')

function clickedYes(){
    console.log('CLICKED YES!!')
    var container = document.getElementById("container");

    //Login Text
    var login_text = "Please enter which language you speak. "
    container.appendChild(document.createTextNode(login_text))
    container.appendChild(document.createElement("br"))
    container.appendChild(document.createElement("br"))

    //creating form
    var f = document.createElement("form");
    f.method = "POST"
    f.action = "/repeat"

    //Create Text Box
    var input = document.createElement("input");
    input.type = "text";
    input.name = "language"

    var input_button = document.createElement("input");
    input_button.type = "submit";
    input_button.value = "Submit";

    f.appendChild(input_button)
    f.appendChild(input)

    container.appendChild(f)
    /*

    container.appendChild(input_button)*/
}


function clickedNo(){
    console.log('CLICKED No!!')
    var container = document.getElementById("container");
    container.appendChild(document.createElement("br"))

    //Login Text
    var login_text = "Recording finished. Thank you for recording :) "
    container.appendChild(document.createTextNode(login_text))
}