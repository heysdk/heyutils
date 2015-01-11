/**
 * Created by zhs007 on 2015/1/11.
 */

var console = require('console');
var xmlutils = require('../xmlutils');

var xmlobj = xmlutils.parseXML('<test><test001 name="haha"></test001></test><test1><test001 name="haha"></test001></test1>');

var element = xmlutils.findElement(xmlobj, 'test>test001');
var eleattr = xmlutils.findElementAttrib(xmlobj, 'test>test001>name');

console.log('find test>test001 ' + element);
console.log('find test>test001>name ' + eleattr);