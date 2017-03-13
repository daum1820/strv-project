import React from 'react';
import { shallow } from 'enzyme';
import { EventToolbar } from '../../containers/events/details/EventToolbar';

function setup(props) {
    const enzymeWrapper = shallow(<EventToolbar {...props} />)

    return {
        enzymeWrapper
    }
}
describe('Event Toolbar', () => {
    it('should render cancel toolbar', () => {
        const { enzymeWrapper } = setup({ cancelToolbar : true});
        expect(enzymeWrapper.find('div').first().hasClass('box-footer')).toBe(true);

        const link = enzymeWrapper.find('Link');
        expect(link.props().to).toBe('/');
    })

    it('should render create toolbar', () => {
        const { enzymeWrapper } = setup({ createToolbar: true });
        expect(enzymeWrapper.find('div').first().hasClass('box-footer')).toBe(true);
        const button = enzymeWrapper.find('button');
        expect(button.text()).toBe('Create');
    })

    it('should render owner toolbar', () => {
        const event = {
            owner : {id : 'foo'}
        };
        const user = { id : 'foo'};
        const { enzymeWrapper } = setup({ ownerToolbar: true, event, user });
        expect(enzymeWrapper.find('div').first().hasClass('box-footer')).toBe(true);
        const buttonUpdate = enzymeWrapper.find('button[type="submit"]');
        expect(buttonUpdate.text()).toBe('Update');

        const buttonRemove = enzymeWrapper.find('button[type="button"]');
        expect(buttonRemove.text()).toBe('Remove');
    })

    it('should render attend button', () => {
        const event = {
            capacity : 2,
            attendees : [],
            startsAt: new Date(new Date().getTime() + 24 * 60 * 60 * 1000)
        };
        const user = { id: 'foo' };
        const { enzymeWrapper } = setup({ attendeesToolbar: true, event, user });

        expect(enzymeWrapper.find('div').first().hasClass('box-footer')).toBe(true);
        const button = enzymeWrapper.find('button');
        expect(button.hasClass('btn-success')).toBe(true);
    })

    it('should render unattend button', () => {
        const event = {
            capacity: 2,
            attendees: [{ id : 'foo'}],
            startsAt: new Date(new Date().getTime() + 24 * 60 * 60 * 1000)
        };
        const user = { id: 'foo' };
        const { enzymeWrapper } = setup({ attendeesToolbar: true, event, user });

        expect(enzymeWrapper.find('div').first().hasClass('box-footer')).toBe(true);
        const button = enzymeWrapper.find('button');
        expect(button.hasClass('btn-warning')).toBe(true);
    })

    it('should render max. capacity reached', () => {
        const event = {
            capacity: 1,
            attendees: [{ id: 'foofoo' }],
            startsAt: new Date(new Date().getTime() + 24 * 60 * 60 * 1000)
        };
        const user = { id: 'foo' };
        const { enzymeWrapper } = setup({ attendeesToolbar: true, event, user });

        expect(enzymeWrapper.find('div').first().hasClass('box-footer')).toBe(true);
        const alert = enzymeWrapper.find('span');
        expect(alert.hasClass('danger-label')).toBe(true);
        expect(alert.text()).toBe('Sorry, the maximum number of attendees has been reached');
    })

    it('should render event already occurred', () => {
        const event = {
            capacity: 1,
            attendees: [{ id: 'foofoo' }],
            startsAt: new Date(new Date().getTime() - 24 * 60 * 60 * 1000)
        };
        const user = { id: 'foo' };
        const { enzymeWrapper } = setup({ attendeesToolbar: true, event, user });

        expect(enzymeWrapper.find('div').first().hasClass('box-footer')).toBe(true);
        const alert = enzymeWrapper.find('span');
        expect(alert.hasClass('info-label')).toBe(true);
        expect(alert.text()).toBe('Sorry, this event already occurred.');
    })
})
