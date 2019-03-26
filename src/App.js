import React, {Component, Fragment} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as html2canvas from 'html2canvas';
import Set from './component/Set';
import {ScreenshotModal} from "./Modals/ScreenshotModal";
import {NavBar} from "./component/NavBar";
import {StatsSummaryAndArtsBox} from "./component/StatsSummaryAndArtsBox";
import {LoadingScreen} from "./component/LoadingScreen";
import {knapsack} from "./optimiser/Optimiser";


export default class App extends Component {
    constructor() {
        super();
        this.state = {
            selectedList: [],
            data: [],
            excludedFromOptimiser: [],
            setTypes: [],
            totalNumberOfArts: [],
            gameSpeedBonuses: [],
            bonusMedals: [],
            bonusTypes: ['All', 'Game Speed', 'Increase Additional Medals Obtained'],
            artsLevels: [6, 7],
            setsLevels: ['T0', 'T1', 'T2', 'T3'],
            set: null,
            artifact: null,
            showScreenModal: false,
            canvas: null,
            canvasMobile: null,
            searchBySetName: '',
            searchBySetType: 'All',
            filterByBonusType: 'All',
            filterBySetLevel: 'All',
            loading: false,
            visitorCount: null,
            offline: '',
            optimiser: true,
            optimiserNbArts: 0,
            optimiserMaxGS: 0,
            optimiserSixStarsLevel: 'T3',
            optimiserSevenStarsLevel: 'T2',
            optimiserEightStarsLevel: 'T0',
            optimisedSets: [],
            optimisedResultSelectedIndex: 1,
        };
    }

    componentWillMount() {
        this.setState({loading: true});
        fetch('https://efab.ovh/index.html')
            .then(response => {
                // Used to catch if user isn't connected at all
                return response.status;
            })
            .then(() => {
                // Checking if user can fetch latest data
                fetch('https://efab.ovh/data.json')
                    .then(response => {
                        return response.json()
                    })
                    .then(data => {
                        // Sorting 2 dimensions array to sort arts by their names
                        localStorage.setItem('data', '');
                        localStorage.setItem('setTypes', '');
                        let sortedData = [];
                        let pushInArray = [];
                        let setTypesArray = ['All'];
                        let i = 0;
                        while (i < data.length) {
                            let setType = data[i].setType.replace(/\d+ /, '');
                            if (!setTypesArray.includes(setType)) {
                                setTypesArray.push(setType);
                            }
                            // If next index exists
                            if (data[i + 1]) {
                                // Push this index into array pushInArray
                                pushInArray.push(data[i]);
                                // If set name of the actual set is not the same than next set name, excluding (*p)
                                if (data[i].set_name.match(/(.*)[^ (\dp)]/g)[0] !== data[i + 1].set_name.match(/(.*)[^ (\dp)]/g)[0]) {
                                    // Pushing pushInArray into sortedData
                                    sortedData.push(pushInArray);
                                    // Reseting pushInArray
                                    pushInArray = [];
                                }
                            } else {
                                pushInArray.push(data[i]);
                                sortedData.push(pushInArray);
                            }
                            i++;
                        }
                        // Sorting every index (array of sets) by arts number
                        sortedData.map(x => {
                            return x.sort((a, b) => (a.set_arts_number > b.set_arts_number) ? 1 : ((b.set_arts_number > a.set_arts_number) ? -1 : 0))
                        });
                        localStorage.setItem('data', JSON.stringify(sortedData));
                        localStorage.setItem('setTypes', JSON.stringify(setTypesArray));
                        this.setState({
                            data: JSON.parse(localStorage.getItem('data')),
                            setTypes: JSON.parse(localStorage.getItem('setTypes')),
                            loading: false,
                        });
                    })
                    .catch(error => {
                        this.checkOfflineAndLocalStorage('There has been a problem while loading data. Please try again later.');
                    })
            })
            .catch(error => {
                this.checkOfflineAndLocalStorage('You need to connect at least once to run this app.');
            })
    };

    checkOfflineAndLocalStorage = (message) => {
        if (localStorage.getItem('data') && localStorage.getItem('setTypes')) {
            return this.setState({
                data: JSON.parse(localStorage.getItem('data')),
                setTypes: JSON.parse(localStorage.getItem('setTypes')),
                loading: false,
                offline: 'You are currently offline, data may be outdated.',
            });
        } else {
            return this.setState({
                offline: message,
            });
        }
    };

    resetSummaryState = () => {
        this.setState({
            selectedList: [],
            totalNumberOfArts: [],
            gameSpeedBonuses: [],
            bonusMedals: [],
        });
    };

