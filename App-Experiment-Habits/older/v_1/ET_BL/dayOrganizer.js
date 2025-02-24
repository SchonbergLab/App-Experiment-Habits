
function moveToDay() {
    platform.getAllSessions().then((data) => {
        getIndexSessionData(data).then((i) => {
            studySessionData = data[i];
            document.getElementById("moveToAppButton").style.display = "none";
            document.getElementById("front").style.display = "inline";
            document.getElementById("loading").style.display = "inline";
            // let div = document.getElementById("loading");
            // div.style.removeProperty("display");
            if ((typeof studySessionData == "undefined") || (studySessionData.doneInstructions == "")) {
                platform.goToUrl("instructions/instructions.html");
            } else if (studySessionData.doneDay1 != "doneDayOne") {
                if (studySessionData.doneDay1 == "") {
                    platform.goToUrl("days/dayOne/dayOne.html");
                } else {
                    document.getElementById("problem").style.display = "inline";
                }
            } else if ((studySessionData.doneDay1 == "doneDayOne") && (studySessionData.doneDay2 != "doneDayTwo")) {
                if (studySessionData.doneDay2 == "") {
                    platform.goToUrl("days/dayTwo/dayTwo.html");
                } else {
                    document.getElementById("problem").style.display = "inline";
                }
            } else if ((studySessionData.doneDay2 == "doneDayTwo") && (studySessionData.doneDay3 != "doneDayThree")) {
                if (studySessionData.doneDay3 == "") {
                    platform.goToUrl("days/dayThree/dayThree.html");
                } else {
                    document.getElementById("problem").style.display = "inline";
                }
            } else if ((studySessionData.doneDay3 == "doneDayThree") && (studySessionData.doneDay4 != "doneDayFour")) {
                if (studySessionData.doneDay4 == "") {
                    platform.goToUrl("days/dayFour/dayFour.html");
                } else {
                    document.getElementById("problem").style.display = "inline";
                }
            } else if (studySessionData.doneDay4 == "doneDayFour") {
                document.getElementById("endOfGame").style.display = "inline";
            }
        })
    });
}