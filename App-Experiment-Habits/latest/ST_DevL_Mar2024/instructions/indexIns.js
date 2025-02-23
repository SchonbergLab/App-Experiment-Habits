
// move to main function
function timeline() {
    platform.getAllSessions().then((data) => {
        if ((typeof data == "undefined") || (studySessionData.doneInstructions == "")) {
            let updatedDates = updateDates();
            studySessionData.startDate = startDate;
            studySessionData.userDevice = userDevice;
            let goIns = async function () {
                let doneInstructions = await startFirstDay();
                studySessionData.doneInstructions = "stratIns";
                if (doneInstructions == "doneInstructions") {
                    studySessionData.doneInstructions = "doneInstructions";
                    studySessionData.expDaysDate = updatedDates.fullDate;
                    platform.saveSession(studySessionData, true).then(() => {
                        platform.goToUrl("instructions/questions/Multiple-Choice-Quiz-JavaScript-master/index.html")
                    });
                } else {
                    moveToDay()
                }
            }
            goIns();
        }
    })

}


