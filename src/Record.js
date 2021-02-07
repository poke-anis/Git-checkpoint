var pad1 = document.getElementById('pad1');
var pad2 = document.getElementById('pad2');
var pad3 = document.getElementById('pad3');
var pad4 = document.getElementById('pad4');

var trackContainer = document.getElementById('tracks');
var trackTemplate = document.getElementById('track-template');
var track = [];
var recordButton = document.getElementById('record');
var stopButton = document.getElementById('stop');
var audioContext = new AudioContext();
var audioContextStreamDest = audioContext.createMediaStreamDestination();
var pad1Stream = pad1.mozCaptureStream();
var pad2Stream = pad2.mozCaptureStream();
var pad3Stream = pad3.mozCaptureStream();
var pad4Stream = pad4.mozCaptureStream();
var pad1Source = audioContext.createMediaStreamSource(pad1Stream);
var pad2Source = audioContext.createMediaStreamSource(pad2Stream);
var pad3Source = audioContext.createMediaStreamSource(pad3Stream);
var pad4Source = audioContext.createMediaStreamSource(pad4Stream);


    var Recorder = new MediaRecorder(audioContextStreamDest.stream);
    Recorder.ondataavailable = function(chunk) {
    track.push(chunk.data);
}
Recorder.onstop = function() {
    var trackBlob = new Blob(track, {
        'type': 'audio/ogg; codecs=opus'
    });
    var trackURL = URL.createObjectURL(trackBlob);
    addTrack(trackURL);
    track = [];
}

pad1Source.connect(audioContextStreamDest);
pad1Source.connect(audioContext.destination);
pad2Source.connect(audioContextStreamDest);
pad2Source.connect(audioContext.destination);
pad3Source.connect(audioContextStreamDest);
pad3Source.connect(audioContext.destination);
pad4Source.connect(audioContextStreamDest);
pad4Source.connect(audioContext.destination);



function record() {
    Recorder.start();
    recordButton.children[0].classList.add('recording');
    recordButton.removeEventListener('click', record);
    stopButton.addEventListener('click', stop);
}

function stop() {
    Recorder.stop();
    recordButton.children[0].classList.remove('recording')
    recordButton.addEventListener('click', record);
    stopButton.removeEventListener('click', stop);
}

recordButton.addEventListener('click', record);


function addTrack(blobURL) {
    var name = trackTemplate.content.children[0].children[0];
    var audio = trackTemplate.content.children[0].children[1].querySelector('audio');
    var dl = trackTemplate.content.children[0].children[2].querySelector('a');
    name.textContent = 'Track' + trackContainer.childElementCount;
    audio.src = blobURL;
    dl.href = blobURL;
    trackContainer.appendChild(trackTemplate.content.cloneNode(true));
    trackContainer.children[trackContainer.childElementCount - 1].children[1].addEventListener('click', playTrack);
}
function playTrack(event) {
    var audio = this.querySelector('audio');
    var icon = this.querySelector('i');
    if (audio.paused) {
        audio.play();
        icon.innerHTML = 'stop';
    } else {
        audio.pause();
        icon.innerHTML = 'play_arrow';
    }
    audio.onended = function() {
        icon.innerHTML = 'play_arrow';
    }
    audio.currentTime = 0;
}