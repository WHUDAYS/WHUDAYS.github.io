export default {
    // 站点级选项
    title: "WHUDAYS", // 网站标题
    description: "武汉大学动漫协会工作文档", // 网站描述
    sitemap: {
        hostname: "https://whudays.github.io/", // 网站域名
    },

    themeConfig: {
        // 主题级选项
        nav: [
            { text: '首页', link: '/' },
            { text: '关于', link: '/about' },
            {
                text: '文档',
                items: [
                    { text: "1", link: "/bigFrontEnd/html/" },
                    { text: "2", link: "/bigFrontEnd/css/" },
                    { text: "3", link: "/bigFrontEnd/js/" },
                ]
            }
        ],
        sidebar: [
            {
                text: "社团介绍", link: "/about",
            },
            {
                text: "萌新指南", link: "/newbie-guide/2024",
                collapsed: false,
                items: [
                    { text: "一、武大漫协Q&A", link: "/newbie-guide/2024/01-faq" },
                    { text: "二、武大漫协大群群规", link: "/newbie-guide/2024/02-rules" },
                    { text: "三、关注武大漫协官方账号", link: "/newbie-guide/2024/03-official-accounts" },
                ]
            },
        ],
        lastUpdated: {
            text: "最后更新",
            formatOptions: {
                dateStyle: "medium",
                timeStyle: "short"
            }
        },
        search: {
            provider: "local",
        },
    }
};