//webkitURL is deprecated but nevertheless
URL = window.URL || window.webkitURL;

var gumStream;                      //stream from getUserMedia()
var rec;                            //Recorder.js object
var input;                          //MediaStreamAudioSourceNode we'll be recording
var sampleRate;

// shim for AudioContext when it's not avb. 
var AudioContext = window.AudioContext || window.webkitAudioContext;
var audioContext //audio context to help us record

var recordButton = document.getElementById("recordButton");
var stopButton = document.getElementById("stopButton");

//add events to those 2 buttons
recordButton.addEventListener("click", startRecording);
stopButton.addEventListener("click", stopRecording);

function clickedYes(){
    var myDiv = document.getElementById("myDiv")
    myDiv.appendChild(document.createElement("br"))
    myDiv.appendChild(document.createElement("br"))
    myDiv.appendChild(document.createTextNode('Please type in any comments you have. Else, leave blank and press SUBMIT'))
    myDiv.appendChild(document.createElement("br"))
    myDiv.appendChild(document.createElement("br"))

    //creating form
    var f = document.createElement("form");
    f.method = "POST"
    f.action = "/decide_repeat"

    //Create Text Box
    var input = document.createElement("textarea");
    input.type = "text";
    input.name = "messagebox"
    input.rows = "5"
    input.cols = "30"


    var input_button = document.createElement("input");
    input_button.type = "submit";
    input_button.value = "Submit";

    f.appendChild(input)
    f.appendChild(input_button)


    myDiv.appendChild(f)

    myDiv.appendChild(document.createElement("br"))
    myDiv.appendChild(document.createElement("br"))

}


function startRecording() {
    console.log("recordButton clicked");
    var my_message = document.getElementById("mymessage")
    my_message.appendChild(document.createElement("br"))
    my_message.appendChild(document.createTextNode('Recoding...'))

    /*
        Simple constraints object, for more advanced audio features see
        https://addpipe.com/blog/audio-constraints-getusermedia/
    */

    var constraints = { audio: true, video:false }

    /*
        Disable the record button until we get a success or fail from getUserMedia() 
    */

    recordButton.disabled = true;
    stopButton.disabled = false;

    /*
        We're using the standard promise based getUserMedia() 
        https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia
    */

    navigator.mediaDevices.getUserMedia(constraints).then(function(stream) {
        console.log("getUserMedia() success, stream created, initializing Recorder.js ...");

        /*
            create an audio context after getUserMedia is called
            sampleRate might change after getUserMedia is called, like it does on macOS when recording through AirPods
            the sampleRate defaults to the one set in your OS for your playback device

        */
        audioContext = new AudioContext();

        //update the format 
        //document.getElementById("formats").innerHTML="Format: 1 channel pcm @ "+audioContext.sampleRate/1000+"kHz"
        sampleRate = audioContext.sampleRate

        /*  assign to gumStream for later use  */
        gumStream = stream;

        /* use the stream */
        input = audioContext.createMediaStreamSource(stream);

        /* 
            Create the Recorder object and configure to record mono sound (1 channel)
            Recording 2 channels  will double the file size
        */
        rec = new Recorder(input,{numChannels:1})

        //start the recording process
        rec.record()

        console.log("Recording started");

    }).catch(function(err) {
        //enable the record button if getUserMedia() fails
        recordButton.disabled = false;
        stopButton.disabled = true;
    });
}


function stopRecording() {
    console.log("stopButton clicked");
    var my_message = document.getElementById("mymessage")
    my_message.appendChild(document.createElement("br"))
    my_message.appendChild(document.createTextNode('Please wait for the Bank to respond....'))

    //disable the stop button, enable the record too allow for new recordings
    stopButton.disabled = true;
    recordButton.disabled = false;

    //tell the recorder to stop the recording
    rec.stop();

    //stop microphone access
    gumStream.getAudioTracks()[0].stop();

    //create the wav blob and pass it on to createDownloadLink
    rec.exportWAV(DownloadIt);
}


function DownloadIt(blob){
    var li = document.createElement('li');
    var filename = new Date().toISOString()
    var xhr=new XMLHttpRequest();

    var fd=new FormData();
    fd.append("audio_data",blob, filename);
    fd.append("sample_rate", String(sampleRate))
    var url = "/recording/" + name
    console.log(url)
    xhr.open("POST", url, true);

    xhr.send(fd);

    xhr.onload=function(e) {
        if(this.readyState === 4) {
            document.getElementById("demo").innerHTML = String(e.target.responseText);
            var convo =  e.target.responseText.split('<br>')
            li.appendChild(document.createTextNode( convo[0] ))
            li.appendChild(document.createElement("br"))
            li.appendChild(document.createTextNode( convo[1] ))
            li.appendChild(document.createElement("br"))
            recordingsList.appendChild(li);
            document.getElementById("mymessage").innerHTML = "";
        }
    };


    console.log('finished')
}

