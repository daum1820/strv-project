import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import _ from 'lodash';
import moment from 'moment';
import { createEvent, updateEvent } from '../../actions/eventsActions';
import { validateEmail } from '../../utils';
import Loader from '../../components/Loader';
import { Link } from 'react-router';
import { Fields, validate } from './details/fields';
import EventInfo from './details/EventInfo';
import EventToolbar from './details/EventToolbar';

class EventForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            submitted : false
        };
    }

    componentWillUpdate() {
        if (this.state.submitted) {
            this.setState({ submitted: false });
        }
    }

    //Render fields based on external configuration
    renderField(config, field) {
        const fieldHelper = this.props.fields[field];
        let value = null;
        let disabled = !!this.props.event;
        if (this.props.event){
            const { owner } = this.props.event ? this.props.event : {};
            const { id: userId } = this.props.authUser;
            disabled = !(owner.id == userId);
        }

        return (
            <div key={field} className={`form-group ${fieldHelper.touched && fieldHelper.invalid ? 'has-error' : ''}`}>
                <label className="col-sm-3 control-label">{config.label}</label>
                <div className="col-sm-9">
                    <config.element type={config.type} className={` form-control ${config.className}`} {...fieldHelper} disabled={disabled}/>
                    <div className="error-label">
                        {fieldHelper.touched ? fieldHelper.error : ''}
                    </div>
                </div>
            </div>
        )
    }

    onSubmit(props) {
        this.setState({submitted : true});
        const event = {
            ...props,
            startsAt : moment(props.startsAt).format(),
        }
        if (this.props.event){
            this.props.updateEvent(event, this.props.event.id);
        } else {
            this.props.createEvent(event);
        }
    }

    render() {
        const { handleSubmit } = this.props;
        const { id } = this.props.authUser;
        this.props.fields.title.element = "label";
        const loader = this.props.loading || this.state.submitted ? (<Loader />) : '';

        return (
            <div className="content-wrapper event-form" >
                <div className="backspace">
                    <Link to="/"> &lt; Go back  </Link>
                </div>
                <div className="col-sm-6">
                    <div className={`box ${this.props.loading || this.state.submitted ? 'opacity' : ''}`}>
                        {loader}
                        <div className="box-header with-border">
                            <h3 className="box-title"> Event Details </h3>
                        </div>
                        <form className="form-horizontal" onSubmit={handleSubmit(this.onSubmit.bind(this))}
                            method="post">
                            <div className="box-body">
                                {_.map(Fields, this.renderField.bind(this))}
                            </div>
                            {<EventToolbar ownerToolbar={true} createToolbar={true} cancelToolbar={true}
                                attendeesToolbar={true} event={this.props.event} user={this.props.authUser}/>}
                        </form>
                    </div>
                </div>
                {this.props.event ? <EventInfo event={this.props.event} /> : ''}
            </div>
        );
    }
}

const mapStateToProps = ({ auth, events: { selectedEvent, loading}}) => ({
    event : selectedEvent,
    loading,
    ...auth,
    initialValues:{
        ...selectedEvent
    }
});

export default reduxForm({
    form: 'EventFormForm',
    fields: _.keys(Fields),
    validate
}, mapStateToProps, { createEvent, updateEvent })(EventForm);