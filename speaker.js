var streamArray = require("stream-array");
var makeProp = require("make-prop-stream");
var speechStream = require("speech-stream");

// var forceSpeed = 130;
// var randomvoice = require("randomvoice")();
// randomvoice.speed = forceSpeed || randomvoice.speed;

const Speaker = function(config) {
  this.config = config;
  this.voice = config.voice;
};
exports.Speaker = Speaker;

Speaker.prototype = {
  say: function(phrase, cbk) {
    console.log('speaker says:', phrase);
    var Speaker = require('speaker');
    var wav = require('wav');
    var reader = new wav.Reader();
    // the "format" event gets emitted at the end of the WAVE header
    reader.on('format', function (format) {
      // the WAVE header is stripped from the output of the reader
      reader.pipe(new Speaker(format));
    });
    reader.on('end', function () {
      if(cbk) cbk();
    });
    // console.log('random voice options: ', randomvoice);
    streamArray([phrase])
    .pipe(makeProp("message"))
    .pipe(speechStream(this.voice))
    .pipe(reader)
  }
}

