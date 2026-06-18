---
title: 从 LeanCloud 迁移
sidebar: heading
---

## 迁移说明

Artitalk `4.0.0` 使用部署在 Vercel 上的服务端和 Neon Postgres 数据库，不再直接连接 LeanCloud。本页说明如何将旧版 Artitalk 中的说说和评论迁移到新服务端。

迁移过程只导入以下两个 Class：

| LeanCloud Class | 内容 | 导出文件 |
| --- | --- | --- |
| `shuoshuo` | 已发布的说说 | `shuoshuo.0.jsonl` |
| `atComment` | 说说评论 | `atComment.0.jsonl` |

旧 LeanCloud `_User` 中的账号、密码和会话不会迁移。新服务端的管理员账户需要通过 Vercel 环境变量重新创建。

::: danger 迁移前请注意
迁移入口用于全新的 Neon 数据库。不要先在新服务端发布正式数据，否则可能出现数据混合或同一 `objectId` 的记录被覆盖。

迁移完成并验证无误前，不要删除 LeanCloud 应用。请保留原始导出压缩包和 JSONL 文件作为备份。
:::

## 一、迁移前准备

开始前请准备：

- 可以访问旧 Artitalk LeanCloud 应用的账号。
- 一个 GitHub 账号和一个 Vercel 账号。
- 一个用于 Artitalk 的 Neon Postgres 数据库。
- 新管理员的用户名和密码。
- 旧站点中使用的 LeanCloud `shuoshuo` 和 `atComment` Class。

建议先记录旧站点中的说说数量和评论数量，迁移后用于核对：

1. 登录 LeanCloud 控制台并进入旧 Artitalk 应用。
2. 打开 **数据存储**。
3. 分别查看 `shuoshuo` 和 `atComment` Class 中的记录数量。
4. 截图或记录数量。

如果不存在 `atComment` Class，说明旧站点没有启用评论或没有评论数据，后续可以创建一个空的 `atComment.0.jsonl` 文件。

## 二、从 LeanCloud 导出数据

LeanCloud 不同控制台版本的菜单名称可能略有差异，一般可以按以下步骤操作：

1. 登录 [LeanCloud 控制台](https://console.leancloud.cn/)。
2. 选择旧 Artitalk 使用的应用。
3. 在应用设置或数据存储相关页面中找到 **导入导出**、**数据导出** 或类似入口。
4. 创建一次数据导出任务，导出应用数据。
5. 等待导出任务完成，然后通过控制台或通知邮件下载导出压缩包。
6. 解压下载的文件，并找到：
   - `shuoshuo.0.jsonl`
   - `atComment.0.jsonl`

::: tip
导出压缩包中可能包含 `_User`、`_Role` 等其他文件。Artitalk 迁移页面只需要 `shuoshuo.0.jsonl` 和 `atComment.0.jsonl`，不要上传整个压缩包。
:::

如果导出的文件名带有不同的数字分片，例如 `shuoshuo.1.jsonl`，说明数据可能被拆分为多个文件。当前网页迁移入口一次只接收一个说说文件和一个评论文件，应先确认主要数据是否都在 `.0.jsonl` 中，避免遗漏分片。

### 没有评论数据

迁移页面要求选择两个文件。如果旧应用没有 `atComment` Class 或导出包中没有评论文件，请新建一个空文本文件，并命名为：

```text
atComment.0.jsonl
```

文件内容保持为空，不要写入 `[]`、`{}` 或其他占位内容。

## 三、部署 Vercel 服务端

可以使用一键部署：

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FHCLonely%2FArtitalkServer&env=ADMIN_USERNAME,ADMIN_PASSWORD,ADMIN_IMG,ADMIN_IMG_Token,ALLOW_ORIGIN&envDefaults=%7B%22ADMIN_IMG%22%3A%22null%22%2C%22ADMIN_IMG_Token%22%3A%22null%22%2C%22ALLOW_ORIGIN%22%3A%22*%22%7D&envDescription=ADMIN_USERNAME%E5%92%8CADMIN_PASSWORD%E4%B8%BA%E5%BF%85%E5%A1%AB%E9%A1%B9&envLink=https%3A%2F%2Fgithub.com%2FHCLonely%2FArtitalkServer%23%25E7%258E%25AF%25E5%25A2%2583%25E5%258F%2598%25E9%2587%258F&project-name=artitalk&repository-name=artitalk-server)

