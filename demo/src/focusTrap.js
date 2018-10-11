import Vue from "vue"
import Component from "vue-class-component"
import createFocusTrap from 'focus-trap'

@Component({
  props: {
    tag: {
      type: [String, Object, Function],
      default: () => `div`
    },
    active: {
      type: Boolean,
      default: true
    },
    paused: {
      type: Boolean,
      default: false
    },
    initialFocus: {
      default: false
    },
    deactivateOnEsc: {
      type: Boolean,
      default: true
    },
    deactivateOnOutsideClick: {
      type: Boolean,
      default: false
    },
    returnFocusOnDeactivate: {
      type: Boolean,
      default: true
    }
  },
  watch: {
    active(curr, prev) {
      if (prev && !curr) {
        this.focusTrap.deactivate()
      } else if (!prev && curr) {
        this.focusTrap.activate()
      }
    },
    paused(curr, prev) {
      if (prev && !curr) {
        this.focusTrap.unpause()
      } else if (!prev && curr) {
        this.focusTrap.pause()
      }
    },
    onActivate() {
      this.$emit(`activated`)
    },
    onDeactivate() {
      this.$emit(`deactivated`)
    }
  }
})
export class FocusTrap extends Vue {
  focusTrap = null

  mounted() {
    this.focusTrap = createFocusTrap(this.$el, {
      onActivate: this.onActivate,
      onDeactivate: this.onDeactivate,
      initialFocus: this.initialFocus,
      escapeDeactivates: this.deactivateOnEsc,
      clickOutsideDeactivates: this.deactivateOnOutsideClick,
      returnFocusOnDeactivate: this.returnFocusOnDeactivate
    })
  }

  ready() {
    if (this.active) {
      this.focusTrap.activate()
    }
    if (this.paused) {
      this.focusTrap.pause()
    }
  }

  beforeDestroy() {
    this.focusTrap.deactivate()
  }

  render(h) {
    const childProps = { ...this.$props }
    delete childProps.tag
    delete childProps.active
    delete childProps.paused
    delete childProps.initialFocus
    delete childProps.escapeDeactivates
    delete childProps.clickOutsideDeactivates
    delete childProps.returnFocusOnDeactivate

    return h(
      this.tag,
      {
        props: childProps,
        attrs: this.$data.attrs,
        class: this.$data.class,
        on: {
          click: this.$listeners.click
        }
      },
      this.$slots.default
    )
  }
}
