/**
 * Created by zhs007 on 2015/1/8.
 */

var DOMParser = require('xmldom').DOMParser;
var XMLSerializer = require('xmldom').XMLSerializer;
var pd = require('pretty-data').pd;
var fs = require('fs');
var console = require('console');

function parseXML(str) {
    return new DOMParser().parseFromString(str);
}

function findChild(xmlnode, name) {
    if (xmlnode.hasChildNodes()) {
        var nums = xmlnode.childNodes.length;
        var childs = xmlnode.childNodes;

        for (var i = 0; i < nums; ++i) {
            var curobj = childs[i];
            if (curobj.nodeName == name) {
                return curobj;
            }
        }
    }

    return null;
}

function findChildValue(xmlnode, name, value) {
    if (xmlnode.hasChildNodes()) {
        var nums = xmlnode.childNodes.length;
        var childs = xmlnode.childNodes;

        for (var i = 0; i < nums; ++i) {
            var curobj = childs[i];
            if (curobj.nodeName == name && getValue(curobj) == value) {
                return curobj;
            }
        }
    }

    return null;
}

function getValue(xmlnode) {
    var child = findChild(xmlnode, '#text');
    if (child != null) {
        return child.data;
    }

    return '';
}

function chgValue(xmlnode, val) {
    if (xmlnode.hasChildNodes()) {
        var child = findChild(xmlnode, '#text');
        if (child != null) {
            child.data = val;
        }
    }
}

function getChildValue(xmlnode, name) {
    var child = findChild(xmlnode, name);
    if (child != null) {
        var val = findChild(xmlnode, '#text');
        if (val != null) {
            return val.data;
        }
    }

    return null;
}

function appendElement(xmlnode, name) {
    var element = xmlnode.ownerDocument.createElement(name);
    xmlnode.appendChild(element);
    return element;
}

function appendTextNode(xmlnode, name) {
    var element = xmlnode.ownerDocument.createTextNode(name);
    xmlnode.appendChild(element);
    return element;
}

// callback(err)
function save2xml(filename, xmlobj, callback) {
    var str = pd.xml(new XMLSerializer().serializeToString(xmlobj));
    fs.writeFile(filename, str, callback);
}

// callback(err, xmlobj)
function loadxml(filename, callback) {
    fs.readFile(filename, function (err, data) {
        if (err) {
            callback(err, null);

            return ;
        }

        var xmlobj = new DOMParser().parseFromString(data.toString());

        callback(null, xmlobj);
    });
}

// callback(err)
function save2xmlSync(filename, xmlobj) {
    var str = pd.xml(new XMLSerializer().serializeToString(xmlobj));
    fs.writeFileSync(filename, str);
}

// callback(err, xmlobj)
function loadxmlSync(filename) {
    var data = fs.readFileSync(filename);
    return new DOMParser().parseFromString(data.toString());
}

function findAttr(xmlnode, attrName) {
    if (xmlnode.hasOwnProperty('attributes')) {
        return xmlnode.getAttribute(attrName);
    }

    return '';
}

function removeElement(xmlnode) {
    xmlnode.ownerDocument.removeChild(xmlnode);
}

exports.parseXML = parseXML;
exports.save2xml = save2xml;
exports.loadxml = loadxml;
exports.save2xmlSync = save2xmlSync;
exports.loadxmlSync = loadxmlSync;

exports.findChild = findChild;
exports.findChildValue = findChildValue;
exports.getValue = getValue;
exports.chgValue = chgValue;
exports.getChildValue = getChildValue;

exports.findAttr = findAttr;

exports.appendElement = appendElement;
exports.appendTextNode = appendTextNode;
exports.removeElement = removeElement;
