import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Link } from 'react-router';

export class ToolBar extends Component {
    
    constructor(props) {
        super(props);
        this.state = {term : ""};
    }

    onInputChange(term) {
        this.setState({term});
        this.props.onSearchTermChange(term);
    }

    render() {
        return (
            <div className="search-bar">
                <div className="input-group sidebar-form">
                    <input className="form-control"
                        placeholder="Search for an event"
                        value={this.state.term}
                        onChange={event => this.onInputChange(event.target.value)} />
                    <span className="input-group-btn">
                        <span className="btn btn-flat"><i className="fa fa-search"></i></span>
                        <Link className="btn btn-danger" to='event/new'>
                            <i className="fa fa-plus"></i> Create Event
                        </Link>
                    </span>
                </div>
                <hr />
            </div>
        );
    }
}

export default ToolBar;