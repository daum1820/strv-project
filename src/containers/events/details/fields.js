import moment from 'moment';

export const Fields = {
    title: {
        element: 'input',
        type: 'text',
        label: 'Title',
        required: 'The title is required'
    },
    description: {
        element: 'textarea',
        type: 'text',
        label: 'Description',
        required: 'The description is required',
        className: 'h100',
    },
    startsAt: {
        element: 'input',
        type: 'datetime-local',
        label: 'Event Date',
        required: 'The date is required',
        validate: (startsAt) => moment().isBefore(startsAt),
        validateError: 'This date must be in the future'
    },
    capacity: {
        element: 'input',
        type: 'number',
        label: 'Capacity',
        required: 'The capacity is required'
    }
}

export const validate = values => {
    const errors = {};
    _.each(Fields, (type, field) => {
        if (!values[field] && type.required) {
            errors[field] = type.required;
        } else if (type.validate && !type.validate(values[field])) {
            errors[field] = type.validateError;
        }
    })
    return errors;
}