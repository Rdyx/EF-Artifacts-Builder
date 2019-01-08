import React, {Component} from 'react';
import Modal from "react-modal";
import PropTypes from 'prop-types';
import {headerModalStyle} from "../styles/ModalStyle";
import reddit from '../img/reddit.svg';
import paypal from '../img/paypal.svg';
import github from '../img/github-icon.svg';

Modal.setAppElement('#root');


export class HeaderModal extends Component {
    static propTypes = {
        handler: PropTypes.func.isRequired,
    };

    logoUrl = (url, logo) => {
        return (
            <li className="list-inline-item mr-2">
                <a className="efd logo"
                   href={url}
                   target="_blank"
                   rel="noopener noreferrer">
                    <img className="logo" src={logo} alt="Reddit"/>
                </a>
            </li>
        );
    };

    render() {
        return (
            <div>
                <Modal
                    isOpen={true}
                    onRequestClose={this.props.handler}
                    style={headerModalStyle}
                >
                    <div className="text-center">
                        <ul className="list-inline mb-1 col">
                            <li className="list-inline-item mr-2">
                                <a className="efd"
                                   href="https://www.endlessfrontierdata.com/" target="_blank"
                                   rel="noopener noreferrer">EFD</a>
                            </li>
                            {this.logoUrl('https://www.reddit.com/r/EndlessFrontier/comments/97rass/endless_frontier_artifacts_builder/', reddit)}
                            {this.logoUrl('https://github.com/Rdyx/EF-Artifacts-Builder', github)}
                            {this.logoUrl('https://www.paypal.me/rdyx', paypal)}
                        </ul>
                        <h2 className="col-12 version-underline pb-2">Endless Frontier Artifacts Builder</h2>
                        <p className="col-12">This builder has been made by Rdyx (S2) from Limitless.</p>
                        <p className="col-12">
                            I simply wanted to discover some frameworks and have a user-friendly interface
                            to build sets setups.
                        </p>
                        <p className="col-12">
                            A special thank to <a className="efd"
                                                  href="https://www.endlessfrontierdata.com/" target="_blank"
                                                  rel="noopener noreferrer">Endless Frontier Data</a>
                            for their data about arts and their artifacts images.
                        </p>
                        <p className="col-12">
                            Feel free to give feedback on <a className="efd"
                                                             href="https://www.reddit.com/r/EndlessFrontier/comments/97rass/endless_frontier_artifacts_builder/"
                                                             target="_blank"
                                                             rel="noopener noreferrer">Reddit</a>
                            , Discord @ <b>Rdyx#7572</b> or directly by mail @ <b>winmac666@gmail.com</b> (Watch out !
                            Badass Mail over here ! :D)
                        </p>
                        <p className="col-12">
                            Source code is free to read at <a className="efd"
                                                              href="https://github.com/Rdyx/EF-Artifacts-Builder"
                                                              target={"_blank"} rel="noopener noreferrer">GitHub</a>
                        </p>
                        <h4 className="col-12">Thanks for reading, happy building !</h4>
                        <p className="col-12 small mb-0">
                            If you like this tool and want to support/reward me, feel free to use
                            the <b>Donate</b> button ! Thanks ! :)
                        </p>
                    </div>
                </Modal>
            </div>
        )
    }
}