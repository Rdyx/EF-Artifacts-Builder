import React, {Component} from 'react';
import {customStyles} from "../styles/ModalStyle";
import PropTypes from 'prop-types';
import Modal from "react-modal";

export class ArtifactModal extends Component {
    static propTypes = {
        handler: PropTypes.func.isRequired,
        artifact: PropTypes.object.isRequired,
    };

    render() {
        return (
            <div>
                <Modal
                    isOpen={true}
                    onRequestClose={this.props.handler}
                    style={customStyles}
                >
                    <div>
                        {this.props.artifact ? (
                            <div>
                                <div className="text-center">
                                    <h1 className="text-center">{this.props.artifact.artifact_name}</h1>
                                    <img className="text-center"
                                         src={this.props.artifact.artifact_img}
                                         alt={this.props.artifact.artifact_name}/>
                                </div>
                                <p className="col-12">Artifact n° : {this.props.artifact.artifact_number}</p>
                                <p className="col-12">Bonus 1
                                    : {this.props.artifact.bonus1} {this.props.artifact.race1 ? this.props.artifact.race1 : null}</p>
                                <p className="col-12">Bonus 2
                                    : {this.props.artifact.bonus2} {this.props.artifact.race2 ? this.props.artifact.race2 : null}</p>
                            </div>
                        ) : null}
                    </div>
                </Modal>
            </div>
        )
    }
}