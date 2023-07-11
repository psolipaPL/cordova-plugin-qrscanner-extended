#!/usr/bin/env node

module.exports = function(context) {

  var fs = require('fs'),
      path = require('path');

  var platformRoot = path.join(context.opts.projectRoot, 'platforms/android');
  var manifestFile = path.join(platformRoot, 'app/src/main/AndroidManifest.xml');

  console.log("Platform ROOT: " + platformRoot);
  console.log("Manifest file: " + manifestFile);

  // If manifest file exists
  if (fs.existsSync(manifestFile)) {
    console.log("Manifest file exists");

    // Read manifest file
    fs.readFile(manifestFile, 'utf8', function (err, data) {
      if (err) {
        throw new Error('Unable to find AndroidManifest.xml: ' + err);
      }

      // Replace 'sensorLandscape' with 'fullSensor'
      data = data.replace(/sensorLandscape/g, 'fullSensor');


      // Replace manifest file with updated version
      if(data){
        fs.writeFile(manifestFile, data, 'utf8', function (err) {
          if (err) throw new Error('Unable to write AndroidManifest.xml: ' + err);
        })
      }
    });
  } else {
    console.log("Manifest file DOES NOT exist");
    throw new Error('Unable to find AndroidManifest.xml');
  }
};