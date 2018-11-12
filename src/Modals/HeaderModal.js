import React, {Component} from 'react';
import Modal from "react-modal";
import PropTypes from 'prop-types';
import {headerModalStyle} from "../styles/ModalStyle";

Modal.setAppElement('#root');


export class HeaderModal extends Component {
    static propTypes = {
        handler: PropTypes.func.isRequired,
    };

    constructor() {
        super();
        this.state = {
            isOpen: true,
        };
    }

    render() {
        return (
            <div onClick={this.props.handler}>
                <Modal
                    isOpen={this.state.isOpen}
                    onRequestClose={this.props.handler}
                    style={headerModalStyle}
                >
                    <div className="text-center">
                        <h1 className="col-12">Endless Frontier Artifacts Builder</h1>
                        <p className="col-12">This builder has been made by Rdyx (S2) from Limitless.</p>
                        <p className="col-12">
                            I simply wanted to discover some frameworks and have a user-friendly interface
                            to build sets setups.
                        </p>
                        <p className="col-12">
                            A special thank to <a className="efd external"
                                                  href="https://www.endlessfrontierdata.com/" target="_blank"
                                                  rel="noopener noreferrer">Endless Frontier Data</a>
                            for their data about arts and their artifacts images.
                        </p>
                        <p className="col-12">
                            Feel free to give feedback on <a className="efd external"
                                                             href="https://www.reddit.com/r/EndlessFrontier/comments/97rass/endless_frontier_artifacts_builder/"
                                                             target="_blank"
                                                             rel="noopener noreferrer">Reddit</a>
                            or directly by mail @ winmac666@gmail.com (Watch out ! Badass Mail over here ! :D)
                        </p>
                        <p className="col-12">
                            Source code is free to read at <a className="efd external"
                                                              href="https://github.com/Rdyx/EF-Artifacts-Builder"
                                                              target={"_blank"} rel="noopener noreferrer">GitHub</a>
                        </p>
                        <h3 className="col-12">Thanks for reading, happy building !</h3>
                    </div>
                </Modal>
            </div>
        )
    }
}