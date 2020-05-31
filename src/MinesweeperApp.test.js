import React from "react";
import Enzyme, { shallow } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import MinesweeperApp from './MinesweeperApp';

Enzyme.configure({ adapter: new EnzymeAdapter() });

test('renders without error', () => {
    const wrapper = shallow(<MinesweeperApp />);
    const appComponent = wrapper.find("[data-test='component-minesweeper-app']")
    expect(appComponent.length).toBe(1);
})