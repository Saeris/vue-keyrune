import "keyrune/sass/keyrune.scss"
import keyrune from "./keyrune.scss"

const { rarities: rawRarities, ...setlist } = keyrune

export const sizes = [`2x`, `3x`, `4x`, `5x`, `6x`]

export const sets = Object.entries(setlist).reduce((hash, [key, value]) => {
  hash[key] = value.replace(/"+/g, ``)
  return hash
}, {})

export const rarities = rawRarities.replace(/"+/g, ``).split(` `)

const raritiesMap = new Map([
  ...rarities.map(rarity => [rarity, rarity]),
  ...rarities.map(rarity => [rarity.charAt(0), rarity])
])

export const Keyrune = {
  functional: true,
  props: {
    set: { type: String, default: `` },
    size: { type: String, default: `` },
    fixed: { type: Boolean, default: false },
    rarity: { type: String, default: `` },
    gradient: { type: Boolean, default: false },
    foil: { type: Boolean, default: false }
  },
  render(h, { props, data }) {
    const { set, size, fixed, rarity, gradient, foil, ...rest } = props
    const classNames = data.class || {}
    return (
      <i
        title={sets[set]}
        alt={sets[set]}
        aria-hidden
        {...data}
        class={{
          ...classNames,
          "ss": true,
          [`ss-${set}`]: Object.keys(sets).includes(set),
          [`ss-${size}`]: sizes.includes(size),
          "ss-fw": fixed,
          [`ss-${raritiesMap.get(rarity)}`]: raritiesMap.has(rarity),
          "ss-grad": gradient || foil,
          "ss-foil": foil
        }}
        {...rest}
      />
    )
  }
}
