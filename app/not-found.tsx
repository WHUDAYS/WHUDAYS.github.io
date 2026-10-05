import { HomeLayout } from '@fumadocs/base-ui/layouts/home';
import { baseOptions } from '@/lib/layout.shared';
export default function NotFound() {
  return <HomeLayout {...baseOptions()}><main id="main-content" className="not-found"><p>404</p><h1>页面不存在</h1><p>可以使用站内搜索查找活动或资料</p><a href="/">返回首页</a></main></HomeLayout>;
}
