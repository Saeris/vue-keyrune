<p align="center">
  <img alt="Vue Keyrune" src="https://raw.githubusercontent.com/Saeris/vue-keyrune/master/resources/header.png" style="max-width:100%;"/>
</p>
<p align="center">
  <a href="https://www.npmjs.org/package/@saeris/vue-keyrune">
    <img src="https://img.shields.io/npm/v/@saeris/vue-keyrune.svg?style=flat" alt="npm">
  </a>
  <a href="https://travis-ci.org/Saeris/vue-keyrune">
    <img src="https://travis-ci.org/Saeris/vue-keyrune.svg?branch=master" alt="travis">
  </a>
  <a href="https://codecov.io/gh/Saeris/vue-keyrune">
    <img src="https://codecov.io/gh/Saeris/vue-keyrune/branch/master/graph/badge.svg" alt="codecov"/>
  </a>
  <a href="https://snyk.io/test/github/Saeris/vue-keyrune?targetFile=package.json">
    <img src="https://snyk.io/test/github/Saeris/vue-keyrune/badge.svg?targetFile=package.json" alt="Known Vulnerabilities">
  </a>
  <a href="https://greenkeeper.io/">
    <img src="https://badges.greenkeeper.io/Saeris/vue-keyrune.svg" alt="Known Vulnerabilities" alt="greenkeeper">
  </a>
</p>
<p align="center">A simple Vue component wrapper around <a href="https://github.com/andrewgioia/Keyrune">Keyrune</a>.</p>

---

## 📦 Installation

```bash
npm install --save graphql @saeris/vue-keyrune keyrune
# or
yarn add graphql @saeris/vue-keyrune keyrune
```

> Note: [Keyrune](https://github.com/andrewgioia/Keyrune) is a required peer-dependency. This component will not work without it!

## 🔧 Usage

There are a number of ways you can use this library! Here are a few examples:

**[Vue Plugin](https://vuejs.org/v2/guide/plugins.html#Using-a-Plugin)**
```js
import Vue from 'vue'
import { Keyrune } from '@saeris/vue-keyrune'
// import keyrune once somewhere in your app to include it's css/font files
import "keyrune"

Vue.use(Keyrune)

// The `keyrune` component can now be used in your templates anywhere in the app!
```

**[Local Component Registration](https://vuejs.org/v2/guide/components-registration.html#Local-Registration)**
```js
import { Keyrune } from '@saeris/vue-keyrune'
import "keyrune"

export default {
  components: {
    Keyrune
  },
  // ...
}
```

**[JSX Component](https://vuejs.org/v2/guide/render-function.html#JSX)**

```js
import { Keyrune } from '@saeris/vue-keyrune'
import "keyrune"

export default {
  render() {
    return (
      <div>
        <Keyrune set="leg" rarity="mythic" gradient fixed size="2x" />
      </div>
    )
  }
}
```

**[Unpkg Import](https://vuejs.org/v2/cookbook/packaging-sfc-for-npm.html#What-does-my-packaged-component-look-like)**
```html
<!--Load Keyrune's CSS-->
<link href="//cdn.jsdelivr.net/npm/keyrune@latest/css/keyrune.css" rel="stylesheet" type="text/css" />
<!--Load libraries in your page's header-->
<script src="https://unpkg.com/vue"></script>
<script src="https://unpkg.com/@saeris/vue-keyrune"></script>

<!--Use the component somewhere in your app-->
<div id="app">
  <keyrune set="leg" rarity="mythic" gradient fixed size="2x"></keyrune>
</div>

<script>
  new Vue({ el: '#app', data: { loading: true } })
</script>
```

## 📋 Props

Prop Name | Prop Type | Required | Default Value | Notes
----------|:---------:|:--------:|:-------------:|:-----
set       | `string`  | Yes      | None          | For a list of available sets, please refer to either [Keyrune's documentation](https://andrewgioia.github.io/Keyrune/icons.html) or the [live demo site](https://react-keyrune.saeris.io)
rarity     | `string`  | No       | None          | Possible Values: `common`, `c`, `uncommon`, `u`, `rare`, `r`, `mythic`, `m`, `timeshifted`, `t`
size      | `string`  | No       | None          | Possible Values: `2x`, `3x`, `4x`, `5x`, `6x`
gradient  | `boolean` | No       | `false`       | Used to toggle a gradient effect on the icon. The color will change based on the value of `rarity`
foil      | `boolean` | No       | `false`       | Used to toggle a foil color. This will override `rarity` and the fill will change when used in conjunction with `gradient`
fixed     | `boolean` | No       | `false`       | Used to toggle fixed-width icons


## 🏖️ Demo

You can either visit the [live demo site](https://vue-keyrune.saeris.io), clone this repo and run the demo locally using `yarn start` and opening your browser to http://localhost:8080, or you can just play with it inside of CodeSandbox [here](https://codesandbox.io/s/github/Saeris/vue-keyrune/tree/master/demo).

The demo site includes a searchable list of all available sets with a handy preview tool with which you can quickly see the effects of the available props along with generated markup you can copy and paste right into your own application!

## 📣 Acknowledgements

Special thanks to [Andrew Gioia](https://github.com/andrewgioia) the creator of [Keyrune](https://github.com/andrewgioia/Keyrune) and to all that project's awesome contributors, without whom this library wouldn't exist!

And of course, a huge thanks to [Wizards of the Coast](http://magicthegathering.com) for creating this game we all love!

## 🥂 License

All card symbol images are copyright [Wizards of the Coast](http://magicthegathering.com).

Keyrune is licensed under the the [SIL OFL 1.1 license](http://scripts.sil.org/OFL).

Released under the [MIT license](https://github.com/Saeris/vue-keyrune/blob/master/LICENSE.md).
