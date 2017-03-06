import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import { doLogin } from '../actions/loginActions';
import { validateEmail } from '../utils/utils.js';
import _ from 'lodash';
import '../styles/login.scss'

const FIELDS = {
    email: {
        type: 'email',
        placeholder: 'E-mail',
        icon : 'envelope',
        required: 'The e-mail cannot be empty',
        validate: validateEmail,
        validateError : 'This e-mail is not valid'
    },
    password: {
        type: 'password',
        placeholder: 'Password',
        icon: 'lock',
        required: 'The password cannot be empty'
    }
}

class Login extends Component{

    renderField(config, field) {
        const fieldHelper = this.props.fields[field];
        return (
            <div key={field} className={`form-group has-feedback ${fieldHelper.touched && fieldHelper.invalid ? 'has-error' : ''}`}>
                <input type={config.type} className="form-control" placeholder={config.placeholder} {...fieldHelper}/>
                <span className={`glyphicon glyphicon-${config.icon} form-control-feedback`}></span>
                <div className="error-label"> 
                    {fieldHelper.touched ? fieldHelper.error : ''}
                </div>
            </div>
        )
    }

    onSubmit(props){
        this.props.doLogin(props);
    }

    render() {
        const { handleSubmit } = this.props;
        return(
            <div className="login login-box">
                <div className="login-logo">
                    <strong>STRV</strong>ents
                </div>
                <div className="login-box-body">
                    <p className="login-box-msg">Sign in to start your session</p>
                    <form onSubmit={handleSubmit(this.onSubmit.bind(this))}
                    method="post">
                        <div className="row">
                            <div className="col-sm-6 col-sm-offset-3 col-xs-6 col-xs-offset-3">
                                {_.map(FIELDS, this.renderField.bind(this))}
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-6 col-sm-offset-3 col-xs-6 col-xs-offset-3">
                                <button type="submit" className="btn btn-danger btn-block btn-flat">Sign In</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

const validate = values => {
    const errors = {};
    _.each(FIELDS, (type, field) => {
        if (!values[field] && type.required) {
            errors[field] = type.required;
        } else if (type.validate && !type.validate(values[field])){
            errors[field] = type.validateError;
        }
    })
    return errors;
}

export default reduxForm({
    form: 'LoginForm',
    fields: _.keys(FIELDS),
    validate
}, null, { doLogin })(Login);