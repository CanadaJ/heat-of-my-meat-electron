var overlay = document.querySelector('.overlay');
var menuBar = document.querySelector('#menu-hamburger-icon');
var menuOptions = document.querySelector('.menu-options-container');

menuBar.addEventListener('click', function() {
    menuBar.classList.toggle('is-active');
    overlay.classList.toggle('fadeIn');
    overlay.classList.toggle('fadeOut');

    if (menuOptions.classList.contains('swipeOut') || menuOptions.classList.contains('swipeIn')) {
        // swipe in
        menuOptions.classList.toggle('swipeIn');
        menuOptions.classList.toggle('swipeOut');
    } else {
        // initial state, swipe in
        menuOptions.classList.toggle('swipeIn');
    }
});

overlay.addEventListener('click', function() {
    menuBar.classList.toggle('is-active');
    overlay.classList.toggle('fadeIn');
    overlay.classList.toggle('fadeOut');

    if (menuOptions.classList.contains('swipeOut') || menuOptions.classList.contains('swipeIn')) {
        // swipe in
        menuOptions.classList.toggle('swipeIn');
        menuOptions.classList.toggle('swipeOut');
    } else {
        // initial state, swipe in
        menuOptions.classList.toggle('swipeIn');
    }
});

function clock() {
    var date = new Date();
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var seconds = date.getSeconds();

    hours = hours > 12 ? hours - 12 : hours;
    minutes = minutes < 10 ? `0${minutes}` : minutes;
    seconds = seconds < 10 ? `0${seconds}` : seconds;

    document.querySelector('#menu-clock').innerHTML = `${hours}:${minutes}:${seconds}`;

    var timeout = setTimeout(clock, 500);
}

function windowLoad() {
    clock();
}

window.onload = windowLoad();