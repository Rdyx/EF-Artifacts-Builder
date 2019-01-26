import React, {Component} from 'react';
import PropTypes from "prop-types";
import {ArtifactModal} from "../Modals/ArtifactModal";


export default class Artifact extends Component {
    static propTypes = {
        artifact: PropTypes.object.isRequired,
    };

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

    render() {
        return (
            <div>
                {this.state.showArtStats ? (
                    <ArtifactModal
                        handler={this.closeArtStats}
                        artifact={this.props.artifact}
                    />
                ) : null}
                <img
                    onClick={() => this.setState({showArtStats: true})}
                    className="art-image"
                    src={this.props.artifact.artifact_img}
                    alt={this.props.artifact.artifact_name}
                />
            </div>
        )
    }
}