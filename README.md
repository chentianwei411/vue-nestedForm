# 实现嵌套关联结构team／player的创建更新及删除功能

### model结构
1. Team 和 Player 是1对多。
2. 使用accepts_nested_attributes_for :players, allow_destroy: true，建立嵌套关联。

### 目标：
1. 用Vue.js实现team及关联collection players的新建，更新。
2. 实现关联player的删除功能。

### 技术
1. Turbolinks插件。
2. vue-resourse插件。用于提交HTTP请求。

### 提示点
1. 用data-* 特性的值信息给vue实例中的data属性中的team。