也可以 Fork [ArtitalkServer](https://github.com/HCLonely/ArtitalkServer)，然后在 Vercel 中导入仓库。

在 Vercel 项目的 **Environment Variables** 中配置：

| 变量名 | 必填 | 说明 |
| --- | --- | --- |
| `ADMIN_USERNAME` | 是 | 迁移后创建的新管理员用户名。 |
| `ADMIN_PASSWORD` | 是 | 新管理员密码。 |
| `ADMIN_IMG` | 否 | 管理员头像 URL。 |
| `ADMIN_IMG_Token` | 否 | S.EE 图床 Token；不配置时无法上传文件。 |
| `ALLOW_ORIGIN` | 建议 | 允许访问服务端的站点来源，例如 `https://blog.example.com`。 |

敏感信息只能保存在 Vercel 环境变量中，不要写入博客页面、Artitalk 前端配置或 Git 仓库。

## 四、连接 Neon 数据库

推荐在 Vercel 的 **Storage** 页面创建或连接 Neon 数据库：

1. 打开 Vercel 团队或账号的 **Storage** 页面。
2. 创建或选择一个 Neon Postgres 数据库。
3. 将数据库连接到刚部署的 Artitalk 服务端项目。
4. 至少勾选 **Production** 环境。
5. 将 **Custom Prefix** 设置为 `ARTITALK`。
6. 完成连接后，确认项目环境变量中存在 `ARTITALK_DATABASE_URL`。
7. 重新部署 Vercel 项目，使数据库环境变量进入新的 Production 部署。

::: danger
Custom Prefix 必须为 `ARTITALK`。如果服务端提示 `ARTITALK_DATABASE_URL is required`，通常是数据库未连接到正确的项目、前缀错误，或者连接后没有重新部署。
:::

详细的 Neon 图文配置步骤见[使用文档](/doc/)。

## 五、执行数据迁移

完成 Vercel 和 Neon 配置后：

1. 访问 Vercel 服务端根地址，例如：

   ```text
   https://your-vercel-app.vercel.app
   ```

2. 确认页面显示数据库为空，可以初始化或从 LeanCloud 导入。
3. 点击 **从 LeanCloud 迁移**。
4. 在 `shuoshuo.0.jsonl` 输入框中选择 LeanCloud 导出的说说文件。
5. 在 `atComment.0.jsonl` 输入框中选择评论文件；没有评论时选择前面创建的空文件。
6. 点击 **开始迁移**。
7. 保持页面打开，等待迁移完成。
8. 记录页面返回的说说和评论导入数量。

迁移程序会保留数据中的 `objectId`、`createdAt` 和 `updatedAt`，其他字段会作为兼容数据写入 Neon。评论中用于关联说说的原始字段也会一并保留。

::: warning
迁移期间不要重复点击提交按钮，也不要同时在多个浏览器窗口执行迁移。
:::

## 六、初始化管理员账户

迁移完成后，服务端会创建数据库表，但不会迁移 LeanCloud `_User` 账号。

1. 返回或刷新 Vercel 服务端根页面。
2. 点击 **初始化管理员账户**。
3. 服务端会读取 Vercel 中的 `ADMIN_USERNAME`、`ADMIN_PASSWORD`、`ADMIN_IMG` 和 `ADMIN_IMG_Token`。
4. 初始化成功后刷新页面，确认服务端显示数据库和管理员状态正常。

数据库中只能通过初始化页面创建第一个管理员。数据库已有管理员后，单纯修改 Vercel 环境变量不会替换现有账号。

## 七、修改站点配置

删除旧版 Artitalk 配置中的 LeanCloud `appId`、`appKey` 和 API 域名，改为连接新服务端：

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

将 `serverURL` 替换为自己的 Vercel 项目地址。该地址是公开的服务端 URL，不是 `ARTITALK_DATABASE_URL` 数据库连接字符串。

如果配置了 `ALLOW_ORIGIN`，其值必须包含博客站点的来源：

```text
https://blog.example.com
```

只填写协议和域名，不要添加 `/talk/` 等页面路径。多个站点使用英文逗号分隔。

## 八、迁移后验证

建议逐项检查：

- 页面可以正常加载，不会一直显示加载动画。
- 说说数量与迁移前记录基本一致。
- 说说的发布时间、正文、图片、音乐或视频信息正常。
- 评论数量和评论所属说说正确。
- 使用新管理员账号可以登录。
- 可以发布、编辑和删除一条测试说说。
- 可以发表一条测试评论。
- 配置了 `ADMIN_IMG_Token` 时可以上传文件。
- 浏览器 Console 和 Network 中没有 CORS 或接口错误。

确认迁移成功后，建议暂时保留 LeanCloud 应用和导出文件。稳定运行一段时间后，再决定是否停用旧应用。

## 常见问题

### 根页面没有“从 LeanCloud 迁移”

迁移入口只应在新数据库为空时使用。请确认：

1. Neon 是否连接到了正确的 Vercel 项目。
2. 当前数据库是否已经初始化或写入数据。
3. 是否误用了其他项目的 `ARTITALK_DATABASE_URL`。

如果已经在新数据库中写入正式数据，不要直接清空数据库。请先备份数据，再更换一个空的 Neon 数据库执行迁移。

### 提示必须上传两个文件

迁移页面要求同时提供说说和评论文件。没有评论数据时，请上传一个内容为空的 `atComment.0.jsonl`。

### 导入数量为 0

检查上传的文件是否正确：

- 文件必须是 LeanCloud 导出的 JSONL 文本，不是 ZIP 压缩包。
- 不要把 JSONL 文件改成 JSON 数组。
- `shuoshuo.0.jsonl` 不应为空。
- 确认没有选错其他 Class 的导出文件。

### 迁移后数据数量不一致

先检查 LeanCloud 导出包中是否存在 `.1.jsonl`、`.2.jsonl` 等分片文件。如果存在，当前迁移页面可能只导入了 `.0.jsonl` 中的数据。

不要在有正式数据的数据库中反复尝试导入。保留当前数据库作为备份，然后使用新的空数据库重新迁移。

### 页面一直加载或出现跨域错误

按以下顺序检查：

1. 直接访问 `serverURL`，确认服务端可用。
2. 确认 Vercel 中存在 `ARTITALK_DATABASE_URL`。
3. 确认连接数据库后已经重新部署。
4. 检查 `ALLOW_ORIGIN` 是否包含当前博客来源。
5. 查看浏览器 Console、Network 和 Vercel Deployment Logs。

更多排查方法见 [FAQ](/faq/)。

## 回滚建议

如果新站点验证失败：

1. 不要删除 LeanCloud 应用和导出文件。
2. 临时恢复旧版前端脚本及 `appId`、`appKey` 配置，让站点继续读取 LeanCloud。
3. 保留失败的 Neon 数据库用于排查，不要直接覆盖或删除。
4. 修正 Vercel 环境变量、数据库连接或导出文件后，使用新的空数据库重新迁移。

回滚旧前端只适合作为临时方案。LeanCloud 服务状态可能变化，问题解决后应尽快完成 Vercel 迁移。
