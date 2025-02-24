// get criterion functions: 
let criterionCheck = null;

function checkCorrArray() {
    redCorArray = correctRedPress.slice(correctRedPress.findIndex(checkTime));
    blueCorArray = correctBluePress.slice(correctBluePress.findIndex(checkTime));
    return { redCorArray, blueCorArray }
}

function checkTime(time) {
    lastTwoMin = new Date().getTime() - milliseconds - 120000;
    return time > lastTwoMin
}


function getCriterion() {
    criteriaTimeout = setTimeout(() => {
        msIntr = setInterval(function setTimer() {

            let corrLast = new Array(checkCorrArray());
            let zeroArray = new Array(120 - corrLast.length).fill(0);
            let oneArray = new Array(corrLast.length).fill(1);
            let binaryPress = oneArray.concat(zeroArray);
            if (d3.mean(binaryPress) >= 0.75 || criterionCheck >= 5) {
                if (d3.variance(binaryPress) <= 0.0025) {
                    criterion.push(new Date().getTime() - milliseconds);
                    clearInterval(msIntr);
                }
            } else {
                zeroArray, binaryPress, oneArray, corrLast = null;
                criterionCheck++;
            }
        }, 60000);
    }, 180000)
};