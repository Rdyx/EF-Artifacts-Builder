import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import {ArtsBox} from "./ArtsBox";

export class StatsSummaryAndArtsBox extends Component {
    static propTypes = {
        totalNumberOfArts: PropTypes.number.isRequired,
        gameSpeedBonuses: PropTypes.number.isRequired,
        bonusMedals: PropTypes.number.isRequired,
        selectedList: PropTypes.array.isRequired,
        setsData: PropTypes.array.isRequired,
        setsTypes: PropTypes.array.isRequired,
    };

    constructor(props) {
        super(props);
        this.state = {
            fullStatsMobile: false,
        }
    }

    render() {
        const listContent = (
            <div>
                <p className="col-12">Number of arts : <span
                    className="bolded">{this.props.totalNumberOfArts}</span></p>
                <p className="col-12">Total game speed bonus : <span
                    className="bolded">{this.props.gameSpeedBonuses}</span></p>
                <p className="col-12">Total bonus medals : <span
                    className="bolded">{this.props.bonusMedals}</span></p>
                <p className="col-12">List of selected sets</p>
                <ul className="list-unstyled">
                    {this.props.selectedList}
                </ul>
            </div>
        );

        return (
            <Fragment>
                <div className="sticky-top">
                    <div className={`screenstats row text-center d-block d-sm-none pt-3
                        ${this.state.fullStatsMobile ? 'full-height' : null}`}>
                        <h2 className="col-12">Stats Summary</h2>
                        {listContent}
                    </div>
                    <div
                        className="screenstats row bordered d-block d-sm-none"
                        onClick={() => this.setState({fullStatsMobile: !this.state.fullStatsMobile})}>
                        {this.state.fullStatsMobile ? 'See less' : 'See more'}
                    </div>
                </div>

                <div className="row">
                    <ArtsBox setsData={this.props.setsData} setsTypes={this.props.setsTypes}/>
                    <div id="capture" className="right-box d-none d-sm-block">
                        <h1 className="bolded pr-2 pl-2">Stats Summary</h1>
                        {listContent}
                    </div>
                </div>
            </Fragment>
        )
    }
}