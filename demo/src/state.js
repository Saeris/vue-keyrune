import Vue from "vue"
import Component from "vue-class-component"

@Component({
  props: {
    initial: {
      type: Object,
      default: () => ({})
    },
    stateReducer: {
      type: Function,
      default: (state, changes) => changes
    },
    onChange: {
      type: Function,
      default: () => {}
    }
  }
})
export class State extends Vue {
  state = undefined // eslint-disable-line

  created() {
    this.state = this.initial
  }

  async setState(obj, cb) { // eslint-disable-line
    const prevState = { ...this.state }
    const nextState = typeof obj === `function` ? obj(prevState, this.props) : obj
    await this.$nextTick()
    for (const [key, value] of Object.entries(nextState)) {
      this.state[key] = value
    }
    this.$forceUpdate()
    if (cb) cb() // eslint-disable-line
  }

  update(obj) {
    const prevState = { ...this.state }
    this.setState(
      state =>
        this.stateReducer(
          prevState,
          typeof obj === `function` ? obj(state) : obj
        ),
      () => {
        const { change } = this.$listeners
        if (change) change(this.state, prevState)
      }
    )
  }

  reset() {
    this.update(this.initial)
  }

  render(h) {
    return this.$scopedSlots.default({
      state: this.state,
      update: this.update,
      reset: this.reset
    })
  }
}
