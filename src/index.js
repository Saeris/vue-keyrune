import * as Components from './components'

export { sets, rarities, sizes } from "./components/keyrune"

export function install(Vue) {
  if (install.installed) return
  install.installed = true
  Object.entries(Components).forEach(([name, component]) => {
    Vue.component(name, component)
  })
}

export const VueKeyrune = {
  install
}

let GlobalVue = null
if (typeof window !== `undefined`) {
  GlobalVue = window.Vue
} else if (typeof global !== `undefined`) {
  GlobalVue = global.Vue
}
if (GlobalVue) {
  GlobalVue.use(VueKeyrune)
}

export default Components
export * from './components'
