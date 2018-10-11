const DATA_KEYS = [
  `class`, `staticClass`, `style`,
  `attrs`, `props`, `domProps`,
  `on`, `nativeOn`,
  `directives`, `scopesSlots`,
  `slot`, `ref`, `key`
]

const pick = (obj, keys) => Object.entries(obj)
  .filter(([key]) => keys.includes(key))
  .reduce((hash, [key, val]) => ({ ...hash, [key]: val }), {})

const extractData = (vnode, isComp) => {
  const data = pick(vnode.data, DATA_KEYS)
  if (isComp) {
    const cOpts = vnode.componentOptions
    Object.assign(data, {
      props: cOpts.propsData,
      on: cOpts.listeners
    })
  }

  return data
}

export const cloneElement = (
  vnode,
  newData = {},
  children = vnode.componentOptions ? vnode.componentOptions.children : vnode.children
) => {
  if (!vnode.tag) return vnode.text
  const h = vnode.context && vnode.context.$createElement
  const isComp = !!vnode.componentOptions
  const data = extractData(vnode, isComp)
  const tag = isComp ? vnode.componentOptions.Ctor : vnode.tag
  const childNodes = children ? children.map(c => cloneElement(c)) : null
  return h(tag, Object.assign(data, newData), childNodes)
}
