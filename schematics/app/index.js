"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var schematics_1 = require("@angular-devkit/schematics");
var name_utils_1 = require("../name-utils");
var path = require("path");
function default_1(options) {
    var appRootSelector = 'app-root';
    return schematics_1.chain([
        schematics_1.mergeWith(schematics_1.apply(schematics_1.url('./files'), [
            schematics_1.template(__assign({}, options, name_utils_1.names(options.name), { 'dot': '.', 'tmpl': '' }))
        ])),
        schematics_1.externalSchematic('@schematics/angular', 'module', {
            name: 'app',
            commonModule: false,
            flat: true,
            routing: false,
            sourceDir: path.join(options.path, options.sourceDir ? options.sourceDir : 'src'),
            spec: false,
        }),
        schematics_1.externalSchematic('@schematics/angular', 'component', {
            name: 'app',
            selector: appRootSelector,
            sourceDir: path.join(options.path, options.sourceDir ? options.sourceDir : 'src'),
            flat: true,
            inlineStyle: options.inlineStyle,
            inlineTemplate: options.inlineTemplate,
            spec: !options.skipTests,
            styleext: options.style
        }),
    ]);
}
exports.default = default_1;
