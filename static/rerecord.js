function begin( dosomething ){
    console.log('And it begins')
    console.log(dosomething)
    document.getElementById("indexing").innerHTML = "";
    document.getElementById("rerecord").innerHTML = "";

    if (dosomething == 1) {
        index = index + 1
        audio_number = index + 1
        console.log('GOT IN HERE')
    }

    if (length > 0 && index < length){
        var indexing = document.getElementById("indexing");

        var header = document.createElement('h3');
        var text = document.createTextNode('Recording : ' + audio_number + ' of ' + length)
        header.appendChild(text)
        indexing.appendChild(header)

        //indexing.appendChild(document.createTextNode('Recording : ' + audio_number + ' of ' + length))
        //indexing.appendChild(document.createElement("br"))
        indexing.appendChild(document.createTextNode('Press play to hear what you recorded. Then press record to record again. '))
        indexing.appendChild(document.createElement("br"))
        indexing.appendChild(document.createElement("br"))
        indexing.appendChild(document.createElement("br"))
        indexing.appendChild(document.createTextNode('Bank : ' + context[index]))
        //indexing.appendChild(document.createElement("br"))
        indexing.appendChild(document.createElement("br"))
        indexing.appendChild(document.createTextNode('Your response:'))
    }

    
    if (index < length){
        console.log(index, length)
        console.log(filenames[0], filenames[1])
        var filename = filenames[index]

        var rerecord = document.getElementById("rerecord");

        rerecord.innerHTML = '<audio id="audio-player" controls="controls" src="/play_audio/' + filename + '" type="audio/wav">';
        rerecord.appendChild(document.createElement("br"))
        rerecord.appendChild(document.createElement("br"))


        //Defining stuff
        //ADDING AUDIO CONTEXT
        //webkitURL is deprecated but nevertheless
        URL = window.URL || window.webkitURL;

        // shim for AudioContext when it's not avb. 
        window.myAudioContext = window.AudioContext || window.webkitAudioContext;

        //Adding record and stop buttons
        button = document.createElement("button")
        button.id = "recordButton"
        button.innerHTML = "Re-Record";
        rerecord.appendChild(button)

        button = document.createElement("button")
        button.id = "stopButton"
        button.disabled = true
        button.innerHTML = "Stop";
        rerecord.appendChild(button)

        rerecord.appendChild(document.createElement("br"))
        rerecord.appendChild(document.createElement("br"))

        window.recordButton = document.getElementById("recordButton");
        window.stopButton = document.getElementById("stopButton");

        //add events to those 2 buttons
        window.recordButton.addEventListener("click", startRecording);
        window.stopButton.addEventListener("click", stopRecording);
    }
    else {
        var rerecord = document.getElementById("rerecord");
        rerecord.appendChild(document.createTextNode("-----FINISHED -----"))
        rerecord.appendChild(document.createElement("br"))
        /*rerecord.appendChild(document.createTextNode("Want to try again? "))

        //creating form
        var f = document.createElement("form");
        f.method = "POST"
        f.action = "/repeat"

        var option = document.createElement("submit");
        option.value = "Click Here"
        f.appendChild(option)

        rerecord.appendChild(f)*/

    }

}