    handleList = (event, status = null) => {
        const regex = / \(\dp\)/;
        const eventSetName = event.set_name.replace(regex, '');
        const isInList = this.state.selectedList.some(set => set.set_name.replace(regex, '') === eventSetName);

        if (isInList || (isInList && status === 'remove')) {
            let setNamesArray = []; // create an array that will contains cleaned set names for easier match
            this.state.selectedList.map(set => setNamesArray.push(set.set_name.replace(regex, '')));
            let index = setNamesArray.indexOf(eventSetName);

            // Use index got to clean arrays
            let array = this.state.selectedList;
            array.splice(index, 1);
            let array2 = this.state.totalNumberOfArts;
            array2.splice(index, 1);
            let array3 = this.state.gameSpeedBonuses;
            array3.splice(index, 1);
            let array4 = this.state.bonusMedals;
            array4.splice(index, 1);

            this.setState({
                selectedList: array,
                totalNumberOfArts: array2,
                gameSpeedBonuses: array3,
                bonusMedals: array4
            });
        }
        if (!status) {
            this.setState(prevState => ({
                selectedList: [...prevState.selectedList, event],
                totalNumberOfArts: [...prevState.totalNumberOfArts, event.set_arts_number],
                gameSpeedBonuses: [...prevState.gameSpeedBonuses, this.findBonus(event, /Game Speed/)],
                bonusMedals: [...prevState.bonusMedals, this.findBonus(event, /Increase Additional Medals Obtained/)]
            }));
        }
    };

    handleOptimisedList = (event, status = null) => {
        const regex = / \(\dp\)/;
        const eventSetName = event.set_name.replace(regex, '');
        const isInList = this.state.excludedFromOptimiser.some(setName => setName === eventSetName);

        if (isInList || (isInList && status === 'remove')) {
            let index = this.state.excludedFromOptimiser.indexOf(eventSetName);

            // Use index got to clean array
            let array = this.state.excludedFromOptimiser;
            array.splice(index, 1);

            this.setState({excludedFromOptimiser: array});
        }
        if (!status) {
            this.setState(prevState => ({excludedFromOptimiser: [...prevState.excludedFromOptimiser, eventSetName]}));
        }
    };

    sum = (input) => {
        if (toString.call(input) !== "[object Array]")
            return false;
        let total = 0;
        for (let i = 0; i < input.length; i++) {
            if (isNaN(input[i])) {
                continue;
            }
            total += Number(input[i]);
        }
        return total;
    };

    findBonus = (event, regex) => {
        for (let key in event) {
            if (/^bonus/.test(key)) {
                if (event[key].match(regex)) {
                    let valueKey = key.replace('bonus', 'value');
                    return parseInt(event[valueKey], 10);
                }
            }
        }
    };

    getSelection = (set) => {
        const findGsBonus = !isNaN(set.bonusGS) ? set.bonusGS : this.findBonus(set, /Game Speed/);
        const findMedalBonus = !isNaN(set.bonusMedals) ? set.bonusMedals : this.findBonus(set, /Increase Additional Medals Obtained/);
        const setTechName = set.set_tech_name.replace(/ \(\dp\)/g, '');

        return (
            <tr key={set.set_name + set.setLevel} className="text-center">
                <th style={{width: '60%'}}>{set.setLevel} {setTechName} - {set.set_arts_number}p</th>
                <td style={{width: '15%'}}>{findGsBonus ? findGsBonus : 0}</td>
                <td style={{width: '35%'}}>{findMedalBonus ? findMedalBonus : 0}</td>
            </tr>
        )
    };

    triggerScreenshot = () => {
        html2canvas(document.querySelector("#capture"))
            .then(canvas => {
                this.setState({showScreenModal: true, canvas: canvas.toDataURL()});
            })
    };

    showIfMatch = (set, optimised = true) => {
        // Match set tech name and set types, if All, every set is shown
        return optimised ? set.set_tech_name.toLowerCase().match(this.state.searchBySetName.toLowerCase()) &&
            (set.setType.toLowerCase().match(this.state.searchBySetType.toLowerCase()) ||
                this.state.searchBySetType === 'All') :
            set.set_tech_name.toLowerCase().match(this.state.searchBySetName.toLowerCase()) &&
            (set.setType.toLowerCase().match(this.state.searchBySetType.toLowerCase()) ||
                this.state.searchBySetType === 'All') &&
            (this.findBonus(set, this.state.filterByBonusType) ||
                this.state.filterByBonusType === 'All');
    };

