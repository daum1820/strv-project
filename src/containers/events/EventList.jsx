import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Loader from '../../components/Loader';
import { searchEvents as SearchEvents} from '../../filters/eventsFilter';
import EventItem from './EventItem';

class EventList extends Component{

    render(){
        if(!this.props.auth || !this.props.list){
            return (<Loader />);
        }
        const { authUser } = this.props.auth;
        let loadingFrame = null;
        
        //while fetch the events, show loading frame.
        if (this.props.loading){
            loadingFrame = (<Loader />);
        }
        return (
            <div className="content-wrapper event-list" >
                <h3> Events </h3>
                {loadingFrame}
                <div className="row event-block no-gutters">
                    {   _.values(this.props.list).map(event => {
                        return (<EventItem event={event} key={event.id} user={authUser} attendeesToolbar={true}/>)
                        })
                    }
                </div>    
            </div>
        );
    }

}
const mapStateToProps = (state) => ({
    list: SearchEvents(state),
    loading : state.events.loading,
    auth: state.auth
});

export default connect(mapStateToProps)(EventList);