function startRecording() {
    console.log("recordButton clicked");

    /*
        Simple constraints object, for more advanced audio features see
        https://addpipe.com/blog/audio-constraints-getusermedia/
    */

    var constraints = { audio: true, video:false }

    /*
        Disable the record button until we get a success or fail from getUserMedia() 
    */

    window.recordButton.disabled = true;
    window.stopButton.disabled = false;

    /*
        We're using the standard promise based getUserMedia() 
        https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia
    */
    console.log('-------Reached here-----')
    navigator.mediaDevices.getUserMedia(constraints).then(function(stream) {
        console.log("getUserMedia() success, stream created, initializing Recorder.js ...");

        /*
            create an audio context after getUserMedia is called
            sampleRate might change after getUserMedia is called, like it does on macOS when recording through AirPods
            the sampleRate defaults to the one set in your OS for your playback device

        */
        audioContext = new window.myAudioContext();

        //update the format 
        //document.getElementById("formats").innerHTML="Format: 1 channel pcm @ "+audioContext.sampleRate/1000+"kHz"
        //window.sampleRate = audioContext.sampleRate

        /*  assign to gumStream for later use  */
        window.gumStream = stream;
        /* use the stream */
        input = audioContext.createMediaStreamSource(stream);
        /* 
            Create the Recorder object and configure to record mono sound (1 channel)
            Recording 2 channels  will double the file size
        */
        window.rec = new Recorder(input,{numChannels:1})
        //start the recording process
        window.rec.record()

        console.log("--------END OF RECORD FUNCTION--------");

    }).catch(function(err) {
        //enable the record button if getUserMedia() fails
        window.recordButton.disabled = false;
        window.stopButton.disabled = true;
    });
}


function stopRecording() {
    console.log("stopButton clicked");

    //disable the stop button, enable the record too allow for new recordings
    window.stopButton.disabled = true;
    window.recordButton.disabled = false;

    //tell the recorder to stop the recording
    window.rec.stop();

    //stop microphone access
    window.gumStream.getAudioTracks()[0].stop();

    //create the wav blob and pass it on to createDownloadLink
    window.rec.exportWAV(DownloadIt);
}


function DownloadIt(blob){
	var url = URL.createObjectURL(blob);
	var au = document.createElement('audio');

    //add controls to the <audio> element
	au.controls = true;
	au.src = url;
    
    //adding the audio element to the conversation box
    var checkrecording = document.getElementById("checkrecording")
    checkrecording.appendChild(document.createElement("br"))
    checkrecording.appendChild(document.createTextNode('Please check what you recorded by pressing play.'))
    checkrecording.appendChild(document.createElement("br"))
    checkrecording.appendChild(au)
    checkrecording.appendChild(document.createElement("br"))

    //adding buttons
    var button = document.createElement("button")
    button.id = "recordagain"
    button.innerHTML = "Record Again"
    checkrecording.appendChild(button)

    var button = document.createElement("button")
    button.id = "next"
    button.innerHTML = "Next"
    checkrecording.appendChild(button)

    checkrecording.appendChild(document.createElement("br"))
    checkrecording.appendChild(document.createElement("br"))
    checkrecording.appendChild(document.createElement("br"))

    //calling functions
    recordAgainButton = document.getElementById("recordagain")
    goToNext = document.getElementById("next")

    recordAgainButton.addEventListener("click", recordAgain)
    goToNext.addEventListener("click", function(){nextRecording(blob)})

}


function recordAgain (){
    console.log('Recording Again')

    //pausing for affect
    var delayInMilliseconds = 2000;

    var my_message = document.getElementById("checkrecording")
    my_message.appendChild(document.createTextNode('Recording again...'))

    // add a timer
    setTimeout(function() {
        document.getElementById("indexing").innerHTML = "";
        document.getElementById("rerecord").innerHTML = "";
        document.getElementById("checkrecording").innerHTML = "";
        begin(0)
    }, delayInMilliseconds);
}


function nextRecording (blob){
    console.log('Going to next recording')

    var filename = new Date().toISOString()
    var xhr=new XMLHttpRequest();

    var fd=new FormData();
    fd.append("audio_data",blob, filename);
    var url = "/repeat"
    console.log(url)
    xhr.open("POST", url, true);

    xhr.send(fd);

    xhr.onload=function(e) {
        if(this.readyState === 4) {
            console.log('OOlala')
        }
    };


    console.log('finished')
    //pausing for affect
    var delayInMilliseconds = 2000;

    var my_message = document.getElementById("checkrecording")
    my_message.appendChild(document.createTextNode('Loading next recording...'))

    // add a timer
    setTimeout(function() {
        document.getElementById("indexing").innerHTML = "";
        document.getElementById("rerecord").innerHTML = "";
        document.getElementById("checkrecording").innerHTML = "";
        begin(1)
    }, delayInMilliseconds);

}