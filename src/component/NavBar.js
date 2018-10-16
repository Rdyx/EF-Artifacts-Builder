import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {HeaderModal} from "../Modals/HeaderModal";

export class NavBar extends Component {
    static propTypes = {
        triggerScreenshot: PropTypes.func.isRequired,
        searchBySetName: PropTypes.func.isRequired,
    };

    constructor(props) {
        super(props);
        this.state = {
            showInfoModal: false,
        }
    };

    closeInfoModal = () => {
        this.setState({showInfoModal: false})
    };

    render() {
        return (
            <nav className="sticky-top row navbar navbar-dark bg-dark justify-content-between">
                {this.state.showInfoModal ? (
                    <HeaderModal handler={this.closeInfoModal}/>
                ) : null}
                <a className="navbar-brand underlined" onClick={() => this.setState({showInfoModal: true})}>EFAB</a>
                <button
                    className="btn btn-outline-warning my-2 my-sm-0 d-none d-sm-block"
                    onClick={this.props.triggerScreenshot}>Screen Stats
                </button>
                <div className="col-xs-12 margin-top">
                    <input
                        type="text"
                        className="col-xs-12 form-control"
                        placeholder="Search By Set Technical Name"
                        onChange={this.props.searchBySetName}
                    />
                </div>
            </nav>
        )
    }
}