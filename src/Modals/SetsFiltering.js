import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Modal from "react-modal";
import {setsFilterModalStyle} from "../styles/ModalStyle";

export class SetsFiltering extends Component {
    static propTypes = {
        handler: PropTypes.func.isRequired,
        setsTypes: PropTypes.array.isRequired,
        bonusTypes: PropTypes.array.isRequired,
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
                        <div className="col-6">
                            <h3>Bonus Type</h3>
                            {this.props.bonusTypes}
                        </div>
                    </div>
                </Modal>
            </div>
        )
    }
}