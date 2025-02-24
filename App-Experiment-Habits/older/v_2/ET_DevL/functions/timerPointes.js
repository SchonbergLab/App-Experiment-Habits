
async function onloadPics() {
    return new Promise(resolve => {
        document.getElementById("redButton").style.display = "inline";
        document.getElementById("blueButton").style.display = "inline";
        document.getElementById("gameScreen").style.display = "inline";
        resolve("OK");
    })
};

let milliseconds = null
function getMillisec() {
    milliseconds = new Date().getTime();
    return milliseconds;
}

let now = null;
function msCount() {
    msIntAll = setInterval(function setTimer() {
        now = now + 100;
        if (now >= 1000000) {
            clearInterval(msIntAll);
        }
    }, 100);
};

// async function getIndexSessionData(data) {
//     let i = data.length - 1;
//     while (i >= 0) {
//         if (data[i].hasOwnProperty("startDate")) {
//             break;
//         }
//         i--;
//     }
//     return i;
// };

let findlastIndex = null;
let lastTimestamp = null;
let indexI = null;

async function getIndexSessionData(data) {
    for (let i = 0; i < data.length; i++) {
        if (data[i].hasOwnProperty("startDate")) {
            findlastIndex = data[i].createdAt;
            if (lastTimestamp == null) {
                lastTimestamp = findlastIndex;
            } else if (findlastIndex > lastTimestamp) {
                lastTimestamp = findlastIndex;
                indexI = i;
            }
        }
    }

    return indexI;
}

function dayDate() {
    if (studySessionData.startDate.substring(2, 3) == ":") {
        let dayDate = studySessionData.startDate.substring(0, 2);
        return dayDate;
    } else {
        let dayDate = studySessionData.startDate.substring(1, 2);
        return dayDate;
    }
}
// const d = new Date();
// function getStartDate() {
//     let day = d.getDate();
//     let month = 1 + d.getMonth();
//     let year = d.getFullYear();
//     day = checkTime(day);
//     month = checkTime(month);
//     return day + ':' + month + ":" + year;
// }

const d = new Date();
let h = d.getHours();
let m = d.getMinutes();
let s = d.getSeconds();
let ms = d.getMilliseconds();
h = checkTime(h);
m = checkTime(m);
s = checkTime(s);
ms = checkTime(ms);
let startTime = h + ":" + m + ":" + s + ":" + ms;


// function getStartDate() {
//     let day = d.getDate();
//     let month = 1 + d.getMonth();
//     let year = d.getFullYear();
//     day = checkTime(day);
//     month = checkTime(month);
//     return day + ':' + month + ":" + year;
// }


function checkTime(i) {
    if (i < 10) { i = "0" + i }
    else { i = i };
    return i;
};


function getTodayStartTime() {
    let todayStartDetails = new Date();
    let hToday = todayStartDetails.getHours();
    let mToday = todayStartDetails.getMinutes();
    let sToday = todayStartDetails.getSeconds();
    let msToday = todayStartDetails.getMilliseconds();
    hToday = checkTime(hToday);
    mToday = checkTime(mToday);
    sToday = checkTime(sToday);
    msToday = checkTime(msToday);
    let startTimeToday = hToday + ":" + mToday + ":" + sToday + ":" + msToday;
    return startTimeToday;
}

function getTodayDate() {
    let todayStartDetails = new Date();
    let dayToday = todayStartDetails.getDate();
    let monthToday = 1 + todayStartDetails.getMonth();
    let yearToday = todayStartDetails.getFullYear();
    dayToday = checkTime(dayToday);
    monthToday = checkTime(monthToday);
    let today = dayToday + ':' + monthToday + ":" + yearToday;
    return (today);

}

function timeToWait() {
    let todayEndDetails = new Date();
    let hToday = todayEndDetails.getHours();
    let mToday = todayEndDetails.getMinutes();
    let sToday = todayEndDetails.getSeconds();
    let msToday = todayEndDetails.getMilliseconds();
    hChange = (28 - checkTime(hToday)) * 3600000;
    mChange = (60 - checkTime(mToday)) * 60000;
    sChange = (60 - checkTime(sToday)) * 1000;
    msChange = (999 - checkTime(msToday));

    let msToWait = hChange + mChange + sChange + msChange;
    return (msToWait);
}

let studySessionData = {
    startDate: "",
    doneInstructions: "",
    isDayDone: "",
    doneTest1: "",
    doneTest2: "",
    expDaysDate: ""
};

function deleteFromSessionData() {
    delete studySessionData._id;
    delete studySessionData.createdAt;
    delete studySessionData.subId;
}

