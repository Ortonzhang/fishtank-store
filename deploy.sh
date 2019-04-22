# 上线所用的git地址
releaseGit='git@gitlab.mljr.com:FEWeb-release-group/fishtank-admin.git'

# 当前分支
branch=`git branch | grep -e '^*' | cut -d' ' -f 2`

# 必须得在master下才可操作
if [ "$branch" == 'master' ]
then
  # 先编译
  npm run build

  # 万一没有编译成功，在此退出
  test ! -d dist/fishtank-admin && echo 'no dist/fishtank-admin directory' && exit

  cd ./dist

  # fishtank-admin-release为发布所用的目录，如已存在，则先进行删除操作
  test -d fishtank-admin-release && rm -rf fishtank-admin-release

  # 先拉取releaseGit 至 fishtank-admin-release目录，并清空目录
  git clone $releaseGit fishtank-admin-release && rm -rf fishtank-admin-release/*

  # 将fishtank-admin中的所有文件复制至fishtank-admin-release目录
  cp -R fishtank-admin/* fishtank-admin-release/

  cd fishtank-admin-release

  # 正常push及打tag操作
  git add . && git commit -m 'Auto-commit' && git push
  # tag
  git tag 'www/'$(date +"%Y-%m-%d.%H%M") && git push --tags
else
  echo 'please merge to master!'
fi
