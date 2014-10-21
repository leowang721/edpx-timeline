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

```javascript
edp timeline pageLoading -f filePath -s startMark
```

### Options

+ -f file 文件所在的路径，可以为目录，为目录时自动扫描文件名为TimelineRawData-*的文件
+ -s startMark 起始标记，主要指的是HTML，在加载处理中以HTML的请求发送作为起始标记，则后续的请求、处理的时间点都会相对于这个时间计算相对时间，如果不指定，则默认取数据的第一行的startTime（这可能会导致不够准确）。（暂未支持多个文件的批量输出，下个版本支持）
+ -o output 指定输出的文件夹

### 输出结果

输出结果如下结构：

    |-README
    |-asset
    |-copyright.txt
    |-dep
    |-index.html
    |-package.json

直接访问index.html进行查看

### 示例

输入命令
```
edp timeline pageLoading -f ~/work/TimelineRawData-20141010T113333 -s "main.html"
```
意味着读取 ~/work/TimelineRawData-20141010T113333 这个数据，并以main.html的请求发送作为起始标记，自动查找所有的资源请求

如果请求的url中包含了main.html，则以第一个匹配的请求发送为相对起始点，此时刻计时为0.

命令执行后，直接访问 ./analysedResult/index.html查看输出的结果
