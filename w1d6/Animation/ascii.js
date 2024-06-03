"use strict";

let animationInterval;
let animationFrames;
let currentFrame;
let originalText;
const frameDelay = {
    normal: 250,
    turbo: 50
};
let currentDelay = frameDelay.normal;

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("startButton").addEventListener("click", startAnimation);
    document.getElementById("stopButton").addEventListener("click", stopAnimation);
    document.getElementById("animation").addEventListener("change", changeAnimation);
    document.getElementById("fontSize").addEventListener("change", changeFontSize);
    document.getElementById("turbo").addEventListener("change", changeSpeed);
});

function startAnimation() {
    document.getElementById("startButton").disabled = true;
    document.getElementById("stopButton").disabled = false;
    document.getElementById("animation").disabled = true;

    originalText = document.getElementById("animationArea").value;
    animationFrames = originalText.split("=====\n");
    currentFrame = 0;

    animationInterval = setInterval(showNextFrame, currentDelay);
}

function stopAnimation() {
    clearInterval(animationInterval);
    document.getElementById("animationArea").value = originalText;
    document.getElementById("startButton").disabled = false;
    document.getElementById("stopButton").disabled = true;
    document.getElementById("animation").disabled = false;
}

function showNextFrame() {
    document.getElementById("animationArea").value = animationFrames[currentFrame];
    currentFrame = (currentFrame + 1) % animationFrames.length;
}

function changeAnimation() {
    const selectedAnimation = document.getElementById("animation").value;
    document.getElementById("animationArea").value = ANIMATIONS[selectedAnimation];
}

function changeFontSize() {
    const selectedSize = document.getElementById("fontSize").value;
    document.getElementById("animationArea").style.fontSize = selectedSize;
}

function changeSpeed() {
    const turboChecked = document.getElementById("turbo").checked;
    currentDelay = turboChecked ? frameDelay.turbo : frameDelay.normal;
    if (animationInterval) {
        clearInterval(animationInterval);
        animationInterval = setInterval(showNextFrame, currentDelay);
    }
}
