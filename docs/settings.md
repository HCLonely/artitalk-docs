---
title: 配置项
sidebar: auto
---

## 初始化方式

Artitalk 支持在构造时传入配置，也支持先创建实例再调用 `init`：

```html
<script>
new Artitalk({
  backend: 'vercel',
  serverURL: 'https://your-vercel-app.vercel.app'
})
</script>
```

```html
<script>
var at = new Artitalk()
at.init({
  backend: 'vercel',
  serverURL: 'https://your-vercel-app.vercel.app'
})
</script>
```

## 必填

### `serverURL`

- 功能：Artitalk Vercel 服务端地址。
- 示例：`https://your-vercel-app.vercel.app`
- 参数类型：`string`

`serverURL` 是 Vercel 项目的公开访问地址，不是 Neon 数据库连接字符串。数据库连接字符串只应保存在 Vercel 环境变量 `ARTITALK_DATABASE_URL` 中。

## 选填

### `backend`

- 功能：显式标记当前使用 Vercel 服务端。
- 推荐值：`vercel`
- 参数类型：`string`

当前客户端主要根据 `serverURL` 建立连接；建议保留 `backend: 'vercel'`，便于识别配置用途并兼容后续版本。

### `lang`

- 功能：界面语言。
- 默认值：`zh`
- 可选值：`zh`、`en`、`es`
- 参数类型：`string`

### `pageSize`

- 功能：每页显示和每次加载的说说数量。
- 默认值：`5`
- 参数类型：`number`

### `shuoPla`

- 功能：说说编辑框的占位文本。
- 默认值：空
- 参数类型：`string`

### `avatarPla`

- 功能：自定义头像 URL 输入框的占位文本。
- 默认值：空
- 参数类型：`string`

管理员默认头像由 Vercel 环境变量 `ADMIN_IMG` 设置。发布时填写自定义头像 URL 会覆盖默认头像。

### `motion`

- 功能：是否启用加载动画。
- 默认值：`1`
- 可选值：`0`、`1`
- 参数类型：`boolean` 或 `number`

### `bgImg`

- 功能：说说输入框背景图片。
- 默认值：空
- 参数类型：`string`

### `color1`、`color2`、`color3`

- `color1`：说说背景颜色 1 和按钮颜色 1。
- `color2`：说说背景颜色 2 和按钮颜色 2。
- `color3`：主要文字和图标颜色。
- 参数类型：`string`

### `atEmoji`

- 功能：添加自定义表情。
- 默认值：空
- 参数类型：`object`

```js
atEmoji: {
  baiyan: 'https://example.com/baiyan.png',
  doge: 'https://example.com/doge.png'
}
```

### `cssUrl`

- 功能：加载自定义 CSS。
- 默认值：空
- 参数类型：`string`

建议以仓库中的 `dist/css/artitalk.min.css` 或 `src/css/main.css` 为基础制作自定义样式。

### `atComment`

- 功能：评论功能开关。
- 默认值：`1`
- 可选值：`0`、`1`
- 参数类型：`boolean` 或 `number`

### `blackAndWhiteTheme`

- 功能：启用黑白主题适配。
- 默认值：`false`
- 参数类型：`boolean`

## 完整示例

```html
<script src="https://unpkg.com/artitalk"></script>
<div id="artitalk_main"></div>
<script>
new Artitalk({
  backend: 'vercel',
  serverURL: 'https://your-vercel-app.vercel.app',
  pageSize: 5,
  shuoPla: '分享此刻的想法',
  atComment: 1,
  blackAndWhiteTheme: true,
  atEmoji: {
    doge: 'https://example.com/doge.png'
  }
})
</script>
```

## 服务端安全配置

旧版文档中的 `appId`、`appKey`、国内版 LeanCloud API 域名和 Artitalk SafeMode 已不再用于当前 Vercel 后端。

敏感信息应配置在 Vercel 项目的环境变量中：

| 变量名 | 用途 |
| --- | --- |
| `ARTITALK_DATABASE_URL` | Neon Postgres 连接字符串。通过 Vercel Storage 连接并使用 `ARTITALK` 前缀时自动生成。 |
| `ADMIN_USERNAME` | 管理员用户名。 |
| `ADMIN_PASSWORD` | 管理员密码。 |
| `ADMIN_IMG` | 管理员默认头像。 |
| `ADMIN_IMG_Token` | S.EE 图床上传 Token。 |
| `ALLOW_ORIGIN` | 允许调用 API 的站点来源。 |

不要把这些值写入 Artitalk 前端配置。修改服务端环境变量后，需要在 Vercel 中重新部署项目。
