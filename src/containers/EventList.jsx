import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import SearchEvents from '../filters/eventsFilter';
import EventItem from './EventItem';

class EventList extends Component{

    render(){
        const { authUser : { id }} = this.props.auth;
        let loadingFrame = null;
        
        //while fetch the events, show loading frame.
        if (!_.keys(this.props.list).length){
            loadingFrame = (
                <div className="overlay">
                    <i className="fa fa-refresh fa-spin"></i>
                </div>
            );
        }
        return (
            <div className="content-wrapper event-list" >
                <h3> Event List</h3>
                {loadingFrame}
                <div className="row no-gutters">
                    {   _.values(this.props.list).map(event => {
                            return (<EventItem {...event} key={event.id} userId={id}/>)
                        })
                    }
                </div>    
            </div>
        );
    }

}
const mapStateToProps = (state) => ({
    list: SearchEvents(state),
    auth: state.auth
});

export default connect(mapStateToProps, {})(EventList);