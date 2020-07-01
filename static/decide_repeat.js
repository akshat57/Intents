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

    //Create language list
    var languageList = document.createElement("select");
    languageList.id = "languages";
    languageList.onchange = "CheckColors(this.value)";

    //create language
    var option = document.createElement("option");
    option.value = ""
    option.text = "-- choose one --"
    languageList.appendChild(option);

    var option = document.createElement("option");
    option.value = "Bengali"
    option.text = "Bengali"
    languageList.appendChild(option);

    var option = document.createElement("option");
    option.value = "Marathi"
    option.text = "Marathi"
    languageList.appendChild(option);

    var option = document.createElement("option");
    option.value = "Telegu"
    option.text = "Telegu"
    languageList.appendChild(option);

    var option = document.createElement("option");
    option.value = "Tamil"
    option.text = "Tamil"
    languageList.appendChild(option);

    var option = document.createElement("option");
    option.value = "Punjabi"
    option.text = "Punjabi"
    languageList.appendChild(option);

    var option = document.createElement("option");
    option.value = "Gujarati"
    option.text = "Gujarati"
    languageList.appendChild(option);

    var option = document.createElement("option");
    option.value = "Kannada"
    option.text = "Kannada"
    languageList.appendChild(option);

    var option = document.createElement("option");
    option.value = "Odia"
    option.text = "Odia"
    languageList.appendChild(option);

    var option = document.createElement("option");
    option.value = "Malayalam"
    option.text = "Malayalam"
    languageList.appendChild(option);

    var option = document.createElement("option");
    option.value = "Other"
    option.text = "Other"
    languageList.appendChild(option);

    var button = document.createElement("submit")
    button.value = "Submit"
    languageList.appendChild(button);
    
    f.appendChild(languageList);
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