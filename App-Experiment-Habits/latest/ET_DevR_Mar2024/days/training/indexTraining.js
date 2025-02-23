
function timeline() {
    platform.getAllSessions().then((data) => {
        getIndexSessionData(data).then((indexI) => {
            studySessionData = data[indexI];
            deleteFromSessionData();
            let updatedDates = updateDates();
            let todayDate = new Date;
            todayDate = todayDate.getDate();
            if (((Number(todayDate) === Number(dayDate())) || (Number(todayDate) === (new Date(studySessionData.expDaysDate).getDate() + 1))) && (studySessionData.isDayDone == "")) { //if it's the same date as the first day or the day after the first day and the user didn't play on the first day. 
                updatedDates.lastGamePlusOne = updatedDates.fullDate;
                let yesterday = new Date;
                updatedDates.lastGame = new Date(yesterday.setDate(yesterday.getDate() - 1));
                if (Number(todayDate) === new Date(studySessionData.expDaysDate).getDate() + 1) { // if they didn't play on the first day add to missing days
                    daysMissedNum.push(1);
                    platform.saveSession(daysMissed);
                }
            }
            if (updatedDates.fullDate.getDate() == updatedDates.lastGame.getDate()) { //|| lastGamePlusOne.getDate() - fullDate.getDate() > 25 ) {
                fiveAMOrient();
                setTimeout(() => {
                    moveToDay();
                }, timeToFive());
            }
            else if ((updatedDates.fullDate.getDate() == updatedDates.lastGamePlusOne.getDate()) || (updatedDates.yesterday.getDate() == updatedDates.lastGamePlusOne.getDate())
                || (updatedDates.yesterday.getDate() == updatedDates.lastGamePlusTwo.getDate())) {
                if (updatedDates.fullDate.getDate() != updatedDates.lastGamePlusOne.getDate()) {
                    getIndexMissedDays(data).then((indexM) => {
                        if (!indexM) {
                            if (updatedDates.yesterday.getDate() == updatedDates.lastGamePlusTwo.getDate()) {
                                daysMissedNum.push(2);
                            } else {
                                daysMissedNum.push(1);
                            }
                        } else {
                            missed = data[indexM]
                            if ((missed.daysMissedNum <= 1) && (updatedDates.yesterday.getDate() == updatedDates.lastGamePlusOne.getDate())) {
                                daysMissedNum.push(2);
                            }
                            else {
                                daysMissedNum.push(2);
                                platform.saveSession(daysMissed);
                                endGameOrient();
                            }
                        }
                    })
                }
                if (0 <= updatedDates.fullDate.getHours() & updatedDates.fullDate.getHours() < 5) {
                    fiveAMOrient();
                    setTimeout(() => {
                        moveToDay();
                    }, timeToFiveSameDay());
                } else {
                    deleteFromSessionData();
                    let goTraining = async function () {
                        let isDayDone = await trainingDay();
                        if (isDayDone == "done") {
                            clearInterval(sessionIntervalTrainingDay);
                            if (updatedDates.fullDate.getDate() != updatedDates.lastGamePlusOne.getDate()) {
                                platform.saveSession(daysMissed);
                            }
                            // let updatedDates = updateDates();
                            studySessionData.isDayDone = "done";
                            studySessionData.expDaysDate = updatedDates.fullDate;
                            platform.saveSession(studySessionData, true).then(() => {
                                clearInterval(sessionIntervalTrainingDay);
                                document.getElementById("endDayMsg").style.display = "inline";
                                document.getElementById("endDayMsg").addEventListener("click", function () {
                                    showWinnings()
                                    setTimeout(() => {
                                        fiveAMOrient();
                                        hideWinnings();
                                    }, 10000)
                                    setTimeout(() => {
                                        moveToDay();
                                    }, timeToFive())
                                })
                            })
                        }

                    }
                    goTraining();
                }
            } else {
                endGameOrient();
            }
        })
    })
}


// startDayOne function () {
//  return new Promise(resolve => {

//     let savedData = [];
//     savedData = platform.getAllSessions();
// let getlastData = await getData();
// if (getlastData == "gotData") {
// studySessionData = savedData[0][savedData[0].length - 1];
// resolve("gotData");

//     startDayOne();

//     let updatedDates = updateDates();
//     let goFirst = async function () {
//         let doneDay1 = await trainingFirstDay();
//         if (doneDay1 == "doneDayOne") {
//             studySessionData.doneDay1 = "doneDayOne";
//             studySessionData.expDaysDate = updatedDates.fullDate;
//             platform.saveSession(responsesFirstData, false);
//             platform.saveSession(studySessionData, true);
//             document.getElementById("endDayMsg").style.display = "inline";
//             document.getElementById("endDayMsg").addEventListener("click", function () {
//                 showWinnings()
//                 setTimeout(() => {
//                     platform.goToUrl("days/twoTests/dayTwo.html");
//                 }, 10000)
//             })
//         }
//     }
//     goFirst();
// };

