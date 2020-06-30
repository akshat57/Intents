console.log('Hello')

function clickedYes(){
    console.log('CLICKED YES!!')
    var container = document.getElementById("container");

    //Login Text
    var login_text = "Please enter previously used LoginID and hit 'Submit'. [Hint: your andrewID] "
    var warning_text = "Warning: You will get an error if enterred incorrectly."
    container.appendChild(document.createTextNode(login_text))
    container.appendChild(document.createElement("br"))
    container.appendChild(document.createElement("br"))
    container.appendChild(document.createTextNode(warning_text))
    container.appendChild(document.createElement("br"))
    container.appendChild(document.createElement("br"))

    //creating form
    var f = document.createElement("form");
    f.method = "POST"
    f.action = "/login_yes"

    //Create Text Box
    var input = document.createElement("input");
    input.type = "text";
    input.name = "login_id"

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

    //Login Text
    var login_text = "Please choose a LoginID and hit 'Submit'. [Hint: your andrewID] "
    var warning_text = "Please check what you've entered before clicking 'Submit'."
    container.appendChild(document.createTextNode(login_text))
    container.appendChild(document.createElement("br"))
    container.appendChild(document.createElement("br"))
    container.appendChild(document.createTextNode(warning_text))
    container.appendChild(document.createElement("br"))
    container.appendChild(document.createElement("br"))

    //creating form
    var f = document.createElement("form");
    f.method = "POST"
    f.action = "/login_no"

    //Create Text Box
    var input = document.createElement("input");
    input.type = "text";
    input.name = "login_id"

    var input_button = document.createElement("input");
    input_button.type = "submit";
    input_button.value = "Submit";

    f.appendChild(input_button)
    f.appendChild(input)

    container.appendChild(f)
}

//
/*
//Created form
var f = document.createElement("form");
f.setAttribute('method',"post");

//create input element (Yes button)
var y = document.createElement("input");
y.type = "submit";
y.value = "Yes";

var y_click = document.createElement("a")
y_click.onclick = "clickedyes()"
y.appendChild(y_click)

//create input element (No button)
var n = document.createElement("input");
n.type = "submit";
n.value = "No";

// add all elements to the form
f.appendChild(y);
f.appendChild(n);

container.appendChild(f)



/*
var e1 = document.createElement("input");
e1.type = "text";
e1.name = "myformvar";

var cont = document.getElementById("formcontent")
cont.appendChild(e1);*/