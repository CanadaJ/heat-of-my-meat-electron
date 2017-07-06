var max31855 = require('max31855');

var sensor = new max31855();

sensor.readTempC(function(temp) {
  console.console.log(temp);
});
