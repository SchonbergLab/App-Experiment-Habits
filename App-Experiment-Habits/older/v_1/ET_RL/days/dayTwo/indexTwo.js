
// move to main function
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
                else if (updatedDates.fullDate.getDate() == updatedDates.yesterdayPlusOne.getDate()) { //|| yesterdayPlusOne.getDate() - fullDate.getDate() > 25 ) {)
                    if (0 <= updatedDates.fullDate.getHours() & updatedDates.fullDate.getHours() < 5) {
                        document.getElementById("fiveAM").style.display = "inline";
                        setTimeout(() => {
                            moveToDay();
                        }, timeToFiveSameDay());
                    } else {
                        deleteFromSessionData();
                        let goTwo = async function () {
                            let doneDayTwo = await startTraining();
                            if (doneDayTwo == "doneDayTwo") {
                                studySessionData.doneDay2 = "doneDayTwo";
                                studySessionData.expDaysDate = updatedDates.fullDate;
                                platform.saveSession(studySessionData, true)
                                document.getElementById("endDayMsg").style.display = "inline";
                                document.getElementById("endDayMsg").addEventListener("click", function () {
                                    showWinnings()
                                    setTimeout(() => {
                                        platform.goToUrl("days/dayThree/dayThree.html");
                                    }, 7000)
                                })
                            }
                        }
                        goTwo()
                    }
                } else {
                    document.getElementById("endOfGame").style.display = "inline";
                }
            })
        })
    }
    startDayTwo()
}


// let getlastData = await getData();
// if (getlastData == "gotData") {
//     studySessionData = savedData[0][savedData[0].length - 1];
// let updatedDates = updateDates();
    // updatedDates = updateDates();
