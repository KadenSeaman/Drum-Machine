import { useEffect, useState } from 'react'
import './App.scss'

function App() {
  const [padIsOff, setPadIsOn] = useState(false);
  const [displayMessage, setDisplayMessage] = useState("");
  const [bank, setBank] = useState(0);
  const [clipVolume, setClipVolume] = useState(50);
  const [audioClips] = useState(
    [
      {
        "Q": "https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-1.mp3",
        "W": "https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-2.mp3",
        "E": "https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-3.mp3",
        "A": "https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-4_1.mp3",
        "S": "https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-6.mp3",
        "D": "https://cdn.freecodecamp.org/testable-projects-fcc/audio/Dsc_Oh.mp3",
        "Z": "https://cdn.freecodecamp.org/testable-projects-fcc/audio/Kick_n_Hat.mp3",
        "X": "https://cdn.freecodecamp.org/testable-projects-fcc/audio/RP4_KICK_1.mp3",
        "C": "https://cdn.freecodecamp.org/testable-projects-fcc/audio/Cev_H2.mp3",
      },
      {
        "Q": "https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3",
        "W": "https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3",
        "E": "https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3",
        "A": "https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3",
        "S": "https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3",
        "D": "https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3",
        "Z": "https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3",
        "X": "https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3",
        "C": "https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3",
      }
    ]
  )
  const [audioClipNames] = useState(
    [
      {
        "Q": "Heater 1",
        "W": "Heater 2",
        "E": "Heater 3",
        "A": "Heater 4",
        "S": "Clap",
        "D": "Open High Hat",
        "Z": "Kick n' Hat",
        "X": "Kick",
        "C": "Closed High Hat",
      },
      {
        "Q": "Chord 1",
        "W": "Chord 2",
        "E": "Chord 3",
        "A": "Shaker",
        "S": "Open High Hat",
        "D": "Closed High Hat",
        "Z": "Punchy Kick",
        "X": "Side Stick",
        "C": "Snare",
      }
    ]
  )

  useEffect(() => {
      document.addEventListener("keydown", function(event){
        const targetButton = document.getElementById(event.key.toUpperCase() + '-button');

        if(targetButton){
          targetButton.click();
          targetButton.classList.add('active');
        }
      })
      document.addEventListener("keyup", function(event){
        const targetButton = document.getElementById(event.key.toUpperCase() + '-button');

        if(targetButton){
          targetButton.classList.remove('active');
        }
      })
      document.getElementById("onOff").checked = true;
  },[])

  function switchOnOff(){
    setPadIsOn(!padIsOff);

    if(!padIsOff){
      document.getElementById("volume").disabled = true;
    }
    else{
      document.getElementById("volume").disabled = false;
    }
  }
  function switchBank(){
    if(bank === 0){
      setBank(1);
    }
    else if(bank === 1){
      setBank(0);
    }
  }

  function handlePadButtonClick(letter){
    if(padIsOff){
      return;
    }

    const matchingAudio = document.getElementById(letter);
    matchingAudio.volume = clipVolume/100;
    matchingAudio.src= audioClips[bank][letter];
    matchingAudio.play();

    setDisplayMessage(audioClipNames[bank][letter])
  }

  function updateVolume(){

    const sliderVolume = document.getElementById("volume").value

    setClipVolume(sliderVolume);
    setDisplayMessage("Volume: " + sliderVolume);
  }

  return (
    <div id='drum-machine'>
      <div id="display">
        <h1>{!padIsOff && displayMessage}</h1>

      </div>

      <div id="pad">
        <button onClick={() => handlePadButtonClick("Q")} id="Q-button" className='drum-pad'>Q <audio src="" className='clip' id="Q"></audio></button>
        <button onClick={() => handlePadButtonClick("W")} id="W-button" className='drum-pad'>W <audio src="" className='clip' id="W"></audio></button>
        <button onClick={() => handlePadButtonClick("E")} id="E-button" className='drum-pad'>E <audio src="" className='clip' id="E"></audio></button>
        <button onClick={() => handlePadButtonClick("A")} id="A-button" className='drum-pad'>A <audio src="" className='clip' id="A"></audio></button>
        <button onClick={() => handlePadButtonClick("S")} id="S-button" className='drum-pad'>S <audio src="" className='clip' id="S"></audio></button>
        <button onClick={() => handlePadButtonClick("D")} id="D-button" className='drum-pad'>D <audio src="" className='clip' id="D"></audio></button>
        <button onClick={() => handlePadButtonClick("Z")} id="Z-button" className='drum-pad'>Z <audio src="" className='clip' id="Z"></audio></button>
        <button onClick={() => handlePadButtonClick("X")} id="X-button" className='drum-pad'>X <audio src="" className='clip' id="X"></audio></button>
        <button onClick={() => handlePadButtonClick("C")} id="C-button" className='drum-pad'>C <audio src="" className='clip' id="C"></audio></button>
      </div>

      <div id="settings">
        <div id="toggles">
          <label htmlFor="onOff">Power <input onClick={switchOnOff} type="checkbox" name="onOff" id="onOff"/></label>
          <label htmlFor="bank">Bank <input onClick={switchBank} type="checkbox" name="bank" id="bank" /></label>
        </div>
        <label id='volume-label' htmlFor='volume'>Volume: </label>
        <input onChange={updateVolume} name='volume' id='volume' type="range" min='0' max='100'/>
      </div>
    </div>
  )
}

export default App
