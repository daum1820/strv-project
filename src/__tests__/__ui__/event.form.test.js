import React from 'react';
import { shallow } from 'enzyme';
import {EventForm} from '../../containers/events/EventForm';
import { Fields } from '../../containers/events/details/fields';
import ReactTestUtils from 'react-addons-test-utils';

function setup() {
    const props = {
        user : {id : 'foo'},
        handleSubmit : jest.fn()
    }
    const fields = {
        ...Fields
    }
    const enzymeWrapper = shallow(<EventForm {...props} fields={fields}/>)

    return {
        props,
        fields,
        enzymeWrapper
    }
}

describe('Event Form', () => {
    it('should render', () => {
        const { enzymeWrapper } = setup();
        expect(enzymeWrapper.find('[type="text"]').hasClass('form-control')).toBe(true);
        expect(enzymeWrapper.find('textarea').hasClass('h100')).toBe(true);
        expect(enzymeWrapper.find('[type="datetime-local"]').hasClass('form-control')).toBe(true);
        expect(enzymeWrapper.find('[type="number"]').hasClass('form-control')).toBe(true);
    })
})
