import moment from 'moment';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Loader from '../../components/Loader';
import avatar from '../../assets/default-avatar.png';
import  * as selectors from '../../selectors/eventsSelector';
import EventItem from '../events/EventItem';

class EventList extends Component {
    constructor(props){
        super(props);
        this.renderEvents.bind(this);
        this.state = { loading : true }
    }

    componentWillUpdate() {
        if (this.state.loading) {
            this.setState({ loading: false });
        }
    }

    renderEvents(events, attendeesToolbar){
        const { authUser } = this.props.auth;
        const noEventsMessage = !_.keys(events).length && !this.props.loading ? 
            (<div className="text-center"> No events were found.</div>) : '';
        return(
            <div className="row no-gutters">
                {noEventsMessage}
                {   events.map(event => {
                    return (<EventItem event={event} key={event.id} 
                        user={authUser} attendeesToolbar={attendeesToolbar}/>)
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
        if (this.state.loading) {
            loadingEvents = (<Loader />);
        }
        return (
            <div className="content-wrapper user-profile" >
                <div className="col-md-4 col-sm-12">
                    <h3><i className="fa fa-user"></i> Profile</h3>
                    <hr />
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
                                <li><a href="#"> Upcoming Events <span className="pull-right badge bg-blue">{this.props.upcomingEvents.length}</span></a></li>
                                <li><a href="#"> Past Events <span className="pull-right badge bg-blue">{this.props.pastEvents.length}</span></a></li>
                                <li><a href="#"> Owned Events <span className="pull-right badge bg-blue">{this.props.ownedEvents.length}</span></a></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="col-md-8 col-sm-12">
                    <h3><i className="fa fa-calendar-check-o"></i> Upcoming events</h3>
                    <hr />
                    {loadingEvents}
                    {this.renderEvents(this.props.upcomingEvents, true)}
                    <h3> <i className="fa fa-history"></i> Past events</h3>
                    <hr />
                    {loadingEvents}
                    {this.renderEvents(this.props.pastEvents, false)}
                    <h3><i className="fa fa-shield"></i> Owned events</h3>
                    <hr />
                    {loadingEvents}
                    {this.renderEvents(this.props.ownedEvents, true)}
                </div>
            </div>
        );
    }

}
const mapStateToProps = (state) => ({
    upcomingEvents: selectors.upcomingEvents(state),
    pastEvents: selectors.pastEvents(state),
    ownedEvents: selectors.ownedEvents(state),
    auth: state.auth
});

export default connect(mapStateToProps)(EventList);