import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Hexagon from '../Hexagon.vue'


describe('HexagonVisible', () => {
    it('renders properly', () => {
      const wrapper = mount(Hexagon, { props: { letters: ['A', 'B', 'C', 'D', 'E', 'F', 'G'] } })
      expect(wrapper.isVisible).toBeTruthy();
    })
})

describe('HexagonProp', () => {
    it('has props', () => {
        const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
        const wrapper = mount(Hexagon, {props: { letters: letters } });
        const hexagons = wrapper.findAll('.hexagon');
        expect(hexagons.length).toBe(letters.length);
    });

    it('displays the correct letters inside hexagons', () => {
        const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
        const wrapper = mount(Hexagon, {
          props: { letters }
        });
    
        letters.forEach((letter, index) => {
          expect(wrapper.findAll('.hexagon span').at(index).text()).toBe(letter);
        });
    });

    it('applies the correct styles to hexagons', () => {
        const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
        const wrapper = mount(Hexagon, {
          props: { letters }
        });
    
        const hexagon = wrapper.find('.hexagon');
        expect(hexagon.classes()).toContain('hexagon');
      });
})