// grabbing document items
// might need to change - displayTimeAmount and sessionTimeAmount
// displayTimeAmount will be adjusted for session / break amount
var sessionTimeAmount = document.querySelectorAll('.session-time-amount');
var sessionSecondsAmount = document.querySelector('.session-seconds-amount');
var breakTimeAmount = document.querySelector('.break-time-amount');

// for mathematical purposes, the text needs to be converted to ints
var intSessionTimeAmount = parseInt(sessionTimeAmount[0].textContent);
var intSessionSecondsAmount = parseInt(sessionSecondsAmount.textContent);
var intBreakTimeAmount = parseInt(breakTimeAmount.textContent);

// grabbing the buttons
var buttons = document.querySelectorAll('button');
var startButton = buttons[4];
var pauseButton = buttons[5];
var lessSessionTime = buttons[0];
var lessBreakTime = buttons[2];
var moreSessionTime = buttons[1];
var moreBreakTime = buttons[3];
var resetButton = buttons[6];

// variable to store the setTimer function
var countdown;





// session time funcs
lessSessionTime.addEventListener('click', function(ev) {
    // as long as the session time is above 1, keep subtracting
    if (intSessionTimeAmount > 1) {
        intSessionTimeAmount--;
    } else {
        intSessionTimeAmount = 1;
    }
    
    // update the display
    sessionTimeAmount.forEach(function(sessionTime) {
        sessionTime.textContent = '' + intSessionTimeAmount;
    });
});
moreSessionTime.addEventListener('click', function() {
    // keep sessions between 0 minutes and 60 minutes
    if (intSessionTimeAmount > 0 && intSessionTimeAmount < 60) {
        intSessionTimeAmount++;
    } else if (intSessionTimeAmount === 60) {
        intSessionTimeAmount = 60;
    }
    
    // update the display
    sessionTimeAmount.forEach(function(sessionTime) {
        sessionTime.textContent = '' + intSessionTimeAmount;
    });
});

// break time funcs
lessBreakTime.addEventListener('click', function() {
    // as long as the break time is above 1 minute, keep subtracting
    if (intBreakTimeAmount > 1) {
        intBreakTimeAmount--;
    } else {
        intBreakTimeAmount = 1;
    }
    
    // update the display of the element
    breakTimeAmount.textContent = '' + intBreakTimeAmount;
});
moreBreakTime.addEventListener('click', function() {
    // breaks are limited between 1 and 15 minutes
    if (intBreakTimeAmount > 0 && intBreakTimeAmount < 15) {
        intBreakTimeAmount++;
    } else {
        intBreakTimeAmount = 15;
    }
    
    // update the display of the element on each click
    breakTimeAmount.textContent = '' + intBreakTimeAmount;
});


// start button functionality
startButton.addEventListener('click', function() {
    // set countdown to setInterval function, running timer every 1 second
    countdown = setInterval(timer, 1000);
    
    // remove the start button and replace it with the pause button
    this.classList.add('hidden');
    pauseButton.classList.remove('hidden');
});
// pause button functionality
pauseButton.addEventListener('click', function() {
    // stops the countdown interval from running
    clearInterval(countdown);
    
    // remove the pause button and replace it with the start button
    this.classList.add('hidden');
    startButton.classList.remove('hidden');
});
// reset button functionality
resetButton.addEventListener('click', function(ev) {
    // stops the countdown interval from running
    clearInterval(countdown);
    
    // resets the default times
    intSessionTimeAmount = 25;
    intSessionSecondsAmount = 0;
    intBreakTimeAmount = 5;
    
    // if reset is pressed while start is hidden, show start and hide pause
    if (startButton.classList.contains('hidden')) {
        pauseButton.classList.add('hidden');
        startButton.classList.remove('hidden');
    }
    
    // reset all displays to default times
    sessionSecondsAmount.textContent = '0' + intSessionSecondsAmount;
    sessionTimeAmount.forEach(function(sessionTime) {
        sessionTime.textContent = '' + intSessionTimeAmount;
    });
    breakTimeAmount.textContent = '' + intBreakTimeAmount;
});


// function to run for each second
function timer() {
    
    // if double zeroes are hit, it's time to switch to a break session
    if (intSessionTimeAmount === 0 && intSessionSecondsAmount === 0) {
        pauseButton.classList.add('hidden');
        startButton.classList.remove('hidden');
        
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
        sessionSecondsAmount.textContent = '0' + intSessionSecondsAmount;
    } else {
        // otherwise, display the string version of the int
        sessionSecondsAmount.textContent = '' + intSessionSecondsAmount;
        sessionTimeAmount[0].textContent = '' + intSessionTimeAmount;
    }
    
}