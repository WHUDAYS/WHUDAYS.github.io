import DefaultTheme from 'vitepress/theme'
import {
	NolebaseGitChangelogPlugin
} from '@nolebase/vitepress-plugin-git-changelog/client'
import '@nolebase/vitepress-plugin-git-changelog/client/style.css'
import MemberCard from './components/MemberCard.vue'

export default {
	extends: DefaultTheme,
	Layout: DefaultTheme.Layout,
	enhanceApp({ app }) {
		app.use(NolebaseGitChangelogPlugin)
		app.component('MemberCard', MemberCard)
	},
}