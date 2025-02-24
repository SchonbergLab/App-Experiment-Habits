
const responsesFirstData = {
    todayDate: getTodayDate(),
    correctRedPress: correctRedPress,
    correctBluePress: correctBluePress,
    correctFirstRedPress: correctFirstRedPress,
    correctFirstBluePress: correctFirstBluePress,
    incorrectRedPress: incorrectRedPress,
    incorrectBluePress: incorrectBluePress,
    redChoice: redChoice,
    blueChoice: blueChoice,
    allRedPresses: allRedPresses,
    allBluePresses: allBluePresses,
    // allCorrectFirstPress: allCorrectFirstPress,
    allChoices: allChoices,
    criterion: criterion
};

document.getElementById("redButton").addEventListener("click", function () {
    allRedPresses.push(new Date().getTime() - milliseconds);
});
document.getElementById("blueButton").addEventListener("click", function () {
    allBluePresses.push(new Date().getTime() - milliseconds);
});



let count = 0; // counter for iterations
// 1=red, 2=blue buttons
let buttonChoice = null;
let sessionInterval = null;
let startGame = null;
platform.saveSession(responsesFirstData, true)

async function trainingFirstDay() {
    return new Promise(resolve => {
        countingCars = 0;
        breaks = 0;
        //       let x = 0;
        document.getElementById("startButton").style.display = "inline";
        document.getElementById("redButton").style.display = "inline";
        document.getElementById("blueButton").style.display = "inline";
        document.getElementById("gameScreen").style.display = "inline";
        document.getElementById("startButton").onclick = function () {
            // startClick = 1;
            // if (startClick == 1) {
            //    msCountfirstDay();
            document.getElementById("startButton").style.display = "none";
            studySessionData.doneDay1 = "startDayOne";
            platform.saveSession(studySessionData);
            function startIntervalFirstDay() {
                // reset_gif();
                let randCount = randCountAirplane();
                document.getElementById("break").style.display = "none";
                document.getElementById("redButton").style.display = "inline";
                document.getElementById("blueButton").style.display = "inline";
                document.getElementById("gameScreen").style.display = "inline";
                sessionIntervalFirstDay = setInterval(
                    function carMove() {
                        let choseCar = randColor();
                        let carSpeed = randSpeedCar();
                        reset_airplane();
                        buttonChoice = 0;
                        if (count >= randCount) {
                            clearInterval(sessionIntervalFirstDay);
                            document.getElementById("airplane").style.display = "inline";
                            document.getElementById("airplane").style.animationPlayState = "running";
                            setTimeout(startIntervalFirstDay, 2000);
                            platform.saveSession(responsesFirstData, false);
                            // if (new Date().getTime() - milliseconds > 30000) {
                            //     clearTimeout(sessionTimerFirstDay);
                            // }
                            count = 0;
                            countingCars++;
                        } else {
                            count++;
                            // document.getElementById("counter").innerHTML = count;
                            // document.getElementById("carColorShow").innerHTML = choseCar;
                            // document.getElementById("carSpeedShow").innerHTML = carSpeed;
                            // document.getElementById("finishedShow").innerHTML = "Started";
                            countingCars++;
                            if (choseCar == 1) {
                                document.getElementById("redCar").style.display = "inline";
                                document.getElementById("redCar").style.animationPlayState = "running";
                                document.getElementById("redCar").style.animationDuration = String(carSpeed) + "s";
                                document.getElementById("redButton").onclick = function () {
                                    buttonChoice = buttonChoice + 1;
                                    if (buttonChoice == 1) {
                                        correctFirstRedPress.push(new Date().getTime() - milliseconds);
                                        // allCorrectFirstPress.push(new Date().getTime() - milliseconds);
                                    } else {
                                        correctRedPress.push(new Date().getTime() - milliseconds);
                                    }
                                };
                                document.getElementById("blueButton").onclick = function () {
                                    buttonChoice = buttonChoice - 1;
                                    if (buttonChoice <= -1) {
                                        incorrectBluePress.push(new Date().getTime() - milliseconds);
                                    }
                                };

                                setTimeout(() => {
                                    reset_redCar();
                                    // document.getElementById("finishedShow").innerHTML = "Finished";
                                }, carSpeed * 1000);
                            } else {
                                document.getElementById("blueCar").style.display = "inline";
                                document.getElementById("blueCar").style.animationPlayState = "running";
                                document.getElementById("blueCar").style.animationDuration = String(carSpeed) + "s";
                                document.getElementById("redButton").onclick = function () {
                                    buttonChoice = buttonChoice - 1;
                                    if (buttonChoice <= -1) {
                                        incorrectRedPress.push(new Date().getTime() - milliseconds);
                                    };
                                };
                                document.getElementById("blueButton").onclick = function () {
                                    buttonChoice = buttonChoice + 1;
                                    if (buttonChoice == 1) {
                                        correctFirstBluePress.push(new Date().getTime() - milliseconds);
                                        // allCorrectFirstPress.push(new Date().getTime() - milliseconds);
                                    } else {
                                        correctBluePress.push(new Date().getTime() - milliseconds);
                                    }

                                };

                                setTimeout(() => {
                                    reset_blueCar();
                                    // document.getElementById("finishedShow").innerHTML = "Finished";
                                }, carSpeed * 1000);
                            };

                            if (countingCars >= 280 && breaks <= 2) {
                                reset_redCar();
                                reset_blueCar();
                                reset_airplane();
                                clearInterval(sessionIntervalFirstDay);
                                platform.saveSession(responsesFirstData);
                                document.getElementById("gameScreen").style.display = "none";
                                document.getElementById("redButton").style.display = "none";
                                document.getElementById("blueButton").style.display = "none";
                                document.getElementById("break").style.display = "inline";
                                document.getElementById("iframe-element3").src = "../../timer/timer3.html";
                                document.getElementById("iframe-element3").style.display = "inline";
                                document.getElementById("iframe-element3").style.top = "0%";
                                countingCars = 0;
                                setTimeout(() => {
                                    startIntervalFirstDay();
                                    document.getElementById("iframe-element3").src = "";
                                    document.getElementById("iframe-element3").style.display = "none";
                                }, 30500);
                                breaks++;
                            }
                        };
                    }, 1000);// (Maximal carSpeed)*1000

                let sessionTimerFirstDay = setTimeout(function timeCount() {
                    platform.saveSession(responsesFirstData, false);
                    clearInterval(sessionIntervalFirstDay);
                    reset_airplane();
                    document.getElementById("blueButton").style.display = "none";
                    document.getElementById("redButton").style.display = "none";
                    resolve("doneDayOne");
                    clearTimeout(sessionTimerFirstDay);
                }, 900000);
                // }, 3000);
            }
            startIntervalFirstDay();
            getMillisec();
        }
        // }
    })
}
