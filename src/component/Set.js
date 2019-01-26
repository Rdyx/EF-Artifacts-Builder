import React, {Component} from 'react';
import Artifact from './Artifact';
import PropTypes from 'prop-types';
import {SetModal} from "../Modals/SetModal";

export default class Set extends Component {
    static propTypes = {
        set: PropTypes.object.isRequired,
        wholeSetForModalStats: PropTypes.array.isRequired,
    };

    constructor(props) {
        super(props);
        this.state = {
            artifacts: [],
            selectedSet: null,
            showSetStats: false,
        };
    }

    componentWillMount() {
        this.setState({
            artifacts: [
                this.props.set.artifact1,
                this.props.set.artifact2,
                this.props.set.artifact3,
                this.props.set.artifact4,
                this.props.set.artifact5,
                this.props.set.artifact6
            ],
        });
    }

    showArts = (art) => {
        if (art) {
            return (
                <div key={art.artifact_number} className="container col-6 col-md-4">
                    <Artifact artifact={art}/>
                </div>
            );
        }
    };

    closeSetStats = () => {
        this.setState({showSetStats: false})
    };

    render() {
        const regex = / \(\dp\)/;
        return (
            <div>
                {this.state.showSetStats ? (
                    <SetModal
                        handler={this.closeSetStats}
                        sets={this.props.wholeSetForModalStats}
                    />
                ) : null}
                <div
                    onClick={() => this.setState({showSetStats: true})}
                    className={`text-center bolded bordered white-text mt-2 set-title`}>
                    {this.props.set.set_tech_name.replace(regex, '')}
                </div>
                <div
                    className={`text-center white-text mb-3`}>
                    {this.props.set.set_name.replace(regex, '')}
                </div>
                <div className="row">{this.state.artifacts.map(this.showArts)}</div>
            </div>
        )
    }
}