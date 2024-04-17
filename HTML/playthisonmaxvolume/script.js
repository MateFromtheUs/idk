const audioContext = new (window.AudioContext || window.webkitAudioContext)();
const oscillator = audioContext.createOscillator();
const gainNode = audioContext.createGain();

oscillator.connect(gainNode);
gainNode.connect(audioContext.destination);

let frequency = 100;
let volume = 0;

const interval = setInterval(() => {
    oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
    gainNode.gain.setValueAtTime(volume, audioContext.currentTime);

    frequency += 5; // Increase frequency by 30 for maximum annoyance
    volume += 0.5; // Increase volume by 0.5 for maximum loudness
}, 100);

// Add a button to start the sound
const startButton = document.createElement('button');
startButton.textContent = 'Start :)';
document.body.appendChild(startButton);
startButton.addEventListener('click', () => {
    // Add toggle slider to turn it off
    const stopSlider = document.createElement('input');
    stopSlider.type = 'range';
    stopSlider.min = 0;
    stopSlider.max = 1;
    stopSlider.step = 1; // Change step to 1 for toggle effect
    stopSlider.value = volume;
    stopSlider.addEventListener('input', () => {
        if (stopSlider.value == 0) {
            clearInterval(interval);
        }
    });
    document.body.appendChild(stopSlider);

    // Epilepsy warning
    const epilepsyWarning = document.createElement('p');
    epilepsyWarning.textContent = 'Epilepsy warning: Flashing colors. Use slider to turn off the effect.';
    document.body.insertBefore(epilepsyWarning, startButton);

    // Flash screen with red, white, and blue really fast on start
    const flashScreen = setInterval(() => {
        document.body.style.backgroundColor = 'red';
        setTimeout(() => {
            document.body.style.backgroundColor = 'white';
        }, 50);
        setTimeout(() => {
            document.body.style.backgroundColor = 'blue';
        }, 100);
    }, 150);

    audioContext.resume().then(() => {
        oscillator.start();
    });
});