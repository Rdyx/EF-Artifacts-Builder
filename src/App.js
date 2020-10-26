import React, { Component, Fragment } from 'react';
import * as html2canvas from 'html2canvas';
import Set from './component/Set';
import { ScreenshotModal } from './Modals/ScreenshotModal';
import { NavBar } from './component/NavBar';
import { StatsSummaryAndArtsBox } from './component/StatsSummaryAndArtsBox';
import { LoadingScreen } from './component/LoadingScreen';
import { calculateGSFromEnhancement, calculateMedalsFromEnhancement, knapsack } from './optimiser/Optimiser';
import { artsPerSetSort, alphabeticalSort, GSAmountSort, MedalsAmountSort } from './sorting/SortingSets';
import { versions } from './Versions/Versions';


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
            artsLevels: [6, 7, 8, 9],
            setsLevels: ['T0', 'T1', 'T2', 'T3'],
            artsLevelsOptimized: /[6-9]/g,
            sixStarsSetsOptimized: /T[0-2]/g, // NB: Regex to EXCLUDE set
            sevenStarsSetsOptimized: /T[0-2]/g,
            eightStarsSetsOptimized: /T[0-1]/g,
            nineStarsSetsOptimized: /T[0]/g,
            enhancementModes: ['Manual', 'All'],
            enhancementMode: 'Manual',
            enhancementLevels: [0, 1, 2, 3, 4, 5],
            enhanceLevel: 5,
            maxArtsPerSet: 6,
            set: null,
            artifact: null,
            showScreenModal: false,
            canvas: null,
            canvasMobile: null,
            searchBySetName: '',
            searchBySetType: 'All',
            filterByBonusType: 'All',
            filterBySetLevel: 'All',
            filterByTotalArtsNumber: 'All',
            sorts: ['Arts per Set', 'Alphabetical', 'GS Amount', 'Medals Amount'],
            sortedBy: 'Default',
            loading: false,
            // visitorCount: null,
            offline: '',
            optimiser: true,
            optimiserNbArts: 0,
            optimiserMaxGS: 0,
            optimiserSixStarsLevel: 'T3',
            optimiserSevenStarsLevel: 'T3',
            optimiserEightStarsLevel: 'T2',
            optimiserNineStarsLevel: 'T1',
            optimisedSets: [],
            optimisedResultSelectedIndex: 1,
            connected: false,
        };
    }

    UNSAFE_componentWillMount() {
        if (!localStorage.getItem('enhanceLevel')) {
            localStorage.setItem('enhanceLevel', 5);
        }

        const enhanceLevel = parseInt(localStorage.getItem('enhanceLevel'), 10);

        this.setState({ loading: true, enhanceLevel: enhanceLevel });

        fetch(process.env.REACT_APP_PING)
            .then(response => {
                // Used to catch if user isn't connected at all
                return response.status;
            })
            .then(() => {
                // Check current user version to decide if we will use stored data
                const versionNumberFromLocalStorage = localStorage.getItem('versionNumber');
                // Get latest version number
                const currentVersion = versions[0].number;

                // Used to show facebook button
                this.setState({ connected: true });

                // If the stored version in localStorage is different or we are in dev, fetch new data
                if (versionNumberFromLocalStorage !== currentVersion || process.env.NODE_ENV === 'development') {
                    // Checking if user can fetch latest data

                    fetch(process.env.REACT_APP_SETS_FETCH)
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
                                // Add a 0 on set types that are under 10
                                const dataSetTypeSplit = data[i].setType.split(' ');
                                if (parseInt(dataSetTypeSplit[0], 10) < 10) {
                                    data[i].setType = '0' + data[i].setType;
                                }

                                let setType = data[i].setType.replace(/\d+ /, '');

                                data[i].enhance_level = this.adaptElvl(data[i], enhanceLevel);

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

                            // Sorting every index (array of sets) by arts number then resort by setLevel to ensure every array last index is the "best" set
                            sortedData.map(x => {
                                let sortByArtNumber = x.sort((a, b) => {
                                    return (a.set_arts_number > b.set_arts_number) ? 1 : ((b.set_arts_number > a.set_arts_number) ? -1 : 0)
                                });

                                return sortByArtNumber.sort((a, b) => {
                                    return (a.setLevel > b.setLevel) ? 1 : ((b.setLevel > a.setLevel) ? -1 : 0)
                                })
                            });

                            // Quick ensure our sets are sorted by their setType (DESC, higher number will be at top)
                            sortedData.sort((a, b) => b[0].setType.localeCompare(a[0].setType));

                            localStorage.setItem('data', JSON.stringify(sortedData));
                            localStorage.setItem('setTypes', JSON.stringify(setTypesArray));
                            this.setState({
                                data: JSON.parse(localStorage.getItem('data')),
                                defaultData: JSON.parse(localStorage.getItem('data')),
                                setTypes: JSON.parse(localStorage.getItem('setTypes')),
                                loading: false,
                            });
                            localStorage.setItem('versionNumber', currentVersion);
                        })
                        .catch(() => {
                            this.checkOfflineAndLocalStorage('There has been a problem while loading data. Please try again later.', enhanceLevel);
                        })
                } else {
                    this.getDataFromLocalStorage(enhanceLevel);
                }
            })
            .catch(() => {
                this.checkOfflineAndLocalStorage('You need to connect at least once to run this app.', enhanceLevel);
            })
    };

    getDataFromLocalStorage = (enhanceLevel) => {
        // Setting sets enhance_level from localStorage value
        let data = JSON.parse(localStorage.getItem('data')).map(sets => {
            return sets.map(set => {
                set.enhance_level = enhanceLevel;
                return set;
            })
        });

        // this.sortDataBySetType(data);

        return this.setState({
            data: data,
            defaultData: data,
            setTypes: JSON.parse(localStorage.getItem('setTypes')),
            loading: false,
        });
    }

    checkOfflineAndLocalStorage = (message, enhanceLevel) => {
        if (localStorage.getItem('data') && localStorage.getItem('setTypes')) {
            this.getDataFromLocalStorage(enhanceLevel);
            return this.setState({
                offline: 'You are currently offline, data may be outdated.',
            })
        } else {
            return this.setState({
                offline: message,
            });
        }
    };

    sortingASCorDESC = (btnValue, method, findBonus = null) => {
        return btnValue.match(/ ASC/) ?
            this.setState({ data: method(this.state.data, 'ASC', findBonus), sortedBy: btnValue }) :
            this.setState({ data: method(this.state.data, 'DESC', findBonus), sortedBy: btnValue });
    };

    sortingMethod = (btnValue) => {
        return btnValue.match('Arts per Set') ?
            this.sortingASCorDESC(btnValue, artsPerSetSort) : btnValue.match('Alphabetical') ?
                this.sortingASCorDESC(btnValue, alphabeticalSort) : btnValue.match('GS Amount') ?
                    this.sortingASCorDESC(btnValue, GSAmountSort, this.findBonus) : btnValue.match('Medals Amount') ?
                        this.sortingASCorDESC(btnValue, MedalsAmountSort, this.findBonus) : this.setState({ data: this.state.defaultData });
    };

    sortingButtons = (btnValue) => {
        return (
            <Fragment>
                <input
                    id={btnValue + 'sorting'}
                    type="radio"
                    name={'totalArtsPerSet'}
                    value={btnValue + (btnValue === 'Default' ? '' : ' ASC')}
                    defaultChecked={btnValue + (btnValue === 'Default' ? '' : ' ASC') === this.state.sortedBy}
                    onClick={(e) => this.sortingMethod(e.target.value)}
                />
                <label htmlFor={btnValue + 'sorting'}
                    className={`col mb-2 set-filter-button radio-btn personnal-checkbox green-check filter-modal`}>
                    {btnValue + (btnValue === 'Default' ? '' : ' ASC')}
                </label>
                {btnValue !== 'Default' ? (
                    <Fragment>
                        <input
                            id={btnValue + 'sortingRevert'}
                            type="radio"
                            name={'totalArtsPerSet'}
                            value={btnValue + ' DESC'}
                            defaultChecked={btnValue + ' DESC' === this.state.sortedBy}
                            onClick={(e) => this.sortingMethod(e.target.value)}
                        />
                        <label htmlFor={btnValue + 'sortingRevert'}
                            className={`col mb-2 ml-2 set-filter-button radio-btn personnal-checkbox green-check filter-modal`}>
                            {btnValue} DESC
                        </label>
                    </Fragment>
                ) : null}

            </Fragment>
        )
    };

    setsSortingButtons = () => {
        const boxes = [];
        const sorts = this.state.sorts;

        // Default sorting button
        boxes.push(
            <div key='Defaultsorting' className="row mx-auto">
                {this.sortingButtons('Default')}
            </div>
        );

        for (let i = 0; i < sorts.length; i++) {
            boxes.push(
                <div key={sorts[i] + 'sorting'} className="row mx-auto">
                    {this.sortingButtons(sorts[i])}
                </div>);
        }

        return boxes;
    };

    resetSummaryState = () => {
        this.setState({
            selectedList: [],
            totalNumberOfArts: [],
            gameSpeedBonuses: [],
            bonusMedals: [],
        });

        // Default checking every "X" radio input ("reset")
        const radioInputsList = document.querySelectorAll('.row.container-fluid.mx-auto>input');
        radioInputsList.forEach(input => input.checked = true)
    };

    handleList = (event, status = null, elvl, globalArray) => {
        const regex = / \(\dp\)/;
        const eventSetName = event.set_name.replace(regex, '');
        const selectedList = this.state.selectedList;
        const isInList = selectedList.some(set => set.set_name.replace(regex, '') === eventSetName);

        let setNamesArray = []; // create an array that will contains cleaned set names for easier match
        selectedList.map(set => setNamesArray.push(set.set_name.replace(regex, '')));
        let index = setNamesArray.indexOf(eventSetName);

        if (status === 'enhance') {
            if (event.set_arts_number === event.set_total_arts_number) {
                event.enhance_level = !isNaN(elvl) ? parseInt(elvl, 10) : !isNaN(event.enhance_level) ? parseInt(event.enhance_level) : 0;
            }
            this.changeSetEnhanceLevel(elvl, globalArray);
        }

        const oldSet = selectedList[index];

        if (isInList || (isInList && status === 'remove')) {
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

        // Direct set selection
        if (status === 'select') {
            const fullSet = event.set_arts_number === event.set_total_arts_number;
            const findBonusMedalsMethod = this.findBonus(event, /Increase Additional Medals Obtained/);
            const findBonusGSMethod = this.findBonus(event, /Game Speed/);

            const bonusMedals = fullSet ?
                calculateMedalsFromEnhancement(findBonusMedalsMethod, event.enhance_level) : findBonusMedalsMethod;
            const bonusGS = fullSet ?
                calculateGSFromEnhancement(findBonusGSMethod, event.artifact1.art_level, event.setLevel, event.enhance_level, event.setType) : findBonusGSMethod;

            this.setState(prevState => ({
                selectedList: [...prevState.selectedList, event],
                totalNumberOfArts: [...prevState.totalNumberOfArts, event.set_arts_number],
                gameSpeedBonuses: [...prevState.gameSpeedBonuses, bonusGS],
                bonusMedals: [...prevState.bonusMedals, bonusMedals]
            }));
        }
        // Enhancement selection
        else if (status === 'enhance' && oldSet) {
            const fullSet = oldSet.set_arts_number === oldSet.set_total_arts_number;
            oldSet.enhance_level = event.enhance_level;

            let bonusMedals = 0;
            let bonusGS = 0;

            if (!isNaN(oldSet.bonusMedals) || !isNaN(oldSet.bonusGS)) {
                if (fullSet) {
                    oldSet.calculatedBonusMedals = calculateMedalsFromEnhancement(oldSet.bonusMedals, oldSet.enhance_level);
                    oldSet.calculatedBonusGS = calculateGSFromEnhancement(oldSet.bonusGS, oldSet.artifact1.art_level, oldSet.setLevel, oldSet.enhance_level, oldSet.setType);
                }
            } else {
                const findBonusMedalsMethod = this.findBonus(oldSet, /Increase Additional Medals Obtained/);
                const findBonusGSMethod = this.findBonus(oldSet, /Game Speed/);

                bonusMedals = fullSet ?
                    calculateMedalsFromEnhancement(findBonusMedalsMethod, oldSet.enhance_level) : findBonusMedalsMethod;
                bonusGS = fullSet ?
                    calculateGSFromEnhancement(findBonusGSMethod, oldSet.artifact1.art_level, oldSet.setLevel, oldSet.enhance_level, oldSet.setType) : findBonusGSMethod;
            }

            this.setState(prevState => ({
                selectedList: [...prevState.selectedList, oldSet],
                totalNumberOfArts: [...prevState.totalNumberOfArts, oldSet.set_arts_number],
                gameSpeedBonuses: [...prevState.gameSpeedBonuses, bonusGS ? bonusGS : oldSet.calculatedBonusGS],
                bonusMedals: [...prevState.bonusMedals, bonusMedals ? bonusMedals : oldSet.calculatedBonusMedals]
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

            this.setState({ excludedFromOptimiser: array });
        }
        if (!status) {
            this.setState(prevState => ({ excludedFromOptimiser: [...prevState.excludedFromOptimiser, eventSetName] }));
        }
    };

    sum = (input) => {
        if (toString.call(input) !== "[object Array]") {
            return false;
        }

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
            if (event.hasOwnProperty(key)) {
                if (/^bonus/.test(key)) {
                    if (event[key].match(regex)) {
                        let valueKey = key.replace('bonus', 'value');
                        return parseInt(event[valueKey], 10);
                    }
                }
            } else {
                return 0
            }
        }
    };

    getSelection = (set) => {
        const fullSet = set.set_arts_number === set.set_total_arts_number;
        let findGsBonus = !isNaN(set.calculatedBonusGS) ?
            set.calculatedBonusGS : fullSet ?
                calculateGSFromEnhancement(this.findBonus(set, /Game Speed/), set.artifact1.art_level, set.setLevel, set.enhance_level, set.setType) :
                this.findBonus(set, /Game Speed/);

        let findMedalBonus = !isNaN(set.calculatedBonusMedals) ?
            set.calculatedBonusMedals : fullSet ?
                calculateMedalsFromEnhancement(this.findBonus(set, /Increase Additional Medals Obtained/), set.enhance_level) : this.findBonus(set, /Increase Additional Medals Obtained/);

        const setTechName = set.set_tech_name.replace(/ \(\dp\)/g, '');
        const elvl = !isNaN(set.enhance_level) && fullSet && set.enhance_level ? '+' + set.enhance_level : '';

        return (
            <tr key={set.set_name + set.setLevel} className="text-center">
                <th style={{ width: '60%' }}>{elvl} {set.setLevel} {setTechName} - {set.set_arts_number}p</th>
                <td style={{ width: '15%' }}>{findGsBonus ? findGsBonus : 0}</td>
                <td style={{ width: '35%' }}>{findMedalBonus ? findMedalBonus : 0}</td>
            </tr>
        )
    };

    triggerScreenshot = () => {
        html2canvas(document.querySelector("#capture"))
            .then(canvas => {
                this.setState({ showScreenModal: true, canvas: canvas.toDataURL() });
            })
    };

    showIfMatch = (set) => {
        const setName = set.set_name.toLowerCase().match(this.state.searchBySetName.toLowerCase());
        const techName = set.set_tech_name.toLowerCase().match(this.state.searchBySetName.toLowerCase());
        const setType = set.setType.toLowerCase().match(this.state.searchBySetType.toLowerCase()) || this.state.searchBySetType === 'All';
        const bonus = this.findBonus(set, this.state.filterByBonusType) || this.state.filterByBonusType === 'All';
        const matchTotalArtsNumber = set.set_total_arts_number.toString() === this.state.filterByTotalArtsNumber || this.state.filterByTotalArtsNumber === 'All';

        // Match set tech name, set types and set total arts number, if All, every set is shown
        return (setName || techName) && setType && bonus && matchTotalArtsNumber;
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
                <div className="row mt-1">
                    <div className="col-2 white-text child" />
                    <div className="col-9">
                        <div className="row container-fluid mx-auto">
                            <input
                                id={set.set_name}
                                onClick={() => this.handleList(set, 'remove')}
                                type="radio"
                                name={set.set_name.replace(/ \(\dp\)/, '')}
                                value={set.set_name}
                                defaultChecked={true}
                            >
                            </input>
                            <label
                                htmlFor={set.set_name}
                                className="text-center text-color personnal-checkbox red-check w-100">
                                &#10007;
                            </label>
                        </div>
                    </div>
                </div>
                {globalArray.map((sets, index) => {
                    // Seems on sets with 1 pair of bonus can't be fetched by sets[index] so
                    // Setting if/else to get sets[0] in this case
                    return (
                        <Fragment key={sets[index] ? sets[index].set_name : sets[0].set_name + index}>
                            <div className="row align-items-center">
                                <div className="col-2 white-text child">
                                    {sets[index] ? sets[index].setLevel : sets[0].setLevel}
                                </div>
                                <div className="col-9">
                                    <div className="row">
                                        {sets.map(set => this.artsNumber(set, sets))}
                                    </div>
                                </div>
                            </div>
                            {sets.map(set => this.enhancementButtons(set, globalArray))}
                        </Fragment>
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

    enhancementButtons = (set, globalArray) => {
        const regex = / \(\dp\)/;
        const artLevel = set.artifact1.art_level;
        const setLevel = set.setLevel;

        const elvls = artLevel === '6*' ?
            this.state.enhancementLevels.filter(x => ![3, 4, 5].includes(x)) : artLevel === '7*' ?
                this.state.enhancementLevels.filter(x => ![4, 5].includes(x)) : artLevel === '8*' ?
                    this.state.enhancementLevels.filter(x => ![5].includes(x)) : this.state.enhancementLevels; // filter all levels for 9* sets

        const enhanceLevel = this.adaptElvl(set, this.state.enhanceLevel);

        const showElvls = set.hasOwnProperty('enhance_level') &&
            (
                (artLevel === '6*' && setLevel === 'T3') ||
                (artLevel === '7*' && setLevel === 'T3') ||
                (artLevel === '8*' && setLevel === 'T2') ||
                (artLevel === '9*' && setLevel === 'T1')
            ) && set.set_arts_number === set.set_total_arts_number;

        // Must get the whole div in condition and rewrite it completely depending on state
        // This avoid conflict with controlled/uncontrolled input
        return showElvls ?
            this.state.enhancementMode === 'Manual' ? (
                <div key={set + 'M'}>
                    <div
                        className="bordered white-text mt-2">
                        Enhancement
                    </div>
                    <div className="row p-0 mx-0 col align-items-center">
                        {elvls.map(elvl => {
                            return (
                                <Fragment key={elvl + 'enhance'}>
                                    <input
                                        id={set.set_name.replace(regex, '') + elvl + 'enhance'}
                                        type="radio"
                                        name={set.set_name + 'enhance'}
                                        value={elvl}
                                        defaultChecked={elvl === set.enhance_level}
                                        onClick={(e) => this.handleList(set, 'enhance', e.target.value, globalArray)}
                                    />
                                    <label
                                        htmlFor={set.set_name.replace(regex, '') + elvl + 'enhance'}
                                        className="col p-0 mt-2 text-center text-color personnal-checkbox green-check">
                                        +{elvl}
                                    </label>
                                </Fragment>
                            )
                        }
                        )}
                    </div>
                </div>
            ) : (
                    <div key={set + 'A'}>
                        <div
                            className="text-bolded bordered white-text mt-2">
                            Enhancement
                    </div>
                        <div className="row p-0 mx-0 col align-items-center">
                            {elvls.map(elvl => {
                                return (
                                    <Fragment key={elvl + 'enhance'}>
                                        <input
                                            id={set.set_tech_name + elvl + 'enhance'}
                                            type="radio"
                                            name={set.set_name + 'enhance'}
                                            value={elvl}
                                            checked={elvl === enhanceLevel}
                                            readOnly={true}
                                        />
                                        <label
                                            htmlFor={set.set_tech_name + elvl + 'enhance'}
                                            className="col p-0 mt-2 text-center text-color personnal-checkbox green-check">
                                            +{elvl}
                                        </label>
                                    </Fragment>
                                )
                            }
                            )}
                        </div>
                    </div>
                ) : null;
    };

    getOptimizedSets = (sets) => {
        // This function is here to filter and fill ArtsBox only with sets that automatic builder will use
        const artLevels = this.state.artsLevelsOptimized;
        const sixStarsSets = this.state.sixStarsSetsOptimized;
        const sevenStarsSets = this.state.sevenStarsSetsOptimized;
        const eightStarsSets = this.state.eightStarsSetsOptimized;
        const nineStarsSets = this.state.nineStarsSetsOptimized;

        sets = sets.filter(set => {
            const testGSValue = this.findBonus(set, /Game Speed/);
            const testMedalsValue = this.findBonus(set, /Increase Additional Medals Obtained/);
            const setLevel = set.setLevel;
            const artLevel = set.artifact1.art_level.replace('*', '');

            return !artLevel.match(artLevels) || !(testGSValue || testMedalsValue) ? false :
                !(setLevel.match(sixStarsSets) && artLevel === '6') ?
                    !(setLevel.match(sevenStarsSets) && artLevel === '7') ?
                        !(setLevel.match(eightStarsSets) && artLevel === '8') ?
                            !(setLevel.match(nineStarsSets) && artLevel === '9') : false : false : false;
        });

        if (sets.length > 0) {
            const regex = / \(\dp\)/;
            const set = sets[sets.length - 1];
            let showIfMatch = this.showIfMatch(set);
            const filteredSets = this.filterSetsForStatsModal(set);
            const isExcluded = this.state.excludedFromOptimiser.indexOf(set.set_name) !== -1;

            return (
                <div
                    key={set.set_name}
                    className={`col-md-3 col-6 set-border text-center hovered ${showIfMatch ? '' : 'd-none'}`}>
                    <div className="col white-text child">
                        <div className="row justify-content-around">
                            <input
                                id={set.set_name + 'x'}
                                onClick={() => this.handleOptimisedList(set)}
                                type="radio"
                                name={set.set_name.replace(regex, '')}
                                value={set.set_name}
                                defaultChecked={isExcluded}
                            >
                            </input>
                            <label htmlFor={set.set_name + 'x'}
                                className="col text-center text-color personnal-checkbox red-check">
                                &#10007;
                            </label>
                            <input
                                id={set.set_name + 'v'}
                                onClick={() => this.handleOptimisedList(set, 'remove')}
                                type="radio"
                                name={set.set_name.replace(regex, '')}
                                value={set.set_name}
                                defaultChecked={!isExcluded}
                            >
                            </input>
                            <label htmlFor={set.set_name + 'v'}
                                className="col ml-2 text-center text-color personnal-checkbox green-check">
                                &#10003;
                            </label>
                        </div>
                    </div>
                    <div>
                        {this.enhancementButtons(set, sets)}
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
            <div key={setType}>
                <input
                    id={setType + 'setType'}
                    type="radio"
                    name="setType"
                    value={setType}
                    defaultChecked={setType === this.state.searchBySetType}
                    onClick={(e) => this.setState({ searchBySetType: e.target.value })}
                />
                <label
                    htmlFor={setType + 'setType'}
                    className="col-12 mb-1 set-filter-button radio-btn personnal-checkbox green-check filter-modal">
                    {setType}
                </label>
            </div>
        )
    };

    getBonusTypes = (bonusType) => {
        return (
            <Fragment key={bonusType}>
                <input
                    id={bonusType + 'bonusType'}
                    type="radio"
                    name="bonusType"
                    value={bonusType}
                    defaultChecked={bonusType === this.state.filterByBonusType}
                    onClick={(e) => this.setState({ filterByBonusType: e.target.value })}
                />
                <label
                    htmlFor={bonusType + 'bonusType'}
                    className="col-12 mb-1 set-filter-button radio-btn personnal-checkbox green-check filter-modal">
                    {bonusType}
                </label>
            </Fragment>
        )
    };

    optimiserSetSetsLevelsFilter = (e) => {
        const eValueSplited = e.target.value.split(',');
        const setLevel = eValueSplited[0];
        const setTier = eValueSplited[1];

        return setLevel === '6' ? this.setState({ optimiserSixStarsLevel: setTier }) :
            setLevel === '7' ? this.setState({ optimiserSevenStarsLevel: setTier }) :
                setLevel === '8' ? this.setState({ optimiserEightStarsLevel: setTier }) :
                    setLevel === '9' ? this.setState({ optimiserNineStarsLevel: setTier }) : null;
    };

    getSetLevels = (artLevel) => {
        const setLevelBoxes = [];

        const setSetsLevel = artLevel === 6 ? 3 : 
            artLevel === 7 ? 3 :
                artLevel === 8 ? 2 :
                    artLevel === 9 ? 1 : 0;
        const setTier = artLevel === 6 ? this.state.optimiserSixStarsLevel :
            artLevel === 7 ? this.state.optimiserSevenStarsLevel :
                artLevel === 8 ? this.state.optimiserEightStarsLevel :
                    artLevel === 9 ? this.state.optimiserNineStarsLevel : 0;

        for (let i = 0; i <= setSetsLevel; i++) {
            const setLevel = this.state.setsLevels[i];
            const newLine = i === setSetsLevel ? (<br />) : null;

            setLevelBoxes.push(
                <Fragment key={artLevel + i}>
                    <input
                        id={setLevel + artLevel + i}
                        type="radio"
                        name={artLevel}
                        value={[artLevel, setLevel]}
                        defaultChecked={setTier === setLevel}
                        onClick={(e) => this.optimiserSetSetsLevelsFilter(e)}
                    />
                    <label htmlFor={setLevel + artLevel + i}
                        className={`${setSetsLevel === 3 ? 'col-3' : setSetsLevel === 2 ? 'col-4' : setSetsLevel === 1 ? 'col-6' : 'col'} mb-1 set-filter-button radio-btn personnal-checkbox green-check filter-modal`}>
                        {setLevel} {artLevel}*
                    </label>
                    {newLine}
                </Fragment>
            );
        }

        return setLevelBoxes
    };

    artsPerSetButtons = (i) => {
        return (
            <Fragment key={i + 'total arts'}>
                <input
                    id={i + 'total arts'}
                    type="radio"
                    name={'totalArtsPerSet'}
                    value={i}
                    defaultChecked={i.toString() === this.state.filterByTotalArtsNumber}
                    onClick={(e) => this.setState({ filterByTotalArtsNumber: e.target.value })}
                />
                <label htmlFor={i + 'total arts'}
                    className={`col mb-2 set-filter-button radio-btn personnal-checkbox green-check filter-modal`}>
                    {i}
                </label>
            </Fragment>
        )
    };

    getArtsPerSet = () => {
        const boxes = [];

        for (let i = 1; i <= this.state.maxArtsPerSet; i++) {
            boxes.push(this.artsPerSetButtons(i))
        }

        // All button
        boxes.push(this.artsPerSetButtons('All'));

        return boxes;
    };

    enhancementMode = (type) => {
        return (
            <Fragment key={type + 'enhance'}>
                <input
                    id={type + 'enhance'}
                    type="radio"
                    name='enhancementMode'
                    value={type}
                    defaultChecked={type === this.state.enhancementMode}
                    onClick={(e) => this.setState({ enhancementMode: e.target.value })}
                />
                <label
                    htmlFor={type + 'enhance'}
                    className={`col mb-1 set-filter-button radio-btn personnal-checkbox green-check filter-modal ${type === 'Manual' ? 'mr-2' : ''}`}>
                    {type}
                </label>
            </Fragment>
        )
    };

    changeDefaultElvl = (event) => {
        const GSState = this.state.gameSpeedBonuses;
        const MedalsState = this.state.bonusMedals;

        const elvl = parseInt(event.target.value, 10);
        localStorage.setItem('enhanceLevel', elvl);
        this.setState({ enhanceLevel: elvl });


        if (this.state.enhancementMode === 'All') {
            // Updating all sets in data
            this.state.data.map(sets => sets.map(set => {
                return set.enhance_level = this.adaptElvl(set, elvl)
            }));

            // Updating all sets in selected list
            this.state.selectedList.map((set, index) => {
                set.enhance_level = this.adaptElvl(set, elvl);

                // Check if a set comes from autobuilder and modify it
                if (set.hasOwnProperty('calculatedBonusMedals') && set.hasOwnProperty('calculatedBonusGS')) {
                    set.calculatedBonusMedals = calculateMedalsFromEnhancement(set.bonusMedals, set.enhance_level);
                    set.calculatedBonusGS = calculateGSFromEnhancement(
                        set.bonusGS,
                        set.artifact1.art_level,
                        set.setLevel,
                        set.enhance_level,
                        set.setType,
                    );
                }

                // Updating totals
                MedalsState[index] = !isNaN(set.calculatedBonusMedals) ?
                    set.calculatedBonusMedals : calculateMedalsFromEnhancement(this.findBonus(set, /Increase Additional Medals Obtained/), set.enhance_level);
                GSState[index] = !isNaN(set.calculatedBonusGS) ?
                    set.calculatedBonusGS : calculateGSFromEnhancement(
                        this.findBonus(set, /Game Speed/),
                        set.artifact1.art_level,
                        set.setLevel,
                        set.enhance_level,
                        set.setType,
                    );

                this.setState({
                    bonusMedals: MedalsState,
                    gameSpeedBonuses: GSState,
                });
                return set
            });
        }
    };

    changeSetEnhanceLevel = (event, globalArray) => {
        const elvl = parseInt(event, 10);
        // Depending if autobuilder or not, arrays are not composed the same way
        // True = [set, set...]
        // False [[set, set...], [set, set...]]
        if (!globalArray[0][0]) {
            return globalArray.map(set => {
                this.modifySelectedSet(this.state.selectedList, set, elvl);
                return set.enhance_level = this.adaptElvl(set, elvl);
            });
        } else {
            return globalArray.map(sets =>
                sets.map(set => {
                    this.modifySelectedSet(this.state.selectedList, set, elvl);
                    return set.enhance_level = this.adaptElvl(set, elvl);
                })
            );
        }
    };

    adaptElvl = (set, elvl) => {
        const artLevel = set.artifact1.art_level;

        if (elvl === 5) {
            return artLevel === '9*' ? elvl :
                artLevel === '8*' ? elvl - 1 :
                    artLevel === '7*' ? elvl - 2 : elvl - 3;
        }
        if (elvl === 4) {
            return ['8*', '9*'].includes(artLevel) ? elvl :
                artLevel === '7*' ? elvl - 1 : elvl - 2;
        }
        if (elvl === 3) {
            return ['7*', '8*', '9*'].includes(artLevel) ? elvl : elvl - 1;
        }
        return elvl;
    };

    modifySelectedSet = (list, set, elvl) => {
        let indexOf = -1;
        list.map((setX, index) => {
            return setX.set_name === set.set_name && setX.setLevel === set.setLevel ? indexOf = index : null;
        });
        if (indexOf !== -1) {
            list[indexOf].enhance_level = this.adaptElvl(list[indexOf], elvl);
            this.setState({ selectedList: list })
        }
    };

    enhancementLevels = (elvl) => {
        return this.state.enhancementMode === 'All' ? (
            <Fragment key={elvl + 'enhance'}>
                <input
                    id={elvl + 'enhance'}
                    type="radio"
                    name="enhanceLevel"
                    value={elvl}
                    defaultChecked={elvl === this.state.enhanceLevel}
                    onClick={(e) => this.changeDefaultElvl(e)}
                />
                <label
                    htmlFor={elvl + 'enhance'}
                    className="col mb-1 set-filter-button radio-btn personnal-checkbox green-check filter-modal">
                    +{elvl}
                </label>
            </Fragment>
        ) : null;
    };

    artsNumber = (set, sets) => {
        const elvl = set.enhance_level ? set.enhance_level : 0;
        return (
            <div className="col p-0 ml-1" key={set.set_tech_name}>
                <input
                    id={set.set_name.replace(/ \(\dp\)/, '') + set.set_tech_name + set.setLevel}
                    onClick={this.state.selectedList.includes(set) ?
                        null : () => this.handleList(set, 'select', elvl, sets)}
                    type="radio"
                    name={set.set_name.replace(/ \(\dp\)/, '')}
                    value={set.set_name}
                    defaultChecked={this.state.selectedList.some(setx =>
                        setx.set_name === set.set_name.replace(/ \(\dp\)/, '') &&
                        setx.set_arts_number === set.set_arts_number &&
                        setx.setLevel === set.setLevel
                    )}
                >
                </input>
                <label
                    htmlFor={set.set_name.replace(/ \(\dp\)/, '') + set.set_tech_name + set.setLevel}
                    className="text-center text-color personnal-checkbox green-check w-100">
                    {set.set_arts_number}
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
            this.state.artsLevelsOptimized,
            this.state.optimiserSixStarsLevel,
            this.state.optimiserSevenStarsLevel,
            this.state.optimiserEightStarsLevel,
            this.state.optimiserNineStarsLevel,
        );

        getResults = getResults.sort((r1, r2) =>
            r1.totalArts >= r2.totalArts && r1.gameSpeed * 1.1 >= r2.gameSpeed && r1.medalsBonus * 1.05 >= r2.medalsBonus ? -1 : 1
        );

        let solutionMessage = (
            <div key="message" className="col-12 white-text mt-1 mb-2">
                {
                    nbArtsWanted > 1 && getResults[0].totalArts > 0 ?
                        (<Fragment>
                            <span>Solution(s) found</span>
                            <br />
                            <span>Don't forget to adapt for race optimisation if needed</span>
                        </Fragment>
                        ) :
                        'No solution found'
                }
            </div>
        );

        this.setState({ optimisedSets: [solutionMessage], optimisedResultSelectedIndex: 1 });

        getResults.map(set => {
            return this.setState(prevState => ({ optimisedSets: [...prevState.optimisedSets, set] }));
        });

        return getResults[0] && getResults[0].sets.length > 0 ? this.pushInStates(getResults[0]) : this.resetSummaryState();
    };

    pushInStates = (setsArray, index) => {
        this.resetSummaryState();

        return setsArray.sets.map(set => {
            return this.setState(prevState => ({
                selectedList: [...prevState.selectedList, set],
                totalNumberOfArts: [...prevState.totalNumberOfArts, set.set_arts_number],
                gameSpeedBonuses: [...prevState.gameSpeedBonuses, set.calculatedBonusGS],
                bonusMedals: [...prevState.bonusMedals, set.calculatedBonusMedals],
                optimisedResultSelectedIndex: index ? parseInt(index, 10) : 1,
            })
            );
        });
    };

    getArrayResult = (e) => {
        const index = e.target.value;
        return this.pushInStates(this.state.optimisedSets[index], index)
    };

    closeScreenModal = () => {
        this.setState({ showScreenModal: false, canvas: null })
    };

    render() {
        return (
            <div className="container-fluid text-center">
                {this.state.loading ? (
                    <LoadingScreen
                        // visitorCount={this.state.visitorCount}
                        offline={this.state.offline}
                    />
                ) : null}
                {this.state.showScreenModal ? (
                    <ScreenshotModal
                        handler={this.closeScreenModal}
                        canvas={this.state.canvas}
                        canvasMobile={this.state.canvasMobile}
                    />
                ) : null}
                <NavBar
                    swapManualToAutomaticBuilder={() => this.setState({ optimiser: !this.state.optimiser })}
                    triggerScreenshot={this.triggerScreenshot}
                    searchBySetName={(e) => this.setState({ searchBySetName: e.target.value.replace(/[^a-zA-Z0-9 ]/g, '') })}
                    setFiltering={this.state.searchBySetType !== 'All' || this.state.filterByBonusType !== 'All'}
                    setsTypes={this.state.setTypes.map(this.getSetsTypes)}
                    bonusTypes={this.state.bonusTypes.map(this.getBonusTypes)}
                    optimiser={this.state.optimiser}
                    setsLevels={this.state.artsLevels.map(this.getSetLevels)}
                    resetFilters={() => this.setState({ searchBySetType: 'All', filterByBonusType: 'All' })}
                    listLength={this.state.selectedList.length}
                    resetList={() => this.resetSummaryState()}
                    enhancementMode={this.state.enhancementModes.map(this.enhancementMode)}
                    enhancementLevels={this.state.enhancementLevels.map(this.enhancementLevels)}
                    connected={this.state.connected}
                    totalArtsPerSet={this.getArtsPerSet()}
                    setsSorting={this.setsSortingButtons()}
                />
                <StatsSummaryAndArtsBox
                    totalNumberOfArts={this.sum(this.state.totalNumberOfArts)}
                    gameSpeedBonuses={this.sum(this.state.gameSpeedBonuses)}
                    bonusMedals={this.sum(this.state.bonusMedals)}
                    selectedList={this.state.selectedList.map(this.getSelection)}
                    setsData={this.state.optimiser ? this.state.data.map(this.getOptimizedSets) : this.state.data.map(this.getSets)}
                    offline={this.state.offline}
                    optimiser={this.state.optimiser}
                    optimiserNbArts={(e) => this.setState({
                        optimiserNbArts: parseInt(e.target.value, 10) ?
                            parseInt(e.target.value, 10) : 0
                    })}
                    optimiserMaxGS={(e) => this.setState({
                        optimiserMaxGS: parseInt(e.target.value, 10) ?
                            parseInt(e.target.value, 10) : 0
                    })}
                    startBuild={() => this.startBuild()}
                    wantedArts={this.state.optimiserNbArts}
                    maxGS={this.state.optimiserMaxGS}
                    getOptimisedResults={this.state.optimisedSets}
                    getArrayResult={(e) => this.getArrayResult(e)}
                    optimisedResultSelectedIndex={this.state.optimisedResultSelectedIndex}
                    connected={this.state.connected}
                />
            </div>
        );
    }
}