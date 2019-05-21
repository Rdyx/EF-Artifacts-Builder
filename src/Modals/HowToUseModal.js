import React, { Component } from 'react';
import { baseStyle } from '../styles/ModalStyle';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import { AutomaticBuilderInfo, ManualBuilderInfo } from './HowToUseContent/BuildersInfo';
import { MiscInfo } from './HowToUseContent/MiscInfo';
import { FiltersInfo, EnhancementsInfo, SetsLevelsInfo, SortingInfo } from './HowToUseContent/SettingsInfo';
import { ShareInfo } from './HowToUseContent/ShareInfo';
import { setButtons } from './ModalsComponents/ButtonsModalComponent';

export class HowToUseModal extends Component {
    static propTypes = {
        handler: PropTypes.func.isRequired,
    };

    constructor(props) {
        super(props);
        this.state = {
            infoTabs: ['Builders', 'Share List', 'Settings', 'Misc'],
            selectedInfo: 'Builders',
            buildersTabs: ['Automatic Builder', 'Manual Builder'],
            selectedBuilder: 'Automatic Builder',
            settingsTabs: ['Filters', 'Enhancements', 'Sets Levels', 'Sorting'],
            selectedSetting: 'Filters',
        }
    }

    render() {
        const infoTabsLength = this.state.infoTabs.length;
        const buildersTabsLength = this.state.buildersTabs.length;
        const settingsTabsLength = this.state.settingsTabs.length;

        return (
            <div>
                <Modal
                    isOpen={true}
                    onRequestClose={this.props.handler}
                    style={baseStyle}
                >
                    <div className="row mb-1 version-underline pb-2">
                        <h2 className="col-12 version-underline pb-2 text-center">How to use EFAB?</h2>
                        {this.state.infoTabs.map(tab => setButtons(
                            tab,
                            infoTabsLength,
                            this.state.selectedInfo,
                            () => this.setState({ selectedInfo: tab })
                        ))}
                        {this.state.selectedInfo === 'Builders' ?
                            this.state.buildersTabs.map((tab) => setButtons(
                                tab,
                                buildersTabsLength,
                                this.state.selectedBuilder,
                                () => this.setState({ selectedBuilder: tab })
                            ))
                            : null}
                        {this.state.selectedInfo === 'Settings' ?
                            this.state.settingsTabs.map((tab) => setButtons(
                                tab,
                                settingsTabsLength,
                                this.state.selectedSetting,
                                () => this.setState({ selectedSetting: tab })
                            ))
                            : null}
                    </div>
                    {this.state.selectedInfo === 'Builders' ?
                        this.state.selectedBuilder === 'Automatic Builder' ?
                            AutomaticBuilderInfo : ManualBuilderInfo :
                        this.state.selectedInfo === 'Share List' ?
                            ShareInfo : this.state.selectedInfo === 'Settings' ?
                                this.state.selectedSetting === 'Filters' ?
                                    FiltersInfo : this.state.selectedSetting === 'Enhancements' ?
                                        EnhancementsInfo : this.state.selectedSetting === 'Sets Levels' ?
                                            SetsLevelsInfo : SortingInfo : MiscInfo}
                </Modal>
            </div>
        )
    }
}