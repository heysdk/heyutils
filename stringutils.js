/**
 * Created by zhs007 on 2015/1/3.
 */

var path = require('path');

function hasWildcard(str) {
    return str.indexOf('*') >= 0;
}

function equWildcard(dest, wildcard) {
    var arr = wildcard.split('*');
    var max = arr.length;
    if (max > 0) {
        var begin = -1;
        for (var i = 0; i < max; ++i) {
            var cur = dest.indexOf(arr[i]);
            if (cur < 0 || cur < begin) {
                return false;
            }
        }

        return true;
    }

    return dest == wildcard;
}

function isCmdSpace(char) {
    if (' ' == char) {  // space
        return true;
    }
    else if ('  ' == char) {    // tab
        return true;
    }

    return false;
}

function isCmdQuotes(char) {
    if ('"' == char) {
        return true;
    }

    return false;
}

function splitCmd(str) {
    var max = str.length;
    var arr = [];
    var curstr = '';
    var isquotes = false;
    var isspace = true;
    for (var i = 0; i < max; ++i) {
        var curchar = str.charAt(i);

        if (isCmdQuotes(curchar)) {
            isquotes = !isquotes;

            continue ;
        }

        if (isquotes) {
            curstr += curchar;

            continue ;
        }

        if (!isCmdSpace(curchar)) {
            isspace = false;

            curstr += curchar;
        }
        else if (!isspace) {
            isspace = true;

            arr.push(curstr);
            curstr = '';
        }
    }

    if (curstr.length > 0) {
        arr.push(curstr);
    }

    return arr;
}

function splitPath(str) {
    var max = str.length;
    var arr = [];
    var curstr = '';

    for (var i = 0; i < max; ++i) {
        var curchar = str.charAt(i);
        if (curchar == '/' || curchar == '\\') {
            arr.push(curstr);
            curstr = '';
        }
        else {
            curstr += curchar;
        }
    }

    if (curstr.length > 0) {
        arr.push(curstr);
    }

    return arr;
}

function getFilename(str) {
    var arr = splitPath(str);
    var max = arr.length;
    if (max > 0) {
        return arr[max - 1];
    }

    return arr;
}

function makePath(arr, begin, nums) {
    var max = arr.length;
    if (begin < 0) {
        begin = 0;
    }

    if (nums + begin >= max) {
        nums = max - begin;
    }

    if (nums <= 0 || begin >= max) {
        return '';
    }

    var curpath = arr[begin];
    for (var i = 1; i < nums; ++i) {
        curpath = path.join(curpath, arr[begin + i]);
    }

    return curpath;
}

function makePathEx(basepath, arr, begin, nums) {
    var max = arr.length;
    if (begin < 0) {
        begin = 0;
    }

    if (nums + begin >= max) {
        nums = max - begin;
    }

    var curpath = basepath;
    for (var i = 0; i < nums; ++i) {
        curpath = path.join(curpath, arr[begin + i]);
    }

    return curpath;
}

exports.hasWildcard = hasWildcard;
exports.equWildcard = equWildcard;

exports.isCmdSpace = isCmdSpace;
exports.isCmdQuotes = isCmdQuotes;
exports.splitCmd = splitCmd;

exports.splitPath = splitPath;
exports.getFilename = getFilename;
exports.makePath = makePath;
exports.makePathEx = makePathEx;