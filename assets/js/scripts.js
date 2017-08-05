/*\
|*|
|*|  TODO:
|*|  - break functionality
|*|  - it will ALWAYS go to break after the session time runs out //
|*|    - should i add a new intDisplayTime amount which swaps between the two?
|*|    - it stores which time it is currently on
|*|
\*/

// grabbing document items
var displayTimeAmount, sessionTimeAmount, sessionSecondsAmount, breakTimeAmount, warningDiv;
displayTimeAmount = document.querySelector('.display-time-amount');
sessionTimeAmount = document.querySelector('.session-time-amount');
sessionSecondsAmount = document.querySelector('.session-seconds-amount');
breakTimeAmount = document.querySelector('.break-time-amount');
warningDiv = document.querySelector('.warning');

// for mathematical purposes, the text needs to be converted to ints
var intSessionTimeAmount, intSessionSecondsAmount, intBreakTimeAmount, intDisplayTimeAmount;
intSessionTimeAmount = parseInt(sessionTimeAmount.textContent);
intSessionSecondsAmount = parseInt(sessionSecondsAmount.textContent);
intBreakTimeAmount = parseInt(breakTimeAmount.textContent);

// grabbing the buttons
var buttons, startButton, pauseButton, substractSessionButton,
    substractBreakButton, addSessionButton, addBreakButton, resetButton;
buttons = document.querySelectorAll('button');
startButton = buttons[4];
pauseButton = buttons[5];
subtractSessionButton = buttons[0];
subtractBreakButton = buttons[2];
addSessionButton = buttons[1];
addBreakButton = buttons[3];
resetButton = buttons[6];

// variable to store the setTimer function
var countdown;





// event listeners
subtractSessionButton.addEventListener('click', lessSessionTime);
addSessionButton.addEventListener('click', moreSessionTime);
subtractBreakButton.addEventListener('click', lessBreakTime);
addBreakButton.addEventListener('click', moreBreakTime);
startButton.addEventListener('click', startTimer);
pauseButton.addEventListener('click', pauseTimer);
resetButton.addEventListener('click', reset);
sessionTimeAmount.addEventListener('input', sessionEditable);
breakTimeAmount.addEventListener('input', breakEditable);


function lessSessionTime() {
    // as long as the session time is above 1, keep subtracting
    if (intSessionTimeAmount > 1) {
        intSessionTimeAmount--;
    } else {
        intSessionTimeAmount = 1;
    }
    
    // update the display
    updateDisplay.session();
    updateDisplay.display();
}
function moreSessionTime() {
    // keep sessions between 0 minutes and 60 minutes
    if (intSessionTimeAmount > 0 && intSessionTimeAmount < 60) {
        intSessionTimeAmount++;
    } else if (intSessionTimeAmount === 60) {
        intSessionTimeAmount = 60;
    }
    
    // update the display
    updateDisplay.session();
    updateDisplay.display();
}
function sessionEditable() {
    // user input must be a number between 1 and 60
    if (isNaN(this.textContent)) {
        warningDiv.classList.remove('invisible');
    } else if (this.textContent < 1 || this.textContent > 60) {
        warningDiv.classList.remove('invisible');
    } else {
        // if it passes, remove the warning and make the display that number
        intSessionTimeAmount = parseInt(this.textContent);
        updateDisplay.display();
        if (!warningDiv.classList.contains('invisible')) {
            warningDiv.classList.add('invisible');
        }
    }
}



function lessBreakTime() {
    // as long as the break time is above 1 minute, keep subtracting
    if (intBreakTimeAmount > 1) {
        intBreakTimeAmount--;
    } else {
        intBreakTimeAmount = 1;
    }
    
    // update the display of the element
    updateDisplay.break();
};
function moreBreakTime() {
    // breaks are limited between 1 and 15 minutes
    if (intBreakTimeAmount > 0 && intBreakTimeAmount < 15) {
        intBreakTimeAmount++;
    } else {
        intBreakTimeAmount = 15;
    }
    
    // update the display of the element on each click
    updateDisplay.break();
}
function breakEditable() {
    // user input must be a digit between 1 and 60
    if (isNaN(this.textContent)) {
        warningDiv.classList.remove('invisible');
    } else if (this.textContent < 1 || this.textContent > 15) {
        warningDiv.classList.remove('invisible');
    } else {
        // if it passes, update the display and remove the warning
        intBreakTimeAmount = parseInt(this.textContent);
        updateDisplay.break();
        if (!warningDiv.classList.contains('invisible')) {
            warningDiv.classList.add('invisible');
        }
    }
}



