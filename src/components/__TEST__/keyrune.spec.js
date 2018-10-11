import { mount } from '@vue/test-utils'
import { Keyrune } from '../keyrune.js'
import keyrune from "../keyrune.scss" // eslint-disable-line

jest.mock(`../keyrune.scss`, () => ({
  sizes: `"2x", "3x", "4x", "5x", "6x"`,
  rarities: `"common" "uncommon" "rare" "mythic" "timeshifted"`,
  ogw: `"Oath of the Gatewatch"`,
  zen: `"Zendikar"`
}))

describe(`Keyrune`, () => {
  describe(`valid`, () => {
    it(`renders an i element`, () => {
      const container = mount(Keyrune)
      expect(container.contains(`i`)).toBe(true)
    })

    it(`has the 'ss' class`, () => {
      const container = mount(Keyrune)
      expect(container.classes()).toContain(`ss`)
    })

    it(`has the 'ss-zen' class when the 'set' prop is set to 'zen'`, () => {
      const container = mount(Keyrune, { context: { props: { set: `zen` } } })
      expect(container.classes()).toContain(`ss-zen`)
    })

    it(`has the 'ss-fw' class when the 'fixed' prop is set to true`, () => {
      const container = mount(Keyrune, { context: { props: { fixed: true } } })
      expect(container.classes()).toContain(`ss-fw`)
    })

    it(`has the 'ss-grad' class when the 'gradient' prop is set to true`, () => {
      const container = mount(Keyrune, { context: { props: { gradient: true } } })
      expect(container.classes()).toContain(`ss-grad`)
    })

    it(`has the 'ss-grad' and 'ss-foil' classes when the 'foil' prop is set to true`, () => {
      const container = mount(Keyrune, { context: { props: { foil: true } } })
      expect(container.classes()).toContain(`ss-grad`)
      expect(container.classes()).toContain(`ss-foil`)
    })

    it(`has a 'ss-[2-6]x' class when the 'size' prop has a valid size value`, () => {
      [`2x`, `3x`, `4x`, `5x`, `6x`].forEach(size => {
        const container = mount(Keyrune, { context: { props: { size } } })
        expect(container.classes()).toContain(`ss-${size}`)
      })
    })

    it(`has a rarity class when the 'rarity' prop has a valid rarity value`, () => {
      [`common`, `uncommon`, `rare`, `mythic`, `timeshifted`].forEach(rarity => {
        const container = mount(Keyrune, { context: { props: { rarity } } })
        expect(container.classes()).toContain(`ss-${rarity}`)
      })
    })

    it(`includes a custom class when passed in via the 'className' prop`, () => {
      const container = mount(Keyrune, { context: { class: `custom` } })
      expect(container.classes()).toContain(`custom`)
    })
  })

  describe(`invalid`, () => {
    it(`does not have additional classes when passed an invalid 'set' prop`, () => {
      const container = mount(Keyrune, { context: { props: { set: `INVALID SET` } } })
      expect(container.classes()).toHaveLength(1)
    })

    it(`does not have additional classes when the 'size' prop has a invalid size value`, () => {
      [`1x`, `7x`, 1, NaN, Infinity, null, false].forEach(size => {
        const container = mount(Keyrune, { context: { props: { size } } })
        expect(container.classes()).toHaveLength(1)
      })
    })

    it(`does not have rarity class when the 'rarity' prop has an invalid rarity value`, () => {
      [`INVALID`, 1, NaN, Infinity, null, false].forEach(rarity => {
        const container = mount(Keyrune, { context: { props: { rarity } } })
        expect(container.classes()).toHaveLength(1)
      })
    })
  })
})
