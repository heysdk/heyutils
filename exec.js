/**
 * Created by zhs007 on 2014/12/1.
 */

var spawn = require('child_process').spawn;
var console = require('console');
var fs = require('fs');
var path = require('path');
var os = require('os');

var FILE_CACHE_SIZE         =   256 * 1024;

var s_buff = null;//new Buffer(FILE_CACHE_SIZE);

//var PLATFORM_UNKNOWN        = 0;
//var PLATFORM_WIN32          = 1;
//var PLATFORM_LINUX          = 2;
//
//var curPlatform = PLATFORM_UNKNOWN;
//
//function checkPlatform() {
//    var platform = os.platform();
//    console.log('cur platform ' + platform);
//
//    if ('win32' == platform) {
//        curPlatform = PLATFORM_WIN32;
//    }
//}

function runSpawn(cmd, param, dir, endfunc) {
    scmd = spawn(cmd, param, { cwd: dir });

    var strcmd = buildCmd(cmd, param);
    console.log(strcmd + ' at ' + dir + '--->');

    scmd.stdout.on('data', function (data) {
        console.log('>' + data);
    });

    scmd.stderr.on('data', function (data) {
        console.log('>err:' + data);
    });

    scmd.on('close', function (code) {
        console.log('<-------' + code);

        endfunc();
    });
}

function copyfile(src, dest, callback) {
    var stat = fs.lstatSync(src);
    var size = stat.size;

    var srcfp = fs.openSync(src, 'r');
    var destfp = fs.openSync(dest, 'w');

    if (s_buff == null)
        s_buff = new Buffer(FILE_CACHE_SIZE);

    for (var i = 0; i < size; ) {
        var lastsize = size - i;
        if (lastsize <= FILE_CACHE_SIZE) {
            var sz = fs.readSync(srcfp, s_buff, 0, lastsize, null);
            fs.writeSync(destfp, s_buff, 0, sz, null);

            break;
        }
        else {
            var sz = fs.readSync(srcfp, s_buff, 0, FILE_CACHE_SIZE, null);
            fs.writeSync(destfp, s_buff, 0, sz, null);

            i += FILE_CACHE_SIZE;
        }
    }

    fs.close(srcfp);
    fs.close(destfp);

    callback();

    //var isappend = false;
    //fs.readFile(src, function (err, data) {
    //    if (err) {
    //        callback();
    //
    //        return ;
    //    }
    //
    //    if (isappend) {
    //        fs.appendFileSync(dest, data);
    //    }
    //    else {
    //        fs.writeFileSync(dest, data);
    //    }
    //});
}

function cmd_heycp(param, dir, callback) {
    var max = param.length;
    if (max != 2) {
        console.log('heycp need src and dest params.');

        callback();

        return ;
    }

    var srcpath = path.join(dir, param[0]);
    var stat = fs.lstatSync(srcpath);
    if (stat.isDirectory()) {

    }
    else {
        var destpath = path.join(dir, param[1]);
        copyfile(srcpath, destpath, callback);
        //if (PLATFORM_WIN32 == curPlatform) {
        //    param[max] = '/Y';
        //
        //    runSpawn('copy', param, dir, callback);
        //}
    }
}

var heycmd = [
    {cmd: 'heycp', func:cmd_heycp}
];

function buildCmd(cmd, param) {
    var str = cmd;
    var max = param.length;

    for(var i = 0; i < max; ++i) {
        str = str + ' ' + param[i];
    }

    return str;
}

function run(cmd, param, dir, endfunc) {
    var max = heycmd.length;
    for (var i = 0; i < max; ++i) {
        if (heycmd[i].cmd == cmd) {
            heycmd[i].func(param, dir, endfunc);

            return ;
        }
    }

    runSpawn(cmd, param, dir, endfunc);
}

function runQueue(lst, index) {
    var max = lst.length;
    if(index >= max) {
        return ;
    }

    run(lst[index]['cmd'], lst[index]['param'], lst[index]['dir'], function () {
        runQueue(lst, index + 1);
    })
}

function addCmd(lst, cmd, param, dir) {
    var max = lst.length;
    lst[max] = { cmd: cmd, param: param, dir: dir };
}

function addCmdEx(lst, cmd, dir) {
    var arr = cmd.split(' ');
    var param = [];
    var first = arr[0];

    var max = arr.length;
    for(var i = 1; i < max; ++i) {
        param[i - 1] = arr[i];
    }

    var max = lst.length;
    lst[max] = { cmd: first, param: param, dir: dir };
}

exports.run = run;
exports.runQueue = runQueue;
exports.addCmd = addCmd;
exports.addCmdEx = addCmdEx;

//exports.checkPlatform = checkPlatform;