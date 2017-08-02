var sessionTimeAmount = document.querySelectorAll('.session-time-amount');
var breakTimeAmount = document.querySelector('.break-time-amount');

var intSessionTimeAmount = parseInt(sessionTimeAmount[0].textContent);
var intBreakTimeAmount = parseInt(breakTimeAmount.textContent);

var buttons = document.querySelectorAll('button');
var startButton = buttons[4];
var pauseButton = buttons[5];
var lessSessionTime = buttons[0];
var lessBreakTime = buttons[2];
var moreSessionTime = buttons[1];
var moreBreakTime = buttons[3];

var resetButton = buttons[6];



// session time funcs
lessSessionTime.addEventListener('click', function(ev) {
    if (intSessionTimeAmount > 0) {
        intSessionTimeAmount--;
    } else {
        intSessionTimeAmount = 0;
    }
    sessionTimeAmount.forEach(function(sessionTime) {
        sessionTime.textContent = '' + intSessionTimeAmount;
    });
});
moreSessionTime.addEventListener('click', function() {
    if (intSessionTimeAmount > -1 && intSessionTimeAmount < 60) {
        intSessionTimeAmount++;
    } else if (intSessionTimeAmount === 60) {
        intSessionTimeAmount = 60;
    }
    sessionTimeAmount.forEach(function(sessionTime) {
        sessionTime.textContent = '' + intSessionTimeAmount;
    });
});

// break time funcs
lessBreakTime.addEventListener('click', function() {
    if (intBreakTimeAmount > 0) {
        intBreakTimeAmount--;
    } else {
        intBreakTimeAmount = 0;
    }
    breakTimeAmount.textContent = '' + intBreakTimeAmount;
});
moreBreakTime.addEventListener('click', function() {
    if (intBreakTimeAmount > -1 && intBreakTimeAmount < 15) {
        intBreakTimeAmount++;
    } else {
        intBreakTimeAmount = 15;
    }
    breakTimeAmount.textContent = '' + intBreakTimeAmount;
});

resetButton.addEventListener('click', function(ev) {
    intSessionTimeAmount = 25;
    intBreakTimeAmount = 5;
    sessionTimeAmount.forEach(function(sessionTime) {
        sessionTime.textContent = '' + intSessionTimeAmount;
    });
    breakTimeAmount.textContent = '' + intBreakTimeAmount;
});


startButton.addEventListener('click', function() {
    // function to start the countdown on the clock
    
    this.classList.add('hidden');
    pauseButton.classList.remove('hidden');
});

pauseButton.addEventListener('click', function() {
    this.classList.add('hidden');
    startButton.classList.remove('hidden');
});

// time funcs
/*
var now = new Date();
var seconds = now.getSeconds();
var minutes = now.getMinutes();
var hours = now.getHours();
*/

var minutes = new Date();
var minutes = minutes.setMinutes(intSessionTimeAmount);