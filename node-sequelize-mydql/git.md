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



