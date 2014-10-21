edpx-timeline
=============

EDP插件，命令行模式，尝试分析处理chrome的timeline数据，仅仅是尝试

一级命令暂无用处，完全依靠二级子命令进行处理

当前版本：v0.1.0-alpha.1

# 安装方式

## npm link

```javascript
git clone git://github.com/leowang721/edpx-timeline.git
cd edpx-timeline
sudo npm link .
```

## npm install

```javascript
sudo npm install -g edpx-timeline
```

# 使用

## 二级命令 edp timeline pageLoading

    读取Chrome的timeline数据，分析页面整体加载相关的性能，在当前目录下输出结果，结果保存在当前文件夹的analysedResult文件夹中

### Usages

edp timeline pageLoading -f filePath -s startMark起始标记

### Options

    -f - 文件所在的路径，可以为目录，为目录时自动扫描文件名为TimelineRawData-*的文件
    -s - startMark起始标记，主要指的是HTML，在加载处理中以HTML的请求发送作为起始标记，则后续的请求、处理的时间点都会相对于这个时间计算相对时间，如果不指定，则默认取数据的第一行的startTime（这可能会导致不够准确）。（暂未支持多个文件的批量输出，下个版本支持）
    -o - output，可以指定输出的文件夹（当前尚未支持）