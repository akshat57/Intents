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
    languageList.name = "languages"
    languageList.onchange = function(){
        console.log('hahahahah')
        var element=document.getElementById("otherlanguage");
        if(this.value=='Other'){
          console.log('')
          element.style.display='block';
        } 
       };

    //create language
    var option = document.createElement("option");
    option.value = ""
    option.text = "-- choose one --"
    option.disabled = true
    option.selected = true
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
    
    f.appendChild(languageList);

    //Create Text Box
    input = document.createElement("input");
    input.type = "text";
    input.name = "otherlanguage"
    input.id = "otherlanguage"
    input.style = "display:none"
    f.appendChild(input);

    //create submit button
    var input_button = document.createElement("input");
    input_button.type = "submit";
    input_button.value = "Submit";
    f.appendChild(input_button);
    
    container.appendChild(f)

}





function clickedNo(){
    console.log('CLICKED No!!')
    var container = document.getElementById("container");
    container.appendChild(document.createElement("br"))

    //Login Text
    var login_text = "Recording finished. Thank you for recording :) "
    container.appendChild(document.createTextNode(login_text))
}