

const responsesDev = {
    todayDate: getTodayDate(),
    correctRedPressDevtest: correctRedPressDevtest,
    correctBluePressDevtest: correctBluePressDevtest,
    correctFirstRedPressDevtest: correctFirstRedPressDevtest,
    correctFirstBluePressDevtest: correctFirstBluePressDevtest,
    incorrectRedPressDevtest: incorrectRedPressDevtest,
    incorrectBluePressDevtest: incorrectBluePressDevtest,
    redChoiceDev: redChoiceDev,
    blueChoiceDev: blueChoiceDev,
    allRedPressesDev: allRedPressesDev,
    allBluePressesDev: allBluePressesDev,
    allCorrectFirstPressDev: allCorrectFirstPressDev,
    allChoicesDev: allChoicesDev,
    devButton: devButton
};

platform.saveSession(responsesDev, true);
let saveAttemptDev = 0;
// 1=red, 2=blue buttons
//let buttonChoice = null;
// let sessionInterval = null;
// let startGame = null;
let startClickDev = null;

document.getElementById("redButton").addEventListener("click", function () {
    allRedPressesDev.push(new Date().getTime() - milliseconds);
});
document.getElementById("blueButton").addEventListener("click", function () {
    allBluePressesDev.push(new Date().getTime() - milliseconds);
});
var redElement = document.getElementById("redButton");
var blueElement = document.getElementById("blueButton");
redElement.addEventListener("contextmenu", function (event) {
    event.preventDefault();
});
blueElement.addEventListener("contextmenu", function (event) {
    event.preventDefault();
});

async function startDevTest() {
    return new Promise(resolve => {
        breaks = 0;
        countingCars = 0;
        count = 0;
        function startIntervalDevtest() {
            // reset_gif();
            let randCount = randCountAirplane();
            document.getElementById("redButton").style.display = "inline";
            document.getElementById("blueButton").style.display = "inline";
            document.getElementById("gameScreen").style.display = "inline";
            sessionIntervalTest = setInterval(
                function carMove() {
                    let choseCar = randColorDev();
                    let carSpeed = randSpeedCar();
                    reset_airplane();
                    buttonChoice = 0;
                    if (count >= randCount) {
                        clearInterval(sessionIntervalTest);
                        setTimeout(startIntervalDevtest, 2000);
                        document.getElementById("airplane").style.display = "inline";
                        document.getElementById("airplane").style.animationPlayState = "running";
                        platform.saveSession(responsesDev, false);
                        count = 0;
                        countingCars++;
                    } else {
                        count++;
                        countingCars++;
                        if (choseCar >= 0.5) {
                            document.getElementById("redCar").style.display = "inline";
                            document.getElementById("redCar").style.animationPlayState = "running";
                            document.getElementById("redCar").style.animationDuration = String(carSpeed) + "s";
                            document.getElementById("redButton").onclick = function () {
                                buttonChoice = buttonChoice + 1;
                                if (buttonChoice == 1) {
                                    correctFirstRedPressDevtest.push(new Date().getTime() - milliseconds);
                                    //                                     allCorrectFirstPressDev.push(new Date().getTime() - milliseconds);
                                } else {
                                    correctRedPressDevtest.push(new Date().getTime() - milliseconds);
                                }
                            };
                            document.getElementById("blueButton").onclick = function () {
                                buttonChoice = buttonChoice - 1;
                                if (buttonChoice <= -1) {
                                    incorrectBluePressDevtest.push(new Date().getTime() - milliseconds);
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
                                    incorrectRedPressDevtest.push(new Date().getTime() - milliseconds);
                                };
                            };
                            document.getElementById("blueButton").onclick = function () {
                                buttonChoice = buttonChoice + 1;
                                if (buttonChoice == 1) {
                                    correctFirstBluePressDevtest.push(new Date().getTime() - milliseconds);
                                    //                                     allCorrectFirstPressDev.push(new Date().getTime() - milliseconds);
                                } else {
                                    correctBluePressDevtest.push(new Date().getTime() - milliseconds);
                                }

                            };

                            setTimeout(() => {
                                reset_blueCar();
                            }, carSpeed * 1000);
                        }

                        // if (countingCars >= 280 & breaks <= 2) {
                        //     clearInterval(sessionIntervalTest);
                        //     reset_redCar();
                        //     reset_blueCar();
                        //     reset_airplane();
                        //     document.getElementById("gameScreen").style.display = "none";
                        //     document.getElementById("redButton").style.display = "none";
                        //     document.getElementById("blueButton").style.display = "none";
                        //     document.getElementById("break").style.display = "inline";
                        //     document.getElementById("iframe-element3").src = "../../timer/timer3.html";
                        //     document.getElementById("iframe-element3").style.display = "inline";
                        //     document.getElementById("iframe-element3").style.top = "0%";
                        //     countingCars = 0;
                        //     setTimeout(() => {
                        //         startIntervalDevtest();
                        //         document.getElementById("iframe-element3").src = "";
                        //         document.getElementById("iframe-element3").style.display = "none";
                        //     }, 30500);
                        //     breaks++;
                        // }
                    }

                }, 1200);// (Maximal carSpeed)*1000

            let sessionTimerTest = setTimeout(function timeCount() {
                document.getElementById("blueButton").style.display = "none";
                document.getElementById("redButton").style.display = "none";
                clearInterval(sessionIntervalTest);
                clearTimeout(sessionTimerTest);
                function savingDev() {
                    platform.saveSession(responsesDev, false).then(() => {
                        resolve("doneDevTest");
                        reset_airplane();
                        reset_blueCar();
                        reset_redCar();
                    }).catch(() => {
                        if (saveAttemptDev >= 1000) {
                            document.getElementById("problem").style.display = "inline";
                        } else {
                            saveAttemptDev++;
                            savingDev()
                        }
                    });
                }
                savingDev();
            }, 250000);
            // }, 3000);
        };
        startIntervalDevtest();
    });
}
