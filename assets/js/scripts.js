// user will NOT be able to edit time while paused
// time can only be edited on default or reset

// TODO: comment code
// TODO: test
// TODO: feedback


// html element
var displayTime, displaySession, displayBreak, warningDiv;
displayTime = document.querySelector('.display-time-amount');
displaySession = document.querySelector('.session-time-amount');
displayBreak = document.querySelector('.break-time-amount');
warningDiv = document.querySelector('.warning');





// ints
var timeLeft, sessionTimeAmount, breakTimeAmount;
timeLeft = document.querySelector('.display-time-amount').textContent;
sessionTimeAmount = parseInt(document.querySelector('.session-time-amount').textContent);
breakTimeAmount = parseInt(document.querySelector('.break-time-amount').textContent);





// buttons
var buttons, startButton, pauseButton, resetButton, substractSessionButton, subtractBreakButton, addSessionButton, addBreakButton;
buttons = document.querySelectorAll('button');
startButton = buttons[4];
pauseButton = buttons[5];
resetButton = buttons[6];
subtractSessionButton = buttons[0];
subtractBreakButton = buttons[2];
addSessionButton = buttons[1];
addBreakButton = buttons[3];





// support
var timerFlag, pauseFlag, sessionFlag, countdown, pauseTime, seconds, tempMin, tempSec, alarmSound;
timerIsOn = false; // false means off, true means on
isPaused = false; // false means off, true means on
sessionFlag = 0; // 0 means session, 1 means break
seconds = 0;
tempMin = 0;
tempSec = 0;
alarmSound = document.getElementById('audio');




// event listeners
startButton.addEventListener('click', startTimer);
resetButton.addEventListener('click', reset);
pauseButton.addEventListener('click', pause);
subtractSessionButton.addEventListener('click', lessSessionTime);
subtractBreakButton.addEventListener('click', lessBreakTime);
addSessionButton.addEventListener('click', moreSessionTime);
addBreakButton.addEventListener('click', moreBreakTime);
displaySession.addEventListener('input', sessionEditable);
displayBreak.addEventListener('input', breakEditable);





// event listener functions
function startTimer() {
    startButton.classList.add('hidden');
    pauseButton.classList.remove('hidden');
    timerIsOn = true;
    disable();
    
    if (isPaused) {
        isPaused = false;
        timer(tempMin, tempSec);
    } else if (sessionFlag === 0) {
        seconds = 0;
        timer(sessionTimeAmount, seconds);
    } else {
        seconds = 0;
        timer(breakTimeAmount, seconds);
    }
}


function reset() {
    timerIsOn = false;
    isPaused = false;
    sessionFlag = 0;
    tempMin = 0;
    tempSec = 0;
    seconds = 0;
    
    if (startButton.classList.contains('hidden')){
        startButton.classList.remove('hidden');
        pauseButton.classList.add('hidden');
    }
    
    sessionTimeAmount = 25;
    breakTimeAmount = 5;
    
    disable();
    clearInterval(countdown);
    updateDisplay();
}


function lessSessionTime() {
    if (sessionTimeAmount > 5) {
        sessionTimeAmount--;
    } else {
        sessionTimeAmount = 5;
    }
    
    updateDisplay();
}


function moreSessionTime() {
    if (sessionTimeAmount < 90) {
        sessionTimeAmount++;
    } else {
        sessionTimeAmount = 90;
    }
    
    updateDisplay();
}


function sessionEditable() {
    if (isNaN(this.textContent)) {
        warningDiv.classList.remove('invisible');
    } else if (this.textContent < 5 || this.textContent > 90) {
        warningDiv.classList.remove('invisible');
    } else {
        sessionTimeAmount = parseInt(this.textContent);
        updateDisplay();
        if (!warningDiv.classList.contains('invisible')) {
            warningDiv.classList.add('invisible');
        }
    }
}


function lessBreakTime() {
    if (breakTimeAmount > 2) {
        breakTimeAmount--;
    } else {
        breakTimeAmount = 2;
    }
    
    updateDisplay();
}


function moreBreakTime() {
    if (breakTimeAmount < 30) {
        breakTimeAmount++;
    } else {
        breakTimeAmount = 30;
    }
    
    updateDisplay();
}


function breakEditable() {
    if (isNaN(this.textContent)) {
        warningDiv.classList.remove('invisible');
    } else if (this.textContent < 2 || this.textContent > 30) {
        warningDiv.classList.remove('invisible');
    } else {
        breakTimeAmount = parseInt(this.textContent);
        updateDisplay();
        if (!warningDiv.classList.contains('invisible')) {
            warningDiv.classList.add('invisible');
        }
    }
}


function pause() {
    pauseButton.classList.add('hidden');
    startButton.classList.remove('hidden');
    
    isPaused = true;
    
    clearInterval(countdown);
}





// supporting functions
function timer(minutes, seconds) {
    countdown = setInterval(function() {
        
        if (minutes === 0 && seconds === 0) {
            alarmSound.play();
            timerIsOn = false;
            
            if (sessionFlag === 0) {
                timeLeft = breakTimeAmount + ':' + '00';
                sessionFlag += 1;
            } else {
                timeLeft = sessionTimeAmount + ':' + '00';
                sessionFlag -= 1;
            }
            
            pauseButton.classList.add('hidden');
            startButton.classList.remove('hidden');
            
            clearInterval(countdown);
            
        } else if (seconds === 0) {
            seconds = 59;
            minutes--;
            timeLeft = minutes + ':' + seconds;
        } else if (seconds <= 10) {
            seconds--;
            timeLeft = minutes + ':0' + seconds;
        } else {
            seconds--;
            timeLeft = minutes + ':' + seconds;
        }
        
        displayTime.textContent = timeLeft;
        tempMin = minutes;
        tempSec = seconds;
        
    }, 1000);
};


function updateDisplay() {
    displaySession.textContent = '' + sessionTimeAmount;
    displayBreak.textContent = '' + breakTimeAmount;
    displayTime.textContent = sessionTimeAmount + ':00';
}


function disable() {
    if (timerIsOn) {
        subtractBreakButton.disabled = true;
        subtractSessionButton.disabled = true;
        addBreakButton.disabled = true;
        addSessionButton.disabled = true;
        displayBreak.contentEditable = false;
        displaySession.contentEditable = false;
    } else if (!timerIsOn) {
        subtractBreakButton.disabled = false;
        subtractSessionButton.disabled = false;
        addBreakButton.disabled = false;
        addSessionButton.disabled = false;
        displayBreak.contentEditable = true;
        displaySession.contentEditable = true;
    }
}