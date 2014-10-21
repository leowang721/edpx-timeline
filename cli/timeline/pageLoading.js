/**
 * @file edpx插件，pageLoading命令，尝试分析页面加载性能
 * @author Leo Wang(leowang721@gmail.com)
 */

exports.cli = {
    description: 'chrome的timeline数据分析，分析页面加载速度，读取文件名为TimelineRawData-*的文件',
    options: ['file:', 'output:', 'startMark:'],
    main: function (args, opts) {
        require('../../lib/pageLoading').process(args, opts);
    }
};