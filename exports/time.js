const DAYS = ['SUN','MON','TUE','WED','THU','FRI','SAT'];
export function initDays() {
    for (let i = 0; i < DAYS.length; i++) {
        let dayDiv = document.createElement("div");
        let currentDay = DAYS[i];
        dayDiv.setAttribute("id", currentDay);
        dayDiv.setAttribute("class", "day");
        dayDiv.innerHTML = currentDay;
        document.getElementById("days").appendChild(dayDiv);
    }
}

export function setTime(divId) {
    setInterval(function () {
        var now = new Date();
        setDay(now);
        if (document.getElementById(divId)) {
            document.getElementById(divId).innerHTML = prependZero(now.getMonth() + 1) + "." + prependZero(now.getDate()) + "." + now.getFullYear() + "\n"
                + prependZero(now.getHours()) + ":" + prependZero(now.getMinutes()) + ":" + prependZero(now.getSeconds());
        }
    }, 1000);
}

function prependZero(number){
    return number < 10? '0'+number:''+number;
}

function setDay(today) {
    let day = today.getDay();
    let dayList = document.getElementsByClassName("day");
    for (let k=0; k<dayList; k++) {
        dayList[k].style.color = "#505050";
    }

    for (let j=0; j<DAYS.length; j++) {
        if (DAYS[j] === DAYS[day]) {
            if (document.getElementById(DAYS[day])) {
                document.getElementById(DAYS[day]).style.color = "deepskyblue";
                break;
            }
        }
    }
}

