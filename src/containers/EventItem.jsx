import _ from 'lodash';
import React, { Component } from 'react';
import moment from 'moment';

class EventItem extends Component {

    render() {
        const { id, title, description, startsAt, owner, attendees, capacity, userId } = this.props;
        const numberOfAttendees = attendees.length;
        const isAttendeeToMe = attendees.some(attendee => attendee.id === userId);
        console.log(attendees);
        const boxFooterToolbar = isAttendeeToMe ? 
            (<button className="btn btn-sm btn-danger">
                <i className="fa fa-plus-circle"></i> Attend
            </button>) : 
            (<button className="btn btn-sm bg-black">
                <i className="fa fa-minus-circle"></i> Unttend
            </button>);
        return (
            <div className="col-md-4 col-sm-6 col-xs-12">
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
                            <div className="col-sm-12">
                                <label>Description:</label>
                                <p>{description}</p>
                                <label>Owner:</label>
                                <p>{owner.firstName} {owner.lastName}</p>
                            </div>
                        </div>
                    </div>
                    <div className="box-footer text-right">
                        {boxFooterToolbar}
                    </div>
                </div>
            </div>
        )
    }
}

export default EventItem;