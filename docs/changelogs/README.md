---
title: 更新日志
sidebar: heading
---

### 👍 `2026/06/18`

* `4.0.0`

* 服务端迁移至 Vercel，并使用 Neon Postgres 替代即将停止服务的 LeanCloud。
* 新增服务端初始化页面，支持创建数据库表，以及从 LeanCloud 导出的 `shuoshuo.0.jsonl` 和 `atComment.0.jsonl` 文件迁移历史数据。
* 管理员账号、数据库连接和图床 Token 改为通过 Vercel 环境变量配置，避免在前端暴露敏感信息。
* 前端新增 `serverURL` 和 `backend: 'vercel'` 配置，用于连接自行部署的 Artitalk 服务端。
* 保留说说的发布、预览、编辑、删除、评论及 Markdown/HTML 渲染等功能。
* 图片上传改用 S.EE 图床，需要在服务端配置 `ADMIN_IMG_Token`。
* npm 包调整为 `@hclonely/artitalk`，可通过 unpkg 直接引入：

```html
<script src="https://unpkg.com/@hclonely/artitalk"></script>
```

::: warning 升级说明
`4.0.0` 是服务端架构升级版本，不再使用旧版 LeanCloud 的 `appId`、`appKey` 和 Class 配置。升级前请先按照[从 LeanCloud 迁移](/migration/)部署 Vercel 服务端并完成数据迁移。
:::
