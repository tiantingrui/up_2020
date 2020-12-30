# Flutter 入门



## 入门：在macOS上搭建 Flutter 开发环境

> 中文官网链接：https://flutterchina.club/setup-macos/

### 使用镜像

由于在国内访问Flutter有时可能会受到限制，Flutter官方为中国开发者搭建了临时镜像，大家可以将如下环境变量加入到用户环境变量中：

```shell
export PUB_HOSTED_URL=https://pub.flutter-io.cn
export FLUTTER_STORAGE_BASE_URL=https://storage.flutter-io.cn
```



### 系统要求

要安装并运行Flutter，您的开发环境必须满足以下最低要求:

- **操作系统**: macOS (64-bit)
- **磁盘空间**: 700 MB (不包括Xcode或Android Studio的磁盘空间）.
- 工具: Flutter 依赖下面这些命令行工具.
  - `bash`, `mkdir`, `rm`, `git`, `curl`, `unzip`, `which`