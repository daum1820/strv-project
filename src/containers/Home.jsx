import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { doLogout } from '../actions/authActions';
import avatar from '../assets/default-avatar.png';
import ToolBar from '../containers/ToolBar';
import { searchEvent } from '../actions/eventsActions';
import '../styles/home.scss';

class Home extends Component {

    constructor(props){
        super(props);
        this.onEventSearch.bind(this);
    }
    
    onLogoutClick(){
        this.props.doLogout();
    }

    onEventSearch(term){
        this.props.searchEvent(term);
    }

    render(){
        const { firstName, lastName } = this.props.authUser;
        const fullName = `${firstName} ${lastName}`;
        const eventSearch = _.debounce(term => this.onEventSearch(term), 300);

        return (
            <span>
                <header className="main-header home-header">
                    <Link to="/" className="logo">
                        <span className="logo-lg">
                            <strong>STRV</strong>ents
                    </span>
                    </Link>
                    <nav className="navbar navbar-static-top">
                        <div className="navbar-custom-menu">
                            <ul className="nav navbar-nav">
                                <li className="dropdown user user-menu">
                                    <Link to="#" className="dropdown-toggle" data-toggle="dropdown">
                                        <img src={avatar} className="user-image" alt="User Image" />
                                        <span className="hidden-xs">{fullName}</span>
                                    </Link>
                                </li>
                                <li>
                                    <a onClick={this.onLogoutClick.bind(this)} title="Sign out" data-toggle="tooltip" data-placement="bottom">
                                        <i className="glyphicon glyphicon-log-out"></i>
                                </a>
                                </li>
                            </ul>
                        </div>
                    </nav>
                </header>
                <div className="main-content">
                    <ToolBar onSearchTermChange={eventSearch}/>
                    {this.props.children}
                </div>
            </span>
        );
    }
}
const mapStateToProps = (state) => ({
    ...state.auth
});
export default connect(mapStateToProps, { doLogout, searchEvent })(Home);