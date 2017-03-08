import React from 'react';
import avatar from '../assets/default-avatar.png';
import moment from 'moment';
import { Link } from 'react-router';
import Loader from './Loader';

const UserProfile = (props) => {
    if(!props.user){
        return (<Loader />);
    }
    const { firstName, lastName, createdAt, email } = props.user;
    const { profilePath } = props;
    const fullName = `${firstName} ${lastName}`;
    return (
        <li className="dropdown user user-menu">
            <Link to="#" className="dropdown-toggle" data-toggle="dropdown">
                <img src={avatar} className="user-image" alt="User Image" />
                <span className="hidden-xs">{fullName}</span>
            </Link>
            <ul className="dropdown-menu">
                <li className="user-header">
                    <img src={avatar} className="img-circle" alt="User Image" />
                    <p> {fullName}
                        <small>Member since {moment(createdAt).format('MMM. YYYY')}</small>
                    </p>
                </li>
                <li className="user-body text-center">
                    <i className="fa fa-envelope"></i> {email}
                </li>
                <li className="user-footer">
                    <div className="text-center">
                        <Link to={profilePath} className="btn bg-red btn-flat">
                            <i className="fa fa-user"></i> Profile
                        </Link>
                    </div>
                </li>
            </ul>
        </li>
    );
}

export default UserProfile;