# 小侦探奇遇记主题色

全局主题在 `src/styles/theme.css`，由 `src/App.vue` 的全局样式导入。`src/uni.scss` 已移除，避免 uni-app 将通用规则自动注入每个页面。

页面大面积使用暖白、浅灰绿和低饱和木色；主操作使用森林绿，正文维持深绿灰。组件样式只引用 `--color-*` 语义 token，不直接写十六进制、RGB/HSL 或颜色名称。插画保留可辨认的红、绿、蓝与木色，但统一降低饱和度，不使用荧光色、亮黄橙、大面积高饱和填充或闪烁效果。

| 用途 | Token |
| --- | --- |
| 页面底色 / 内容表面 | `--color-paper` / `--color-surface` |
| 正文 / 次级文字 | `--color-ink` / `--color-ink-muted` |
| 主操作 / 深色强调 | `--color-primary` / `--color-primary-dark` |
| 柔和主题底色 | `--color-primary-soft`、`--color-aqua-soft`、`--color-wheat-soft`、`--color-terracotta-soft` |
| 分隔边框 / 柔和边界 | `--color-line` / `--color-border-soft` |
| 低饱和插画木色 | `--color-wood`、`--color-wood-light`、`--color-wood-edge` |

运行 `node scripts/check-theme.mjs`，检查 Vue `<style>` 中的原始颜色、未定义 token、SVG 六位色饱和度（HSL S 不高于 55%），以及常用正文、按钮和次级色组合的 WCAG 对比度（至少 4.5:1）。
