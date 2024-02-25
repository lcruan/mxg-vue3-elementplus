// 如果您正在使用CDN引入，请删除下面一行。
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import type { App } from 'vue'

// 自定义图标组件
import SvgIcon from '@/components/svgIcon/index.vue'


/**
 * 全局注册 ElementPlus 图标
 * <ele-plus/>
 * @param app 
 */
export function useElIcon(app: App) {
    for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
        app.component(`ele-${key}`, component)
    }
    app.component('SvgIcon', SvgIcon) // <svg-icon />   <SvgIcon/>
}
