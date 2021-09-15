module.exports = {

    title: '行黎的笔记',
    description: '多学习，少熬夜',

    // 网站语言
    locales: {
        '/': {
            lang: 'zh-CN',
        },
    },

    //插件
    plugins: [
        'vuepress-plugin-helper-live2d',
    ],

    // 使用的主题
    theme: 'meteorlxy',

    head: [ // 注入到当前页面的 HTML <head> 中的标签
        ['link', { rel: 'icon', href: '/images/icon.jpg' }], // 增加一个自定义的 favicon(网页标签的图标)
        ['link', { rel: 'manifest', href: '/images/icon.jpg' }],
        ['link', { rel: 'apple-touch-icon', href: '/images/icon.jpg' }],
        ['link', { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.7.1/katex.min.css' }],
        ['link', { rel: "stylesheet", href: "https://cdnjs.cloudflare.com/ajax/libs/github-markdown-css/2.10.0/github-markdown.min.css" }],
        ['meta', { 'http-quiv': 'pragma', cotent: 'no-cache' }],
        ['meta', { 'http-quiv': 'pragma', cotent: 'no-cache,must-revalidate' }],
        ['meta', { 'http-quiv': 'expires', cotent: '0' }],
    ],
    serviceWorker: true, // 是否开启 PWA
    base: '/', // 这是部署到github相关的配置

    markdown: {
        extendMarkdown: md => {
            md.set({ html: true })
            md.use(require('markdown-it-katex'))
                //加载latex数学公式
        },
        lineNumbers: true // 代码块显示行号
    },

    plugins: [
        [
            'vuepress-plugin-helper-live2d', {
                // 是否开启控制台日志打印(default: false)
                log: false,
                live2d: {
                    // 是否启用(关闭请设置为false)(default: true)
                    enable: true,
                    // 模型名称(default: hibiki)>>>取值请参考：
                    // https://github.com/JoeyBling/hexo-theme-yilia-plus/wiki/live2d%E6%A8%A1%E5%9E%8B%E5%8C%85%E5%B1%95%E7%A4%BA
                    model: 'wanko',
                    display: {
                        position: "left", // 显示位置：left/right(default: 'right')
                        width: 270, // 模型的长度(default: 135)
                        height: 600, // 模型的高度(default: 300)
                        hOffset: -30, //  水平偏移(default: 65)
                        vOffset: -180, //  垂直偏移(default: 0)
                    },
                    mobile: {
                        show: false // 是否在移动设备上显示(default: false)
                    },
                    react: {
                        opacity: 0.8 // 模型透明度(default: 0.8)
                    }
                }
            }
        ]
    ],

    themeConfig: {
        lang: Object.assign(require('vuepress-theme-meteorlxy/lib/langs/zh-CN'), {
            posts: '笔记',
        }),
        // 主题语言，参考下方 [主题语言] 章节
        // 个人信息（没有或不想设置的，删掉对应字段即可）
        personalInfo: {
            // 昵称
            nickname: '行黎',

            // 个人简介 (支持 HTML)
            description: '多学习，少熬夜',

            // 电子邮箱
            email: '1178990376@qq.com',

            // 所在地
            location: 'Chengdu City, China',

            // 组织
            //organization: 'UESTC',

            // 头像
            // 设置为外部链接
            avatar: '/images/icon.jpg',
            // 或者放置在 .vuepress/public 文件夹，例如 .vuepress/public/img/avatar.jpg
            // avatar: '/img/avatar.jpg',


            // 社交平台帐号信息
            sns: {
                // Github 帐号和链接
                github: {
                    account: 'himcrh',
                    link: 'https://github.com/himcrh',
                },

            },
        },

        // 上方 header 的相关设置 (可选)
        header: {
            // header 的背景，可以使用图片，或者随机变化的图案（geopattern）
            background: {
                // 使用图片的 URL，如果设置了图片 URL，则不会生成随机变化的图案，下面的 useGeo 将失效
                url: '/images/header.jpg',

                // 使用随机变化的图案，如果设置为 false，且没有设置图片 URL，将显示为空白背景
                useGeo: true,
            },

            // 是否在 header 显示标题
            showTitle: true,
        },

        // 底部 footer 的相关设置 (可选)
        footer: {
            // 是否显示 Powered by VuePress
            poweredBy: false,

            // 是否显示使用的主题
            poweredByTheme: false,

            // 添加自定义 footer (支持 HTML)
            custom: '一个懒癌患者的自我救赎',
        },

        // 个人信息卡片相关设置 (可选)
        infoCard: {
            // 卡片 header 的背景，可以使用图片，或者随机变化的图案（geopattern）
            headerBackground: {
                // 使用图片的 URL，如果设置了图片 URL，则不会生成随机变化的图案，下面的 useGeo 将失效
                //url: '/images/header2.jpg',

                // 使用随机变化的图案，如果设置为 false，且没有设置图片 URL，将显示为空白背景
                useGeo: true,
            },
        },

        // 是否显示文章的最近更新时间
        lastUpdated: true,

        // 顶部导航栏内容
        nav: [
            { text: '首页', link: '/', exact: true },
            { text: '笔记', link: '/posts/', exact: false },
        ],

        // 是否开启平滑滚动
        smoothScroll: true,

        // vuepress-plugin-zooming 的配置项
        zooming: {
            // @see https://vuepress.github.io/en/plugins/zooming
        },

        // 评论配置，参考下方 [页面评论] 章节
        comments: {
            platform: 'github',
            owner: 'himcrh',
            repo: 'my_Blog',
            clientId: '735fee872ae6c5439d9a',
            clientSecret: '9bc8da3c38499ac4a9ddc87e9f2c44d1854e7747',
            autoCreateIssue: true
        },

        // 分页配置 (可选)
        pagination: {
            perPage: 5,
        },

        // 默认页面（可选，默认全为 true）
        defaultPages: {
            // 是否允许主题自动添加 Home 页面 (url: /)
            home: true,
            // 是否允许主题自动添加 Posts 页面 (url: /posts/)
            posts: true,
        },
    },
}