    filterSetsForStatsModal = (set) => {
        return this.state.data.filter(setsArray => {
            return setsArray[0].set_name.replace(/ \(\dp\)/g, '') === set.set_name.replace(/ \(\dp\)/g, '')
        })[0].filter(set1 => {
            return set1.set_arts_number === set.set_arts_number;
        }).sort((set1, set2) => {
            return set1.setLevel >= set2.setLevel ? 1 : -1;
        });
    };

    getSets = (sets) => {
        let globalArray = [];
        let t0Array = [];
        let t1Array = [];
        let t2Array = [];
        let t3Array = [];
        sets.map(set => {
            switch (set.setLevel) {
                case 'T0':
                    return t0Array.push(set);
                case 'T1':
                    return t1Array.push(set);
                case 'T2':
                    return t2Array.push(set);
                case 'T3':
                    return t3Array.push(set);
                default:
                    return null
            }
        });
        if (t0Array.length > 0) {
            globalArray.push(t0Array);
        }
        if (t1Array.length > 0) {
            globalArray.push(t1Array);
        }
        if (t2Array.length > 0) {
            globalArray.push(t2Array);
        }
        if (t3Array.length > 0) {
            globalArray.push(t3Array);
        }

        // Last index is selected to be able to check if the set has any required bonus
        // to apply filter we need to get the set with maximum bonus
        let set = sets[sets.length - 1];
        let showIfMatch = this.showIfMatch(set, false);
        const filteredSets = this.filterSetsForStatsModal(set);

        return (
            <div
                key={set.set_name}
                className={`col-md-3 col-6 set-border text-center hovered ${showIfMatch ? '' : 'd-none'}`}>
                <div className="row justify-content-around">
                    <div className="col-2 white-text child"/>
                    <div className="col-9">
                        <div className="row justify-content-around">
                            <label className="col-6 text-center text-color personnal-checkbox">
                                X
                                <input
                                    onClick={() => this.handleList(set, 'remove')}
                                    type="radio"
                                    name={set.set_name.replace(/ \(\dp\)/, '')}
                                    value={set.set_name}
                                    defaultChecked={true}
                                >
                                </input>
                                <span className="checkmark"/>
                            </label>
                        </div>
                    </div>
                </div>
                {globalArray.map((sets, index) => {
                        // Seems on sets with 1 pair of bonus can't be fetched by sets[index] so
                        // Setting if/else to get sets[0] in this case
                        return (
                            <div
                                key={sets[index] ? sets[index].set_name : sets[0].set_name + index}
                                className="row justify-content-around">
                                <div className="col-2 white-text child">
                                    {sets[index] ? sets[index].setLevel : sets[0].setLevel}
                                </div>
                                <div className="col-9">
                                    <div className="row justify-content-around">
                                        {sets.map(this.artsNumber)}
                                    </div>
                                </div>
                            </div>
                        )
                    }
                )}
                <div>
                    <Set
                        set={set}
                        wholeSetForModalStats={filteredSets}
                    />
                </div>
            </div>
        )
    };

    getOptimizedSets = (sets) => {
        // This function is here to filter and fill ArtsBox only with sets that automatic builder will use
        const artLevels = /[6-8]/g;
        const sixStarsSets = /T[012]/g;
        const sevenStarsSets = /T[01]/g;

        sets = sets.filter(set => {
            const testGSValue = this.findBonus(set, /Game Speed/);
            const testMedalsValue = this.findBonus(set, /Increase Additional Medals Obtained/);
            const setLevel = set.setLevel;
            const artLevel = set.artifact1.art_level.replace('*', '');

            return !artLevel.match(artLevels) || !(testGSValue || testMedalsValue) ? false :
                !(setLevel.match(sixStarsSets) && artLevel === '6') ?
                    !(setLevel.match(sevenStarsSets) && artLevel === '7') : false;
        });

        if (sets.length > 0) {
            const regex = / \(\dp\)/;
            const set = sets[sets.length - 1];
            let showIfMatch = this.showIfMatch(set);
            const filteredSets = this.filterSetsForStatsModal(set);

            return (
                <div
                    key={set.set_name}
                    className={`col-md-3 col-6 set-border text-center hovered ${showIfMatch ? '' : 'd-none'}`}>
                    <div className="offset-1 col-10 white-text child">
                        <div className="row justify-content-around">
                            <label className="col text-center text-color personnal-checkbox">
                                X
                                <input
                                    onClick={() => this.handleOptimisedList(set)}
                                    type="radio"
                                    name={set.set_name.replace(regex, '')}
                                    value={set.set_name}
                                    defaultChecked={this.state.excludedFromOptimiser.indexOf(set.set_name) !== -1}
                                >
                                </input>
                                <span className="checkmark"/>
                            </label>
                            <label className="col ml-2 text-center text-color personnal-checkbox">
                                V
                                <input
                                    onClick={() => this.handleOptimisedList(set, 'remove')}
                                    type="radio"
                                    name={set.set_name.replace(regex, '')}
                                    value={set.set_name}
                                    defaultChecked={this.state.excludedFromOptimiser.indexOf(set.set_name) === -1}
                                >
                                </input>
                                <span className="checkmark"/>
                            </label>
                        </div>
                    </div>
                    <div>
                        <Set
                            set={set}
                            wholeSetForModalStats={filteredSets}
                        />
                    </div>
                </div>
            )
        }
    };

