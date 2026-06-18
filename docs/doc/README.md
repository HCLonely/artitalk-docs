---
title: 使用文档
sidebar: heading
---

## 👀 前言

Artitalk 是一个可以嵌入博客或静态站点的说说/微语组件。当前版本使用部署在 Vercel 上的服务端和 Neon Postgres 数据库，不再要求创建 LeanCloud 应用。

- GitHub 仓库：[HCLonely/Artitalk](https://github.com/HCLonely/Artitalk)
- 原项目仓库：[ArtitalkJS/Artitalk](https://github.com/ArtitalkJS/Artitalk)

### 🎉 特性

- 发布、编辑和删除说说
- 支持针对每条说说发表评论
- 支持 Markdown/HTML 语法
- 支持图片、音乐和视频上传入口
- 可从旧 LeanCloud 应用迁移说说和评论数据

## 🚀 部署服务端

### 1. 创建 Vercel 项目

使用vercel一键部署: [![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FHCLonely%2FArtitalkServer&env=ADMIN_USERNAME,ADMIN_PASSWORD,ADMIN_IMG,ADMIN_IMG_Token,ALLOW_ORIGIN&envDefaults=%7B%22ADMIN_IMG%22%3A%22null%22%2C%22ADMIN_IMG_Token%22%3A%22null%22%2C%22ALLOW_ORIGIN%22%3A%22*%22%7D&envDescription=ADMIN_USERNAME%E5%92%8CADMIN_PASSWORD%E4%B8%BA%E5%BF%85%E5%A1%AB%E9%A1%B9&envLink=https%3A%2F%2Fgithub.com%2FHCLonely%2FArtitalkServer%23%25E7%258E%25AF%25E5%25A2%2583%25E5%258F%2598%25E9%2587%258F&project-name=artitalk&repository-name=artitalk-server)

或

1. Fork [ArtitalkServer](https://github.com/HCLonely/ArtitalkServer) 仓库到自己的 GitHub 账号。
2. 在 [Vercel](https://vercel.com/) 中导入仓库。
3. 在 Vercel 项目的 Environment Variables 中添加下列变量。

| 变量名 | 必填 | 说明 |
| --- | --- | --- |
| `ADMIN_USERNAME` | 是 | 首次初始化时创建的管理员用户名。 |
| `ADMIN_PASSWORD` | 是 | 管理员密码。 |
| `ADMIN_IMG` | 否 | 管理员头像 URL。 |
| `ADMIN_IMG_Token` | 否 | [S.EE](https://s.ee/) 图床上传 Token；不配置时无法使用文件上传。 |
| `ALLOW_ORIGIN` | 否 | 允许调用服务端的站点来源。多个来源用英文逗号分隔，例如 `https://blog.example.com,https://admin.example.com`。留空则允许所有域名。 |

::: warning
`ADMIN_USERNAME`、`ADMIN_PASSWORD` 和图床 Token 只能配置在 Vercel 环境变量中，不要写入前端页面或提交到 Git 仓库。
:::

完成环境变量配置后先部署项目。数据库可以在部署前或部署后连接；连接完成后需要重新部署一次，使数据库变量进入 Production 部署。

### 2. 创建并连接 Neon 数据库

推荐通过 Vercel Storage 安装 Neon 集成。Vercel 会自动把数据库连接信息写入项目环境变量。

在 Vercel 团队或账号主页左侧打开 **Storage**：

![打开 Vercel Storage](/images/vercel1.png)

点击右上角 **Create Database**：

![创建数据库](/images/vercel2.png)

选择 **Neon**，然后点击 **Continue**：

![选择 Neon](/images/vercel3.png)

选择数据库区域。建议选择离主要访问者较近的区域；免费套餐可满足个人站点的基础使用：

![选择 Neon 区域和套餐](/images/vercel4.png)

确认资源名称和配置后点击 **Create**：

![确认创建 Neon 数据库](/images/vercel5.png)

创建完成后连接刚才部署的 Vercel 项目：

1. 在 **Project** 中选择 Artitalk 服务端项目。
2. 至少勾选 **Production** 环境。
3. **Custom Prefix 必须填写 `ARTITALK`**。
4. 点击 **Connect**。

![连接项目并设置 ARTITALK 前缀](/images/vercel6.png)

正确连接后，Vercel 会生成 `ARTITALK_DATABASE_URL`。如果未使用 Vercel 集成，也可以从 Neon Console 复制 pooled connection string，并在 Vercel 项目中手动创建同名环境变量。

::: danger
Custom Prefix 如果不是 `ARTITALK`，服务端将无法读取数据库连接。修改或连接数据库后，请重新部署 Vercel 项目。
:::

### 3. 初始化数据库

部署完成后访问 Vercel 项目的根地址，例如：

```text
https://your-vercel-app.vercel.app
```

数据库为空时，初始化页面会提供两个选项：

- **初始化数据库**：初始化创建数据表结构，适合全新安装。
- **从 LeanCloud 迁移**：创建表结构并导入旧数据。

数据库首次创建完成后会显示`初始化管理员账户`按钮，初始化成功后刷新页面，根地址会显示服务端状态。管理员用户名和密码就是前面配置的 `ADMIN_USERNAME` 和 `ADMIN_PASSWORD`。

### 4. 从 LeanCloud 迁移旧数据

只有旧版 Artitalk 用户需要执行本节。

1. 从 LeanCloud 导出 `shuoshuo` 和 `atComment` 数据。
2. 在初始化页面选择 **从 LeanCloud 迁移**。
3. 上传导出的 `shuoshuo.0.jsonl` 和 `atComment.0.jsonl`。
4. 提交迁移并等待成功提示。

如果旧应用没有评论数据，请准备一个空的 `atComment.0.jsonl` 文件再上传。迁移前建议保留原始导出文件作为备份。

## 🌼 在页面中使用

引用 Artitalk 脚本、创建容器，并把 `serverURL` 改为自己的 Vercel 部署地址：

```html
<script src="https://unpkg.com/@hclonely/artitalk"></script>
<div id="artitalk_main"></div>
<script>
new Artitalk({
  backend: 'vercel',
  serverURL: 'https://your-vercel-app.vercel.app'
})
</script>
```

部署地址末尾是否包含 `/` 均可。详细可选参数见[配置项](/settings/)。

### 测试发布

打开页面，点击右下角登录按钮，输入 Vercel 环境变量中配置的管理员用户名和密码。登录后即可发布、编辑和删除说说。

如果页面一直显示加载动画，请先直接访问 `serverURL`，确认服务端可以访问且数据库已经初始化。

### 评论

点击每条说说右下角的评论图标，可以查看或发表评论。评论者填写邮箱后，Artitalk 会使用邮箱的 MD5 值加载 Gravatar 头像。

## 🦄 在 Typecho 中使用

在 Typecho 后台新增独立页面，并在允许执行 HTML/JavaScript 的模板位置加入：

```html
<script src="https://unpkg.com/@hclonely/artitalk"></script>
<div id="artitalk_main"></div>
<script>
new Artitalk({
  backend: 'vercel',
  serverURL: 'https://your-vercel-app.vercel.app'
})
</script>
```

## 🍖 在 Vue 项目中使用

先在站点 HTML 中引入 Artitalk：

```html
<script src="https://unpkg.com/@hclonely/artitalk"></script>
```

然后创建组件：

```vue
<template>
  <div id="artitalk_main" />
</template>

<script>
export default {
  mounted() {
    this.artitalk = new window.Artitalk({
      backend: 'vercel',
      serverURL: 'https://your-vercel-app.vercel.app'
    })
  }
}
</script>
```

在 VuePress Markdown 页面中注册组件后，使用 `<Artitalk />` 即可。启用了客户端路由或页面缓存的项目，应避免在同一页面重复初始化组件。

## 🔐 安全与跨域

Vercel 方案不会把数据库连接、管理员密码或图床 Token 暴露在浏览器中。前端只需要公开服务端地址。

生产环境建议配置 `ALLOW_ORIGIN`，只允许自己的站点调用接口：

```text
https://blog.example.com
```

多个站点使用英文逗号分隔，不要填写路径：

```text
https://blog.example.com,https://www.example.com
```

修改环境变量后需要重新部署 Vercel 项目。未配置 `ALLOW_ORIGIN` 时，服务端默认允许所有来源访问。

## 🕸 使用 CDN

### UNPKG

获取最新版本：

```html
<script src="https://unpkg.com/@hclonely/artitalk"></script>
```

指定版本：

```html
<script src="https://unpkg.com/@hclonely/artitalk@版本号"></script>
```

### JsDelivr

```html
<script src="https://cdn.jsdelivr.net/npm/@hclonely/artitalk"></script>
```

如果 CDN 在所在地区不可用，可以下载 `dist/js/artitalk.min.js` 和 `dist/css/artitalk.min.css` 后自行托管。
