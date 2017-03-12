import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Loader from '../../components/Loader';
import { searchEvents as SearchEvents} from '../../selectors/eventsSelector';
import EventItem from './EventItem';

class EventList extends Component{
    constructor(props) {
        super(props);
        this.state = { loading: true }
    }

    componentWillUpdate() {
        if (this.state.loading) {
            this.setState({ loading: false });
        }
    }

    render(){
        //Avoid render while stateinjection.
        if(!this.props.auth || !this.props.list){
            return (<Loader />);
        }
        const { authUser } = this.props.auth;
        let loadingFrame = null;
        let noEventsFound = null;

        //Show loader as feedback for user
        if (this.state.loading){
            loadingFrame = (<Loader />);
        } else if(!this.props.list.length){
            noEventsFound = (
                <div className="box-body no-padding">
                    <table className="table">
                        <tbody>
                            <tr>
                                <td className="text-center"> No events were found</td>
                            </tr>
                        </tbody>
                    </table>
                </div >
            );
        }

        return (
            <div className="content-wrapper event-list" >
                <h3> Events </h3>
                {loadingFrame}
                <div className="row event-block no-gutters">
                    {noEventsFound}
                    {   
                        this.props.list.map(event => {
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
    auth: state.auth
});

export default connect(mapStateToProps)(EventList);