import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import { baseStyle } from '../styles/ModalStyle';
import { setButtons } from './ModalsComponents/ButtonsModalComponent';

export class SettingsModal extends Component {
    static propTypes = {
        handler: PropTypes.func.isRequired,
        setsTypes: PropTypes.array.isRequired,
        bonusTypes: PropTypes.array.isRequired,
        setsLevels: PropTypes.array.isRequired,
        optimiser: PropTypes.bool.isRequired,
        enhancementMode: PropTypes.array.isRequired,
        enhancementLevels: PropTypes.array.isRequired,
        totalArtsPerSet: PropTypes.array.isRequired,
        setsSorting: PropTypes.array.isRequired,
        artsLevelsFiltering: PropTypes.array.isRequired,
    };

    constructor(props) {
        super(props);
        this.state = {
            tabs: ['Filters', 'Enhances', 'Sets Levels', 'Sorting'],
            selectedTab: 'Filters'
        }
    }

    render() {
        const tabs = this.props.optimiser ? this.state.tabs : this.state.tabs.filter(tab => tab !== 'Sets Levels');
        const tabsLength = tabs.length;

        return (
            <div>
                <Modal
                    isOpen={true}
                    onRequestClose={this.props.handler}
                    style={baseStyle}
                >
                    <div className="row mb-1 version-underline pb-2">
                        <h2 className="col-12 version-underline pb-2 text-center">EFAB Settings</h2>
                        {tabs.map(tab => setButtons(
                            tab,
                            tabsLength,
                            this.state.selectedTab,
                            () => this.setState({ selectedTab: tab })
                        ))}
                    </div>
                    <div className="row text-center justify-content-center">
                        {this.state.selectedTab === 'Filters' ? (
                            <Fragment>
                                <div className="col-12 col-md-6 mt-2">
                                    <h3>Category</h3>
                                    {this.props.setsTypes}
                                </div>
                                <div className="col-12 col-md-6 mt-3 mt-sm-0 justify-content-around">
                                    <h3>Bonus Type</h3>
                                    {this.props.bonusTypes}
                                    <div className="row mx-auto">
                                        <h3 className="col-12 mt-2">Arts per Set</h3>
                                        {this.props.totalArtsPerSet}
                                    </div>
                                    <div className="row mx-auto">
                                        <h3 className="col-12 mt-2">Arts Levels</h3>
                                        {this.props.artsLevelsFiltering}
                                    </div>
                                </div>
                            </Fragment>
                        ) : this.state.selectedTab === 'Enhances' ? (
                            <div className="col-12 col-sm-6">
                                <h3 className="mt-2">Sets Enhancement</h3>
                                <div className="row mx-auto">
                                    {this.props.enhancementMode}
                                </div>
                                <div className="row mx-auto">
                                    {this.props.enhancementLevels}
                                </div>
                            </div>
                        ) : this.state.selectedTab === 'Sets Levels' ? (
                            <div className="col-12 col-sm-6">
                                <h3 className="mt-2">Sets Levels</h3>
                                {this.props.setsLevels}
                            </div>
                        ) : (
                                        <div className="col-12 col-sm-6">
                                            <h3 className="mt-2">Sets Sorting</h3>
                                            {this.props.setsSorting}
                                        </div>
                                    )
                        }
                    </div>
                </Modal>
            </div >
        )
    }
}