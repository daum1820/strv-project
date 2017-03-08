import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import Loader from '../../components/Loader';
import { attendEvent, unattendEvent } from '../../actions/eventsActions.js';
import { Link } from 'react-router';

class EventItem extends Component {

    constructor(props){
        super(props);
        this.renderList.bind(this);
        this.renderWidget.bind(this);
        this.renderToolbar.bind(this);
        this.state = {
            loading : false
        }
    }
    componentWillUpdate(){
        if(this.state.loading){
            this.setState({ loading: false });
        }
    }
    onAttendClick(){
        this.setState({loading : true});
        this.props.attendEvent(this.props.id);
    }

    onUnattendClick(){
        this.setState({ loading: true });
        this.props.unattendEvent(this.props.id);
    }

    renderToolbar(){
        if (this.state.loading) {
            return (<Loader />);
        }
        if(this.props.hideToolbar){
            return '';
        }
        const { capacity } = this.props;
        const isAttendeeToMe = this.props.attendees.some(attendee => attendee.id === this.props.userId);
        const isAfterNow = moment().isBefore(this.props.startsAt);
        const numberOfAttendees = this.props.attendees.length;

        const attendButton = (
            <button className="btn btn-xs btn-default" onClick={this.onAttendClick.bind(this)}>
                <i className="fa fa-plus-circle"></i> Attend
            </button>
        );
        const unattendButton = (
            <button className="btn btn-xs btn-danger" onClick={this.onUnattendClick.bind(this)}>
                <i className="fa fa-minus-circle"></i> Unattend
            </button>
        );
        const capacityMessage = (
            <span className="danger-label"><i className="fa fa-info-circle"></i> Sorry, the maximum number of attendees has been reached</span>
        );
        const startsAtMessage = (
            <span className="info-label"><i className="fa fa-info-circle"></i> Sorry, this event already occurred.</span>
        );

        return isAfterNow ? 
            (isAttendeeToMe ? unattendButton : 
                (numberOfAttendees < capacity ? 
                    attendButton : capacityMessage)) :  
            startsAtMessage;
    }
    renderList(){
        const { id, title, description, startsAt, owner, attendees, capacity, userId } = this.props;
        return (
            <div className={`box box-danger ${this.state.loading ? 'opacity' : ''}`}>
                <div className="box-header with-border">
                    <span className="pull-right">
                        {this.renderToolbar()}
                    </span>
                    <h4>{title} <small>({description})</small></h4>
                </div>
            </div>
        );
    }
    renderWidget(){
        const numberOfAttendees = this.props.attendees.length;
        const { id, title, description, startsAt, owner, attendees, capacity, userId } = this.props;
        return (
            <div className="col-md-4 col-sm-6 col-xs-12">
                <div className={`box box-danger ${this.state.loading ? 'opacity' : ''}`}>
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
                                <strong>Description</strong>
                                <p>{description}</p>
                                <strong>Owner</strong>
                                <p>{owner.firstName} {owner.lastName}</p>
                            </div>
                        </div>
                        <div>
                            <Link to={`/events/${id}`} className="pull-right">
                                More Details
                            </Link>    
                        </div>
                    </div>
                    <div className="box-footer text-right">
                        {this.renderToolbar()}
                    </div>
                </div>
            </div>
        )
    }
    render() {
        return this.props.renderOptions === 'list' ? this.renderList() : this.renderWidget();
    }
}

export default connect(null,{ attendEvent, unattendEvent })(EventItem);