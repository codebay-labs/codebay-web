# CodeBay 官网

CodeBay 的产品主页，纯静态站点（HTML + CSS + 原生 JS，无构建步骤、无第三方运行时、无外部 CDN）。

- 入口：`index.html`
- 样式：`style.css`
- 脚本：`main.js`
- 字体：`assets/fonts/`（Manrope / Instrument Serif / JetBrains Mono，SIL OFL）
- Agent 图标：`assets/agents/`
- 界面截图：`assets/shots/hero.webp`（开发版浅色界面）
- 未签名预览安装脚本：`install.sh`（下载、校验、ad-hoc 签名、安装）

## 设计

视觉方向是「深空控制室 + 纸面验收记录」：暗色海面负责氛围，纸面段只放可复查的数字，琥珀只表示「有 Agent 在等你」。
颜色语义：紫罗兰 = 品牌与背景光，薄荷 = 运行中，琥珀 = 等待/被看见；除此以外不装饰性用色。

中段用一段 sticky 滚动叙事把老问题演出来：十几个散落的终端在滚动中聚拢、淡出，随后 CodeBay 主界面从中心扶正——「以前找不到会话，现在一个窗口全部归位」。该段同时用到 Container Scroll Animation 的倾斜/放大手势与自定义的终端汇聚编排。

组件参照 [Aceternity UI](https://ui.aceternity.com/components) 的公开示例，全部用原生 HTML/CSS/JS 重写，没有引入 React、Tailwind 或任何 npm 依赖：

- [Spotlight](https://ui.aceternity.com/components/spotlight)
- [Aurora Background](https://ui.aceternity.com/components/aurora-background)
- [Background Beams](https://ui.aceternity.com/components/background-beams)
- [Grid and Dot Backgrounds](https://ui.aceternity.com/components/grid-and-dot-backgrounds)
- [Sparkles](https://ui.aceternity.com/components/sparkles)
- [Meteors](https://ui.aceternity.com/components/meteors)
- [Text Generate Effect](https://ui.aceternity.com/components/text-generate-effect)
- [Flip Words](https://ui.aceternity.com/components/flip-words)
- [Moving Border](https://ui.aceternity.com/components/moving-border)
- [Infinite Moving Cards](https://ui.aceternity.com/components/infinite-moving-cards)
- [Container Scroll Animation](https://ui.aceternity.com/components/container-scroll-animation)
- [Bento Grid](https://ui.aceternity.com/components/bento-grid)
- [Card Spotlight](https://ui.aceternity.com/components/card-spotlight)
- [Keyboard](https://ui.aceternity.com/components/keyboard)
- [Animated Tooltip](https://ui.aceternity.com/components/animated-tooltip)
- [World Map](https://ui.aceternity.com/components/world-map)
- [Lamp Effect](https://ui.aceternity.com/components/lamp-effect)

约束与回退：

- 所有动画只动 `transform` / `opacity`；滚动由一个 passive 监听 + 一个 rAF 调度，Canvas 30fps 上限且离屏/后台暂停。
- `prefers-reduced-motion: reduce` 下停用持续动画与 Canvas 循环，内容直接显示终态。
- 无 JS 时隐藏初态全部失效，FAQ、下载、截图区仍可读；地图给出 noscript 说明。
- 字体、图标、截图全部自托管；页面不加载任何外部 CDN、字体或统计脚本。

## 本地预览

```bash
python3 -m http.server -d web 8000
# 打开 http://127.0.0.1:8000/
```

## 部署

源文件在本仓库的 `web/` 目录；发布仓库是 [go-kenka/codebay-site](https://github.com/go-kenka/codebay-site)，
通过 GitHub Pages 提供 https://go-kenka.github.io/codebay-site/。

改完 `web/` 后，在仓库根目录运行：

```bash
Scripts/deploy-web.sh
```

脚本会把 `web/` 的内容同步到发布仓库的 `main` 分支（force push），GitHub Pages 随后自动重新构建。
需要本机已安装并登录 `gh`。

> 部署仓库只保存站点产物；这里（`web/`）才是源文件，不要在发布仓库里直接改内容。

## 发布流程

`.github/workflows/release.yml` 从私有源码仓库 `go-kenka/CodeBay` 构建 App，
并把 DMG 发到本仓库的 GitHub Release（资产名为 `CodeBay-<arch>.dmg`，如 `CodeBay-arm64.dmg`）。
详见主仓库的 `docs/release.md`。
