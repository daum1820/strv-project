import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import _ from 'lodash';
import ToolBar from '../../containers/commons/ToolBar';
import EventList from '../../containers/events/EventList';
import { searchEvent } from '../../actions/eventsActions';

class Home extends Component {

    constructor(props){
        super(props);
        this.onEventSearch.bind(this);
    }

    onEventSearch(term){
        this.props.searchEvent(term);
    }

    render(){
        const eventSearch = _.debounce(term => this.onEventSearch(term), 300);
        return (
            <div className="main-content">
                <ToolBar onSearchTermChange={eventSearch}/>
                <EventList />
            </div>
        );
    }
}
const mapStateToProps = (state) => ({
    ...state.auth
});
export default connect(mapStateToProps, { searchEvent })(Home);