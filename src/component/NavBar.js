import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { HeaderModal } from "../Modals/HeaderModal";
import { VersionModal } from "../Modals/VersionModal";
import { versions } from "../Versions/Versions";
import { SettingsModal } from "../Modals/SettingsModal";
import { HowToUseModal } from '../Modals/HowToUseModal';

// Used to show modal when new version has been released, localstorage value is set in service worker
// If never have been set, set default to true, then use localStorage value
const showLastPatchNote = localStorage.getItem('showLastPatchNote') === null ? true : JSON.parse(localStorage.getItem('showLastPatchNote'));

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
        setsSorting: PropTypes.array.isRequired,
        artsLevelsFiltering: PropTypes.array.isRequired,
    };

    constructor(props) {
        super(props);
        this.state = {
            showInfoModal: false,
            versionModal: false,
            settingsModal: false,
            howToUse: false,
            showLastPatchNote: true,
        }
    };

    componentWillMount = () => {
        localStorage.setItem('showLastPatchNote', showLastPatchNote)
        this.setState({ showLastPatchNote: showLastPatchNote })
    };

    closeInfoModal = () => {
        this.setState({ showInfoModal: false })
    };

    closeVersionModal = () => {
        this.setState({ versionModal: false })
    };

    dontShowUntillNextUpdate = () => {
        localStorage.setItem('showLastPatchNote', false)
        this.setState({ showLastPatchNote: false })
    };

    closeSettingsModal = () => {
        this.setState({ settingsModal: false })
    };

    closeHowToUse = () => {
        this.setState({ howToUse: false })
    };

    testFBApp = () => {
        var now = new Date().valueOf();
        setTimeout(function () {
            if (new Date().valueOf() - now > 1000) return;
            window.location = "https://www.facebook.com/EFABuilder/";
        }, 950);
        window.location = "fb://page/270195490537651";
    };

    render() {
        // https://developer.mozilla.org/en-US/docs/Web/HTTP/Browser_detection_using_the_user_agent
        const isMobile = navigator.maxTouchPoints > 0;
        const FBLink = 'https://www.facebook.com/EFABuilder/';
        const fbButtonStyle = { zIndex: 2, width: '63px', height: '40px', border: 'none', overflow: 'hidden', display: 'block' };

        const FBIFrame = (
            <iframe
                src="https://www.facebook.com/plugins/like.php?href=https%3A%2F%2Fwww.facebook.com%2FEFABuilder&layout=box_count&action=like&colorscheme=dark&size=small&show_faces=false&share=false&appId"
                style={{ zIndex: 0, width: '63px', height: '40px', border: 'none', overflow: 'hidden' }} scrolling="no"
                frameBorder="0" title="EFAB's Facebook Page"
            />
        );

        return (
            <div>
                {this.state.showInfoModal ? (
                    <HeaderModal
                        handler={this.closeInfoModal}
                        isMobile={isMobile}
                        FBLink={FBLink}
                        testFBApp={() => this.testFBApp()} />
                ) : null}
                {this.state.versionModal ? (
                    <VersionModal handler={this.closeVersionModal} versions={versions} />
                ) : null}
                {this.state.showLastPatchNote ? (
                    <VersionModal handler={this.dontShowUntillNextUpdate} versions={[versions[0]]} />
                ) : null}
                {this.state.settingsModal ? (
                    <SettingsModal
                        handler={this.closeSettingsModal}
                        setsTypes={this.props.setsTypes}
                        bonusTypes={this.props.bonusTypes}
                        setsLevels={this.props.setsLevels}
                        optimiser={this.props.optimiser}
                        enhancementMode={this.props.enhancementMode}
                        enhancementLevels={this.props.enhancementLevels}
                        totalArtsPerSet={this.props.totalArtsPerSet}
                        setsSorting={this.props.setsSorting}
                        artsLevelsFiltering={this.props.artsLevelsFiltering}
                    />
                ) : null}
                {this.state.howToUse ? (
                    <HowToUseModal handler={this.closeHowToUse} />
                ) : null}
                <nav className="row navbar navbar-dark bg-transparent justify-content-sm-around pt-2 justify-content-center">
                    <div className="navbar-brand mx-auto ml-lg-0 d-flex align-items-end justify-content-center mb-1 mb-lg-0">
                        <button className="underlined mr-2 big btn-link text-white"
                            onClick={() => this.setState({ showInfoModal: true })}>EFAB
                        </button>
                        <button className="underlined small btn-link text-white"
                            onClick={() => this.setState({ versionModal: true })}>{versions[0].number}</button>
                    </div>
                    <div className="col-12 d-lg-none" />
                    {this.props.connected ? isMobile ? (
                        <div className="mb-2 my-sm-0 ml-1 fb-buttons"
                            style={fbButtonStyle}
                            onClick={() => this.testFBApp()}>
                            {FBIFrame}
                        </div>
                    ) : (
                            <a className="mb-2 my-sm-0 ml-1 fb-buttons"
                                style={fbButtonStyle}
                                scrolling="no"
                                href={FBLink}
                                target="_blank"
                                rel="noopener noreferrer">
                                {FBIFrame}
                            </a>
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
                        Share Summary
                    </button>
                    <button
                        className={`btn btn-outline-warning mb-2 my-sm-0 ml-1 p-2 ${this.props.setFiltering ? 'btn-success' : ''}`}
                        onClick={() => this.setState({ settingsModal: true })}>
                        Settings
                    </button>
                    <button
                        className={`btn btn-outline-warning mb-2 my-sm-0 ml-1 p-2 ${this.props.listLength === 0 ? 'mr-0 mr-sm-1' : ''}`}
                        onClick={() => this.setState({ howToUse: true })}>
                        Help
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