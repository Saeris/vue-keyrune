import Vue from "vue"
import { Keyrune, sets, rarities, sizes } from "@saeris/vue-keyrune"
import { State } from "./state"
import { Modal } from "./modal"
import { Radio } from "./radio"
import {
  Main,
  Header,
  Title,
  Subtitle,
  Package,
  Code,
  Section,
  Controls,
  Search,
  Setlist,
  SetlistItem,
  IconWrapper,
  Icon,
  IconDetails,
  IconName,
  IconCode,
  Preview,
  Row,
  PrewviewContainer,
  Toggleables,
  Toggle,
  RadioInput,
  CloseButton,
  Footer
} from "./elements"
import "./registerServiceWorker"
import "@saeris/typeface-beleren-bold"
import "keyrune"

Vue.config.productionTip = false

const App = {
  functional: true,
  render(h) {
    return (
      <State
        initial={{
          filter: ``,
          modal: {
            activeIcon: null,
            size: `Normal`,
            rarity: `None`,
            fixed: false,
            gradient: false,
            foil: false
          }
        }}
      >
        {({ state, update, reset }) => {
          const {
            activeIcon,
            rarity,
            size,
            fixed,
            gradient,
            foil
          } = state.modal
          return (
            <Main>
              <Header>
                <div>
                  <Title>
                    <a
                      href="https://www.github.com/saeris/vue-keyrune"
                      title="React Keyrune on GitHub"
                      target="_blank"
                      rel="noopener"
                    >
                      <Keyrune fixed set="leg" />
                      Vue Keyrune
                    </a>
                  </Title>
                </div>
              </Header>
              <Package>
                <Code>{`yarn add @saeris/vue-keyrune keyrune`}</Code>
                <Code>{`import { keyrune } from "@saeris/vue-keyrune"`}</Code>
              </Package>

              <Modal>
                {({
                  isOpen,
                  handleToggle,
                  ToggleModal,
                  ModalOverlay,
                  ModalContent
                }) => {
                  const Close = CloseButton(ToggleModal)
                  return (
                    <Section>
                      <Controls>
                        <Subtitle>Set Icons:</Subtitle>
                        <Search
                          type="text"
                          placeholder="Search Icons..."
                          value={state.filter}
                          onInput={e => {
                            e.preventDefault()
                            update({
                              filter: e.target.value
                            })
                          }}
                        />
                      </Controls>
                      <Setlist>
                        {Object.entries(sets)
                          .filter(
                            ([code, name]) =>
                              state.filter
                                ? `${name} ${code}`
                                    .toLowerCase()
                                    .includes(state.filter.toLowerCase())
                                : true
                          )
                          .map(([code, name]) => (
                            <SetlistItem key={code}>
                              <ToggleModal
                                id={code}
                                onClick={e => {
                                  update(({ modal }) => ({
                                    modal: { ...modal, activeIcon: code }
                                  }))
                                }}
                              >
                                <IconWrapper>
                                  <Icon>
                                    <Keyrune fixed set={code} size="4x" />
                                  </Icon>
                                  <IconDetails>
                                    <IconName>{name}</IconName>
                                    <IconCode>({code})</IconCode>
                                  </IconDetails>
                                </IconWrapper>
                              </ToggleModal>
                            </SetlistItem>
                          ))}
                      </Setlist>
                      <ModalOverlay>
                        {isOpen ? (
                          <ModalContent>
                            <h3>
                              <span>{sets[activeIcon]}</span>
                              <span>{`(${activeIcon})`}</span>
                            </h3>
                            <PrewviewContainer>
                              <Preview
                                fixed
                                set={activeIcon}
                                foil={foil}
                                gradient={gradient}
                                rarity={rarity.toLowerCase()}
                              />
                            </PrewviewContainer>
                            <Row>
                              <strong>JSX:</strong>
                              <code>
                                {`<Keyrune set="${activeIcon}" ${
                                  rarity === `None`
                                    ? ``
                                    : `rarity="${rarity.toLowerCase()}" `
                                }${size === `Normal` ? `` : `size="${size}" `}${
                                  fixed ? `fixed ` : ``
                                }${gradient ? `gradient ` : ``}${
                                  foil ? `foil ` : ``
                                }/>`}
                              </code>
                            </Row>
                            <Radio
                              name="size"
                              selected={size}
                              onChange={value => {
                                update(({ modal }) => ({
                                  modal: { ...modal, size: value }
                                }))
                              }}
                            >
                              {[`Normal`, ...sizes].map(value => (
                                <RadioInput key={value} value={value} />
                              ))}
                            </Radio>
                            <Radio
                              name="rarity"
                              selected={rarity}
                              onChange={value => {
                                update(({ modal }) => ({
                                  modal: { ...modal, rarity: value }
                                }))
                              }}
                            >
                              {[`None`, ...rarities].map(value => (
                                <RadioInput
                                  key={value}
                                  value={`${value[0].toUpperCase()}${value.slice(
                                    1
                                  )}`}
                                />
                              ))}
                            </Radio>
                            <Toggleables>
                              <Toggle
                                checked={gradient}
                                onChange={e => {
                                  update(({ modal }) => ({
                                    modal: { ...modal, gradient: !gradient }
                                  }))
                                }}
                              >
                                Gradient
                              </Toggle>
                              <Toggle
                                checked={foil}
                                onChange={e => {
                                  update(({ modal }) => ({
                                    modal: { ...modal, foil: !foil }
                                  }))
                                }}
                              >
                                Foil
                              </Toggle>
                              <Toggle
                                checked={fixed}
                                onChange={e => {
                                  update(({ modal }) => ({
                                    modal: { ...modal, fixed: !fixed }
                                  }))
                                }}
                              >
                                Fixed
                              </Toggle>
                            </Toggleables>
                            <Close onClick={reset}>
                              <Keyrune title="Close Modal" fixed set="10e" />
                            </Close>
                          </ModalContent>
                        ) : null}
                      </ModalOverlay>
                    </Section>
                  )
                }}
              </Modal>
              <Footer>
                <div>
                  <span>
                    <a
                      href="https://www.github.com/saeris/vue-keyrune"
                      title="GitHub Repository"
                      target="_blank"
                      rel="noopener"
                    >
                      GitHub
                    </a>
                  </span>
                  <span>
                    {`Coded with 💙 by `}
                    <a
                      href="https://www.github.com/saeris"
                      title="Drake Costa (@Saeris) on GitHub"
                      target="_blank"
                      rel="noopener"
                    >
                      Drake Costa
                    </a>
                  </span>
                </div>
              </Footer>
            </Main>
          )
        }}
      </State>
    )
  }
}

new Vue({
  render: h => h(App)
}).$mount(`#app`)
