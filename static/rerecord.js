function begin(){
    console.log('And it begins')
    index = index + 1
    audio_number = index + 1

    if (length > 0){
        var indexing = document.getElementById("indexing");
        indexing.appendChild(document.createTextNode('Recording: ' + audio_number + ' of ' + length))
        indexing.appendChild(document.createElement("br"))
        indexing.appendChild(document.createElement("br"))
    }

    
    if (index < length){
        console.log(typeof filenames, typeof index, typeof length)
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
        button.innerHTML = "Record";
        rerecord.appendChild(button)

        button = document.createElement("button")
        button.id = "stopButton"
        button.disabled = true
        button.innerHTML = "Stop";
        rerecord.appendChild(button)

        window.recordButton = document.getElementById("recordButton");
        window.stopButton = document.getElementById("stopButton");

        //add events to those 2 buttons
        window.recordButton.addEventListener("click", startRecording);
        window.stopButton.addEventListener("click", stopRecording);
    }
    else {
        var rerecord = document.getElementById("rerecord");
        rerecord.appendChild(document.createTextNode("-----FINISHED -----"))
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
    document.getElementById("rerecord").innerHTML = "";
    begin()
}


