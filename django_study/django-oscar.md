# frobshop

**frobshop 不是一个独立软件，是 django-oscar 官方文档里的示例项目名**（Django 开源电商框架 Oscar 的入门 Demo 工程）docs.oscar...。

## 背景

- **Django-Oscar**：基于 Django 的开源、可扩展电商框架，用来自建独立商城（商品、购物车、订单、支付、后台仪表盘）。
- `frobshop` 只是文档里随便起的项目名称，作为教学示例，类似教程里常写的 `myproject`。

> 
> 文档原话：*For simplicity, let’s assume you’re building a new e-commerce project from scratch and have decided to use Oscar. Let’s call this project frobshop*

## 快速创建 frobshop 示例命令

```
# 安装 django-oscar
pip install django-oscar[sorl-thumbnail]
# 创建名为 frobshop 的Django项目
django-admin startproject frobshop
```

之后按文档配置 settings、urls、数据库，就能跑起一个最简电商站点。

## 补充

- 没有叫 frobshop 的成品商城系统，**frobshop = 示例项目名称**，不是产品。
- Frob 本身是计算机圈一个传统占位词（类似 `foo / bar / baz`），frobshop = “随便起的商店项目”。

