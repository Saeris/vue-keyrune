import Vue from "vue"
import Component from "vue-class-component"
import { RadioGroup, RadioButton } from "./elements"
import { cloneElement } from "./cloneElement"

@Component({
  props: {
    name: {
      type: String,
      required: true
    }
  }
})
export class Radio extends Vue {
  selected = null

  mounted() {
    if (this.$slots.default.length) this.selected = this.$slots.default[0].data.attrs.value
  }

  render(h) {
    const props = { ...this.$props }
    delete props.name
    delete props.selected
    return (
      <RadioGroup role="radiogroup" {...props}>
        {this.$slots.default.map((child, key) => {
          const value = child.data.attrs.value
          return (
            <RadioButton key={key} active={this.selected === value} onClick={e => {
              this.selected = value
              this.$emit(`change`, value)
            }}>
              <label htmlFor={value}>
                {value}
              </label>
              {cloneElement(child, {
                attrs: {
                  name,
                  "id": value,
                  "type": `radio`,
                  "checked": this.selected === value,
                  "aira-checked": this.selected === value
                }
              })}
            </RadioButton>
          )
        })}
      </RadioGroup>
    )
  }
}
