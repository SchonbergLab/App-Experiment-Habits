
const responsesTrainingData = {
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
    allCorrectFirstPress: allCorrectFirstPress,
    allChoices: allChoices
};

platform.saveSession(responsesTrainingData, true);

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

async function startTraining() {
    return new Promise(resolve => {
        breaks = 0;
        countingCars = 0;
        document.getElementById("startButton").style.display = "inline";
        document.getElementById("redButton").style.display = "inline";
        document.getElementById("blueButton").style.display = "inline";
        document.getElementById("gameScreen").style.display = "inline";
        document.getElementById("startButton").onclick = function () {
            let my_awesome_script = document.createElement('script');
            my_awesome_script.setAttribute('src', '../../functions/orientation.js');
            // my_awesome_script.src = "../functions/orientation.js";
            document.body.appendChild(my_awesome_script);
            document.getElementById("startButton").style.display = "none";
            // studySessionData.doneDay2 = "startDayTwo";
            //platform.saveSession(studySessionData);
            function startInterval() {
                let randCount = randCountAirplane();
                reset_gif();
                document.getElementById("break").style.display = "none";
                document.getElementById("redButton").style.display = "inline";
                document.getElementById("blueButton").style.display = "inline";
                document.getElementById("gameScreen").style.display = "inline";
                sessionInterval = setInterval(
                    function carMove() {
                        let choseCar = randColor();
                        let carSpeed = randSpeedCar();
                        reset_airplane();
                        buttonChoice = 0;
                        if (count >= randCount) {
                            clearInterval(sessionInterval);
                            setTimeout(startInterval, 2000);
                            document.getElementById("airplane").style.display = "inline";
                            document.getElementById("airplane").style.animationPlayState = "running";
                            platform.saveSession(responsesTrainingData, false);
                            count = 0;
                            countingCars++;
                        } else {
                            count++;
                            countingCars++
                            if (choseCar >= 0.5) {
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
                                }, carSpeed * 1000);
                            };


                            if (countingCars >= 280 && breaks <= 2) {
                                clearInterval(sessionInterval);
                                reset_redCar();
                                reset_blueCar();
                                reset_airplane();
                                document.getElementById("gameScreen").style.display = "none";
                                document.getElementById("redButton").style.display = "none";
                                document.getElementById("blueButton").style.display = "none";
                                document.getElementById("break").style.display = "inline";
                                document.getElementById("iframe-element3").src = "../../timer/timer3.html";
                                document.getElementById("iframe-element3").style.display = "inline";
                                document.getElementById("iframe-element3").style.top = "0%";
                                countingCars = 0;
                                setTimeout(() => {
                                    startInterval();
                                    document.getElementById("iframe-element3").src = "";
                                    document.getElementById("iframe-element3").style.display = "none";
                                }, 30500);
                                breaks++;
                            }
                        }
                    }, 1000);// (Maximal carSpeed)*1000

                let sessionTimer = setTimeout(function timeCount() {
                    platform.saveSession(responsesTrainingData);
                    document.getElementById("blueButton").style.display = "none";
                    document.getElementById("redButton").style.display = "none";
                    document.getElementById("break").style.display = "none";
                    clearInterval(sessionInterval);
                    clearTimeout(sessionTimer);
                    reset_airplane();
                    resolve("doneDayTwo");
                }, 900000);
            }
            startInterval();
            getMillisec();
        };

    })
}
