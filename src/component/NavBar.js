import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {HeaderModal} from "../Modals/HeaderModal";
import {VersionModal} from "../Modals/VersionModal";

export class NavBar extends Component {
    static propTypes = {
        triggerScreenshot: PropTypes.func.isRequired,
        searchBySetName: PropTypes.func.isRequired,
    };

    constructor(props) {
        super(props);
        this.state = {
            showInfoModal: false,
            versionModal: false,
        }
    };

    closeInfoModal = () => {
        this.setState({showInfoModal: false})
    };

    closeVersionModal = () => {
        this.setState({versionModal: false})
    };

    render() {
        return (
            <div>
                {this.state.showInfoModal ? (
                    <HeaderModal handler={this.closeInfoModal}/>
                ) : null}
                {this.state.versionModal ? (
                    <VersionModal versions={[]} handler={this.closeVersionModal}/>
                ) : null}
                <nav className="sticky-top row navbar navbar-dark bg-dark justify-content-between">
                    <div className="navbar-brand">
                        <a className="underlined mr-3 big" onClick={() => this.setState({showInfoModal: true})}>EFAB</a>
                        <a className="underlined small" onClick={() => this.setState({versionModal: true})}>V1.3</a>
                    </div>
                    <button
                        className="btn btn-outline-warning my-2 my-sm-0 d-none d-sm-block"
                        onClick={this.props.triggerScreenshot}>Screen Stats
                    </button>
                    <div className="col-xs-12 margin-top">
                        <input
                            type="text"
                            className="col-xs-12 form-control"
                            placeholder="Search By Set Technical Name"
                            alt="Search By Set Technical Name"
                            onChange={this.props.searchBySetName}
                        />
                    </div>
                </nav>
            </div>
        )
    }
}