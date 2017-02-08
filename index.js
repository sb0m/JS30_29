var interval;

window.onload = function () {
    let seconds;
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => button.addEventListener('click', function () {
        if (timer) clearInterval(interval);
        seconds = button.dataset.sec;
        timer(seconds);
        displayEndTime(seconds);
    }));

    const form = document.querySelector('form');
    form.addEventListener('submit', function (e) {
        e.preventDefault();
        /**
         * !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
         * if you have a name on an elment you can just select it by document.elementName
         * works for different levels
         */
        let minutes = this.minutes.value;
        if ((timer) && (minutes >= 0)) clearInterval(interval);
        if (minutes >= 0) {
            seconds = minutes * 60;
            this.reset();
            timer(seconds);
            displayEndTime(seconds);
        }
    });
}

function countdown(now, then) {
    interval = setInterval(() => {
        const secondsleft = Math.round((then - Date.now()) / 1000);
        displayTimeLeftseconds(secondsleft);
        /**this doesn't stop the function but it won't show anything anymore
         * -> clearInterval will cancel the interval function instead
        */
        if (secondsleft <= 0) {
            clearInterval(countdown);
            clearSpans();
            return;
        }
    }, 100);
}

function timer(seconds) {
    const now = Date.now();
    const then = now + seconds * 1000;
    countdown(now, then);
}

function clearSpans() {
    const span1 = document.querySelector('.timeLeft');
    const span2 = document.querySelector('.text');
    const text1 = "!Too late!";
    const text2 = "End time already passed";
    span1.textContent = text1;
    span2.textContent = text2;
}

function displayTimeLeftseconds(seconds) {
    const span = document.querySelector('.timeLeft');
    const minutes = Math.floor(seconds / 60);
    const sec = seconds % 60;
    const text = `${minutes}:${sec < 10 ? '0' : ''}${sec}`;
    span.textContent = text;
}

function displayEndTime(seconds) {
    const then = Date.now() + seconds * 1000;
    const back = new Date(then);
    const minutes = back.getMinutes();
    const hours = back.getHours();
    const span = document.querySelector('.time');
    const text = `${hours}:${minutes < 10 ? '0' : ''}${minutes}`;
    span.textContent = text;
}