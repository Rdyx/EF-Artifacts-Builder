import React, {Component} from 'react';
import Artifact from './Artifact';


export default class Set extends Component {
    constructor(props) {
        super(props);
        this.state = {
            artifacts: [],
            selectedSet: null
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
            selectedSet: this.props.set
        });
    }

    showArts = (art) => {
        if (art) {
            return (
                <div className="container col-6 col-md-4">
                    <Artifact artifact={art}/>
                </div>
            );
        }
    };

    render() {
        return (
            <div>
                <div className={`text-center bolded bordered white-text mt-2`}>{this.state.selectedSet.set_tech_name}</div>
                <div className={`text-center white-text mb-3`}>{this.state.selectedSet.set_name}</div>
                <div className="row">{this.state.artifacts.map(this.showArts)}</div>
            </div>
        )
    }
}