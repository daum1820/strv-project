import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { doLogout } from '../../actions/authActions';
import ToolBar from '../../containers/commons/ToolBar';
import UserProfile from '../../components/UserProfile';

export class Home extends Component {

    constructor(props) {
        super(props);
    }

    onLogoutClick() {
        this.props.doLogout();
    }

    render() {
        return (
            <header className="main-header home-header">
                <Link to="/" className="logo" title="Go to home" data-toggle="tooltip" data-placement="bottom">
                    <span className="logo-sm">
                        <strong>STRV</strong>ents
                    </span>
                </Link>
                <nav className="navbar navbar-static-top">
                    <div className="navbar-custom-menu">
                        <ul className="nav navbar-nav">
                            <UserProfile user={this.props.authUser} profilePath="/user/profile" />
                            <li>
                                <a onClick={this.onLogoutClick.bind(this)} title="Sign out" data-toggle="tooltip" data-placement="bottom">
                                    <i className="glyphicon glyphicon-log-out"></i>
                                </a>
                            </li>
                        </ul>
                    </div>
                </nav>
            </header>
        );
    }
}
const mapStateToProps = (state) => ({
    ...state.auth
});
export default connect(mapStateToProps, { doLogout })(Home);