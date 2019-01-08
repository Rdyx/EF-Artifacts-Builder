import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import {ArtsBox} from "./ArtsBox";
import arrow from "../img/arrow.svg";

export class StatsSummaryAndArtsBox extends Component {
    static propTypes = {
        totalNumberOfArts: PropTypes.number.isRequired,
        gameSpeedBonuses: PropTypes.number.isRequired,
        bonusMedals: PropTypes.number.isRequired,
        selectedList: PropTypes.array.isRequired,
        setsData: PropTypes.array.isRequired,
        offline: PropTypes.string.isRequired,
    };

    constructor(props) {
        super(props);
        this.state = {
            fullStatsMobile: false,
        }
    }

    render() {
        const offline = this.props.offline !== '' ? (
            <div className="p-1 small alert-danger">
                <span className="text-center">
                    {this.props.offline}
                </span>
            </div>
        ) : null;

        const listContent = (
            <div className="pl-1 pr-1">
                <table className="table table-bordered table-striped">
                    <tbody>
                        <tr>
                            <th>Number of arts</th>
                            <th>Total game speed bonus</th>
                            <th>Total bonus medals</th>
                        </tr>
                        <tr className="bolded">
                            <td>{this.props.totalNumberOfArts}</td>
                            <td>{this.props.gameSpeedBonuses}</td>
                            <td>{this.props.bonusMedals}</td>
                        </tr>
                    </tbody>
                </table>
                <h3 className="col-12 mt-3">List of selected sets</h3>
                <table className="table table-bordered table-striped">
                    <tbody>
                    {this.props.selectedList.length > 0 ? this.props.selectedList : (<tr><th>None</th></tr>)}
                    </tbody>
                </table>
            </div>
        );

        return (
            <Fragment>
                <div className="sticky-top">
                    <div className={`screenstats bordered row text-center d-block d-sm-none pt-3
                        ${this.state.fullStatsMobile ? 'full-height' : null}`}>
                        {offline}
                        <h1 className="col-12">Stats Summary</h1>
                        {listContent}
                    </div>
                    <div
                        className={`screenstats col-4 d-block d-sm-none arrow
                            ${this.state.fullStatsMobile ? 'rotate-180' : ''}`}
                        onClick={() => this.setState({fullStatsMobile: !this.state.fullStatsMobile})}>
                        <img src={arrow} alt={this.state.fullStatsMobile ? 'See Less' : 'See More'}/>
                    </div>
                </div>

                <div className="row">
                    <ArtsBox setsData={this.props.setsData}/>
                    <div className="not-connected d-none d-sm-block">
                        {offline}
                    </div>
                    <div id="capture" className="right-box d-none d-sm-block pt-1">
                        <h1 className="bolded pr-2 pl-2">Stats Summary</h1>
                        {listContent}
                    </div>
                </div>
            </Fragment>
        )
    }
}