// move to main function
function timeline() {
    platform.getAllSessions().then((data) => {
        console.log(data);
        studySessionData = data[0];
        let updatedDates = updateDates();
        if (updatedDates.fullDate.getDate() == Number(dayDate())) {
            deleteFromSessionData();
            studySessionData.doneInstructions = "doneInstructions";
            let goOne = async function () {
                let doneDay1 = await trainingDay(); // add promise and resolve
                if (doneDay1 == "done") {
                    clearInterval(sessionIntervalTrainingDay);
                    reset_redCar();
                    reset_blueCar();
                    studySessionData.doneDay1 = "doneDayOne";
                    studySessionData.expDaysDate = updatedDates.fullDate;
                    platform.saveSession(studySessionData, true).then(() => {
                        document.getElementById("endDayMsg").style.display = "inline";
                        document.getElementById("endDayMsg").addEventListener("click", function () {
                            showWinnings()
                            setTimeout(() => {
                                platform.goToUrl("days/dayTwo/dayTwo.html");
                            }, timeToFive())
                            setTimeout(() => {
                                hideWinnings();
                                if (window.matchMedia("(orientation: landscape)").matches) {
                                    hideWinnings();
                                    document.getElementById("fiveAM").style.display = "inline";
                                } else {
                                    hideWinnings();
                                    document.getElementById("fiveAM_hor").style.display = "inline";
                                }
                            }, 10000)
                        })
                    });
                }
            }
            goOne();
        } else {
            if (window.matchMedia("(orientation: landscape)").matches) {
                document.getElementById("endOfGame").style.display = "inline";
            } else {
                document.getElementById("endOfGame_hor").style.display = "inline";
            }
        }
    })
}

