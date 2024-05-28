import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Scoreboard from '../Scoreboard.vue'


describe('Scoreboard', () => {
    const mockScore = [
        { word: 'apple', score: 50 },
        { word: 'banana', score: 60 },
        { word: 'cherry', score: 60 }
    ];

    it('renders correctly with given props', () => {
        const wrapper = mount(Scoreboard, {
          props: { score: mockScore }
        });
    
        const rows = wrapper.findAll('tbody tr');
        expect(rows.length).toBe(mockScore.length);
    
        mockScore.forEach((row, index) => {
          const columns = rows.at(index).findAll('td');
          expect(columns.at(0).text()).toBe(row.word);
          expect(columns.at(1).text()).toBe(row.score.toString());
        });
    });

    it('renders headers correcly', () => {
        const wrapper = mount(Scoreboard, {
            props: { score: mockScore }
        });
        const headers = wrapper.findAll('th');
        expect(headers.length).toBe(2);
        expect(headers.at(0).text()).toBe('Palavra');
        expect(headers.at(1).text()).toBe('Pontuação');

    })
})