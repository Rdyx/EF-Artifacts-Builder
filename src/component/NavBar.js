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
        listLength: PropTypes.number.isRequired,
        resetList: PropTypes.func.isRequired,
        enhancementMode: PropTypes.array.isRequired,
        enhancementLevels: PropTypes.array.isRequired,
        connected: PropTypes.bool.isRequired,
        totalArtsPerSet: PropTypes.array.isRequired,
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
                        enhancementMode={this.props.enhancementMode}
                        enhancementLevels={this.props.enhancementLevels}
                        totalArtsPerSet={this.props.totalArtsPerSet}
                    />
                ) : null}
                <nav className="row navbar navbar-dark bg-transparent justify-content-center pt-0 pt-sm-2">
                    <div className="navbar-brand mr-sm-auto d-flex align-items-end">
                        <button className="underlined mr-2 big btn-link text-white"
                                onClick={() => this.setState({showInfoModal: true})}>EFAB
                        </button>
                        <button className="underlined small btn-link text-white"
                                onClick={() => this.setState({versionModal: true})}>{versions[0].number}</button>
                    </div>
                    <div className="col-1 d-none d-sm-block"/>
                    <div className="col-12 d-sm-none"/>
                    {this.props.connected ? (
                        <iframe
                            src="https://www.facebook.com/plugins/like.php?href=https%3A%2F%2Fwww.facebook.com%2FEFABuilder&layout=box_count&action=like&colorscheme=dark&size=small&show_faces=false&share=false&appId"
                            style={{width: '63px', height: '40px', border: 'none', overflow: 'hidden'}} scrolling="no"
                            frameBorder="0" title="EFAB's Facebook Page"
                            className="mb-2 my-sm-0 ml-1"/>
                    ) : null}
                    <a href="https://www.paypal.me/rdyx" target="_blank" rel="noopener noreferrer">
                        <button
                            className="btn btn-outline-warning mb-2 my-sm-0 ml-1 p-2"
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
                        className={`btn btn-outline-warning mb-2 my-sm-0 ml-1 p-2 ${this.props.setFiltering ? 'btn-success' : this.props.listLength === 0 ? 'mr-0 mr-sm-1' : ''}`}
                        onClick={() => this.setState({setsFiltering: true})}>
                        Options
                    </button>
                    {this.props.setFiltering ? (
                        <button
                            className={`btn btn-outline-warning btn-danger mb-2 my-sm-0 d-sm-block ml-1 p-2 ${this.props.listLength === 0 ? 'mr-0 mr-sm-1' : ''}`}
                            onClick={this.props.resetFilters}>
                            Reset Filters
                        </button>
                    ) : null}
                    {this.props.listLength > 0 ? (
                        <button
                            className={`btn btn-outline-warning mb-2 my-sm-0 p-2 btn-danger mr-sm-1 ml-1`}
                            onClick={this.props.resetList}>
                            Reset Summary
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