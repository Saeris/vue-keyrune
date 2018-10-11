import Vue from "vue"
import Component from "vue-class-component"
import { Content, Overlay, Button } from "./elements"

@Component({
  props: {
    open: {
      type: Boolean,
      default: false
    }
  }
})
export class Modal extends Vue {
  isOpen = this.open
  previousFocus = null

  setFocus() {
    if (!this.isOpen) {
      const previousFocus = document.getElementById(this.previousFocus)
      if (previousFocus.focus) previousFocus.focus()
    }
  }

  toggleModal(e) {
    if (e) e.stopPropagation()
    document.body.classList.toggle(`modal`)
    const id = e.currentTarget.id
    const openState = this.isOpen
    this.isOpen = !openState
    if (!openState) this.previousFocus = id
  }

  listenKeyboard(e) {
    if (this.isOpen && (e.key === `Escape` || e.keyCode === 27)) {
      e.preventDefault()
      this.isOpen = false
    }
  }

  mounted() {
    window.addEventListener(`keydown`, this.listenKeyboard.bind(this), true)
  }

  beforeDestroy() {
    window.removeEventListener(`keydown`, this.listenKeyboard.bind(this), true)
  }

  onDialogClick(e) {
    if (e) e.stopPropagation()
  }

  render() {
    return this.$scopedSlots.default({
      isOpen: this.isOpen,
      handleToggle: this.toggleModal,
      handleDialogClick: this.onDialogClick,
      ModalContent: {
        functional: true,
        render: (h, { props, data, children }) => (
          <Content
            {...props}
            {...data}
            tag="section"
            active={this.isOpen}
            deactivateOnOutsideClick={false}
            returnFocusOnDeactivate={false}
            onDeactivate={this.setFocus}
            onClick={this.onDialogClick}
          >
            {children}
          </Content>
        )
      },
      ModalOverlay: {
        functional: true,
        render: (h, { props, data, children }) => (
          <Overlay
            {...props}
            {...data}
            onClick={this.toggleModal}
            isOpen={this.isOpen}
          >
            {children}
          </Overlay>
        )
      },
      ToggleModal: {
        functional: true,
        render: (h, { props, data, children }) => (
          <Button
            type="button"
            {...props}
            {...data}
            onClick={e => {
              this.toggleModal(e)
              if (props.onClick) props.onClick(e)
            }}
          >
            {children}
          </Button>
        )
      }
    })
  }
}
