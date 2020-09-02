# Render Hydratable

This is a work in progress and it's practially verbatim extracted from
a project I was doing, not really production-ready, and the API is very confusing,
use at your own risk. It's also completely untested.

My motivation to make this library was to be able to use any kind of
component from any framework on an Eleventy site with static rendering and
progressive partial hydration (hydrate only the components that need hydration
as they become visible in the page).

The `lib/render` folder files are more a wish-list than real files, right now only
Preact and Nunjucks are actually written. I'll separate each renderer to a different
repository in the near future.

# Basic usage

## Install

```
$ yarn add render-hydratable
```

## Usage

On /src/components/Person.js

```javascript
const { h } = require('preact')
const { html } = require(`htm/preact`)

const Person = ({name, age}) => html`
  <button onClick=${() => console.log(name, age)}>
    ${name} is ${age} years old
  </button>
`

Person.hydratable = true

module.exports = Person
```

Then directly on JavaScript

```javascript
const renderHydratable = require('render-hydratable/lib/render-hydratable')
const components = renderHydratable([`${__dirname}/src/components`])

components('Person', {name: "Bob", age: 27})
```

Or on .eleventy.js as a shortcode

```javascript
config.addShortcode(
    'renderHydratable',
    renderHydratable([`${__dirname}/src/components`])
  )
```

If the component is marked as hydratable, then it will additionally render
the following hydration marker before the component:

```html
<script
  data-component="Person"
  data-props="{\"name\":\"Bob\",\"age\":27}"
  data-strategy="preact"
></script>
```

Technically it support hydrating with multiple frameworks on the same page.

## Rehydration

On main JS file

```javascript
const rehydration = require('render-hydratable/lib/rehydration')

// In the future my intention is to generate this automatically from the
// components used on the site
const componentsMap = {
  Person: require('./components/Person'),
}

// Also this from the frameworks used on the site
const strategies = {
  preact: require('render-hydratable/lib/render/with-preact').rehydrate,
}
```