    getSetsTypes = (setType) => {
        return (
            <label
                key={setType}
                className="col-12 mb-1 set-filter-button radio-btn personnal-checkbox">
                <input
                    type="radio"
                    name="setType"
                    value={setType}
                    defaultChecked={setType === this.state.searchBySetType}
                    onClick={(e) => this.setState({searchBySetType: e.target.value})}
                />
                {setType}
                <span className="checkmark"/>
            </label>
        )
    };

    getBonusTypes = (bonusType) => {
        return (
            <label
                key={bonusType}
                className="col-12 mb-1 set-filter-button radio-btn personnal-checkbox">
                <input
                    type="radio"
                    name="bonusType"
                    value={bonusType}
                    defaultChecked={bonusType === this.state.filterByBonusType}
                    onClick={(e) => this.setState({filterByBonusType: e.target.value})}
                />
                {bonusType}
                <span className="checkmark"/>
            </label>
        )
    };

    optimiserSetSetsLevelsFilter = (e) => {
        const eValueSplited = e.target.value.split(',');
        const setLevel = eValueSplited[0];
        const setTier = eValueSplited[1];

        return setLevel === '6' ? this.setState({optimiserSixStarsLevel: setTier}) :
            setLevel === '7' ? this.setState({optimiserSevenStarsLevel: setTier}) :
                setLevel === '8' ? this.setState({optimiserSevenStarsLevel: setTier}) : null;
    };

    getSetLevels = (artLevel) => {
        let setLevelBoxes = [];
        // Lvl 8 is here to be available easier later
        const setSetsLevel = artLevel === 6 ? 3 : artLevel === 7 ? 2 : artLevel === 8 ? 0 : 0;
        const setTier = artLevel === 6 ? this.state.optimiserSixStarsLevel :
            artLevel === 7 ? this.state.optimiserSevenStarsLevel :
                artLevel === 8 ? this.state.optimiserEightStarsLevel : 0;

        for (let i = 0; i <= setSetsLevel; i++) {
            const setLevel = this.state.setsLevels[i];
            const newLine = i === setSetsLevel ? (<br/>) : null;

            setLevelBoxes.push(
                <Fragment key={artLevel + i}>
                    <label className="col-3 mb-1 set-filter-button radio-btn personnal-checkbox">
                        <input
                            type="radio"
                            name={artLevel}
                            value={[artLevel, setLevel]}
                            defaultChecked={setTier === setLevel}
                            onClick={(e) => this.optimiserSetSetsLevelsFilter(e)}
                        />
                        {setLevel} {artLevel}*
                        <span className="checkmark"/>
                    </label>
                    {newLine}
                </Fragment>
            );
        }

        return setLevelBoxes
    };


    artsNumber = (set) => {
        // let setName = set.set_name.replace(/ \(\dp\)/g, '');
        return (
            <div key={set.set_tech_name}>
                <label className="text-center text-color personnal-checkbox">
                    {set.set_arts_number}
                    <input
                        onClick={this.state.selectedList.includes(set) ? null : () => this.handleList(set)}
                        type="radio"
                        name={set.set_name.replace(/ \(\dp\)/, '')}
                        value={set.set_name}
                        defaultChecked={this.state.selectedList.some(setx => setx.set_name === set.set_name)}
                    >
                    </input>
                    <span className="checkmark"/>
                </label>
            </div>
        )
    };

