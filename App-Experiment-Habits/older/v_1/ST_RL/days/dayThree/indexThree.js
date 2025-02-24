const totalWins = {
    totalBlues: totalBlues,
    totalReds: totalReds
}

function timeline() {
    let startDayTwo = async function () {
        platform.getAllSessions().then((data) => {
            getIndexSessionData(data).then((i) => {
                studySessionData = data[i];
                let updatedDates = updateDates();
                if (updatedDates.fullDate.getDate() == updatedDates.yesterday.getDate()) { //|| yesterdayPlusOne.getDate() - fullDate.getDate() > 25 ) {
                    if (window.matchMedia("(orientation: landscape)").matches) {
                        document.getElementById("fiveAM").style.display = "inline";
                    } else {
                        document.getElementById("fiveAM_hor").style.display = "inline";
                    }
                    setTimeout(() => {
                        moveToDay();
                    }, timeToFive());
                }
                else if ((updatedDates.fullDate.getDate() == updatedDates.yesterdayPlusOne.getDate()) && (studySessionData.doneDay3 != "doneDevTest")) { //|| yesterdayPlusOne.getDate() - fullDate.getDate() > 25 ) {)
                    if (0 <= updatedDates.fullDate.getHours() & updatedDates.fullDate.getHours() < 5) {
                        document.getElementById("fiveAM").style.display = "inline";
                        setTimeout(() => {
                            moveToDay();
                        }, timeToFiveSameDay());
                    } else {
                        let goTwo = async function () {
                            let my_awesome_script = document.createElement('script');
                            my_awesome_script.setAttribute('src', '../../functions/orientation.js');
                            // my_awesome_script.src = "../functions/orientation.js";
                            document.body.appendChild(my_awesome_script);
                            deleteFromSessionData();
                            document.getElementById("startButton").style.display = "inline";
                            document.getElementById("redButton").style.display = "inline";
                            document.getElementById("blueButton").style.display = "inline";
                            document.getElementById("gameScreen").style.display = "inline";
                            document.getElementById("startButton").onclick = function () {
                                document.getElementById("startButton").style.display = "none";
                                studySessionData.doneDay3 = "stratDayThree";
                                platform.saveSession(studySessionData, true);
                                getMillisec();
                                // msCount();
                                let startIntervalTest = async function () {
                                    let startTrainning = await startInterval2Tests2();
                                    if (startTrainning == "done3") {
                                        setTimeout(() => {
                                            document.getElementById("startDevtestButtonRed").style.display = "inline";
                                            document.getElementById("iframe-element").style.top = "1%"
                                            document.getElementById("iframe-element").src = "../../timer/timer.html";
                                            document.getElementById('iframe-element').classList.remove('hidden');
                                            document.getElementById("iframe-element").style.display = "inline";
                                        }, 1000)
                                        setTimeout(() => {
                                            document.getElementById("startDevtestButtonRed").style.display = "inline";
                                            document.getElementById("iframe-element").style.display = "none";
                                            let startDevaluation = async function () {
                                                let doneDayThree = await startDevTest(); // add promise and resolve
                                                if (doneDayThree == "doneDevTest") {
                                                    studySessionData.doneDay3 = "doneDevTest";
                                                    studySessionData.expDaysDate = updatedDates.fullDate;
                                                    platform.saveSession(studySessionData, true)
                                                    document.getElementById("blueButton").style.display = "none";
                                                    document.getElementById("redButton").style.display = "none";
                                                    sumCorrectFirstPress().then((sum) => {
                                                        showWinningsEnd(sum);
                                                        platform.saveSession(totalWins, true);
                                                        setTimeout(() => {
                                                            hideWinningsEnd();
                                                            document.getElementById("endOfGame").style.display = "inline";
                                                        }, 10000);
                                                    })
                                                }
                                            }
                                            startDevaluation();
                                        }, 16000);
                                    }
                                }
                                startIntervalTest();
                            }
                        }
                        goTwo()
                    }
                } else {
                    if (window.matchMedia("(orientation: landscape)").matches) {
                        document.getElementById("endOfGame").style.display = "inline";
                    } else {
                        document.getElementById("endOfGame_hor").style.display = "inline";
                    }
                }
            });
        });
    }
    startDayTwo();
}