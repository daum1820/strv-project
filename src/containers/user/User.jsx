import _ from 'lodash';
import moment from 'moment';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Loader from '../../components/Loader';
import avatar from '../../assets/default-avatar.png';
import { upcomingEvents as UpcomingEvents } from '../../filters/eventsFilter';
import { pastEvents as PastEvents } from '../../filters/eventsFilter';
import { ownedEvents as OwnedEvents } from '../../filters/eventsFilter';
import EventItem from '../events/EventItem';

class EventList extends Component {
    constructor(props){
        super(props);
        this.renderEvents.bind(this);
    }

    renderEvents(events, toolbar){
        const { id } = this.props.auth.authUser;
        const noEventsMessage = !_.keys(events).length && !this.props.loading ? 
            (<div className="text-center"> No events were found.</div>) : '';
        return(
            <div className="row no-gutters">
                {noEventsMessage}
                {   _.values(events).map(event => {
                    return (<EventItem {...event} key={event.id} userId={id} hideToolbar={toolbar}/>)
                    })
                }
            </div>
        )
    }
    render() {
        const { id, firstName, lastName, email, createdAt } = this.props.auth.authUser;
        const fullName = `${firstName} ${lastName}`;

        let loadingEvents = null;

        //while fetch the events, show loading frame.
        if (this.props.loading) {
            loadingEvents = (<Loader />);
        }
        return (
            <div className="content-wrapper user-profile" >
                <div className="col-md-4 col-sm-12">
                    <h3> My profile</h3>
                    <div className="box box-widget widget-user-2">
                        <div className="widget-user-header bg-red bg-strv">
                            <div className="widget-user-image">
                                <img className="img-circle" src={avatar} alt="User Avatar" />
                            </div>
                            <h3 className="widget-user-username">{fullName}</h3>
                            <h6 className="widget-user-desc">
                                Member since {moment(createdAt).format('MMM. YYYY')}
                            </h6>
                        </div>
                        <div className="box-footer no-padding">
                            <ul className="nav nav-stacked">
                                <li><a href="#"><i className="fa fa-envelope"></i> {email} <span className="pull-right badge bg-blue">31</span></a></li>
                                <li><a href="#"> Upcoming Events <span className="pull-right badge bg-blue">{_.keys(this.props.upcomingEvents).length}</span></a></li>
                                <li><a href="#"> Past Events <span className="pull-right badge bg-blue">{_.keys(this.props.pastEvents).length}</span></a></li>
                                <li><a href="#"> Owned Events <span className="pull-right badge bg-blue">{_.keys(this.props.ownedEvents).length}</span></a></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="col-md-8 col-sm-12">
                    <h3><i className="fa fa-calendar-check-o"></i> Upcoming events</h3>
                    <hr />
                    {loadingEvents}
                    {this.renderEvents(this.props.upcomingEvents, false)}
                    <h3> <i className="fa fa-history"></i> Past events</h3>
                    <hr />
                    {loadingEvents}
                    {this.renderEvents(this.props.pastEvents, true)}
                    <h3><i className="fa fa-shield"></i> Your events</h3>
                    <hr />
                    {loadingEvents}
                    {this.renderEvents(this.props.ownedEvents, true)}
                </div>
            </div>
        );
    }

}
const mapStateToProps = (state) => ({
    upcomingEvents: UpcomingEvents(state),
    pastEvents: PastEvents(state),
    ownedEvents: OwnedEvents(state),
    loading: state.events.loading,
    auth: state.auth
});

export default connect(mapStateToProps)(EventList);