iD.BackgroundSource = {};

// derive the url of a 'quadkey' style tile from a coordinate object
iD.BackgroundSource.template = function(template, subdomains) {
    return function(coord) {
        var u = '';
        for (var zoom = coord[2]; zoom > 0; zoom--) {
            var byte = 0;
            var mask = 1 << (zoom - 1);
            if ((coord[0] & mask) !== 0) byte++;
            if ((coord[1] & mask) !== 0) byte += 2;
            u += byte.toString();
        }
        // distribute requests against multiple domains
        var t = subdomains ?
            subdomains[coord[2] % subdomains.length] : '';
        return template
            .replace('{t}', t)
            .replace('{u}', u)
            .replace('{x}', coord[0])
            .replace('{y}', coord[1])
            .replace('{z}', coord[2]);
    };
};

iD.BackgroundSource.Bing = iD.BackgroundSource.template(
    'http://ecn.t{t}.tiles.virtualearth.net/tiles/a{u}.jpeg?g=587&mkt=en-gb&n=z',
    [0, 1, 2, 3]);

iD.BackgroundSource.Tiger2012 = iD.BackgroundSource.template(
    'http://{t}.tile.openstreetmap.us/tiger2012_roads_expanded/{z}/{x}/{y}.png',
    ['a', 'b', 'c']);

iD.BackgroundSource.OSM = iD.BackgroundSource.template(
    'http://{t}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    ['a', 'b', 'c']);
