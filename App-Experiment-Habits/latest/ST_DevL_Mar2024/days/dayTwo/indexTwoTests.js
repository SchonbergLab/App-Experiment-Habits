
// move to main function
function timeline() {
    platform.getAllSessions().then((data) => {
        getIndexSessionData(data).then((indexI) => {
            studySessionData = data[indexI];
            console.log(studySessionData);
            deleteFromSessionData();
            let updatedDates = updateDates();
            if (updatedDates.fullDate.getDate() == updatedDates.yesterday.getDate()) {
                fiveAMOrient()
                setTimeout(() => {
                    moveToDay();
                }, timeToFive());
            }
            else if (updatedDates.fullDate.getDate() == updatedDates.yesterdayPlusOne.getDate()) { //|| yesterdayPlusOne.getDate() - fullDate.getDate() > 25 ) {)
                if ((0 <= updatedDates.fullDate.getHours() & updatedDates.fullDate.getHours() < 5) && (studySessionData.subId != "64eda725d2c8fb647d0adc6e")) {
                    fiveAMOrient()
                    setTimeout(() => {
                        moveToDay();
                    }, timeToFiveSameDay());
                } else {
                    let goTwo = async function () {
                        let my_awesome_script = document.createElement('script');
                        my_awesome_script.setAttribute('src', '../../functions/orientation.js');
                        // my_awesome_script.src = "../functions/orientation.js";
                        document.body.appendChild(my_awesome_script);
                        document.getElementById("startButton").style.display = "inline";
                        document.getElementById("redButton").style.display = "inline";
                        document.getElementById("blueButton").style.display = "inline";
                        document.getElementById("gameScreen").style.display = "inline";
                        document.getElementById("startButton").onclick = function () {
                            document.getElementById("startButton").style.display = "none";
                            studySessionData.doneDay2 = "stratDayTwo";
                            platform.saveSession(studySessionData, true);
                            getMillisec();
                            let startTwoTests = async function () {
                                let goTwoTests = async function () {
                                    // deleteFromSessionData();
                                    let doneTest1 = await start2tests(); // add promise and resolve
                                    if (doneTest1 == "done") {
                                        studySessionData.doneDay2 = 'doneDayTwo';
                                        studySessionData.expDaysDate = updatedDates.fullDate;
                                        platform.saveSession(studySessionData, true).then(() => {
                                            document.getElementById("endDayMsg").style.display = "inline";
                                            document.getElementById("endDayMsg").addEventListener("click", function () {
                                                showWinnings()
                                                setTimeout(() => {
                                                    platform.goToUrl("days/dayThree/dayThree.html");
                                                }, timeToFive())
                                                setTimeout(() => {
                                                    hideWinnings();
                                                    if (window.matchMedia("(orientation: landscape)").matches) {
                                                        document.getElementById("fiveAM").style.display = "inline";
                                                    } else {
                                                        document.getElementById("fiveAM_hor").style.display = "inline";
                                                    }
                                                }, 10000);
                                            })
                                        });
                                    }
                                }
                                goTwoTests()
                            }
                            startTwoTests()
                        }
                    }
                    goTwo();
                }
            } else {
                endGameOrient()
            }
        })
    })
}



// let getlastData = await getData();
// if (getlastData == "gotData") {
//     studySessionData = savedData[0][savedData[0].length - 1];
//     let updatedDates = updateDates();
