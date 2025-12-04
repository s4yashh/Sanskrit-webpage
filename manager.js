
function upanishadName(initialName) {
    var shlok_name = initialName;
    if (initialName == 0) {
        shlok_name = "ŚĀNTI MANTRA";
    }else if (initialName == 99) {
        shlok_name = "WHOLE UPANIṢAD";
    }
    return shlok_name
}

function getChapterName(initialName) {
    var shlok_name = initialName;
    if (initialName == 0) {
        shlok_name = "ŚĀNTI MANTRA";
    }else if (initialName == 99) {
        shlok_name = "WHOLE CHAPTER";
    }
    return shlok_name
}

function geetaName(initialName) {
    var shlok_name = initialName;
    if (initialName == 0) {
        shlok_name = "Whole Chapter";
    }else if (initialName == 99) {
        shlok_name = "End of Chapter";
    }
    return shlok_name
}

function getSearchResultTypeName(type) {
    switch (type) {
        case 'M':
            return 'Song';
        case 'U':
            return 'Upanishad';
        case 'G':
            return 'Geeta';
        default:
            return '';
    }
}

function getSearchResultName(item) {
    let type = item.type;
    switch (type) {
        case 'M':
            return item.music_name;
        case 'U':
            return upanishadName(item.shlok);
        case 'G':
            return item.chapter + ':' + geetaName(item.shlok);
        default:
            return '';
    }
}