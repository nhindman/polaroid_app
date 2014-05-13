define(function(require, exports, module) {
    var SlideData = {
        userId: '110285643122175278269',
        albumId: '6012747256857923569',
        picasaUrl: 'https://picasaweb.google.com/data/feed/api/user/',
        queryParams: '?alt=json&hl=en_US&access=visible&fields=entry(id,media:group(media:content,media:description,media:keywords,media:title))',
        defaultImage: 'https://lh3.googleusercontent.com/-CIO7HSTbmh0/U16Socrkw2I/AAAAAAAAAWk/mI9D5_ih0M8/s1178-no/1.jpg'
    };

    SlideData.getUrl = function() {
        return SlideData.picasaUrl + SlideData.userId + '/albumid/' + SlideData.albumId + SlideData.queryParams;
    };

    SlideData.parse = function(data) {
        var urls = [];
        data = JSON.parse(data);
        var entries = data.feed.entry;
        for (var i = 0; i < entries.length; i++) {
            var media = entries[i].media$group;
            urls.push(media.media$content[0].url);
        }
        return urls;
    };

    module.exports = SlideData;
});
