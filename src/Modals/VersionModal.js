import React, {Component} from 'react';
import {versionModalStyle} from "../styles/ModalStyle";
import PropTypes from 'prop-types';
import Modal from "react-modal";
import {versions} from "../Versions/Versions";

export class VersionModal extends Component {
    static propTypes = {
        handler: PropTypes.func.isRequired,
        versions: PropTypes.array.isRequired,
    };

    constructor(props) {
        super(props);
        this.state = {
            isOpen: true,
        }
    }

    versionMapping = (v, length, index) => {
        const lastIndex = length - 1 === index;
        return (
            <div key={v.number}>
                <div className="row version-underline pb-0">
                    <div className="col-1"><b><i>{v.number}</i></b></div>
                    <div className="col-7 col-sm-9"><b>{v.title}</b></div>
                    <div className="col-3 col-sm-2 pr-0"><b><i>{v.date}</i></b></div>
                </div>
                <div className={`row pt-1 ${lastIndex ? '' : 'mb-4'}`}>
                    <div className="col-1"/>
                    <div className="col-11">
                        <ul className={`pl-3 ${lastIndex ? 'mb-0' : ''}`}>
                            {
                                Object.keys(v.content).map(function (key, index) {
                                    return (<li key={v.number + '' + index}>{v.content[key]}</li>);
                                })
                            }
                        </ul>
                    </div>
                </div>
            </div>
        )
    };

    render() {
        return (
            <div className="over-the-top" onClick={this.props.handler}>
                <Modal
                    isOpen={this.state.isOpen}
                    onRequestClose={this.props.handler}
                    style={versionModalStyle}
                >
                    <div>
                        {versions.map((v, index) => {
                            return this.versionMapping(v, versions.length, index)
                        })}
                    </div>
                </Modal>
            </div>
        )
    }
}