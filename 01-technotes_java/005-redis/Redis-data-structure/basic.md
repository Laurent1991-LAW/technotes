# **Redis常用数据类型**



# **1 简介**

**概述**

​                ● Redis作为**一种key/value结构的数据存储系统**，为了便于对数据进行管理，提供了多种数据类型。然后，基于指定类型存储我们项目中产生的数据，例如用户的登陆信息，购物车信息，商品详情信息等等。

​                ● redis 读写线程是安全的



**常用数据类型**

**Reids中基础数据结构包含字符串、散列 hash、列表 list、集合、有序集合**。工作中具体使用哪种类型要结合具体场景。



## **基本key指令**

| **指令**                                  | **备注**                                            | **返回值**                     |
| ----------------------------------------- | --------------------------------------------------- | ------------------------------ |
| del 键                                    |                                                     |                                |
| dump 键                                   | 序列化给定 key                                      | 被序列化的值                   |
| exists 键                                 |                                                     | 若 key 存在返回 1 ，否则返回 0 |
| expire 键 秒                              |                                                     |                                |
| expireat  键 时间戳                       |                                                     |                                |
| pexpire  键 毫秒                          |                                                     |                                |
| keys *（pattern）                         |                                                     |                                |
| move  键 库                               |                                                     |                                |
| persist  键                               | 移除 key 的过期时间，key 将持久保持                 |                                |
| pttl  键                                  | 以毫秒为单位返回 key 的剩余的过期时间               |                                |
| ttl  键                                   | 以秒为单位，返回给定 key 的剩余生存时间time to live |                                |
| randomkey                                 | 从当前数据库中随机返回一个 key                      |                                |
| rename  键 新名                           |                                                     |                                |
| renamenx  键 新名                         | 仅当 newkey 不存在时，将 key 改名为 newkey          |                                |
| type  键                                  |                                                     |                                |
| SCAN cursor [MATCH pattern] [COUNT count] | 迭代数据库中的数据库键。                            |                                |



# **2 String类型操作实践**

字符串类型是redis中最简单的数据类型，它存储的值可以是**字符串，其最大字符串长度支持到512M**。基于此类型，可以实现**博客的字数统计**，将日志不断追加到指定key，**实现一个分布式自增iid，实现一个博客的的点赞操作**等



## **相关指令**

| **指令**                                                     | **备注**                                                  | **返回值**                                                   |
| ------------------------------------------------------------ | --------------------------------------------------------- | ------------------------------------------------------------ |
| keys *                                                       | 查询所有键                                                |                                                              |
| set 键 值                                                    |                                                           |                                                              |
| ● get 键                ● getrange 键 start end                ● getset 键 值 | 返回 key 中字符串值的子字符将给定 key 的值设为 value      | 返回 key 的旧值(old value)                                   |
| incr + 键 / decr + 键                                        | 递增 / 递减，步数默认为1键不存在则创建                    | 递增 / 递减后的值                                            |
| ● incrby/decrby + 键 +步长                ● incrbyfloat + 键 +步长 | 将 key 所储存的值加上给定的浮点增量值（increment）        |                                                              |
| append 键 值                                                 | 向尾部追加值，键不存在则创建该键，此时相当于SET key value | 追加后长度                                                   |
| strlen                                                       |                                                           | 返回数据的长度，如果键不存在则返回0。注意，如果键值为空串，返回也是0 |
| mset [键 值...] / mget [键...]                               | 同时设置/获取多个键值                                     |                                                              |



## **String类型实践**

​                ● 博客的字数统计如何实现？（strlen）

​                ● 如何将审计日志不断追加到指定key?(append)

​                ● 你如何实现一个分布式自增id？(incr-雪花算法)

​                ● 如何实现一个博客的的点赞操作？(incr,decr)



***雪花算法**

雪花算法生成的最终结果是**一个long类型的Java长整型数字**，算法所有的内容都是针对这个数字进行运算的，Java基础类型相信都很熟悉，**有32位的整型int类型，和64位的长整型long类型**。



