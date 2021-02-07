import './App.css';
import React, { useState, useEffect } from 'react'
import { Song, Track, Instrument } from 'reactronica';


function App() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [notes, setNotes] = useState(null);
  return (
    <div className="App">
      <Content setNotes={setNotes} notes={notes} />
    </div>
  );
}

function Content(props) {
  const { setNotes, notes } = props
  return (
    <div className="content">
      <Navbar />
      <Piano setNotes={setNotes} notes={notes} />
      <Player/>
    </div>
  )
}
function Navbar(props) {
  return (
    <div className="Navbar">
      <div className="Navbarhaut">
        <a>Accueil</a>
        <a>Mes sons</a>
        <a>Bibilotheque</a>
      </div>
    </div>
  )
}

function Profile(params) {
  return (
    <div className="Profile">
      <div> pic</div>
      <div>
        <p>Pseudo</p>
        <p>E-mail</p>
        <p></p>
      </div>
    </div>
  )
}
function Piano(props) {
  const { setNotes, notes } = props
  const [index, setIndex] = useState(6)

  var C = 'C' + index
  var C2 = 'C#' + index
  var D = 'D' + index
  var D2 = 'D#' + index
  var E = 'E' + index
  var F = 'F' + index
  var F2 = 'F#' + index
  var G = 'G' + index
  var G2 = 'G#' + index
  var A = 'A' + index
  var A2 = 'A#' + index
  var B = 'B' + index
  var anotes = [C, C2, D, D2, E, F, F2, G, G2, A, A2, B];



  return (
    <div className='piano'>
      <div className='cadre'>
        <div className="pann">
          <div className="panndroit">
            <div className="monitor"><p>{index}</p></div>
            <div className='octbut'>
              <button onClick={()=>{setIndex(index+1)}}>+</button>
              <button onClick={()=>{setIndex(index-1)}}>-</button>
            </div>
            <div><button id="record">record</button>
            <button id="stop">stop record</button></div>
          </div>
          <div className="pads">
            <li className='pad a' ></li>
            <li className='pad b' ></li>
            <li className='pad a' ></li>
            <li className='pad b' ></li>
            <li className='pad a' id="pad5"></li>
            <li className='pad b' id="pad6"></li>
          </div>
        </div>
        <div className="bot">
          <div class="slidecontainer">
            <input type="range" min="1" max="100" value="50" class="slider" id="myRange" />
          </div>
          <ul className='touches'>
            <li className="blanc a" id="pad1" onMouseDown={() => setNotes([{ name: anotes[0] }])}
              onMouseUp={() => setNotes(null)}></li>
            <li className="noir"  id="pad2" onMouseDown={() => setNotes([{ name: anotes[1] }])}
              onMouseUp={() => setNotes(null)}></li>
            <li className="blanc b" id="pad3" onMouseDown={() => setNotes([{ name: anotes[2] }])}
              onMouseUp={() => setNotes(null)}></li>
            <li className="noir" id="pad4" onMouseDown={() => setNotes([{ name: anotes[3] }])}
              onMouseUp={() => setNotes(null)}></li>
            <li className="blanc c" onMouseDown={() => setNotes([{ name: anotes[4] }])}
              onMouseUp={() => setNotes(null)}></li>
            <li className="blanc d" onMouseDown={() => setNotes([{ name: anotes[5] }])}
              onMouseUp={() => setNotes(null)}></li>
            <li className="noir" onMouseDown={() => setNotes([{ name: anotes[6] }])}
              onMouseUp={() => setNotes(null)}></li>
            <li className="blanc e" onMouseDown={() => setNotes([{ name: anotes[7] }])}
              onMouseUp={() => setNotes(null)}></li>
            <li className="noir" onMouseDown={() => setNotes([{ name: anotes[8] }])}
              onMouseUp={() => setNotes(null)}></li>
            <li className="blanc f" onMouseDown={() => setNotes([{ name: anotes[9] }])}
              onMouseUp={() => setNotes(null)}></li>
            <li className="noir" onMouseDown={() => setNotes([{ name: anotes[10] }])}
              onMouseUp={() => setNotes(null)}></li>
            <li className="blanc g" onMouseDown={() => setNotes([{ name: anotes[11] }])}
              onMouseUp={() => setNotes(null)}></li>
          </ul>
        </div>

      </div>
      <Song>
        <Track>
          <Instrument
            type="polySynth"
            notes={notes}
            onLoad={() => {
              // Runs when samples are loaded
            }}
          />
        </Track>
      </Song>
    </div>
  )

}

function Player(props){
  return(
    <div>
          <span id="tracks-title">
        My Tracks
    </span>
    <div id="tracks">

    </div>
    <template id="track-template">
        <div class="track">
        <span class="track-name">
        </span>
        <span class="track-toggle">
            <i class="material-icons md-24">play_arrow</i>
            <audio src="" ></audio>
        </span>
        <span class="tack-download">
            <a href="" download><button>Download</button></a>
        </span>
        <span class="track-record">
            <i class="material-icons md-24">fiber_manual_record</i>
        </span>
    </div>
    </template>
    <audio id="feedback"></audio>
    </div>
  )
}

function MySounds(props) {
  const { sound } = props
  return (
    <div>
      {sound.map(el => <div></div>)}
    </div>
  )
}


export default App;
