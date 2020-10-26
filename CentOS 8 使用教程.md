# CentOS 8 使用教程



## 安装nginx 教程

**CentOS 7也适用**

1. **配置 EPEL源**

   ```shell
   sudo yum install -y epel-release
   sudo yum -y update
   ```

2. **安装nginx**

   ```shell
   sudo yum install -y nginx
   ```

   安装成功后，默认的网站目录为： `/usr/share/nginx/html`

   默认的配置文件为： `/etc/nginx/nginx.conf`

   自定义配置文件目录为：`/etc/nginx/conf.d/`

3. **开启端口80和443**

   如果你的服务器打开了防火墙，你需要下面的命令打开80和443端口

   ```shell
   sudo firewall-cmd --permanent --zone=public --add-service=http
   sudo firewall-cmd --permanent --zone=public --add-service=https
   sudo firewall-cmd --reload
   ```

   如果你的服务器是 **阿里云ESC**，你还可以通过控制台安全组，打开80和443端口，或者其他自定义端口

   具体操作路径： 阿里云ECS服务器 -》 安全组 -》 配置规则 -》 安全组规则 -》 入方向 -》 添加安全组规则

   端口范围： 比如你要打开80端口，这里就填写 `80/80` 。

   优先级： 优先级可选范围为1-100，默认值为1，即最高优先级。

4. **操作nginx**

   + 启动nginx

     ```shell
     systemctl start nginx
     ```

   + 停止nginx

     ```shell
     systemctl stop nginx
     ```

   + 重启nginx

     ```shell 
     systemctl restart nginx
     ```

   + 查看nginx 状态

     ```shell 
     systemctl ststus nginx
     ```

   + 启用开机启动nginx

     ```shell 
     systemctl enable nginx
     ```

   + 禁用开机启动 nginx

     ```shell
     systemctl disable nginx
     ```

   启动nginx 后，网页输入自己的ip查看是否有nginx相关页面

5. **配置Nginx**

   + 升级https

     首先域名去申请 ssl证书，

     免费购买Symantec证书

   + 然后下载证书到指定目录，比如我这里的 `/etc/nginx/ssl`

   + 修改nginx.conf

     ```shell
      server {
     
             listen 80;
             listen 443 ssl;
             server_name  tingtingrui.com;
             location / {
                     root /project/demo;
                     index  index.html index.htm;
             }
     
             ssl on;
             ssl_certificate /etc/nginx/ssl/4675347_tiantingrui.com.pem;
             ssl_certificate_key /etc/nginx/ssl/4675347_tiantingrui.com.key;
             ssl_session_timeout  5m;
             ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
             ssl_ciphers ECDHE-RSA-AES128-GCM-	SHA256:ECDHE:ECDH:AES:HIGH:!NULL:!aNULL:!MD5:!ADH:!RC4:!DH:!DHE;
             ssl_prefer_server_ciphers  on;
     
     
             error_page 404 /404.html;
                 location = /40x.html {
             }
     
             error_page 500 502 503 504 /50x.html;
                 location = /50x.html {
             }
     
             error_page 497  https://$host$uri?$args;
         }
     
     ```

     这里说明几点：

     + server_name  后面跟你自己的域名 `tiantingrui.com`
     + root  后面跟入口文件路径 index.html
     + ssl_certificate和ssl_certificate_key 指向https证书 。就是刚才你下载的https证书路径
     + error_page 497 https://$host$uri?$args; 这句的作用是，强制http跳转到https。

     

     + 重启nginx 
       +  `cd /etc/nginx`
       +   `nginx -s reload`

     然后到这里你的网站就加上了证书。开开心心，简简单单~

     





## 安装MySQL8.0

> CentOS8  安装 MySQL8.0并配置远程登录

1. **使用最新的包管理器安装MySQL**

   ```shell
   sudo dnf install @mysql
   ```

2. **开启启动**

   安装完成后，运行以下命令来启动MySQL服务并使它在启动时自动启动

   ```shell
   sudo systemctl enable --now mysqld
   ```

   要检查MySQL服务器是否正在运行，请输入：

   ```shell
   sudo systemctl status mysqld
   ```

3. **添加密码及安全设置**

   运行mysql_secure_installation脚本，该脚本执行一些与安全性相关的操作并设置MySQL根密码：

   ```shell
   sudo mysql_secure_installation
   ```

   步骤如下：

   + 要求你配置VALIDATE PASSWORD component（验证密码组件）： 输入y ，回车进入该配置
     + 选择密码验证策略等级， 我这里选择0 （low），回车
     + 输入新密码两次
     + 确认是否继续使用提供的密码？输入y ，回车
     + 移除匿名用户？ 输入y ，回车
     + 不允许root远程登陆？ 我这里需要远程登陆，所以输入n ，回车
   + 移除test数据库？输入y，回车
   + 重新载入权限表？ 输入y ，回车

4. **配置远程登录**

   如果需要设置root账户远程登陆，上一步骤中，`不允许root远程登陆？`这一步需要设为n。
   接下来本机登录MySQL，将root用户的host字段设为'%'，意为接受root所有IP地址的登录请求：
   本机登录MySQL:

   ```shell
   mysql -uroot -p<上面步骤中设置的密码>
   ```

   回车后即可登录，接下来终端变成了`mysql>`开头:

   接着继续执行mysql语句，将将root用户的host字段设为'%'：

   ```shell
   Copyuse mysql;
   update user set host='%' where user='root';
   flush privileges;
   ```

   设置完成后输入exit退出mysql，回到终端shell界面，接着开启系统防火墙的3306端口：

   ```shell
   Copysudo firewall-cmd --add-port=3306/tcp --permanent
   sudo firewall-cmd --reload
   ```

5. **关闭MySQL主机查询DNS**

   MySQL会反向解析远程连接地址的dns记录，如果MySQL主机无法连接外网，则dns可能无法解析成功，导致第一次连接MySQL速度很慢，所以在配置中可以关闭该功能。

   打开 `/etc/my.conf` 文件，添加以下配置：

   ```shell
   [mysqld]
   skip-name-resolve
   ```

6. 重启服务

   ```shell 
   sudo systemctl restart mysqld
   ```

   

本机测试安装后，MySQL8.0默认已经是utf8mb4字符集，所以字符集不再修改