# edpx扩展脚手架命令edp timeline

    尝试分析chrome的timeline分析数据，仅仅是尝试……

    一级命令暂无用处，完全依靠二级子命令进行处理

# edp timeline pageLoading

    分析页面整体加载相关的性能

    建议指定处理的入口，例如HTML名称，否则可能会导致不准确

    用法：edp timeline pageLoading -f filePath -o outPath[ -e 入口]

        file: 指定timeline的文件
        output: 指定输出结果文件
        entry: 指定入口，否则会默认将第一个SendResourceRequest且url带有.html的资源作为入口html
