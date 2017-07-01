var exec = require('child_process').exec;
var moment = require('moment');

var overlay = document.querySelector('.overlay');
var menuBar = document.querySelector('#menu-hamburger-icon');
var menuOptions = document.querySelector('.menu-options-container');
var mainContentWrapper = document.querySelector('.main-content-wrapper');
var mainContent = document.querySelector('.main-content');
var settingsArrow = document.querySelector('.temp-settings');

// temp graph
let tempGraph = document.querySelector('#temp-graph');

// config
const config = require('./config');

// components
const Clock = require('./js/Components/Clock');

// sql
var mysql = require('mysql');

var dbConn = null;

// globals
let clock = null;

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

tempGraph.addEventListener('click', function () {

    // do an insert into the db
    let randomTemp = (Math.random() * (300 - 150) + 150).toFixed(2);
    let time = moment().format('YYYY-MM-DD HH:mm:ss');

    let query = `CALL RecordTemp (1, null, ${randomTemp}, "${time}")`

    dbConn.query(query, function(err) {

        if(err) console.log(err);

    });

});

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

function getTemps() {
    dbConn.query('CALL GetTempsForProbe(1, 10)', function(err, rows) {
        if (err) console.log(err);

        console.log(rows);
    });
}

function setClockTime() {
    document.querySelector('#menu-clock').innerHTML = clock.getTimeString();
}

function connectToDb() {

    let status = null;

    dbConn = mysql.createConnection({
        host: config.db.host,
        user: config.db.user,
        password: config.db.password,
        database: config.db.database
    });

    dbConn.connect(function(err) {
        if (err) {
            status = false;
            console.log(err);
        } else {
            status = true;
        }
    });

    return status;
}

function setupApp() {
    // perform setup for the app

    // is db connected

    if (!connectToDb())
    {
        // show error
    }

    // are probes connected
    // can we talk to the clock

    clock = new Clock();
    setInterval(setClockTime, 500);

    setInterval(getTemps, 5000);
}

window.onload = setupApp();

mainContentWrapper.onscroll = testScroll;