# 00.问题列表

## 1. Docker安装的mongodb无法指定配置文件启动

- 按如下指令, docker容器会自动exit

```shell
docker run 
-d # 后台运行
--name mongodb 
-p 27017:27017 
-v /home/mongo/mongod.conf:/etc/mongo.conf 
mongo  # 指定image
-f /etc/mongo.conf # 或 --config /etc/mongo.conf
```



## 2.apt安装与tar解压缩安装

- 仅仅`sudo apt-get remove --yes mongodb-org` 仍会保留/usr/bin目录下的许多mongo插件, 如:

  > **mongo**：这是MongoDB的shell程序，允许用户通过命令行界面与MongoDB数据库进行交互，执行查询、更新等操作。
  >
  > **mongod**：这是MongoDB的服务端守护进程。当你启动MongoDB服务时，实际上就是在运行这个程序。它负责监听网络请求、处理数据读写操作，并管理数据库实例。
  >
  > **mongos**：MongoDB分片集群中的路由进程。在分片集群配置中，`mongos` 作为前端路由，接收客户端请求，然后根据分片键将请求路由到正确的分片上。
  >
  > **mongodump**：一个用来备份MongoDB数据库的工具，它可以导出数据库或者集合为 BSON 格式的数据文件。
  >
  > **mongorestore**：与 `mongodump` 配对使用的工具，用于将之前由 `mongodump` 创建的备份恢复到MongoDB数据库中。
  >
  > **mongoexport**：用于将MongoDB集合导出为JSON或CSV格式的文件，适用于少量数据的迁移或报表生成。
  >
  > **mongoimport**：与 `mongoexport` 相对，用于将JSON或CSV格式的数据导入到MongoDB集合中。
  >
  > **mongostat**：一个实时监控MongoDB实例状态的工具，提供了关于MongoDB性能的统计信息，如连接数、内存使用情况、操作吞吐量等。
  >
  > **mongotop**：显示每个数据库和集合的磁盘I/O使用情况，帮助识别哪些集合正在被频繁地读写。

- 此时因为`whereis mongo`仍为`/usr/bin`, 所以输出版本仍为老版本, 需要进入tar解压缩的mongo目录, 使用`./mongo --version`, 才能看到新版本, 若需更改, 需要修改环境变量path

# 01.Replication Set部署

## 1.1.基本部署

```shell
# 创建数据存放目录
mkdir -p /data/mongodb/rs0-0 /data/mongodb/rs0-1 /data/mongodb/rs0-2


# 创建3台实例
# --fork = 后台启动
./mongod --fork --replSet rs0 --port 27018 --bind_ip_all  --dbpath /data/mongodb/rs0-0 --oplogSize 128 --logpath /data/mongodb/rs0-0/27018.log

./mongod  --fork  --replSet rs0 --port 27019 --bind_ip_all --dbpath /data/mongodb/rs0-1 --oplogSize 128 --logpath /data/mongodb/rs0-0/27019.log

./mongod  --fork --replSet rs0 --port 27020 --bind_ip_all --dbpath /data/mongodb/rs0-2 --oplogSize 128 --logpath /data/mongodb/rs0-0/27020.log
```



## 1.2.配置副本集

### 1.直接赋值

```shell
# 登录primary
> mongdo localhost:27018

# 配置rs关系
> rs.initiate(
  {
    _id : "rs0",
    members: [
      { _id : 0, host : "156.236.74.75:27018" },
      { _id : 1, host : "156.236.74.75:27019" },
      { _id : 2, host : "156.236.74.75:27020", arbiterOnly:true }
    ]
  }
)
```



### 2.参数化赋值

```shell
# 登录primary
> mongdo localhost:27018

# 获取配置参数 + 更改 + 生效
cfg = rs.conf()

cfg.members[0].host = "156.236.74.75:27018"
cfg.members[1].host = "156.236.74.75:27019"
cfg.members[2].host = "156.236.74.75:27020"

rs.reconfig(cfg)
```



## 1.3.配置用户名密码

```shell
# 创建用户及密码
db.createUser({  
 user:"root",
 pwd:"root",
 roles:[  
  {  
     role:"readWrite",
     db:"mydb"
  }
 ],
 mechanisms:[  
  "SCRAM-SHA-1"
 ]
})

db.createUser({
    user:"root",
    pwd:"root",
    roles:[{role:"userAdminAnyDatabase",db:"admin"}],
    passwordDigestor:"server"
})

# 删除用户
db.dropUser("root")
```



## 1.4.项目中配置URL地址

```properties
DATABASE_URL="mongodb://156.236.74.75:27018,156.236.74.75:27019,156.236.74.75:27020/mydb?retryWrites=true&w=majority"
```

