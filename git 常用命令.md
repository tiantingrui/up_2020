# git 常用命令



1. git add 将文件保存到暂存区
2. git commit -m 'XXX' XXX表示提交说明，该命令是将文件从暂存区提交到提交区
3. git checkout <branchName> 切换分支 将分支切换到branchName分支
4. git branch <branchName> 创建branchName分支
5. git checkout -b <branchName> 创建branchName分支并将当前分支切换到该分支
6. git branch -v 查看分支信息
7. git branch -d <branchName> 删除本地branchName分支
7. git status 查看git状态
8. git merge <branchName> 将branchName分支合并到当前分支
9. git merge <branchName> --no-ff 将branchName分支合并到当前分支并保留合并记录，防止出现线性记录
10.git lg 自定义命令，查看git记录

11.git push --set-upsteam origin <branchName>提交branchName分支内容到远程仓库
12.git cat-file -p HEAD 查看HEAD节点信息
13.git push 提交内容到远程仓库
14.git tag vXXX XXXX 创建tag标签，vXXX为标签名称，XXXX为git某次提交的编码id
15.git push origin --tags 提交tag标签到远程仓库
16.git ls-remote --heads origin 查看远程仓库每个分支的head信息
17.git ls-remote --tags origin 查看远程仓库的tag标签信息
18.git ls-remote origin 查看远程仓库所有信息，包含head和tag
19.git fetch origin master 从远程仓库获取最新版本到本地
20.git remote -v 查看远程仓库
21.git commit -am 'XXX' 等同于git commit -a -m 'XXX'  XXX表示提交说明，该命令是将文件直接提交到提交区，仅对已经有过提交记录的文件有效，新创建的文件依旧需要git add后再git commit
22.git stash save 'XXX' 将当前工作目录、暂存区内容保存到stash区，XXX是保存的stash的注解
23.git stash list 查看stash列表
   查询显示的结果为：shash@{0}: On <branchName>: XXX
24.git stash apply shash@{0} 将内容从stash还原到工作目录
25.git stash drop stash@{0} 删除该stash
26.stash pop = stash apply + stash drop