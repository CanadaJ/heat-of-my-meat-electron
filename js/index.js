var exec = require('child_process').exec;
var moment = require('moment');
var chart = require('chart.js');

var overlay = document.querySelector('.overlay');
var menuBar = document.querySelector('#menu-hamburger-icon');
var menuOptions = document.querySelector('.menu-options-container');
var mainContentWrapper = document.querySelector('.main-content-wrapper');
var mainContent = document.querySelector('.main-content');
var settingsArrow = document.querySelector('.temp-settings');
var probeTemp = document.querySelector('#probe-temp');

// temp graph
let graphCtx = document.getElementById('temp-graph').getContext('2d');
let tempGraph = null;
let temps = {
  labels: [],
  datasets: [{
    label: "Probe 0",
    backgroundColor: 'rgb(255, 99, 132)',
    borderColor: 'rgb(255, 99, 132)',
    pointRadius: 5,
    fill: false,
    spanGaps: false,
    data: []
  }]
};

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
  // ask python for a temp
  var probe = exec('python probeDriver.py', function (error, stdout, stderr) {

    console.log(error);
    console.log(stdout);
    console.log(stderr);

    let query = `insert into temp values(${stdout}, now());`;

    console.log(query);

    dbConn.query(query, function(err) {

        if(err) console.log(err);

    });

    probeTemp.innerHTML = `${stdout} F`;

    updateTempGraph(stdout, Date.now());

  });
}

function updateTempGraph(temp, dt) {
  console.log(tempGraph);

  // shift array if its too long
  if (tempGraph.chart.data.labels.length === 10)
  {
    tempGraph.chart.data.labels.shift();
  }

  tempGraph.chart.data.labels.push("");
  tempGraph.chart.data.datasets.forEach((dataset) => {

    // shift if needed
    if (dataset.data.length === 10)
    {
      dataset.data.shift();
    }

    dataset.data.push(temp);
  });
  tempGraph.chart.update();
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

    // set up graph
    tempGraph = new Chart(graphCtx, {
      type: 'line',
      data: temps,
      options: {
        legend: {
          display: false
        },
        tooltips: {
          display: false
        },
        elements: {
          line: {
            tension: 0
          }
        },
        scales: {
          yAxes: [{
            ticks: {
              min: 50,
              max: 100
            }
          }],
          xAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });

    // get an initial temp
    getTemps();

    setInterval(getTemps, 5000);
}

window.onload = setupApp();

mainContentWrapper.onscroll = testScroll;
