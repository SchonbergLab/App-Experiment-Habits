
const expDay = [];

function randColor() { // 1 or 0 - random choice of car color
    const colorArry = [0, 1];
    let car = colorArry[Math.floor(Math.random() * colorArry.length)]
    if (car == 0) {
        blueChoice.push(new Date().getTime() - milliseconds);
        allChoices.push(new Date().getTime() - milliseconds);
    } else {
        redChoice.push(new Date().getTime() - milliseconds);
        allChoices.push(new Date().getTime() - milliseconds);
    }
    return car
};
// Random car choise yellow tesr:
function randColorYellow() { // 2 or 1 or 0
    const colorArry = [0, 1, 2];
    let car = colorArry[Math.floor(Math.random() * colorArry.length)];
    if (car == 0) {
        redChoiceYellow.push(new Date().getTime() - milliseconds);
    } else if (car == 1) {
        blueChoiceYellow.push(new Date().getTime() - milliseconds)
    } else {
        yellowChoiceYellow.push(new Date().getTime() - milliseconds)
    }
    allChoicesYellow.push(new Date().getTime() - milliseconds);
    return car
};

// Random car choise star test:
function randColorStar() {
    const colorArry = [0, 1];
    let car = colorArry[Math.floor(Math.random() * colorArry.length)]
    if (car == 0) {
        blueChoiceStar.push(new Date().getTime() - milliseconds);
    } else {
        redChoiceStar.push(new Date().getTime() - milliseconds)
    }
    allChoicesStar.push(new Date().getTime() - milliseconds);
    return car
};

// Random car choise dev test:
function randColorDev() {
    const colorArry = [0, 1];
    let car = colorArry[Math.floor(Math.random() * colorArry.length)]
    if (car == 0) {
        blueChoiceDev.push(new Date().getTime() - milliseconds);
    } else {
        redChoiceDev.push(new Date().getTime() - milliseconds)
    }
    allChoicesDev.push(new Date().getTime() - milliseconds);
    return car
};

//Random count array
const countArry = [17, 18, 19, 20, 21, 22, 23];
const choseCount = Array.from({ length: 1000 });
for (let i = 0; i < choseCount.length; i++) {
    let count = countArry[Math.floor(Math.random() * countArry.length)];
    choseCount.fill(count, i);
};

indexV1 = 0;
indexV2 = 1;

// Random count choise function:
function randCountAirplane() {
    indexV1++
    return (choseCount[indexV1]);
};


const speedArry = [0.6, 0.75, 0.9];
const choseSpeed = Array.from({ length: 1000 });
for (let i = 0; i < choseSpeed.length; i++) {
    let speed = speedArry[Math.floor(Math.random() * speedArry.length)];
    choseSpeed.fill(speed, i);
};

indexC1 = 0;
indexC2 = 1;
// indexV1 = 0;
// indexV2 = 1;

// // Random car choise function:
// function randSpeedInterval() {
//     indexV1++
//     indexV2++
//     return (choseSpeed.slice(indexV1, indexV2));
// };

function randSpeedCar() {
    indexC1++
    return (choseSpeed[indexC1]);
};

function randDevButton() {
    const buttonArry = [0, 1];
    let buttonChoise = buttonArry[Math.floor(Math.random() * buttonArry.length)];
    devButton.push(buttonChoise);
    if (buttonChoise == 0) {
        button = "startDevtestButtonBlue";
    } else {
        button = "startDevtestButtonRed";
    } devButton.push(buttonChoise);
    return button
}

// rands for stars

// Random time array
const timeArrayStarts = Array.from({ length: 100 });
for (let i = 0; i < timeArrayStarts.length; i++) {
    let timeToShine = Math.random() * 10000;
    timeArrayStarts.fill(timeToShine, i);
};

indexT1 = 0;

function randTimeStars() {
    indexT1++;
    allStars.push(new Date().getTime() - milliseconds)
    return (timeArrayStarts[indexT1]);
};

// Random location array

indexL1 = 0;
indexL2 = 1;
indexP1 = 0;
indexP2 = 1;

const locationArrayStarts = Array.from({ length: 1000 });
const leftArrayStarts = Array.from({ length: 1000 });
const topArrayStarts = Array.from({ length: 1000 });
const starsLocationLeft = [2, 80.3];
const starsLocationTop = [4, 74];
for (let i = 0; i < locationArrayStarts.length; i++) {
    let left = starsLocationLeft[Math.floor(Math.random() * starsLocationLeft.length)];
    let top = starsLocationTop[Math.floor(Math.random() * starsLocationTop.length)];
    leftArrayStarts.fill(left, i);
    topArrayStarts.fill(top, i);
}

function randLeftStars() {
    indexL1++
    // indexL2++
    if (leftArrayStarts[indexL1] == 80.3) {
        document.getElementById("star").style.transform = "scaleX(1)";
    } else {
        document.getElementById("star").style.transform = "scaleX(-1)";
    }
    return (leftArrayStarts[indexL1]);
}

function randTopStars() {
    indexP1++
    // indexP2++
    return (topArrayStarts[indexP1]);
}
