/**
 * Created by zhs007 on 15/2/9.
 */

var console = require('console');
var fileutils = require('../fileutils');

var srcpath = '/Users/zhs007/work/github/sample-cocos2dx3.2/proj.android.heysdk';
var destpath = '/Users/zhs007/work/github/sample-cocos2dx3.2/proj.android.kuaiwan';

fileutils.copyFileOrDir(srcpath, destpath, function (src, dest, isok) {
    console.log('copy callback ' + src + ' ' + dest + ' ' + isok);
});