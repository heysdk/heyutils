/**
 * Created by zhs007 on 2015/1/14.
 */

function getMillisecond() {
    var diff = process.hrtime();
    return (diff[0] * 1e9 + diff[1]) / 1e6;
}

function endPerformance() {
    var cur = getMillisecond();
    return cur - this.begin;
}

function Performance() {
    this.beginms = getMillisecond();
}

Performance.prototype.end = endPerformance;

exports.Performance = Performance;

exports.getMillisecond = getMillisecond;