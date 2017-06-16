
// BPM Input



function BeatsPerMinute(bpm) {
  this.bpm = bpm;

  this.increase = function() {
    this.bpm++;
  }

  this.decrease = function() {
    this.bpm--;
  }
  

}

const beatsPerMinute = new BeatsPerMinute(60);

console.log(beatsPerMinute);

function logValue(e) {
  console.log(e.target.value);
}

function decreaseBpm() {
  bpmInput.value--;
  renderBpm(bpmInput.value);
  console.log(bpmInput.value);
}

function increaseBpm() {
  bpmInput.value++;  
  renderBpm(bpmInput.value);
  console.log(bpmInput.value);
}

function renderBpm(bpm) {
  bpmReading.innerText = bpm;
}





const bpmToMilliseconds = {
   '60' : 4000,
   '62' : 3871,
   '64' : 3750,
   '66' : 3636,
   '68' : 3529,
   '70' : 3429,
   '72' : 3333,
   '74' : 3243,
   '76' : 3158,
   '78' : 3077,
   '80' : 3000,
   '82' : 2927,
   '84' : 2857,
   '86' : 2791,
   '88' : 2727,
   '90' : 2667,
   '92' : 2609,
   '94' : 2553,
   '96' : 2500,
   '98' : 2449,
  '100' : 2400,
  '102' : 2353,
  '104' : 2308,
  '106' : 2264,
  '108' : 2222,
  '110' : 2182,
  '112' : 2143,
  '114' : 2105,
  '116' : 2069,
  '118' : 2034,
  '120' : 2000,
  '122' : 1967,
  '124' : 1935,
  '126' : 1905,
  '128' : 1875,
  '130' : 1846,
  '132' : 1818,
  '134' : 1791,
  '136' : 1765,
  '138' : 1739,
  '140' : 1714
}

function matchBpmToMilliseconds(data) {
  return bpmToMilliseconds[data];
}




///// Metronome




// Responsible for handling the audio track
function MetronomeAudio(beat) {
  this.beat = beat;
  this.milliseconds;
  this.audioId;

  this.play = function(data) {
    this.audioId = setInterval(function() {
      beat.play()
      console.log(data);
    }, this[data]());
  }

  this.pause = function() {
    clearInterval(this.audioId);
  }

  this.setMilliseconds = function(ms) {
    this.milliseconds = Math.round(ms);
    return this;
  }

  this.wholeNote = function() {
    return this.milliseconds;
  }

  this.halfNote = function() {
    return Math.round(this.milliseconds / 4);
  }

  this.quarterNote = function() {
    return Math.round(this.milliseconds / 4);
  }

  this.eighthNote = function() {
    return Math.round(this.milliseconds / 8);
  }

  this.sixteenthNote = function() {
    return Math.round(this.milliseconds / 16);
  }

  this.thirtySecondNote = function() {
    return Math.round(this.milliseconds / 32);
  }

}


// Responsible for the visual metronome on the page
function MetronomeVisual(el) {
  this.ticker = el;
  this.milliseconds;

  this.play = function(data) {
    // milliseconds needs to be doubled
    if (data === 'thirtySecondNote') {
      this.ticker.style.animation = 'rotateByBPM ' + (this.sixteenthNote() * 2) + 'ms linear 0s infinite normal none running';     
      return; 
    }
    this.ticker.style.animation = 'rotateByBPM ' + (this[data]() * 2) + 'ms linear 0s infinite normal none running';
  }

  this.pause = function() {
    this.ticker.style.animation = 'none';
  }

  this.setMilliseconds = function(ms) {
    this.milliseconds = Math.round(ms);
    return this;
  }

  this.wholeNote = function() {
    return this.milliseconds;
  }

  this.halfNote = function() {
    return Math.round(this.milliseconds / 4);
  }

  this.quarterNote = function() {
    return Math.round(this.milliseconds / 4);
  }

  this.eighthNote = function() {
    return Math.round(this.milliseconds / 8);
  }

  this.sixteenthNote = function() {
    return Math.round(this.milliseconds / 16);
  }

  this.thirtySecondNote = function() {
    return Math.round(this.milliseconds / 32);
  }
}


// Responsible for handling the plays and pauses of all Metronome instances
function MetronomeHandler(audioInstance, visualInstance) {
  this.audioInstance = audioInstance;
  this.visualInstance = visualInstance;
  // Default value is halfNote
  this.measurement = 'halfNote';

  this.play = function() {
    this.audioInstance.play(this.measurement);
    this.visualInstance.play(this.measurement);
  }

  this.pause = function() {
    this.audioInstance.pause();
    this.visualInstance.pause();
  }

  this.setMeasurement = function(data) {
    this.measurement = data + 'Note';
    console.log(this.measurement);
  }
}


// Instantiations
const metronomeBeat = new Audio('./assets/metronomeBeat.wav');
const pauseBtn = document.querySelector('#pause-metronome');
const playBtn = document.querySelector('#play-metronome');

// milliseconds needs to be the value of the ranged input

const bpmInput = document.querySelector('#bpm-input');
const bpmReading = document.querySelector('#bpm-reading');
const notes = document.querySelector('#notes');

notes.addEventListener('click', function(e) {
  if (e.target && e.target.nodeName === 'INPUT') {
    metronomeHandler.setMeasurement(e.target.value);
    console.log(metronomeHandler);
  }
});

renderBpm(bpmInput.value);


// var bpm = matchBpmToMilliseconds(bpmInput);

const metronomeAudio = new MetronomeAudio(metronomeBeat);
const metronomeVisual = new MetronomeVisual(document.querySelector('#ticker'));
// set to the default value
metronomeAudio.setMilliseconds(matchBpmToMilliseconds(bpmInput.value));
metronomeVisual.setMilliseconds(matchBpmToMilliseconds(bpmInput.value));

const metronomeHandler = new MetronomeHandler(metronomeAudio, metronomeVisual);

console.log(metronomeAudio);

console.log(metronomeVisual);


bpmInput.addEventListener('change', updateBPM);



function updateBPM(e) {
  let bpmToMs = matchBpmToMilliseconds(e.target.value);
  metronomeAudio.setMilliseconds(bpmToMs);
  metronomeVisual.setMilliseconds(bpmToMs);
  console.log(metronomeAudio);
  console.log(metronomeVisual);
  renderBpm(e.target.value);
  metronomeHandler.pause();
  playBtn.disabled = false;
  // metronomeHandler.play();
}


// Button Functionality
pauseBtn.addEventListener('click', function() {
  metronomeHandler.pause();
  playBtn.disabled = false;
});

playBtn.addEventListener('click', function() {
  console.log(metronomeAudio);
  metronomeHandler.play();
  this.disabled = true;
});