function updateDates() {
    let fullDate = new Date();
    let timeNow = getTodayStartTime();
    let today = getTodayDate();
    if ((studySessionData == undefined) || (studySessionData.doneInstructions == "")) {
        return
    } else if ((studySessionData.isDayDone == "") && (studySessionData.doneInstructions != "")) {
        yesterday = null;
        yesterdayPlusOne = null;
        nextDay = new Date(studySessionData.expDaysDate)
        yesterdayMinusOne = nextDay.setDate(nextDay.getDate() - 1);
        yesterdayMinusOne = new Date(yesterdayMinusOne);
    } else {
        // let yesterday = new Date(saveData.expDays.date= new Date(jatos.studySessionData.expDaysDate);
        yesterday = new Date(studySessionData.expDaysDate)
        nextDay = new Date(studySessionData.expDaysDate)
        yesterdayPlusOne = nextDay.setDate(nextDay.getDate() + 1);
        yesterdayPlusOne = new Date(yesterdayPlusOne)
        yesterdayMinusOne = yesterday;
    }
    return { fullDate, timeNow, today, yesterday, yesterdayPlusOne, yesterdayMinusOne }
}


const todayHeb = ":היום הרווחת";
const redCoinsHeb = ":מטבעות אדומים";
const blueCoinsHeb = ":מטבעות כחולים";
const seeYouTomorrowHeb = "(:!נתראה מחר";
const gameOverHeb = "!המשחק הסתיים";
const totWinsBlueHeb = ":סה״כ מטבעות כחולים שנצברו";
const totWinsRedHeb = ":סה״כ מטבעות אדומים שנצברו";
const thanksForPlayingHeb = "!תודה ששיחקתם";
const contectUsHeb = "אנא פנו אלינו במייל";

function showWinningsEnd(sum) {
    document.getElementById("blueButton").style.display = "none";
    document.getElementById("redButton").style.display = "none";
    document.getElementById("endOfGameMessage").style.display = "inline";
    document.getElementById("gameOver").innerHTML = gameOverHeb;
    document.getElementById("totWinsBlue").innerHTML = sum.blueSum + " " + totWinsBlueHeb;
    document.getElementById("totWinsRed").innerHTML = sum.redSum + " " + totWinsRedHeb;
    document.getElementById("thanksForPlaying").innerHTML = thanksForPlayingHeb;
    document.getElementById("contectUs").innerHTML = contectUsHeb;
}

function showWinnings() {

    let redWinsLength = correctFirstRedPress.length + correctFirstRedPressYellow.length + correctFirstRedPressStar.length; //+ correctRedPressDevtest.length
    let blueWinsLength = correctFirstBluePress.length + correctFirstBluePressStar.length + correctFirstBluePressYellow.length; //+ correctBluePressDevtest.length
    document.getElementById("blueButton").style.display = "none";
    document.getElementById("redButton").style.display = "none";
    document.getElementById("endOfDayMessage").style.display = "inline";
    document.getElementById("todayWins").innerHTML = todayHeb;
    document.getElementById("redWins").innerHTML = redWinsLength + " " + redCoinsHeb;
    document.getElementById("blueWins").innerHTML = blueWinsLength + " " + blueCoinsHeb;
    document.getElementById("seeYouTomorrow").innerHTML = seeYouTomorrowHeb;
}

function hideWinnings() {
    document.getElementById("endOfDayMessage").style.display = "none";
    document.getElementById("todayWins").innerHTML = "";
    document.getElementById("redWins").innerHTML = "";
    document.getElementById("blueWins").innerHTML = "";
    document.getElementById("seeYouTomorrow").innerHTML = "";
}
function hideWinningsEnd() {
    document.getElementById("endOfGameMessage").style.display = "none";
    document.getElementById("gameOver").innerHTML = "";
    document.getElementById("totWinsBlue").innerHTML = "";
    document.getElementById("totWinsRed").innerHTML = "";
    document.getElementById("thanksForPlaying").innerHTML = "";
    document.getElementById("contectUs").innerHTML = "";
}

function timeToFive() {
    let updatedDates = updateDates();
    let hours = updatedDates.fullDate.getHours();
    let minutes = updatedDates.fullDate.getMinutes();
    timeToWait = ((24 - hours) * 60 + (60 - minutes) + 300) * 10000;
    return timeToWait;
}

function timeToFiveSameDay() {
    let updatedDates = updateDates();
    let hours = updatedDates.fullDate.getHours();
    let minutes = updatedDates.fullDate.getMinutes();
    timeToWait = ((5 - hours) * 60 + (60 - minutes)) * 1000;
    return timeToWait;
}

