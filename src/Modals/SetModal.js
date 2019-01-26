import React, {Component, Fragment} from 'react';
import {customStyles} from "../styles/ModalStyle";
import PropTypes from 'prop-types';
import Modal from "react-modal";
import {ArtifactModal} from "./ArtifactModal";

export class SetModal extends Component {
    static propTypes = {
        handler: PropTypes.func.isRequired,
        sets: PropTypes.array.isRequired,
    };

    constructor(props) {
        super(props);
        this.state = {
            artifacts: [],
            showArtStats: false,
        }
    }

    componentWillMount() {
        this.setState({
            artifacts: [
                this.props.sets[0].artifact1,
                this.props.sets[0].artifact2,
                this.props.sets[0].artifact3,
                this.props.sets[0].artifact4,
                this.props.sets[0].artifact5,
                this.props.sets[0].artifact6
            ],
        });
    }

    closeArtStats = () => {
        this.setState({showArtStats: false})
    };

    showArts = (art) => {
        if (art) {
            return (
                <div key={art.artifact_number}>
                    {this.state.showArtStats ? (
                        <ArtifactModal
                            handler={this.closeArtStats}
                            artifact={art}
                        />
                    ) : null}
                    <img
                        onClick={() => this.setState({showArtStats: true})}
                        className="art-image mt-2"
                        src={art.artifact_img}
                        alt={art.artifact_name}
                    />
                </div>
            );
        }
    };

    setDefaultValue = (value) => {
        return value ? value : 'X';
    };

    filterBonuses = (set, index) => {
        return Object.keys(set).map(key => {
            if (key.match(/^bonus/)) {
                const getRace = set[key.replace('bonus', 'race')] ? ' ' + set[key.replace('bonus', 'race')] : '';
                const bonusValue = set[key.replace('bonus', 'value')];
                return index === 0 ? [set[key] + getRace, bonusValue] : [bonusValue];
            } else {
                return null;
            }
        }).filter(bonus => bonus);
    };

    setRows = (setArtsNumber, bonuses) => {
        function fillArray(color, cap = 4, length = bonuses.length) {
            const fillMissingData = [];

            if (length < cap) {
                for (let i = length; i < cap; i++) {
                    fillMissingData.push(
                        <td key={i} className={`${color} align-middle`}>X</td>
                    )
                }
            }

            return fillMissingData;
        }

        return bonuses[0].map((bonusName, index) => {
            const bonus = bonusName[0];

            // Using regex to set rows colors
            const mustHaveStats = /Game Speed|Medals Obtained/;
            const attackStats = /Attack Power|Attack Speed|Critical Damage|Critical Strike Rate|Movement Speed/;
            const ecoStats = /Open Gold|Quest Upgrade|Unit Upgrade|Gold Acquisition|Quest Time/;
            const defStats = /HP Of|Defense Power|Revival Time/;
            const otherStats = /Dungeon Material|Battle Engaging/;

            const rowColor = bonus.match(mustHaveStats) ? 'table-success' :
                bonus.match(attackStats) ? 'table-danger' :
                    bonus.match(ecoStats) ? 'table-warning' :
                        bonus.match(defStats) ? 'table-secondary' :
                            bonus.match(otherStats) ? 'table-info' : '';

            // Have to set multiple conditions since sets can be only 3 parts and 3 bonus actived from it
            const bonusStep =
                // Create <th> only if index is 0 or ('even' and setArtsNumber is 3)
                index === 0 || (index % 2 === 0 && setArtsNumber !== 3) ? (
                        // Defining rowSpan size depending on setArtsNumber and its content
                        // If set is 3 parts set, 3/3 is shown
                        // If set has more than 3 parts, it means it got bonus every 2 arts steps
                        // So we create a <th> every 2 lines to show which step is required for the bonus (i.e 2/4)
                        // For 'odd' sets (5 parts) we check the index+2 value to fix the case where we got 6/5 (last bonus step)
                        <th
                            rowSpan={setArtsNumber === 3 && index === 0 ? 3 : 2}
                            className="align-middle table-light"
                        >
                            {
                                setArtsNumber === 3 && index === 0 ? setArtsNumber + '/' + setArtsNumber :
                                    index % 2 === 0 ?
                                        index + 2 > setArtsNumber ?
                                            setArtsNumber + '/' + setArtsNumber : index + 2 + '/' + setArtsNumber : null
                            }
                        </th>
                    )
                    : null;

            return (
                <tr key={index}>
                    {bonusStep}
                    <td className={rowColor}>
                        {this.setDefaultValue(bonus)}
                    </td>
                    {bonuses.map((bonusArray, indexArray) => {
                            return (
                                <td key={bonusArray}
                                    className={`${rowColor} align-middle bolded`}>
                                    {indexArray !== 0 ?
                                        this.setDefaultValue(bonusArray[index][0]) : this.setDefaultValue(bonusArray[index][1])}
                                </td>
                            )
                        }
                    )}
                    {fillArray(rowColor)}
                </tr>
            )
        })
    };

    createTable = (setArtsNumber, bonusValues) => {
        return (
            <Fragment>

            <table className="table table-striped table-bordered table-dark black-text mt-2">
                <tbody>
                <tr className="table-light align-middle">
                    <th style={{width: '10%'}}/>
                    <th style={{width: '50%'}}>Bonus</th>
                    <th style={{width: '10%'}}>T0</th>
                    <th style={{width: '10%'}}>T1</th>
                    <th style={{width: '10%'}}>T2</th>
                    <th style={{width: '10%'}}>T3</th>
                </tr>
                {this.setRows(setArtsNumber, bonusValues)}
                </tbody>
            </table>
                <table className="table table-bordered table-dark black-text">
                    <tbody>
                    <tr>
                        <th className="table-success">GS/Medals</th>
                        <th className="table-danger">Attack</th>
                        <th className="table-warning">Economy</th>
                        <th className="table-secondary">Defense</th>
                        <th className="table-info">Others</th>
                    </tr>
                    </tbody>
                </table>
            </Fragment>
        )
    };

    render() {
        const defaultSet = this.props.sets[0];
        const bonusValues = this.props.sets.map((set, index) => this.filterBonuses(set, index));

        return (
            <div>
                <Modal
                    isOpen={true}
                    onRequestClose={this.props.handler}
                    style={customStyles}
                >
                    <div className="text-center">
                        <h1>{defaultSet.set_name.replace(/ \(\dp\)/g, '')}</h1>
                        {defaultSet ? (
                            <div className="row justify-content-around">
                                {this.state.artifacts.map(this.showArts)}
                            </div>
                        ) : null}
                        {this.createTable(defaultSet.set_arts_number, bonusValues)}
                    </div>
                </Modal>
            </div>
        )
    }
}