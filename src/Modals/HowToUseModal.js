import React, { Component } from 'react';
import { baseStyle } from "../styles/ModalStyle";
import PropTypes from 'prop-types';
import Modal from "react-modal";
import { AutomaticBuilderInfo } from './HowToUseContent/AutomaticBuilderInfo';
import { ManualBuilderInfo } from './HowToUseContent/ManualBuilderInfo';
import { MiscInfo } from './HowToUseContent/MiscInfo';
import { SettingsInfo } from './HowToUseContent/SettingsInfo';
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

        }
    }

    render() {
        const infoTabsLength = this.state.infoTabs.length;
        const buildersTabsLenth = this.state.buildersTabs.length;

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
                                buildersTabsLenth,
                                this.state.selectedBuilder,
                                () => this.setState({ selectedBuilder: tab })
                            ))
                            : null}
                    </div>
                    {this.state.selectedInfo === 'Builders' ?
                        this.state.selectedBuilder === 'Automatic Builder' ?
                            AutomaticBuilderInfo : ManualBuilderInfo :
                        this.state.selectedInfo === 'Share List' ?
                            ShareInfo : this.state.selectedInfo === 'Settings' ?
                                SettingsInfo : MiscInfo}
                </Modal>
            </div>
        )
    }
}