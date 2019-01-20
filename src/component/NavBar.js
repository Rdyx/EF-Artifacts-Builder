import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {HeaderModal} from "../Modals/HeaderModal";
import {VersionModal} from "../Modals/VersionModal";
import {versions} from "../Versions/Versions";
import {SetsFiltering} from "../Modals/SetsFiltering";

export class NavBar extends Component {
    static propTypes = {
        swapManualToAutomaticBuilder: PropTypes.func.isRequired,
        triggerScreenshot: PropTypes.func.isRequired,
        searchBySetName: PropTypes.func.isRequired,
        setFiltering: PropTypes.bool.isRequired,
        setsTypes: PropTypes.array.isRequired,
        bonusTypes: PropTypes.array.isRequired,
        setsLevels: PropTypes.array.isRequired,
        optimiser: PropTypes.bool.isRequired,
        resetFilters: PropTypes.func.isRequired,
    };

    constructor(props) {
        super(props);
        this.state = {
            showInfoModal: false,
            versionModal: false,
            setsFiltering: false,
        }
    };

    closeInfoModal = () => {
        this.setState({showInfoModal: false})
    };

    closeVersionModal = () => {
        this.setState({versionModal: false})
    };

    closeSetsFiltering = () => {
        this.setState({setsFiltering: false})
    };

    render() {
        return (
            <div>
                {this.state.showInfoModal ? (
                    <HeaderModal handler={this.closeInfoModal}/>
                ) : null}
                {this.state.versionModal ? (
                    <VersionModal handler={this.closeVersionModal}/>
                ) : null}
                {this.state.setsFiltering ? (
                    <SetsFiltering
                        handler={this.closeSetsFiltering}
                        setsTypes={this.props.setsTypes}
                        bonusTypes={this.props.bonusTypes}
                        setsLevels={this.props.setsLevels}
                        optimiser={this.props.optimiser}
                    />
                ) : null}
                <nav className="row navbar navbar-dark bg-dark justify-content-center pt-0 pt-sm-2">
                    <div className="navbar-brand mr-sm-auto">
                        <a className="underlined mr-3 big" onClick={() => this.setState({showInfoModal: true})}>EFAB</a>
                        <a className="underlined small"
                           onClick={() => this.setState({versionModal: true})}>{versions[0].number}</a>
                    </div>
                    <div className="col-3 d-none d-sm-block"/>
                    <div className="col-12 d-sm-none"/>
                    <a href="https://www.paypal.me/rdyx" target="_blank" rel="noopener noreferrer">
                        <button
                            className="btn btn-outline-warning mb-2 my-sm-0 p-2 efd"
                        >
                            Donate
                        </button>
                    </a>
                    <button
                        className="btn btn-outline-warning mb-2 my-sm-0 ml-1 p-2"
                        onClick={this.props.swapManualToAutomaticBuilder}>
                        {this.props.optimiser ? 'Manual Builder' : 'Auto Builder'}
                    </button>
                    <button
                        className="btn btn-outline-warning mb-2 my-sm-0 d-none d-sm-block ml-1 p-2"
                        onClick={this.props.triggerScreenshot}>
                        Screen Stats
                    </button>
                    <button
                        className={`btn btn-outline-warning mb-2 my-sm-0 ml-1 p-2 ${this.props.setFiltering ? 'btn-success' : 'mr-0 mr-sm-1'}`}
                        onClick={() => this.setState({setsFiltering: true})}>
                        Filter Sets
                    </button>
                    {this.props.setFiltering ? (
                        <button
                            className="btn btn-outline-warning mb-2 my-sm-0 ml-1 p-2 btn-danger mr-sm-1"
                            onClick={this.props.resetFilters}>
                            Reset Filters
                        </button>
                    ) : null}
                    <div className="margin-top col-12 col-sm col-lg-3 pr-0 pl-0">
                        <input
                            aria-label="Search By Set Technical Name"
                            name="search"
                            id="search"
                            type="text"
                            className="col-xs-12 form-control"
                            placeholder="Search Sets"
                            alt="Search Sets"
                            onChange={this.props.searchBySetName}
                        />
                    </div>
                </nav>
            </div>
        )
    }
}