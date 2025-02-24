
function moveToDay() {
    platform.getAllSessions().then((data) => {
        getIndexSessionData(data).then((i) => {
            studySessionData = data[i];
            let updatedDates = updateDates();
            if ((11 == Number(getTodayDate().slice(0, 2))) && (studySessionData.doneTest1 != "doneTest1")) { // if the date of the tests day is the same as today
                platform.goToUrl("days/twoTests/twoTests.html");
            } else if ((typeof studySessionData == "undefined") || (studySessionData.doneInstructions == "")) {
                platform.goToUrl("instructions/instructions.html");
                studySessionData.doneInstructions = "stratIns";
            } else if (studySessionData.doneInstructions == "doneInstructions") {
                if ((updatedDates.fullDate.getDate() == Number(dayDate())) && (studySessionData.isDayDone != "done") && (studySessionData.doneTest1 != "doneTest1")) {
                    platform.goToUrl("days/training/training.html");
                } else if ((studySessionData.isDayDone != "done") && (updatedDates.fullDate.getDate() != Number(dayDate()))) {
                    document.getElementById("problem").style.display = "inline";
                } else if ((studySessionData.isDayDone == "done") && (updatedDates.fullDate.getDate() == updatedDates.yesterday.getDate())) {
                    if (window.matchMedia("(orientation: landscape)").matches) {
                        document.getElementById("moveToAppButton").style.display = "none";
                        document.getElementById("loading").style.display = "none";
                        document.getElementById("fiveAM").style.display = "inline";
                    } else {
                        document.getElementById("moveToAppButton").style.display = "none";
                        document.getElementById("loading").style.display = "none";
                        document.getElementById("fiveAM_hor").style.display = "inline";
                    }
                    setTimeout(() => {
                        moveToDay();
                    }, timeToFive());
                } else if ((studySessionData.isDayDone == "done") && (updatedDates.fullDate.getDate() == updatedDates.yesterdayPlusOne.getDate())) { // if the day is done and the date is the same as yesterday+1
                    if (0 <= updatedDates.fullDate.getHours() & updatedDates.fullDate.getHours() < 5) {
                        document.getElementById("moveToAppButton").style.display = "none";
                        document.getElementById("loading").style.display = "none";
                        document.getElementById("fiveAM").style.display = "inline";
                        setTimeout(() => {
                            moveToDay();
                        }, timeToFiveSameDay());
                    } else {
                        deleteFromSessionData();
                        platform.goToUrl("days/training/training.html");
                    }
                } else if ((studySessionData.doneTest1 == "doneTest1") && (updatedDates.fullDate.getDate() == updatedDates.yesterdayPlusOne.getDate())) { // if the day is done and the date is the same as yesterday+1
                    if (0 <= updatedDates.fullDate.getHours() & updatedDates.fullDate.getHours() < 5) {
                        document.getElementById("moveToAppButton").style.display = "none";
                        document.getElementById("loading").style.display = "none";
                        document.getElementById("fiveAM").style.display = "inline";
                        setTimeout(() => {
                            moveToDay();
                        }, timeToFiveSameDay());
                    } else {
                        deleteFromSessionData();
                        platform.goToUrl("days/devTest/devTest.html");
                    }
                } else if (studySessionData.doneTest2 = "doneTest2") {
                    document.getElementById("moveToAppButton").style.display = "none";
                    document.getElementById("loading").style.display = "none";
                    document.getElementById("endOfGame").style.display = "inline";


                } else {
                    document.getElementById("moveToAppButton").style.display = "none";
                    document.getElementById("loading").style.display = "none";
                    document.getElementById("endOfGame").style.display = "inline";
                }
            } else {
                document.getElementById("moveToAppButton").style.display = "none";
                document.getElementById("loading").style.display = "none";
                document.getElementById("problem").style.display = "inline";
            }
        })
    });
}