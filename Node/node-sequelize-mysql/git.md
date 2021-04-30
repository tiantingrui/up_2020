### git

```shell
git config --list

git config --global user.name 'terry'
git config --global user.email '976912095@qq.com'

# 不要每次都输入用户名和密码
git config --global credential.helper store

# 生成 rsa 公钥私钥
ssh-keygen -t rsa -C '976912095@qq.com'

# 查看分支
git branch

# 创建分支
git branch demo

# 删除分支
git branch -d demo

# 打tag
git tag --list
git tag t1.0.0
git push origin t1.0.0

# 删除tag
git tag -d t1.0.0
git push origin t1.1.0

```

#### 代码回滚

比如说你修改了一个 a.js 文件，想要回滚a.js的改动

`git checkout a.js`



##### git revert 版本号

不可删除记录



##### git reset 

消除历史记录

```
git reset --hard xxx
git push origin branch // 会发生冲突
git push origin branch --force // 强制推送
```





![](https://imgkr2.cn-bj.ufileos.com/95bd668b-4530-461a-ab8b-f8d52c674b25.png?UCloudPublicKey=TOKEN_8d8b72be-579a-4e83-bfd0-5f6ce1546f13&Signature=o3CLIDjPDfS6a9pyh8TjJZ46UDI%253D&Expires=1608348499)

 

