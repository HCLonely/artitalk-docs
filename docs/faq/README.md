---
title: FAQ 常见问题及回答
sidebar: heading
---

## 🔨 常见问题

### 页面一直显示加载动画

按以下顺序检查：

1. 浏览器是否成功加载 Artitalk 的 JavaScript 和 CSS。
2. `serverURL` 是否为自己的 Vercel 项目地址。
3. 直接访问 `serverURL`，确认服务端部署可以打开。
4. 确认 Neon 已连接到当前 Vercel 项目，并且项目中存在 `ARTITALK_DATABASE_URL`。
5. 确认数据库已经通过服务端根页面初始化。

打开浏览器开发者工具的 Console 和 Network 面板，可以看到具体失败的请求和错误信息。

### 服务端提示 `ARTITALK_DATABASE_URL is required`

服务端没有读取到 Neon 数据库连接字符串。

如果使用 Vercel Storage：

1. 确认 Neon 数据库已经连接到正确的 Vercel 项目。
2. 确认连接时的 Custom Prefix 为 `ARTITALK`。
3. 确认 Production 环境中存在 `ARTITALK_DATABASE_URL`。
4. 重新部署项目。

也可以在 Neon Console 复制 pooled connection string，并手动添加为 Vercel 环境变量 `ARTITALK_DATABASE_URL`。

### 初始化时提示先设置管理员环境变量

在 Vercel 项目中添加：

```text
ADMIN_USERNAME
ADMIN_PASSWORD
```

保存后重新部署，再访问项目根地址执行初始化。

### 浏览器出现 CORS 或跨域错误

检查 Vercel 环境变量 `ALLOW_ORIGIN`。

- 值必须包含当前页面的来源，例如 `https://blog.example.com`。
- 不要附加 `/talk/` 等页面路径。
- 多个来源使用英文逗号分隔。
- 修改后需要重新部署。

排错时可以暂时移除 `ALLOW_ORIGIN`；未配置时服务端允许所有来源。确认问题后应恢复域名限制。

### 登录失败

登录用户名和密码来自首次初始化时使用的 `ADMIN_USERNAME` 和 `ADMIN_PASSWORD`。

请确认：

1. 输入值与 Vercel 环境变量一致。
2. 数据库已经完成初始化。
3. 修改管理员变量后是否重新部署。

数据库已有管理员时，仅修改环境变量不会自动替换已有账号。

### 无法上传图片或媒体

文件上传依赖 `ADMIN_IMG_Token`。请在 [S.EE](https://s.ee/) 获取 Token，将其添加到 Vercel 环境变量并重新部署。

没有配置 Token 不影响纯文本说说和评论功能。

### 如何从 LeanCloud 迁移

在 LeanCloud 导出 `shuoshuo.0.jsonl` 和 `atComment.0.jsonl`，然后在全新数据库的初始化页面选择“从 LeanCloud 迁移”并上传两个文件。

迁移入口只在数据库为空时显示。请在初始化前完成迁移，不要先创建正式数据。

### 遇到问题如何排查

1. 直接访问 `serverURL` 查看服务端状态。
2. 查看 Vercel Deployment Logs。
3. 查看浏览器 Console 和 Network 面板。
4. 核对[部署步骤](/doc/#部署服务端)和[配置项](/settings/)。
5. 仍无法解决时，在项目仓库提交 Issue，并附上已隐藏敏感信息的错误日志。

::: warning
提交错误信息时不要公开数据库连接字符串、管理员密码或图床 Token。
:::
