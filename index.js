// SONG - Pirate of the Caribbean

let fs = require("fs");

fs.readFile('song.json', 'utf-8', function(error, data) {
    data = JSON.parse(data);
    let song = [];
    for (let i = 0; i < data.notes.length; i++) {
        let array = [];
        array.push(data.notes[i], data.durations[i].replace("'", ""));
        song.push(array);
    }
    console.log(song);
});