# **3 Hash类型应用实践**

Redis散列类型相当于Java中的HashMap，实现原理跟HashMap一致，**一般用于存储对象信息**，**存储了字段（field）和字段值（value）的映射**，一个散列类型可以包含最多232-1个字段。



## **相关指令**

| **指令**                                                     | **备注**                                                     | **返回值**           |
| ------------------------------------------------------------ | ------------------------------------------------------------ | -------------------- |
| hset 对象 字段1 值1hmset 对象 字段1 值1 字段2 值2 ...hset**nx**  对象 字段1 值1 | 不区分插入和更新操作，当执行插入操作时HSET命令返回1，当执行更新操作时返回0。只有在字段不存在时，设置哈希表字段的值 |                      |
| hget 对象 字段1hmget 对象 字段1 字段2 ...hgetall 对象        | 获取在哈希表中指定 key 的所有字段和值                        |                      |
| hexists 对象 字段                                            |                                                              | 存在为1，不存在返0   |
| hdel 对象 字段                                               |                                                              |                      |
| hkeys 对象 / hvals 对象                                      | 仅获取字段 / 值                                              |                      |
| hincrby 对象 字段 步长hincrbyfloat 对象 字段 步长            | 步长可为负数，无decrby                                       | 键值不存在时自动创建 |
| hlen + 对象                                                  | 获取键中字段的数量                                           |                      |



## **Hash类型实践**

​                ● 发布一篇博客需要写内存吗？（需要，hmset）

​                ● 浏览博客内容会怎么做？（hmget）

​                ● 如何判定一篇博客是否存在？(hexists)

​                ● 删除一篇博客如何实现？(hdel)

​                ● 分布式系统中你登录成功以后是如何存储用户信息的？(hmset)



# **4 List类型应用实践**

Redis的list类型相当于java中的LinkedList，其原理就就是一个**双向链表，****有顺序****，支持正向、反向查找和遍历等操作，插入删除速度比较快**。经常用于实现热销榜，最新评论等的设计。



## **相关指令**

| **指令**                                                     | **备注**                                                     | **返回值**   |
| ------------------------------------------------------------ | ------------------------------------------------------------ | ------------ |
| lpush 列表名 值1 值2...lpushx 列表名 值1 rpush 列表名 值1 值2...rpushx 列表名 值1 | 向表头/尾添加元素向 已存在的列表 头/尾添加元素               |              |
| lpop 列表名rpop 列表名blpop 列表名brpop 列表名               | 移除列表头/尾部元素**阻塞式**移除列表头/尾部元素             | 被移除的元素 |
| lindex 列表名 下标                                           | 通过索引获取列表中的元素                                     |              |
| llen 列表名                                                  | 获取长度                                                     |              |
| ltrim 列表名 start stop                                      | 列表只保留指定区间内的元素                                   |              |
| rpoplpush 表1 表2                                            | 从1取最后元素放到2表头                                       |              |
| **lrange 表名 start stop**                                   | 获取列表指定范围内的元素，0 -1 可取到所有元素                |              |
| ***lrem 列表名 count 值**                                    | 移除一定数量的列表元素                                       |              |
| **lset 列表名 下标 值****linsert 列表名 before/after 值**    | 通过索引设置列表元素的值在列表的元素前或者后插入元素         |              |
| blpop 列表1 列表2...  timeout                                | 移出并获取列表的第一个元素， 如果列表没有元素会**阻塞列表（block）**直到等待超时或发现可弹出元素为止。 |              |
| brpop 列表1 列表2...  timeout                                | 移出并获取列表的最后一个元素， 如果列表没有元素会**阻塞列表（block）**直到等待超时或发现可弹出元素为止。 |              |
| brpoplpush 表1 表2 timeout                                   | 从列表1中弹出一个值，将弹出的元素插入到另外一个列表2中并返回它； 如果列表没有元素会**阻塞列表（block）**直到等待超时或发现可弹出元素为止。 |              |