    startBuild = () => {
        const nbArtsWanted = this.state.optimiserNbArts;

        let getResults = knapsack(
            this.state.data,
            nbArtsWanted,
            this.state.optimiserMaxGS,
            1250,
            this.findBonus,
            this.state.excludedFromOptimiser,
            this.state.optimiserSixStarsLevel,
            this.state.optimiserSevenStarsLevel,
            this.state.optimiserEightStarsLevel,
        );

        getResults = getResults.sort((r1, r2) => r1.totalArts >= r2.totalArts && r1.gameSpeed*1.1 >= r2.gameSpeed && r1.medalsBonus*1.05 >= r2.medalsBonus ? -1 : 1);

        let solutionMessage = (
            <div key="message" className="col-12 white-text mt-1 mb-2">
                {
                    nbArtsWanted > 1 && getResults[0].totalArts > 0 ?
                        (<Fragment>
                                <span>Solution(s) found</span>
                                <br/>
                                <span>Don't forget to adapt for race optimisation if needed</span>
                            </Fragment>
                        ) :
                        'No solution found'
                }
            </div>
        );

        this.setState({optimisedSets: [solutionMessage]});

        getResults.map(set => {
            return this.setState(prevState => ({optimisedSets: [...prevState.optimisedSets, set]}));
        });

        return getResults[0] && getResults[0].sets.length > 0 ? this.pushInStates(getResults[0]) : this.resetSummaryState();
    };

    pushInStates = (setsArray, index) => {
        this.resetSummaryState();

        return setsArray.sets.map(set => {
            return this.setState(prevState => ({
                    selectedList: [...prevState.selectedList, set],
                    totalNumberOfArts: [...prevState.totalNumberOfArts, set.set_arts_number],
                    gameSpeedBonuses: [...prevState.gameSpeedBonuses, set.bonusGS],
                    bonusMedals: [...prevState.bonusMedals, set.bonusMedals],
                    optimisedResultSelectedIndex: index ? parseInt(index, 10) : 1,
                })
            );
        });
    };

    getArrayResult = (e) => {
        const index = e.target.id;
        return this.pushInStates(this.state.optimisedSets[index], index)
    };

    closeScreenModal = () => {
        this.setState({showScreenModal: false, canvas: null})
    };

    render() {
        return (
            <div className="container-fluid text-center">
                {this.state.loading ? (
                    <LoadingScreen visitorCount={this.state.visitorCount} offline={this.state.offline}/>
                ) : null}
                {this.state.showScreenModal ? (
                    <ScreenshotModal
                        handler={this.closeScreenModal}
                        canvas={this.state.canvas}
                        canvasMobile={this.state.canvasMobile}
                    />
                ) : null}
                <NavBar
                    swapManualToAutomaticBuilder={() => this.setState({optimiser: !this.state.optimiser})}
                    triggerScreenshot={this.triggerScreenshot}
                    searchBySetName={(e) => this.setState({searchBySetName: e.target.value.replace(/[°"§%()[]{}=\\?´`'#<>|,;.:+_-]+/g, '')})}
                    setFiltering={this.state.searchBySetType !== 'All' || this.state.filterByBonusType !== 'All'}
                    setsTypes={this.state.setTypes.map(this.getSetsTypes)}
                    bonusTypes={this.state.bonusTypes.map(this.getBonusTypes)}
                    optimiser={this.state.optimiser}
                    setsLevels={this.state.artsLevels.map(this.getSetLevels)}
                    resetFilters={() => this.setState({searchBySetType: 'All', filterByBonusType: 'All'})}
                />
                <StatsSummaryAndArtsBox
                    totalNumberOfArts={this.sum(this.state.totalNumberOfArts)}
                    gameSpeedBonuses={this.sum(this.state.gameSpeedBonuses)}
                    bonusMedals={this.sum(this.state.bonusMedals)}
                    selectedList={this.state.selectedList.map(this.getSelection)}
                    setsData={this.state.optimiser ? this.state.data.map(this.getOptimizedSets) : this.state.data.map(this.getSets)}
                    offline={this.state.offline}
                    optimiser={this.state.optimiser}
                    optimiserNbArts={(e) => this.setState({optimiserNbArts: parseInt(e.target.value, 10)})}
                    optimiserMaxGS={(e) => this.setState({optimiserMaxGS: parseInt(e.target.value, 10)})}
                    startBuild={() => this.startBuild()}
                    wantedArts={this.state.optimiserNbArts}
                    maxGS={this.state.optimiserMaxGS}
                    getOptimisedResults={this.state.optimisedSets}
                    getArrayResult={(e) => this.getArrayResult(e)}
                    optimisedResultSelectedIndex={this.state.optimisedResultSelectedIndex}
                />
            </div>
        );
    }
}