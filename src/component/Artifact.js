import React, {Component} from 'react';
import Modal from 'react-modal';

const customStyles = {
    overlay: {
        zIndex: 1045
    },
    content: {
        position: 'absolute',
        zIndex: 1050,
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    }
};

export default class Artifact extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showArtStats: false
        };
        this.closeArtStats = this.closeArtStats.bind(this)
    }

    closeArtStats = () => {
        this.setState({showArtStats: false})
    };

    showOneArt = (art) => {
        this.setState({showArtStats: true, artifact: art})
    };

    render() {
        return (
            <div>
                <div className="over-the-top" onClick={() => this.closeArtStats}>
                    <Modal
                        isOpen={this.state.showArtStats}
                        onRequestClose={this.closeArtStats}
                        style={customStyles}
                    >
                        <div>
                            {this.props.artifact ? (
                                <div onClick={() => this.closeArtStats}>
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
                <img
                    onClick={() => this.showOneArt(this.props.artifact)}
                    className="art-image"
                    src={this.props.artifact.artifact_img} alt={this.props.artifact.artifact_name}
                />
            </div>
        )
    }
}