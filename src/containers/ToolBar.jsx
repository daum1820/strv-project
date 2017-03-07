import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

class ToolBar extends Component {
    
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
                <div className="input-group">
                    <span className="input-group-addon"><i className="fa fa-search"></i></span>
                    <input className="form-control"
                        placeholder="Search for an event"
                        value={this.state.term}
                        onChange={event => this.onInputChange(event.target.value)} />
                    <span className="input-group-btn">
                        <button className="btn btn-secondary" type="submit">
                            <i className="fa fa-plus"></i> New Event
                        </button>
                    </span>
                </div>
            </div>
        );
    }
}

export default ToolBar;