
function moveToDay() {
    platform.getAllSessions().then((data) => {
        getIndexSessionData(data).then((i) => {
            studySessionData = data[i];
            document.getElementById("moveToAppButton").style.display = "none";
            document.getElementById("front").style.display = "inline";
            document.getElementById("loading").style.display = "inline";
            if ((typeof studySessionData == "undefined")) {
                platform.goToUrl("instructions/instructions.html");
            } else if (studySessionData.doneDay1 != "doneDayOne") {
                if (studySessionData.doneDay1 == "") {
                    platform.goToUrl("days/dayOne/dayOne.html");
                } else {
                    document.getElementById("problem").style.display = "inline";
                }
            } else if ((studySessionData.doneDay1 == "doneDayOne") && (studySessionData.doneDay2 != "doneDayTwo") || studySessionData._id == "63c14efb7c10d146b25b5cab") {
                if (studySessionData.doneDay2 == "") {
                    platform.goToUrl("days/dayTwo/dayTwo.html");
                } else {
                    document.getElementById("problem").style.display = "inline";
                }
            } else if (studySessionData.doneDay2 == "doneDayTwo") {
                document.getElementById("endOfGame").style.display = "inline";
            }
        })
    });
}
