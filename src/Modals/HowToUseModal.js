import React, { Component, Fragment } from 'react';
import { howToUseModalStyle } from "../styles/ModalStyle";
import PropTypes from 'prop-types';
import Modal from "react-modal";
import { AutomaticBuilderInfo } from './HowToUseContent/AutomaticBuilderInfo';
import { ManualBuilderInfo } from './HowToUseContent/ManualBuilderInfo';
import { MiscInfo } from './HowToUseContent/MiscInfo';
import { OptionsInfo } from './HowToUseContent/OptionsInfo';
import { ShareInfo } from './HowToUseContent/ShareInfo';

export class HowToUseModal extends Component {
    static propTypes = {
        handler: PropTypes.func.isRequired,
    };

    constructor(props) {
        super(props);
        this.state = {
            infoTabs: ['Builders', 'Share', 'Options', 'Misc'],
            selectedInfo: 'Builders',
            buildersTabs: ['Automatic Builder', 'Manual Builder'],
            selectedBuilder: 'Automatic Builder',

        }
    }

    // Depth is used to know if there are sub-buttons
    setButtons = (title, arrayLength, depth = 0) => {
        return (
            <button
                key={title + 'HowToUse' + depth}
                className={`col-${Math.round(12 / arrayLength)} btn btn-outline-warning mb-2 ${this.state.selectedInfo === title || this.state.selectedBuilder === title ? 'btn-success' : ''}`}
                onClick={depth === 0 ? () => this.setState({ selectedInfo: title }) : () => this.setState({ selectedBuilder: title })}>
                {title}
            </button>

        )
    }

    render() {
        const infoTabsLength = this.state.infoTabs.length;
        const buildersTabsLenth = this.state.buildersTabs.length;

        return (
            <div>
                <Modal
                    isOpen={true}
                    onRequestClose={this.props.handler}
                    style={howToUseModalStyle}
                >
                    <div className="row">
                        {this.state.infoTabs.map(tab => this.setButtons(tab, infoTabsLength))}
                        {this.state.selectedInfo === 'Builders' ?
                            (<Fragment>
                                <br />
                                {this.state.buildersTabs.map((tab) => this.setButtons(tab, buildersTabsLenth, 1))}
                            </Fragment>)
                            : null}
                    </div>
                </Modal>
            </div>
        )
    }
}