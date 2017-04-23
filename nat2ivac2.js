var fs = require('fs');
var request = require('request-promise');

var url = 'https://pilotweb.nas.faa.gov/common/nat.html';

var tracks = []

request(url)
    .then((data) => {
        data = data.split(/\n/);

        for (var i = 0; i < data.length; i++) {
          if (data[i].charAt(1) === ' ') {
            tracks.push(data[i].split(' '));
          }
        }

        var output = '<maps>\n'

        for (var i = 0; i < tracks.length; i++) {
          output = output + '<map id="' + tracks[i][0] + '" name="' + tracks[i][0] + '" layer="100" text="true" visible="false" group="Tracks">\n';
          output = output + '<path stroke_color="tracks" stroke_width="1.5">\n';

          for (var j = 1; j < tracks[i].length; j++) {

              output = output + '<point ref="' + tracks[i][j] + '"/>\n';

          }

          output = output + '</path>\n</map>\n'
        }
        output = output + '</maps>';

        fs.writeFile('tracks.map', output, function(err) {
          if (err) {
            return console.error(err);
          }
        });
    })
    .catch(function(err) {
        console.log(err);
    });
