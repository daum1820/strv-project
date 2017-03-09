import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { attendEvent, unattendEvent, deleteEvent } from '../../../actions/eventsActions';
import moment from 'moment';

class EventToolbar extends Component {
constructor(props){
        super(props);
        
        this.renderAttendeeToolbar.bind(this);
        this.renderOwnerToolbar.bind(this);
        this.renderCreateToolbar.bind(this);
        this.renderCancelToolbar.bind(this);

        this.state = {
            loading : false,
            deleting : false,
        }
    }

    componetWillUpdate(){
        console.inf('vai');
    }

    onAttendClick(){
        this.setState({loading : true});
        this.props.attendEvent(this.props.event.id).then(() =>{
            this.setState({ loading: false });
        });
    }

    onUnattendClick(){
        this.setState({ loading: true });
        this.props.unattendEvent(this.props.event.id).then(() => {
            this.setState({ loading: false });
        });
    }

    onDeleteClick() {
        deleting: false,
        this.setState({ loading: true });
        this.props.deleteEvent(this.props.event.id);
    }

    renderAttendeeToolbar() {
        if (!this.props.attendeesToolbar || !this.props.event) {
            return '';
        }

        const { capacity } = this.props.event;
        const { id: userId } = this.props.user || { id : null};
        const isAttendeeToMe = this.props.event.attendees.some(attendee => attendee.id === userId);
        const isAfterNow = moment().isBefore(this.props.event.startsAt);
        const numberOfAttendees = this.props.event.attendees.length;

        const attendButton = (
            <button type="button" 
                className="btn btn-xs btn-success" onClick={this.onAttendClick.bind(this)}>
                <i className={this.state.loading ? 'fa fa-refresh fa-spin' : 'fa fa-plus-circle'}></i> Attend
            </button>
        );
        const unattendButton = (
            <button type="button" 
                className="btn btn-xs btn-warning" onClick={this.onUnattendClick.bind(this)}>
                <i className={this.state.loading ? 'fa fa-refresh fa-spin' : 'fa fa-minus-circle'}></i> Unattend
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
    renderCreateToolbar () {
        if (!this.props.createToolbar) {
            return '';
        }
        if (!this.props.event) {
            return (
                <button type="submit" className="btn btn-xs btn-primary">
                    <i className="fa fa-check"></i> Create
                </button>
            )
        }
    }

    renderOwnerToolbar() {
        if (!this.props.ownerToolbar) {
            return '';
        }
        const { owner } = this.props.event ? this.props.event : {};
        const { id: userId } = this.props.user;

        if (this.props.event && owner.id == userId) {
            return (
                <span>
                    <button type="submit" className="btn btn-xs btn-primary">
                        <i className="fa fa-check"></i>Update
                    </button>
                    <button onClick={this.onDeleteClick.bind(this)} 
                        type="button" className="btn btn-xs btn-danger">
                        <i className={this.state.deleting ? 
                            'fa fa-refresh fa-spin' : 'fa fa-trash'}></i>Remove
                    </button>
                </span>
            )
        }
    }
    renderCancelToolbar() {
        if (!this.props.cancelToolbar){
            return '';
        }
        return(
            <Link to={"/"} type="button" className="btn btn-xs btn-default pull-left">
                <i className="fa fa-close"></i> Cancel
            </Link>
        );
    }
    render() {
        return (
            <div className="box-footer">
                {this.renderCancelToolbar()}
                <div className="pull-right">
                    {this.renderAttendeeToolbar()}
                    {this.renderOwnerToolbar()}
                    {this.renderCreateToolbar()}
                </div>
            </div>
        );
    }
}


export default connect(null, { attendEvent, unattendEvent, deleteEvent })(EventToolbar);