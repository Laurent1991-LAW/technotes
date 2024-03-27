







**Linux指令**



# **查看程序启动时间**

ps axo pid,ppid,comm,pmem,lstart|grep 333333



# 解压Jar包查看配置文件



-- 将包复制到文件夹zip中
`cp cup-pm-boot-1.0-SNAPSHOT.jar ./zip/cup-pm-boot-1. 0-SNAPSHOT jar`

--进入文件夹，解版jar包
`jar -xvf cup-pm-boot-1.0-SNAPSHOT.jar`

--进入classes文件，查看配置文件
`cd /app/pmsvc/application/zip/BOOT-INF/classes`
直接/关键词搜索, 按回车抵达对应位置

# ls查找

`ls a*` 查看当前文件夹里以a开头的内容

# find查找

`find / -type d -name nacos`

在/目录下 递归搜索nacos目录

# **下载/上传**

sz - send to windows

rz - receive from windows



# 查看RSA密钥

`cat ~/.ssh/id_rsa.pub`

# **查看内存占用**

如果想查看进程的CPU占用率和内存占用率，可以使用aux ，如果想查看进程的父进程ID和完整的COMMAND命令，可以使用ef。

`free -h` —— 查看系统内存配置

`ps aux|head -1` —— 查看系统占用内存进程, head后为数字1不是字母l

` ps aux|grep -v PID | sort-rn -k +4|head`



# 查看CPU占用

1. top 定位最高cup占有率的‘进程’pid，如18720；

1. top -H -p 18720 可以查询其进程下 占用的‘线程’，如18745 / 18747；

1. 需要将线程id转换为16进制：printf ‘0x%x\n’ 18745，获取如 0x4939；

1. jstack 18720|grep 0x4939 -A 20 （显示20行）

# **查看ip**

ifconfig





# **查看环境变量**

echo $PATH

vi ./bash_profile 或 vi ~/.zshrc

source ~/.bash_profile

# **解压缩**

tar -xvf file.tar -C /path/to/dir

tar -xvf file.tar

unzip xxx.zip



# **磁盘使用情况**

df -h





# **Grep**



![IMG_7769.jpeg](blob:file:///61d86beb-c177-476d-9d1b-508a440f64ed)





# 查看端口

## Linux

`netstat -ntlp|grep 12345`

`sudo netstat -ntlu|grep LISTEN` —— 获取‘监听’特性的信息, 比如nginx‘监听’了80端口则为带有坚挺



## windows

1.找到目标端口的进程(process)信息

`netstat -ano|findstr "12345"`

2.找到目标进程的任务id

`tasklist|findstr "pid"`

3. 打开windows任务管理器-进程-找到对应的xxx.exe-结束进程 或 用taskkill

`taskkill /f /t /pid "pid"`



# 查看指令的路径

whereis ls



# 创建文件

` touch aaa.md`



# 同时执行多条指令

执行1成功才2 : &&

`cd ~/Workspace/01-java/02-ruoyi-vue/ruoyi-ui && zip -r -j dist.zip dist/`

不管1是否成功都2 : ;

`cd ~/Workspace/01-java/02-ruoyi-vue/ruoyi-ui ; zip -r -j dist.zip dist/`