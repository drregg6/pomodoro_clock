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




lessSessionTime.addEventListener('click', function(ev) {
    if (intSessionTimeAmount > 0) {
        intSessionTimeAmount--;
        
        sessionTimeAmount.forEach(function(sessionTime) {
            sessionTime.textContent = '' + intSessionTimeAmount;
        });
    } else {
        intSessionTimeAmount = 0;
        sessionTimeAmount.forEach(function(sessionTime) {
            sessionTime.textContent = '' + intSessionTimeAmount;
        });
    }
});
lessBreakTime.addEventListener('click', function() {
    if (intBreakTimeAmount > 0) {
        intBreakTimeAmount--;
        
        breakTimeAmount.textContent = '' + intBreakTimeAmount;
    } else {
        intBreakTimeAmount = 0;
        
        breakTimeAmount.textContent = '' + intBreakTimeAmount;
    }
});
moreSessionTime.addEventListener('click', function() {
    if (intSessionTimeAmount > -1 && intSessionTimeAmount < 60) {
        intSessionTimeAmount++;
        
        sessionTimeAmount.forEach(function(sessionTime) {
            sessionTime.textContent = '' + intSessionTimeAmount;
        });
    } else if (intSessionTimeAmount === 60) {
        intSessionTimeAmount = 60;
        
        sessionTimeAmount.forEach(function(sessionTime) {
            sessionTime.textContent = '' + intSessionTimeAmount;
        });
    }
});
moreBreakTime.addEventListener('click', function() {
    if (intBreakTimeAmount > -1 && intBreakTimeAmount < 15) {
        intBreakTimeAmount++;
        
        breakTimeAmount.textContent = '' + intBreakTimeAmount;
    } else {
        intBreakTimeAmount = 15;
        
        breakTimeAmount.textContent = '' + intBreakTimeAmount;
    }
});


startButton.addEventListener('click', function() {
    this.classList.add('hidden');
    pauseButton.classList.remove('hidden');
});

pauseButton.addEventListener('click', function() {
    this.classList.add('hidden');
    startButton.classList.remove('hidden');
});