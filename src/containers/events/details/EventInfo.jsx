import React from 'react';

const renderAttendees = (event) => {
    const { attendees } = event;
    if (!attendees.length) {
        return (
            <div className="box-body no-padding">
                <table className="table table-striped">
                    <tbody>
                        <tr>
                            <td className="text-center"> No attendees were found</td>
                        </tr>
                    </tbody>
                </table>
            </div >);
    }
    return (
        <div className="box-body no-padding">
            <table className="table table-striped">
                <tbody>
                    {
                        attendees.map(attendee => (
                            <tr key={attendee.id}>
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

const EventInfo = ({event}) => {
    const { owner, attendees, capacity } = event;
    return (
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
                {renderAttendees(event)}
            </div>
        </div>
    )
}

export default EventInfo;