// start button functionality
function startTimer() {
    // there must be a valid time in order for the timer to start
    if (warningDiv.classList.contains('invisible')) {
        // set countdown to setInterval function, running timer every 1 second
        countdown = setInterval(timer, 1000);
        disable();
        
        this.classList.add('hidden');
        pauseButton.classList.remove('hidden');
    }
};




// pause button functionality
 function pauseTimer() {
    // stops the countdown interval from running
    clearInterval(countdown);
    disable();
    
    // remove the pause button and replace it with the start button
    this.classList.add('hidden');
    startButton.classList.remove('hidden');
}




// reset button functionality
function reset() {
    // stops the countdown interval from running
    clearInterval(countdown);
    disable();
    
    // resets the default times
    intSessionTimeAmount = 25;
    intSessionSecondsAmount = 0;
    intBreakTimeAmount = 5;
    
    // if reset is pressed while start is hidden, show start and hide pause
    if (startButton.classList.contains('hidden')) {
        pauseButton.classList.add('hidden');
        startButton.classList.remove('hidden');
    }
    
    // if the warning is visible, remove it
    if (!warningDiv.classList.contains('invisible')) {
        warningDiv.classList.add('invisible');
    }
    
    // reset all displays to default times
    updateDisplay.singleSeconds();
    updateDisplay.display();
    updateDisplay.break();
    updateDisplay.session();
}



// function to run for each second
function timer() {
    
    // if double zeroes are hit, it's time to switch to a break session
    if (intSessionTimeAmount === 0 && intSessionSecondsAmount === 0) {
        pauseButton.classList.add('hidden');
        startButton.classList.remove('hidden');
        
        intSessionTimeAmount = intBreakTimeAmount;
        updateDisplay.display();
        
        clearInterval(countdown);
        return;
    } else if (intSessionSecondsAmount === 0) {
        // if seconds hits 0, it swaps to 59 while the minute goes down by one
        intSessionSecondsAmount = 59;
        intSessionTimeAmount--;
    } else {
        // or seconds continues to count down
        intSessionSecondsAmount--;
    }
    
    // updating the display
    if (intSessionSecondsAmount < 10 && intSessionSecondsAmount >= 0) {
        // for single digit seconds, there needs to be a '0' in front of it
        updateDisplay.singleSeconds();
    } else {
        // otherwise, display the string version of the int
        updateDisplay.largerSeconds();
        updateDisplay.display();
    }
    
}

// Disable the time adjusters while timer is running
// this is still not working properly
function disable() {
    if (!startButton.classList.contains('hidden')) {
        subtractBreakButton.disabled = true;
        subtractSessionButton.disabled = true;
        addBreakButton.disabled = true;
        addSessionButton.disabled = true;
    } else if (startButton.classList.contains('hidden')) {
        subtractBreakButton.disabled = false;
        subtractSessionButton.disabled = false;
        addBreakButton.disabled = false;
        addSessionButton.disabled = false;
    }
}



// object used to update various displays
var updateDisplay = new UpdateDisplay();

function UpdateDisplay() {
    this.singleSeconds = function() {
        sessionSecondsAmount.textContent = '0' + intSessionSecondsAmount;
    }
    this.largerSeconds = function() {
        sessionSecondsAmount.textContent = '' + intSessionSecondsAmount;
    }
    this.display = function() {
        displayTimeAmount.textContent = '' + intSessionTimeAmount;
    }
    this.session = function() {
        sessionTimeAmount.textContent = '' + intSessionTimeAmount;
    }
    this.break = function() {
        breakTimeAmount.textContent = '' + intBreakTimeAmount;
    }
}