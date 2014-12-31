/**
 * Created by zhs007 on 2014/12/31.
 */
var exec = require('../exec');
var path = require('path');
var console = require('console');

var heysdk_root = '../../../gameengine/cocos2d-x-2.2.5/heysdk/';


var _heysdk_root = path.join(__dirname, heysdk_root);

console.log(_heysdk_root);
//exec.checkPlatform();

var lst = [];

// heycp abc.a dest.a
// heycp abc.a destdir/
// heycp *.a destdir/
// heycp srcdir destdir
// heycp srcdir destdir/
exec.addCmdEx(lst, 'heycp build/libheysdkandroidstatic_cc2/obj/local/armeabi/libheysdkcpp.a prebuild/android-cc2/libs/armeabi/libheysdkcpp.a', _heysdk_root);
exec.addCmdEx(lst, 'heycp build/libheysdkandroidstatic_cc2/bin/libheysdkandroidstatic_cc2.jar prebuild/android-cc2/libs/libheysdkandroidstatic_cc2.jar', _heysdk_root);

exec.runQueue(lst, 0);