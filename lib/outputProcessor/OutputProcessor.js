/**
 * @file 获取所有请求信息的处理器
 * @author Leo Wang(leowang721@gmail.com)
 */

var sys = require('sys');
var fs = require('fs');
var path = require('path');
var edp = require('edp-core');
var AbstractProcessor = require('./AbstractProcessor');
var util = require('../util');
var mkdirp = require('mkdirp');

function OutputProcessor () {
    AbstractProcessor.apply(this, arguments);
}
sys.inherits(OutputProcessor, AbstractProcessor);

OutputProcessor.prototype.name = 'OutputProcessor';

var outputTpl = 'define(function (require) { return %s; })';

OutputProcessor.prototype.process = function (contextItem, isDebug) {
    var me = this;

    var outputDir = './analysedResult/';
    outputDir = util.resolvePath(outputDir) + '/';

    // var outputDir = './lib/output/src/mockData/';

    if (fs.existsSync(outputDir)) {
        edp.util.rmdir(outputDir);
    }
    mkdirp.sync(outputDir);
    // 先需要拷贝完整的一份编译版代码
    var outputProject = readinOutputProject();
    toWriteList = outputProject.toWriteList;

    if (contextItem.output) {
        for (var path in contextItem.output) {
            toWriteList.push({
                outputPath: util.resolvePath(outputDir + 'asset/mockData/' + path + '.js'),
                data: require('util').format(
                    outputTpl,
                    JSON.stringify(contextItem.output[path], null, 4)
                )
            });
        }
    }


    // toWriteList.forEach(function (item) {
    //     console.log(item.outputPath);
    // });
    outputFiles(toWriteList, outputDir);
}


function outputFiles(output, outputDir) {
    output.forEach(function (file) {
        mkdirp.sync(edp.path.dirname(
            path.resolve(outputDir || '.', file.outputPath)
        ));
        // console.log(path.resolve(outputDir || '.', file.outputPath));
        fs.writeFileSync(
            path.resolve(outputDir || '.', file.outputPath),
            file.data,
            {
                encoding: 'utf8'
            }
        );
    });
}


function readinOutputProject () {
    var currentFilePath = __dirname;
    var outProjectPath = path.resolve(currentFilePath, '../output/out/');
    // 遍历这个文件夹下的所有文件，并保存为一个toWriteList
    var result = {
        toWriteList: [],
        baseDir: outProjectPath
    };
    traverseDir(outProjectPath, result);
    return result;
}


/**
 * 遍历目录
 * 
 * @inner
 * @param {string|Array.<string>} dir 目录路径
 * @param {Object} result
 */
function traverseDir( dir, result ) {
    if ( Array.isArray(dir) ) {
        dir.forEach( function (item) {
            traverseDir( item, result );
        });
        return;
    }

    var files = fs.readdirSync( dir );

    files.forEach( function ( file ) {
        if ( file === '.svn' || file === '.git' ) {
            return;
        }

        file = edp.path.resolve( dir, file );
        var relativePath = edp.path.relative( result.baseDir, file );

        var stat = fs.statSync( file );

        if ( stat.isDirectory() ) {
            traverseDir( file, result );
        }
        else {
            var fileData = {
                data: fs.readFileSync(file, { encoding: 'utf8' }),
                outputPath: relativePath
            };
            result.toWriteList.push(fileData);
        }
    });
}

module.exports = exports = OutputProcessor;