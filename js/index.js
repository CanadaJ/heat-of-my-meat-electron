var exec = require('child_process').exec;

var overlay = document.querySelector('.overlay');
var menuBar = document.querySelector('#menu-hamburger-icon');
var menuOptions = document.querySelector('.menu-options-container');
var mainContentWrapper = document.querySelector('.main-content-wrapper');
var mainContent = document.querySelector('.main-content');
var settingsArrow = document.querySelector('.temp-settings');

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

function testScroll() {
    if (mainContentWrapper.scrollTop === (mainContentWrapper.scrollHeight - mainContentWrapper.offsetHeight)) {
        if (!settingsArrow.classList.contains('bottom')) {
            settingsArrow.classList.add('bottom');
        }

        if (settingsArrow.classList.contains('top'))
        {
            settingsArrow.classList.remove('top');
        }
    }
    else 
    {
        if (settingsArrow.classList.contains('bottom')) {
            settingsArrow.classList.remove('bottom');
            settingsArrow.classList.add('top');
        }
    }
}

window.onload = windowLoad();

mainContentWrapper.onscroll = testScroll;