import React from "react";
import Enzyme, { shallow } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import MinesweeperApp from './MinesweeperApp';

Enzyme.configure({ adapter: new EnzymeAdapter() });

const setup = (props = {}, state = null) => shallow(<MinesweeperApp {...props} />);

const findByTestAttr = (wrapper, val) => wrapper.find(`[data-test="${val}"]`);

test('renders without error', () => {
    const wrapper = setup();
    const minesweeperAppComponent = findByTestAttr(wrapper, 'component-minesweeper-app')
    expect(minesweeperAppComponent.length).toBe(1);
})