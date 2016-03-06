var fs = require('fs'),
    childProcess = require('child_process'),
    xml2js = require('xml2js'),
    start = 0,
    end = 1,
    parser = new xml2js.Parser();

fs.readFile(__dirname + '/subscription_manager.xml', function (err, data) {
    parser.parseString(data, function (err, result) {
        var nodes = result.opml.body[0].outline[0].outline;
        nodes.forEach(function (node, index) {
            var url = node['$'].xmlUrl;
            url = url.substring(url.indexOf('=') + 1, url.length);
            var channel = 'https://www.youtube.com/channel/' + url;
            if (index > start && index < end) {
                childProcess.exec('open -a "Google Chrome" ' + channel);
            }
        });
    });
});
