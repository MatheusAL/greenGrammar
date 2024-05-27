import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import HelloWorld from '../HelloWorld.vue'
import Hexagon from '../Hexagon.vue'

describe('HelloWorld', () => {
  it('renders properly', () => {
    const wrapper = mount(HelloWorld, { props: { msg: 'Hello Vitest' } })
    expect(wrapper.text()).toContain('Hello Vitest')
  })
})

describe('HexagonData', () => {
  it('renders properly', () => {
    const wrapper = mount(Hexagon, { props: { letters: ['A', 'B', 'C', 'D', 'E', 'F', 'G'] } })
    expect(wrapper.isVisible).toBeTruthy();
  })
})