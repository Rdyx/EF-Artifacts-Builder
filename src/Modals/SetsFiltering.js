import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import Modal from "react-modal";
import {setsFilterModalStyle} from "../styles/ModalStyle";

export class SetsFiltering extends Component {
    static propTypes = {
        handler: PropTypes.func.isRequired,
        setsTypes: PropTypes.array.isRequired,
        bonusTypes: PropTypes.array.isRequired,
        setsLevels: PropTypes.array.isRequired,
        optimiser: PropTypes.bool.isRequired,
        enhancementMode: PropTypes.array.isRequired,
        enhancementLevels: PropTypes.array.isRequired,

    };

    render() {
        return (
            <div>
                <Modal
                    isOpen={true}
                    onRequestClose={this.props.handler}
                    style={setsFilterModalStyle}
                >
                    <div className="row text-center">
                        <div className="col-6">
                            <h3>Category</h3>
                            {this.props.setsTypes}
                        </div>
                        <div className="col-6 justify-content-around">
                            <h3>Bonus Type</h3>
                            {this.props.bonusTypes}
                            {this.props.optimiser ? (
                                <Fragment>
                                    <h3 className="mt-3">Sets Levels</h3>
                                    {this.props.setsLevels}
                                </Fragment>
                            ) : null}
                            <h3 className="mt-3">Sets Enhancement</h3>
                            <div className="row justify-content-center">
                                {this.props.enhancementMode}
                            </div>
                            <div className="row justify-content-center">
                                {this.props.enhancementLevels}
                            </div>
                        </div>
                    </div>
                </Modal>
            </div>
        )
    }
}