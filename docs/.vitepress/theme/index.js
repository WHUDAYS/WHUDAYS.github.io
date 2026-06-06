import DefaultTheme from 'vitepress/theme'
import {
	NolebaseGitChangelogPlugin
} from '@nolebase/vitepress-plugin-git-changelog/client'
import '@nolebase/vitepress-plugin-git-changelog/client/style.css'
import MemberCard from './components/MemberCard.vue'
import ChatMessage from './components/ChatMessage.vue'

export default {
	extends: DefaultTheme,
	Layout: DefaultTheme.Layout,
	enhanceApp({ app }) {
		app.use(NolebaseGitChangelogPlugin, {
			displayAuthorsInsideCommitLine: true,
		})
		app.component('MemberCard', MemberCard)
		app.component('ChatMessage', ChatMessage)
	},
}