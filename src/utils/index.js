import moment from 'moment';

export const BASE_URL = process.env.BASE_URL;
export const ENV = process.env.NODE_ENV;

export const validatePassword = (password, confirm) => (password === confirm);

export const validateEmail = (email) =>{
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

export const loginFields = {
    email: {
        type: 'email',
        placeholder: 'E-mail',
        icon: 'envelope',
        required: 'The e-mail cannot be empty',
        validate: validateEmail,
        validateError: 'This e-mail is not valid'
    },
    password: {
        type: 'password',
        placeholder: 'Password',
        icon: 'lock',
        required: 'The password cannot be empty'
    }
}

export const registerFields = {
    firstName: {
        type: 'text',
        placeholder: 'First name',
        required: 'The first name cannot be empty'
    },
    lastName: {
        type: 'text',
        placeholder: 'Last name',
        required: 'The last name cannot be empty'
    },
    email: {
        type: 'email',
        placeholder: 'E-mail',
        required: 'The e-mail cannot be empty',
        validate: validateEmail,
        validateError: 'This e-mail is not valid'
    },
    password: {
        type: 'password',
        placeholder: 'Password',
        required: 'The password cannot be empty'
    },
    confirmPassword: {
        type: 'password',
        placeholder: 'Confirm Password',
        required: 'The password cannot be empty',
        validate : validatePassword,
        validateArgs : 'password',
        validateError : 'Password did not match' 
    }
}

export const eventsFields = {
    title: {
        element: 'input',
        type: 'text',
        label: 'Title',
        required: 'The title is required'
    },
    description: {
        element: 'textarea',
        type: 'textarea',
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