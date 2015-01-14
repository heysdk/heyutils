/**
 * Created by zhs007 on 2015/1/14.
 */

function getMillisecond() {
    var diff = process.hrtime();
    return (diff[0] * 1e9 + diff[1]) / 1e6;
}

function endPerformance() {
    return getMillisecond() - this.beginms;
}

function endAndBeginPerformance() {
    var cur = getMillisecond();
    var off = cur - this.beginms;
    this.beginms = cur;
    return off;
}

function Performance() {
    this.beginms = getMillisecond();
}

Performance.prototype.end = endPerformance;
Performance.prototype.endAndBegin = endAndBeginPerformance;

exports.Performance = Performance;

exports.getMillisecond = getMillisecond;