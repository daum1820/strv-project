import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import _ from 'lodash';
import moment from 'moment';
import { attendEvent, unattendEvent, saveEvent } from '../../actions/eventsActions';
import { validateEmail } from '../../utils';
import Loader from '../../components/Loader';
import { Link } from 'react-router';

const FIELDS = {
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
        required: 'The password is required',
        className : 'h100',
    },
    startsAt: {
        element: 'input',
        type: 'datetime-local',
        label: 'Event Date',
        required: 'The date is required',
    },
    capacity: {
        element: 'input',
        type: 'number',
        label: 'Capacity',
        required: 'The capacity is required'
    }
}

class EventForm extends Component {

    constructor(props) {
        super(props);
        this.state = { submitted: false };
    }

    renderField(config, field) {
        const fieldHelper = this.props.fields[field];
        const value = config.type === 'datetime-local' ? moment(this.props.selectedEvent[field]).format('YYYY-MM-DDTHH:mm') : this.props.selectedEvent[field];
        return (
            <div key={field} className={`form-group ${fieldHelper.touched && fieldHelper.invalid ? 'has-error' : ''}`}>
                <label className="col-sm-3 control-label">{config.label}</label>
                <div className="col-sm-9">
                    <config.element type={config.type} value={value} className={` form-control ${config.className}`} {...fieldHelper} />
                    <div className="error-label">
                        {fieldHelper.touched ? fieldHelper.error : ''}
                    </div>
                </div>
            </div>
        )
    }

    onSubmit(props) {
        this.setState({ submitted: true });
    }

    renderAttendees(){
        const { attendees } = this.props.selectedEvent;
        if(!attendees.length){
            return (<tbody><tr><td className="text-center"> No attendees were found</td></tr></tbody>);
        }
        return(
            <div className="box-body no-padding">
                <table className="table table-striped">
                    <tbody>
                        {
                            attendees.map(attendee => (
                                <tr>
                                    <td>
                                        <i className="fa fa-user"></i>
                                        {`${attendee.firstName} ${attendee.lastName}`}
                                    </td>
                                    <td> 
                                        <i className="fa fa-envelope"></i> {attendee.email}
                                    </td>
                                </tr>
                            ))   
                        }
                    </tbody>
                </table>
            </div>
        )
    }

    renderAdditionalInformation(){
        const { owner, attendees, capacity } = this.props.selectedEvent;
        return(
            <div className="col-sm-6">
                <div className="box">
                    <div className="box-header with-border">
                        <h3 className="box-title"> Additional Information</h3>
                    </div>
                    <div className="box-body">
                        <label className="control-form col-sm-3 text-right">Owner</label>
                        <div className="col-sm-3">
                            {`${owner.firstName} ${owner.lastName}`}
                        </div>
                        <label className="control-form col-sm-3 text-right">Capacity</label>
                        <div className="col-sm-3">
                            {`${attendees.length}/${capacity}`}
                        </div>
                    </div>
                    <div className="box-header with-border">
                        <h3 className="box-title"> List of Attendees</h3>
                    </div>
                    {this.renderAttendees()}
                </div>
            </div>
        )
    }
    renderFooter(){
        return (
            <div className="box-footer">
                <Link to={"/"} type="button" className="btn btn-xs btn-default pull-left">
                    <i className="fa fa-undo"></i> Cancelar
                </Link>
                <span className="pull-right">
                    <button type="submit" className="btn btn-xs btn-primary">
                        <i className="fa fa-check"></i>Update
                    </button>
                    <button type="button" className="btn btn-xs btn-danger">
                        <i className="fa fa-close"></i>Remove
                    </button>
                </span>
            </div>
        );
    }
    render() {
        const { handleSubmit } = this.props;
        const { id } = this.props.authUser;
        this.props.fields.title.element = "label";
        if (this.props.loading) {
            return (<Loader />);
        }

        return (
            <div className="content-wrapper event-form" >
                <div className="backspace">
                    <Link to="/"> &lt; Go back  </Link>
                </div>
                <div className="col-sm-6">
                    <div className="box">
                        <div className="box-header with-border">
                            <h3 className="box-title"> Event Details </h3>
                        </div>
                        <form className="form-horizontal" onSubmit={handleSubmit(this.onSubmit.bind(this))}
                            method="post">
                            <div className="box-body">
                                {_.map(FIELDS, this.renderField.bind(this))}
                            </div>

                            {this.renderFooter()}
                        </form>
                    </div>
                </div>
                {this.renderAdditionalInformation()}
            </div>
        );
    }
}

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

const mapStateToProps = ({ auth, events: { selectedEvent, loading}}) => ({
    selectedEvent,
    loading,
    ...auth
});

export default reduxForm({
    form: 'EventFormForm',
    fields: _.keys(FIELDS),
    validate
}, mapStateToProps)(EventForm);