import React from 'react'
import { shallow } from 'enzyme'
import Toolbar from '../../containers/commons/ToolBar';

function setup() {
    const props = {
        onSearchTermChange: jest.fn()
    }

    const enzymeWrapper = shallow(<Toolbar {...props} />)

    return {
        props,
        enzymeWrapper
    }
}

describe('Toolbar', () => {
    it('should render', () => {
        const { enzymeWrapper } = setup();
        expect(enzymeWrapper.find('input').hasClass('form-control')).toBe(true);
        expect(enzymeWrapper.find('div').first().hasClass('search-bar')).toBe(true);

        const linkNewEvent = enzymeWrapper.find('Link').props()
        expect(linkNewEvent.to).toBe('event/new')
    })

    it('should call onSearchTermChange if text changes', () => {
        const { enzymeWrapper, props } = setup()
        enzymeWrapper.setState({ 'term' :  ''});
        expect(props.onSearchTermChange.mock.calls.length).toBe(0)
        enzymeWrapper.setState({ 'term': 'Test' });
        setTimeout(() => {
            //_.debounce
            enzymeWrapper.setState({ 'term': 'Test Again' });
            setTimeout(() => {
                //_.debounce
                expect(props.onSearchTermChange.mock.calls.length).toBe(2);
            }, 500)
        }, 500)
    })
})
