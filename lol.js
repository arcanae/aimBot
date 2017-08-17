// Adapted from Johnny-Five Piezo example for NodeBots session at JSConf CN

let fs = require("fs");
var five = require("johnny-five");
let board = new five.Board({ port: '/dev/ttyUSB3' });
var opts = {};
opts.port = process.argv[2] || "";
//====================================
var five = require("johnny-five");
var pixel = require("node-pixel");

var opts = {};
opts.port = process.argv[2] || "";

var board = new five.Board(opts);
var strip = null;

var fps = 3; // how many frames per second do you want to try?

board.on("ready", function() {

    console.log("Board ready, lets add light");

    strip = new pixel.Strip({
        data: 13,
        length: 2,
        board: this,
        controller: "FIRMATA",
    });

    strip.on("ready", function() {

        console.log("Strip ready, let's go");
        console.log("Press Ctrl + c twice to quit.");

        var colors = ["#440000", "#000044"];
        var current_colors = [0, 1];
        var current_pos = [0, 1];
        var blinker = setInterval(function() {

            strip.color("#000"); // blanks it out
            for (var i = 0; i < current_pos.length; i++) {
                if (++current_pos[i] >= strip.stripLength()) {
                    current_pos[i] = 0;
                    if (++current_colors[i] >= colors.length) current_colors[i] = 0;
                }
                strip.pixel(current_pos[i]).color(colors[current_colors[i]]);
            }
            strip.show();
        }, 1000 / fps);
    });
});




//====================================

board.on("ready", function() {
    // Creates a piezo object and defines the pin to be used for the signal
    var piezo = new five.Piezo(8);

    // Plays a song
    // SONG - Pirate of the Caribbean


    let song = [];
    fs.readFile('song.json', 'utf-8', function(error, data) {
        data = JSON.parse(data);
        for (let i = 0; i < data.notes.length; i++) {
            let array = [];
            array.push(data.notes[i], data.durations[i]);
            song.push(array);
            // console.log(song);
            // piezo.play({
            //     song: song,
            //     tempo: 62.5
            // });

            // let delay = 0;
            // for (let note of song) {
            //     delay += 62.5 * note[1];
            //     setTimeout(function() {
            //         var led = new five.Led.RGB({
            //             pins: {
            //                 red: 6,
            //                 green: 5,
            //                 blue: 3
            //             }
            //         });
            //         setTimeout(function() {
            //             var led = new five.Led.RGB({
            //                 pins: {
            //                     red: 0,
            //                     green: 0,
            //                     blue: 0
            //                 }
            //             });
            //         }, 7.8125);
            //     }, delay);
            // }
        }
    });
});