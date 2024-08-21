此目录存放课堂作业，可以在此文件添加作作业思路和对题目的看法

#### 框架

1、next.js https://corp-pied-xi.vercel.app/scale

2、taidwind.css https://www.tailwindcss.cn/

3、next.ui

##### 尝试做一个跳转页面
**思路与做法：** 路由跳转，nextjs的路由类似文件系统，pages目录下的会映射为对应的路由。因此pages下创建三个文件和‘/’下的indx作为Home。四个页面的导航栏都是固定的，因此将其独立出来作为组件，引入各个页面。四个页面对应四个背景图，因此在全局css中写好四个背景的配置。每个页面和导航的内容样式由tailwind来弄。

##### 一个小demo Snippets 练习
**功能要求:** 增删改查