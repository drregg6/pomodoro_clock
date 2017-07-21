var buttons = document.getElementsByTagName('button');
var startButton = buttons[4];
var pauseButton = buttons[5];

startButton.addEventListener('click', function() {
    this.classList.add('hidden');
    pauseButton.classList.remove('hidden');
});

pauseButton.addEventListener('click', function() {
    this.classList.add('hidden');
    startButton.classList.remove('hidden');
});

console.log('Hello world!');