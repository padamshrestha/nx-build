"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var schematics_1 = require("@angular-devkit/schematics");
var path = require("path");
/**
 * Function to find the "closest" module to a generated file's path.
 */
function findModule(host, generateDir) {
    var closestModule = generateDir;
    var allFiles = host.files;
    var modulePath = null;
    var moduleRe = /\.module\.ts$/;
    var _loop_1 = function () {
        var normalizedRoot = schematics_1.normalizePath(closestModule);
        var matches = allFiles.filter(function (p) { return moduleRe.test(p) && p.startsWith(normalizedRoot); });
        if (matches.length == 1) {
            modulePath = matches[0];
            return "break";
        }
        else if (matches.length > 1) {
            throw new Error('More than one module matches. Use skip-import option to skip importing '
                + 'the component into the closest module.');
        }
        closestModule = closestModule.split('/').slice(0, -1).join('/');
    };
    while (closestModule) {
        var state_1 = _loop_1();
        if (state_1 === "break")
            break;
    }
    if (!modulePath) {
        throw new Error('Could not find an NgModule for the new component. Use the skip-import '
            + 'option to skip importing components in NgModule.');
    }
    return modulePath;
}
exports.findModule = findModule;
/**
 * Build a relative path from one file path to another file path.
 */
function buildRelativePath(from, to) {
    // Convert to arrays.
    var fromParts = from.split('/');
    var toParts = to.split('/');
    // Remove file names (preserving destination)
    fromParts.pop();
    var toFileName = toParts.pop();
    var relativePath = path.relative(fromParts.join('/'), toParts.join('/'));
    var pathPrefix = '';
    // Set the path prefix for same dir or child dir, parent dir starts with `..`
    if (!relativePath) {
        pathPrefix = '.';
    }
    else if (!relativePath.startsWith('.')) {
        pathPrefix = "./";
    }
    return "" + pathPrefix + relativePath + "/" + toFileName;
}
exports.buildRelativePath = buildRelativePath;
