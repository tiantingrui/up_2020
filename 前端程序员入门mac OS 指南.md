# 前端程序员入门mac OS 指南



### Main Target

+ 相关软件下载

+ 相关环境安装
+ 其他...



## 01. 相关软件下载

+ iTerm2: [iterm2 download](https://link.juejin.im/?target=https%3A%2F%2Fwww.iterm2.com%2Fdownloads.html)
+ source Tree：https://www.sourcetreeapp.com/
+ dash(非常强大的文档查看器)
+ webstorm
+ vscode
+ typero



## 02. 前端开发环境配置

1. 安装brew套件管理器

   brew 全称是Homebrew，它类似于npm，npm是包管理工具，用来管理各种依赖包，而Homebrew是软件包管理工具。
   可以在Mac中方便的安装软件或者卸载软件，如git、wget、zsh等。

2. 安装node

   ![image-20200922140837502](C:\Users\Admin\AppData\Roaming\Typora\typora-user-images\image-20200922140837502.png)

3. npm安装nrm 

   ![image-20200922141643818](C:\Users\Admin\AppData\Roaming\Typora\typora-user-images\image-20200922141643818.png)

   + nrm源列表

     ```shell
     nrm ls
     ```

   + 查看当前使用的nrm源

     ```shell
     nrm current
     ```

   + 使用指定的taobao源作为npm包源

     ```shell
     nrm use taobao
     ```

4. 安装git

   ```shell
   brew install git
   git help 
   git version
   ```

5. 