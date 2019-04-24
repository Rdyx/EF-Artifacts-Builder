import React, { Component } from 'react';
import Modal from "react-modal";
import PropTypes from 'prop-types';
import { baseStyle } from "../styles/ModalStyle";
import reddit from '../img/reddit.svg';
import paypal from '../img/paypal.svg';
import github from '../img/github-icon.svg';
import facebook from '../img/facebook.svg';

Modal.setAppElement('#root');


export class HeaderModal extends Component {
    static propTypes = {
        handler: PropTypes.func.isRequired,
    };

    logoUrl = (url, logo, alt) => {
        return (
            <li className={`list-inline-item ${alt !== 'Paypal' ? 'mr-2' : ''}`}>
                <a className="efd"
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer">
                    <img className="logo align-bottom" src={logo} alt={alt} />
                </a>
            </li>
        );
    };

    render() {
        const redditLink = 'https://www.reddit.com/r/EndlessFrontier/comments/bfj756/efab_endless_frontier_artifacts_builder/'
        return (
            <div>
                <Modal
                    isOpen={true}
                    onRequestClose={this.props.handler}
                    style={baseStyle}
                >
                    <div className="text-center">
                        <ul className="list-inline mb-1 col px-0">
                            <li className="list-inline-item mr-2">
                                <a className="efd"
                                    href="https://www.endlessfrontierdata.com/" target="_blank"
                                    rel="noopener noreferrer">EFD</a>
                            </li>
                            {this.logoUrl(redditLink, reddit, 'Reddit')}
                            {this.logoUrl('https://www.facebook.com/EFABuilder/', facebook, 'Facebook')}
                            {this.logoUrl('https://github.com/Rdyx/EF-Artifacts-Builder', github, 'Github')}
                            {this.logoUrl('https://www.paypal.me/rdyx', paypal, 'Paypal')}
                        </ul>
                        <h2 className="col-12 version-underline pb-2">Endless Frontier Artifacts Builder</h2>
                        <p className="col-12">This builder has been made by Rdyx (S2) from Limitless.</p>
                        <p className="col-12">
                            I simply wanted to discover some frameworks and have a user-friendly interface
                            to build sets setups.
                        </p>
                        <p className="col-12">
                            A special thank
                            to <a className="efd"
                                href="https://www.endlessfrontierdata.com/" target="_blank"
                                rel="noopener noreferrer">Endless Frontier Data</a> for
                        their data about arts and their artifacts images.
                        </p>
                        <p className="col-12">
                            Feel free to like EFAB
                            on <a className="efd"
                                href="https://www.facebook.com/EFABuilder/"
                                target="_blank"
                                rel="noopener noreferrer">Facebook</a> to
                                stay updated about last releases and to contact me.</p>
                        <p className="col-12">
                            You can also give feedback on <a className="efd"
                                href={redditLink}
                                target="_blank"
                                rel="noopener noreferrer">Reddit</a>
                            , Discord @ <b className="limegreen-text">Rdyx#7572</b> or directly by mail @ <b className="limegreen-text">admin@efab.ovh</b>
                        </p>
                        <p className="col-12">
                            Source code is free to read at <a className="efd"
                                href="https://github.com/Rdyx/EF-Artifacts-Builder"
                                target={"_blank"} rel="noopener noreferrer">GitHub</a>
                        </p>
                        <h4 className="col-12">Thanks for reading, happy building !</h4>
                        <p className="col-12 small mb-0">
                            If you like this tool and want to support/reward me, feel free to use
                            the <b>Donate</b> button ! It will help me for sever costs ! Thanks ! :)
                        </p>
                    </div>
                </Modal>
            </div>
        )
    }
}