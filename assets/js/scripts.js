var sessionTimeAmount = document.querySelectorAll('.session-time-amount');
var sessionSecondsAmount = document.querySelector('.session-seconds-amount');
var breakTimeAmount = document.querySelector('.break-time-amount');

var intSessionTimeAmount = parseInt(sessionTimeAmount[0].textContent);
var intSessionSecondsAmount = parseInt(sessionSecondsAmount.textContent);
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



startButton.addEventListener('click', function() {
    // function to start the countdown on the clock
    setInterval(timer, 1000);
    
    this.classList.add('hidden');
    pauseButton.classList.remove('hidden');
});

pauseButton.addEventListener('click', function() {
    // timer needs to pause on click, all amounts remain the same, but the interval pauses
    
    this.classList.add('hidden');
    startButton.classList.remove('hidden');
});

resetButton.addEventListener('click', function(ev) {
    intSessionTimeAmount = 25;
    intSessionSecondsAmount = 0;
    intBreakTimeAmount = 5;
    
    sessionSecondsAmount.textContent = '0' + intSessionSecondsAmount;
    sessionTimeAmount.forEach(function(sessionTime) {
        sessionTime.textContent = '' + intSessionTimeAmount;
    });
    breakTimeAmount.textContent = '' + intBreakTimeAmount;
    
    // timer() needs to stop running on click
});



function timer() {
    if (intSessionTimeAmount === 0 && intSessionSecondsAmount === 0) {
        pauseButton.classList.add('hidden');
        startButton.classList.remove('hidden');
        console.alert('Time for a break!');
        return;
    } else if (intSessionSecondsAmount === 0) {
        intSessionSecondsAmount = 59;
        intSessionTimeAmount--;
    } else {
        intSessionSecondsAmount--;
    }
    
    if (intSessionSecondsAmount < 10 && intSessionSecondsAmount >= 0) {
        sessionSecondsAmount.textContent = '0' + intSessionSecondsAmount;
    } else {
        sessionSecondsAmount.textContent = '' + intSessionSecondsAmount;
        sessionTimeAmount[0].textContent = '' + intSessionTimeAmount;
    }
}






// time funcs
/*
var now = new Date();
var seconds = now.getSeconds();
var minutes = now.getMinutes();
var hours = now.getHours();
*/

//var timer = (new Date());
//timer = timer.setHours(0, intSessionTimeAmount, 0);
//timer = timer.setMinutes(intSessionTimeAmount);