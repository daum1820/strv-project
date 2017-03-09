import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { attendEvent, unattendEvent } from '../../actions/eventsActions.js';
import { Link } from 'react-router';
import EventToolbar from './details/EventToolbar';

class EventItem extends Component {

    render(){
        const numberOfAttendees = this.props.event.attendees.length;
        const { id, title, description, startsAt, owner, attendees, capacity, user } = this.props.event;
        return (
                <div className="box box-danger">
                    <div className="box-header with-border">
                        <h3 className="box-title">{title}</h3>
                        <span className="time" title="Capacity" data-toggle="tooltip" data-placement="top">
                            <i className="fa fa-users"></i>
                            {numberOfAttendees}/{capacity}
                        </span>
                    </div>
                    <div className="box-body">
                        <span className="time" title="Event Date" data-toggle="tooltip" data-placement="left">
                            <i className="fa fa-calendar"></i>
                            {moment(startsAt).format('MMMM Do, YYYY - HH:mm')}
                        </span>
                        <div className="row">
                            <label className="col-sm-2">Owner</label>
                            <label className="col-sm-8">Description</label>
                        </div>
                        <div className="row">
                        <div className="col-sm-2">
                            {`${owner.firstName} ${owner.lastName}`}</div>
                            <div className="col-sm-8">{description}</div>
                        </div>
                        <div>
                            <Link to={`/events/${id}`} className="pull-right">
                                More Details
                            </Link>    
                        </div>
                    </div>
                    {<EventToolbar event={this.props.event} user={this.props.user}
                        attendeesToolbar={this.props.attendeesToolbar}/>}
                </div>
        )
    }
}

export default connect(null,{ attendEvent, unattendEvent })(EventItem);