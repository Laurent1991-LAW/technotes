# 基本指令

```
python3 --version
pip3 install xx




```



# 三元表达式

当然，Python中的三元条件表达式（也称为条件运算符）的语法是：`value_if_true if condition else value_if_false`。以下是一些例子：

1. **根据成绩输出评价**
   ```python
   grade = 85
   result = "优秀" if grade >= 90 else "良好" if grade >= 80 else "及格" if grade >= 60 else "不及格"
   print(result)  # 输出："良好"
   ```

2. **计算温度单位转换**
   ```python
   temperature = 25
   converted_temp = f"{temperature}℃" if temperature > 0 else f"{temperature * 9/5 + 32}℉"
   print(converted_temp)  # 如果温度大于0，则输出："25℃"；否则将其转换为华氏度并输出
   ```

3. **检查列表是否为空并返回适当消息**
   ```python
   my_list = []
   message = "列表不为空" if my_list else "列表为空"
   print(message)  # 输出："列表为空"
   ```

4. **设置默认值**
   ```python
   user_input = input("请输入一个数字：")
   number = int(user_input) if user_input.isdigit() else None
   print(number)  # 如果用户输入的是数字，则转换为整数并打印；否则设置为None
   ```

以上这些示例展示了如何在一行代码中使用三元条件表达式进行简洁的条件判断和赋值操作。

# 字符串操作

## 格式化字符串

```
name = "Tom"
age = 18
print(f"My name is {name}, and I am {age} years old.")
```



## 查找正则

```python
import re

txt = 'xxxx'
splits = re.findall('(['\u4e00-\u9fa5'])+\|([A-Z]+)', txt)
```



# 集合操作

### 列表转字典

```python
lst = [[‘中国’, ‘cn’],[‘美国’,‘us’],[‘欧盟’,‘eu’],[‘日本’,‘JAP’]]

dict = dict(lst) # 直接转化为字典
```

# 列表操作



获取列表最后一个元素 lst[-1]





# 继承关系

Python 中可以通过定义抽象基类（Abstract Base Classes, ABCs）来模拟接口的概念。Python 的内置模块 `abc` 提供了 `ABC` 类和 `abstractmethod` 装饰器来创建抽象基类和抽象方法。当一个普通类继承自这样的抽象基类并实现了所有抽象方法时，可以看作是实现了相应接口。语法示例如下：

```python
from abc import ABC, abstractmethod

class MyInterface(ABC):
    @abstractmethod
    def required_method(self):
        ...

class MyClass(MyInterface):
    def required_method(self):
        # 实现抽象方法
        ...
```

在上述代码中，`MyClass` 继承自 `MyInterface` 抽象基类，并实现了其中的抽象方法 `required_method`，这就是 Python 中模拟接口实现的一种方式。

总结来说，Python 中的继承关系通过在定义类时在其名称后直接列出父类名来表示，如 `class 子类名(父类名):`。而实现关系在 Python 中通常是指类通过继承抽象基类并实现其中的抽象方法来模拟接口实现，这涉及到 `abc` 模块的 `ABC` 类和 `abstractmethod` 装饰器的使用。

# Selenium



##  依赖

```
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as ec
from selenium.webdriver.support.ui import WebDriverWait as webDriverWait
```



## XPATH Helper插件

注: 谷歌浏览器的XPATH Helper插件可帮助查验XPATH

![Screenshot 2024-01-01 at 7.07.15 PM](./assets/Screenshot 2024-01-01 at 7.07.15 PM.png)



## 获取元素

```python

# 筛选出有数据的tr，去掉属性为datatran的tr 
trains=driver. find_elements_by_xpath (' //tbody®id="queryLeftTable"]/tr[not (@datatran)]')
```



## 获取Cookie

```
driver.get_cookies()
driver.get_cookie('BAIDU')
driver.add_cookie({'name':'zhangsan','value':8})
driver.delete_cookie('zhangsan')
driver.delete_all_cookies()
```



## 等待

```python
from selenium.webdriver.support import expected_conditions as ec
from selenium.webdriver.support.ui import WebDriverWait as webDriverWait

# 等待某元素的value为xx
WebDriverWait(drive, 100).until(
	ec.text_to_be_present_in_element_value((By.ID, 'fromStationText'), '长春')
)

# 等待url为xx
WebDriverWait(drive, 100).until(
	ec.url_to_be('url')
)

# 特定元素出现, 如等待id为queryLeftTable的tbody出现
WebDriverWait(drive, 100).until(
	ec.presence_of_element_located((By.XPATH, '//tbody[@id="queryLeft"]/tr'))
)

# 等待‘页面加载出 待勾选乘车人信息’
WebDriverWait (driver, 1000). until( ec.presence_of_element_located((By.XPATH,'//ul[@id="normal_passenger_id"]/li/label')) 
)


```







