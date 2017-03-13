import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import _ from 'lodash';
import { doLogin } from '../../actions/authActions';
import { validateEmail, loginFields as FIELDS } from '../../utils';
import Loader from '../../components/Loader';
import { Link } from 'react-router';
import '../../styles/login.scss'

const validate = values => {
    const errors = {};
    _.each(FIELDS, (type, field) => {
        if (!values[field] && type.required) {
            errors[field] = type.required;
        } else if (type.validate && !type.validate(values[field])) {
            errors[field] = type.validateError;
        }
    })
    return errors;
}

export class Auth extends Component{

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
        this.props.doLogin(props);
    }

    render() {
        
        const { handleSubmit } = this.props;
        let loginBoxMessage = (<p className="login-box-msg">Sign in to start your session</p>);

        if (this.state.submitted) {
            loginBoxMessage = (<Loader />);
        }
        
        if (!this.props.authenticated && this.props.authMessage ){
            loginBoxMessage = (<p className="login-box-msg has-error">{this.props.authMessage}</p>);
        }

        return (
            <div className="login col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2 col-xs-12">
                <div className="login-logo">
                    <strong>STRV</strong>ents
                </div>
                <div className="login-box-body">
                    { loginBoxMessage }
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
                                    <i className="glyphicon glyphicon-log-in"></i>Sign In
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
                <div className="login-box-footer">
                    <div className="row">
                        <div className="col-sm-6 col-sm-offset-3 col-xs-10 col-xs-offset-1 text-center">
                            <span> New to STRVents?</span> <Link to='/register'>Create an account</Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    ...state.auth
});

export default reduxForm({
    form: 'AuthForm',
    fields: _.keys(FIELDS),
    validate
}, mapStateToProps, { doLogin })(Auth);