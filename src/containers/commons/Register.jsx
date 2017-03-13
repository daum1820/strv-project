import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import _ from 'lodash';
import { registerUser } from '../../actions/authActions';
import { validateEmail, registerFields as FIELDS } from '../../utils';
import Loader from '../../components/Loader';
import { Link } from 'react-router';
import '../../styles/login.scss'

const validate = values => {
    const errors = {};
    _.each(FIELDS, (type, field) => {
        if (!values[field] && type.required) {
            errors[field] = type.required;
        } else if (type.validate && !type.validate(values[field], values[type.validateArgs])) {
            errors[field] = type.validateError;
        }
    })
    return errors;
}

export class Register extends Component{

    constructor(props){
        super(props);
        this.state = {submitted : false};
    }

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
        this.setState({ submitted : true });
        this.props.registerUser({
            ...props,
            confirmPassword : undefined
        });
    }

    render() {
        
        const { handleSubmit } = this.props;
        let registerMessage = (<p className="login-box-msg">Create your personal account</p>);

        if (this.state.submitted) {
            registerMessage = (<Loader />);
        }

        if (!this.props.authenticated && this.props.authMessage) {
            registerMessage = (<p className="login-box-msg has-error">{this.props.authMessage}</p>);
        }

        return (
            <div className="login col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2 col-xs-12">
                <div className="login-logo">
                    <strong>STRV</strong>ents
                </div>
                <div className="login-box-body">
                    {registerMessage}
                    <form noValidate onSubmit={handleSubmit(this.onSubmit.bind(this))}
                    method="post">
                        <div className="row">
                            <div className="col-sm-6 col-sm-offset-3 col-xs-10 col-xs-offset-1">
                                {_.map(FIELDS, this.renderField.bind(this))}
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-6 col-sm-offset-3 col-xs-10 col-xs-offset-1">
                                <button type="submit" className="btn btn-danger btn-block">
                                    Create
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
                <div className="login-box-footer">
                    <div className="row">
                        <div className="col-sm-6 col-sm-offset-3 col-xs-10 col-xs-offset-1 text-center">
                            <span> Already have an account?</span> <Link to='/login'>Sign in</Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default reduxForm({
    form: 'AuthForm',
    fields: _.keys(FIELDS),
    validate
}, null, { registerUser })(Register);