*

count > 0 : 从表头开始向表尾搜索，移除与 VALUE 相等的元素，数量为 COUNT 。

count < 0 : 从表尾开始向表头搜索，移除与 VALUE 相等的元素，数量为 COUNT 的绝对值。

count = 0 : 移除表中所有与 VALUE 相等的值。



## **List类型实践**

​                ● 队列：先来先得，比如秒杀

​                ● 如何基于redis实现一个队列结构？（lpush/rpop）

​                ● 如何基于redis实现一个栈结构？(lpush/lpop)

​                ● 如何基于redis实现一个阻塞式队列？(lpush/brpop —— b 阻塞，添加阻塞时间）

​                ● 如何实现秒杀活动的公平性？(先进先出-FIFO)

​                ● 通过list结构实现一个消息队列(顺序)吗？（可以，FIFO->lpush,rpop）

​                ● 用户注册时的邮件发送功能如何提高其效率？(邮件发送是要调用三方服务，底层通过队列优化其效率，队列一般是list结构)

​                ● 如何动态更新商品的销量列表？(卖的好的排名靠前一些，linsert)

​                ● 商家的粉丝列表使用什么结构实现呢？(list结构)



# **5 Set类型应用实践**

Redis的Set类似Java中的HashSet，是string类型的无序集合。集合成员是唯一的，这就意味着集合中不能出现重复的数据。Redis中Set集合是通过哈希表实现的，所以添加，删除，查找的复杂度都是O(1)。 



## **相关指令**

| **指令**                         | **备注**                                      | **返回值**                                    |
| -------------------------------- | --------------------------------------------- | --------------------------------------------- |
| sadd 集合名 值1 值2 ...          |                                               |                                               |
| **scard 集合名**                 | 获取集合的成员数                              |                                               |
| sdiff 集合1 集合2                | 见下图1                                       | 返回 **第一个** 集合与其他集合之间的差异      |
| sdiffstore 目标集合 集合1 集合2  | 返回给定所有集合的差集并存储在 destination 中 |                                               |
| sinter 集合1 集合2               |                                               | 返回给定所有集合的交集                        |
| sinterstore目标集合 集合1 集合2  |                                               | 返回给定所有集合的交集并存储在 destination 中 |
| **sismember 集合名 成员**        | 判断 member 元素是否是集合 key 的成员         |                                               |
| **smembers 集合名**              | 返回集合中的所有成员                          |                                               |
| smove 集合1 集合2 成员           | 将成员元素从集合1移动到集合2                  |                                               |
| **spop 集合名**                  | 移除并返回集合中的一个随机元素                |                                               |
| *srandmember 集合名 数目         | 返回集合中一个或多个随机数                    |                                               |
| **srem 集合名 成员1 成员2..**    | 移除集合中一个或多个成员                      |                                               |
| sunion 集合1 集合2               |                                               | 返回所有给定集合的并集                        |
| sunionstore 目标集合 集合1 集合2 | 所有给定集合的并集存储在 destination 集合中   |                                               |

***Srandmember 命令接受可选的 count 参数：**

​                ● 如果 count 为正数，且小于集合基数，那么命令返回一个包含 count 个元素的数组，数组中的元素各不相同。如果 count 大于等于集合基数，那么返回整个集合。

​                ● **如果 count 为负数，那么命令返回一个数组，数组中的元素****可能会重复出现多次**，而数组的长度为 count 的绝对值。

该操作和 SPOP 相似，但 SPOP 将随机元素从集合中移除并返回，而 Srandmember 则仅仅返回随机元素，而不对集合进行任何改动。



![img](data:image/png;base64,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)图1



## **SET实践**

​                ● 朋友圈的点赞功能你如何实现？

​                ● 如何实现一个网站投票统计程序?

​                ● 你知道微博中的关注如何实现吗？