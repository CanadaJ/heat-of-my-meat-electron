// class for showing the current time in the app
class Clock {
    constructor() {
        
    }

    getTimeString() {
        // todo: use a real time clock
        var date = new Date();
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var seconds = date.getSeconds();

        hours = hours > 12 ? hours - 12 : hours;
        minutes = minutes < 10 ? `0${minutes}` : minutes;
        seconds = seconds < 10 ? `0${seconds}` : seconds;

        return `${hours}:${minutes}:${seconds}`;
    }
}

module.exports = Clock;