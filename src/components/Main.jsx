import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../containers/commons/Header';
import '../styles/home.scss';

class Main extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <span>
                <Header />
                { this.props.children }
            </span>
        );
    }
}
export default Main;