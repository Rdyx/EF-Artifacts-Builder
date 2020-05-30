import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

export class ArtsBox extends Component {
    static propTypes = {
        setsData: PropTypes.array.isRequired,
        optimiser: PropTypes.bool.isRequired,
        optimiserNbArts: PropTypes.func.isRequired,
        optimiserMaxGS: PropTypes.func.isRequired,
        startBuild: PropTypes.func.isRequired,
        wantedArts: PropTypes.number.isRequired,
        maxGS: PropTypes.number.isRequired,
        getOptimisedResults: PropTypes.array.isRequired,
        getArrayResult: PropTypes.func.isRequired,
        optimisedResultSelectedIndex: PropTypes.number.isRequired,
    };

    triggerBuild = (e) => {
        return (e.keyCode || e.which) === 13 ? document.getElementById('submitBuild').click() : null;
    };

    getOptimisedResults = () => {
        const resultLength = this.props.getOptimisedResults.length;

        const solutions = [];
        if (resultLength > 1 && this.props.getOptimisedResults[1].sets.length > 0) {
            this.props.getOptimisedResults.map((set, index) => {
                // Index will start above 0 since index 0 is the solutionMessage
                return index > 0 ?
                    solutions.push(
                        <div
                            key={index}
                            className={`col-12 col-sm-3 text-center p-0 ml-1 mr-1`}>
                            <input
                                id={'solution' + index}
                                onChange={this.props.getArrayResult}
                                type="radio"
                                name="autoBuilderResult"
                                value={index}
                                checked={index === this.props.optimisedResultSelectedIndex}
                            >
                            </input>
                            <label htmlFor={'solution' + index}
                                className="col text-color personnal-checkbox mb-2 green-check solution">
                                Solution {index}
                            </label>
                            <table
                                className={`col table table-bordered table-striped personnal-table`}>
                                <tbody>
                                    <tr className="result-background">
                                        <th>Artifacts</th>
                                        <th>Game speed</th>
                                        <th>Medals</th>
                                    </tr>
                                    <tr className="text-center result-background">
                                        <th>{set.totalArts}</th>
                                        <td>{set.gameSpeed ? set.gameSpeed : 0}</td>
                                        <td>{set.medalsBonus ? set.medalsBonus : 0}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    ) : null;
            })
        }

        return solutions;
    };

    render() {
        return (
            <div className="col-12 col-md-9 left-box mt-2 mb-3">
                {this.props.optimiser ? (
                    <Fragment>
                        <div className="row mt-1 mb-2 text-white justify-content-around">
                            <label className="col-3 col-sm-2 p-0" htmlFor="nbArts">
                                <span>Artifact Slots</span>
                                <input
                                    className="form-control text-center"
                                    aria-label="Maximum number of arts"
                                    id="nbArts"
                                    name="nbArts"
                                    type="number"
                                    onChange={this.props.optimiserNbArts}
                                    defaultValue={this.props.wantedArts === 0 ? '' : this.props.wantedArts}
                                    max={100}
                                    min={0}
                                    placeholder={0}
                                    onKeyUp={(e) => this.triggerBuild(e)}
                                />
                            </label>
                            <label className="col-5 col-sm-3 p-0" htmlFor="maxGS">
                                <span>Max Game Speed Wanted</span>
                                <input
                                    className="form-control text-center"
                                    aria-label="Maximum game speed"
                                    id="maxGS"
                                    name="maxGS"
                                    type="number"
                                    onChange={this.props.optimiserMaxGS}
                                    defaultValue={this.props.maxGS === 0 ? '' : this.props.maxGS}
                                    min={0}
                                    placeholder={0}
                                    step={25}
                                    onKeyUp={(e) => this.triggerBuild(e)}
                                />
                            </label>
                            <button
                                id="submitBuild"
                                className="col-2 col-sm-3 btn btn-outline-warning"
                                onClick={this.props.startBuild}>
                                Build !
                            </button>
                        </div>
                        {this.props.getOptimisedResults.length > 0 ? (
                            <div className="row justify-content-center set-border px-3">
                                {this.props.getOptimisedResults[0]}
                                {this.getOptimisedResults()}
                            </div>
                        ) : null}
                    </Fragment>
                ) : null}
                <div className="row mt-1">
                    {this.props.setsData}
                </div>
            </div>
        )
    }
}