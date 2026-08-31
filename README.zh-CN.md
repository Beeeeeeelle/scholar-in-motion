# Scholar in Motion

[English](README.md) | [简体中文](README.zh-CN.md)

[![构建与部署](https://github.com/Beeeeeeelle/scholar-in-motion/actions/workflows/pages.yml/badge.svg)](https://github.com/Beeeeeeelle/scholar-in-motion/actions/workflows/pages.yml)
[![MIT License](https://img.shields.io/badge/license-MIT-2f3947.svg)](LICENSE)
[![Jekyll](https://img.shields.io/badge/Jekyll-GitHub%20Pages-bb6b5d.svg)](https://jekyllrb.com/)

一个面向研究者的开源 Jekyll 个人网站模板，用于组织研究、教学、服务与设计实践。

[查看演示网站](https://beeeeeeeelle.github.io/scholar-in-motion/) · [使用此模板](https://github.com/Beeeeeeelle/scholar-in-motion/generate) · [自定义指南](CUSTOMIZE.md)

![Scholar in Motion 首页预览](docs/images/preview.png)

## 为什么做这个模板

Scholar in Motion 是从一个实际使用中的学术个人网站中提炼出来的，而不是重新拼成一个通用简历页。它保留了能够帮助访客理解研究脉络的部分：

- 以叙事为主的首页和研究者侧栏
- 可配置为两个、三个或四个方向的交互式 Research Map
- 支持键盘操作的论文节点和详情弹窗
- 由数据文件驱动的 Publications、Teaching、Service、Design 页面
- 可选的当前项目、研究方法、News、Mentoring 和 Evaluation 模块
- 响应式 Beyond the CV 照片墙
- 手机端导航、减少动态效果支持和响应式布局
- 可选的 Cloudflare Web Analytics 接口

## 快速开始

### 在 GitHub 上创建网站

1. 点击 **Use this template**。
2. 如果需要根域名网站，将新仓库命名为 `<你的用户名>.github.io`；如果接受项目子路径，可以使用任意仓库名。
3. 在 `_config.yml` 中修改姓名、职位、个人链接、网站 URL 和 base URL。
4. 用你的内容替换 `_data/` 中的中性示例，并替换 `assets/images/` 中的占位图。
5. 打开 **Settings → Pages**，将发布来源设为 **GitHub Actions**。

仓库自带的工作流会在 `main` 分支更新后自动构建和发布网站。

### 只保留你需要的组件

运行配置问答：

```bash
ruby scripts/configure.rb
```

它会逐项询问是否需要 Research Map、当前项目、News & Activity、照片墙、Mentoring、Review Service、Evaluation 以及各个导航页面。答案会写入 `_data/components.yml` 和 `_data/navigation.yml`，不会改动内容或样式。

只预览问题、不写入文件：

```bash
ruby scripts/configure.rb --dry-run
```

## 内容从哪里修改

| 文件 | 控制的内容 |
| --- | --- |
| `_config.yml` | 姓名、职位、头像、链接、网站地址、Analytics |
| `_data/home.yml` | 首页介绍、当前项目、核心问题 |
| `_data/research.yml` | 研究方向、Research Map 节点和代表成果 |
| `_data/publications.yml` | 代表论文和按时间排列的成果 |
| `_data/teaching.yml` | 教学、Mentoring 和教学证据 |
| `_data/service.yml` | 专业服务、机构服务和审稿工作 |
| `_data/design.yml` | 工具、课程、原型和评估项目 |
| `_data/news.yml` | News & Activity |
| `_data/gallery.yml` | Beyond the CV 照片墙 |
| `_data/components.yml` | 各组件是否显示 |

配置问答见 [SETUP.md](SETUP.md)，完整文件修改说明见 [CUSTOMIZE.md](CUSTOMIZE.md)。本地的 `/map-options/` 页面可以预览两方向、三方向和四方向 Research Map。

## 本地运行

需要 Ruby 3.2 和 Bundler 2.7。

```bash
bundle install
bundle exec jekyll serve
```

打开 `http://127.0.0.1:4000/`。

提交 Pull Request 前运行：

```bash
ruby -c scripts/configure.rb
bundle exec jekyll build
```

## 开源边界

本仓库包含布局系统、研究配色、字体层级、交互方式、中性示例内容和可替换的占位图。它**不包含**原作者的个人 IP、蝴蝶 Research Map、个人照片、CV、聊天机器人知识库、Analytics Token 或个人传记内容。

## 社区与支持

- 提问前请阅读 [SUPPORT.md](SUPPORT.md)。
- 可复现的问题或明确的功能建议请提交 Issue。
- 提交代码前请阅读 [CONTRIBUTING.md](CONTRIBUTING.md)。
- 参与项目时请遵守 [Code of Conduct](CODE_OF_CONDUCT.md)。
- 安全问题请按照 [SECURITY.md](SECURITY.md) 私下报告。

## 致谢与许可证

Scholar in Motion 基于 [Minimal Mistakes](https://github.com/mmistakes/minimal-mistakes) 构建，第三方项目说明见 [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md)。

本模板使用 [MIT License](LICENSE)。如果它帮助你完成了个人网站或教学活动，欢迎注明来源并链接回本仓库，但这不是强制要求。
