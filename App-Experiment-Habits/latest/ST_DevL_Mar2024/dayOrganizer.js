
function moveToDay() {
    platform.getAllSessions().then((data) => {
        getIndexSessionData(data).then((indexI) => {
            studySessionData = data[indexI];

            if ((typeof studySessionData == "undefined") || (studySessionData.doneInstructions == "")) {
                platform.goToUrl("instructions/instructions.html");
            } else if (studySessionData.doneDay1 != "doneDayOne") {
                if (studySessionData.doneDay1 == "") {
                    platform.goToUrl("days/dayOne/training.html");
                } else {
                    problemOrient()
                }
            } else if (extractDeviceName(userAgent) == studySessionData.userDevice) {
                if ((studySessionData.doneDay1 == "doneDayOne") && (studySessionData.doneDay2 != "doneDayTwo")) {
                    if (studySessionData.doneDay2 == "") {
                        platform.goToUrl("days/dayTwo/dayTwo.html");
                    } else {
                        problemOrient()
                    }
                } else if ((studySessionData.doneDay2 == "doneDayTwo") && (studySessionData.doneDay3 != "doneDevTest")) {
                    if (studySessionData.doneDay3 == "") {
                        platform.goToUrl("days/dayThree/dayThree.html");
                    } else {
                        problemOrient()
                    }
                } else if (studySessionData.doneDay3 == "doneDevTest") {
                    endGameOrient()
                } else {
                    problemOrient()
                }
            } else {
                problemOrient()
            }
        })
    });
}
