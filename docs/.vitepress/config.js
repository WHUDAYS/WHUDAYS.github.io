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
            { text: '关于', link: '/about' },
            {
                text: '文档',
                items: [
                    { text: "首页", link: "/" },
                    { text: "1", link: "/bigFrontEnd/html/" },
                    { text: "2", link: "/bigFrontEnd/css/" },
                    { text: "3", link: "/bigFrontEnd/js/" },
                ]
            }
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