async function sumCorrectFirstPress() {
    return new Promise((resolve, reject) => {
        platform.getAllSessions().then((data) => {
            let totalBlueSum = 0;
            let totalRedSum = 0;

            data.forEach((entry) => {
                for (const key in entry) {
                    if (key.startsWith('correctFirstBluePress')) {
                        const pressArray = entry[key];
                        totalBlueSum += pressArray.length;
                    } else if (key.startsWith('correctFirstRedPress')) {
                        if (key == 'correctFirstRedPressDevtest') {
                            continue;
                        }
                        const pressArray = entry[key];
                        totalRedSum += pressArray.length;
                    }
                }
            });
            const sum = { blueSum: totalBlueSum, redSum: totalRedSum };
            totalBlues.push(sum.blueSum);
            totalReds.push(sum.redSum);


            resolve(sum);
        })
            .catch((error) => {
                reject(error);
            });
    });
};


// Usage:
// sumCorrectFirstPress()
//     .then((sum) => {
//         // Access the 'sum' object here
//         console.log(sum);
//     })
//     .catch((error) => {
//         console.error(error);
//     });

// async function sumCorrectFirstPress() {
//     platform.getAllSessions().then((data) => {
//         const dateMap = new Map();
//         data.forEach(entry => {
//             if (('correctFirstBluePress' in entry && 'correctFirstRedPress' in entry) ||
//                 ('correctFirstBluePressYellow' in entry && 'correctFirstRedPressYellow' in entry) ||
//                 ('correctFirstBluePressStar' in entry && 'correctFirstRedPressStar' in entry) ||
//                 ('correctFirstRedPressDevtest' in entry)) {
//                 const { todayDate } = entry;
//                 const key = todayDate;
//                 const sumBlue =
//                     entry.correctFirstBluePress?.length ||
//                     entry.correctFirstBluePressYellow?.length ||
//                     entry.correctFirstBluePressStar?.length ||
//                     0;
//                 const sumRed =
//                     entry.correctFirstRedPress?.length ||
//                     entry.correctFirstRedPressYellow?.length ||
//                     entry.correctFirstRedPressStar?.length ||
//                     entry.correctFirstRedPressDevtest?.length ||
//                     0;
//                 const existing = dateMap.get(key);
//                 if (existing) {
//                     const { blueMax, redMax } = existing;
//                     if (sumBlue > blueMax) existing.blueMax = sumBlue;
//                     if (sumRed > redMax) existing.redMax = sumRed;
//                 } else {
//                     dateMap.set(key, { blueMax: sumBlue, redMax: sumRed });
//                 }
//             }
//         });
//         const sum = { blueSum: 0, redSum: 0 };
//         dateMap.forEach(({ blueMax, redMax }) => {
//             sum.blueSum += blueMax;
//             sum.redSum += redMax;
//         });

//     })
//     return sum
// }
// ***** consts: **** 

const correctRedPress = [];
const correctBluePress = [];
const correctFirstRedPress = [];
const correctFirstBluePress = [];
const incorrectRedPress = [];
const incorrectBluePress = [];
const redChoice = [];
const blueChoice = [];
const allRedPresses = [];
const allBluePresses = [];
const allCorrectFirstPress = [];
const allChoices = [];

const correctRedPressStar = [];
const correctBluePressStar = [];
const correctFirstRedPressStar = [];
const correctFirstBluePressStar = [];
const incorrectRedPressStar = [];
const incorrectBluePressStar = [];
const redChoiceStar = [];
const blueChoiceStar = [];
const allRedPressesStar = [];
const allBluePressesStar = [];
const allCorrectFirstPressStar = [];
const allChoicesStar = [];
const allStars = [];
const howManyStars = [];

const correctRedPressYellow = [];
const correctBluePressYellow = [];
const correctFirstRedPressYellow = [];
const correctFirstBluePressYellow = [];
const incorrectRedPressYellow = [];
const incorrectBluePressYellow = [];
const redChoiceYellow = [];
const blueChoiceYellow = [];
const yellowChoiceYellow = [];
const allRedPressesYellow = [];
const allBluePressesYellow = [];
const allCorrectFirstPressYellow = [];
const allChoicesYellow = [];
const howManyYellows = [];

const correctRedPressDevtest = [];
const correctBluePressDevtest = [];
const correctFirstRedPressDevtest = [];
const correctFirstBluePressDevtest = [];
const incorrectRedPressDevtest = [];
const incorrectBluePressDevtest = [];
const redChoiceDev = [];
const blueChoiceDev = [];
const allRedPressesDev = [];
const allBluePressesDev = [];
const allCorrectFirstPressDev = [];
const allChoicesDev = [];
const devButton = [];

const totalBlues = [];
const totalReds = [];

let countingCars = null;
let breaks = null;
