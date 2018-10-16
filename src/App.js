import React, {Component} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as html2canvas from 'html2canvas';
import Set from './component/Set';
import {ScreenshotModal} from "./Modals/ScreenshotModal";
import {NavBar} from "./component/NavBar";
import {StatsSummaryAndArtsBox} from "./component/StatsSummaryAndArtsBox";
import {LoadingScreen} from "./component/LoadingScreen";


export default class App extends Component {
    constructor() {
        super();
        this.state = {
            selectedList: [],
            data: [],
            setTypes: [],
            totalNumberOfArts: [],
            gameSpeedBonuses: [],
            bonusMedals: [],
            set: null,
            artifact: null,
            showScreenModal: false,
            canvas: null,
            canvasMobile: null,
            searchBySetName: '',
            searchBySetType: 'All',
            loading: false,
            visitorCount: null,
        };
    }

    componentWillMount() {
        this.setState({loading: true});
        // fetch('http://127.0.0.1:8000/visits/1/')
        fetch('http://efartifactsbuilder.alwaysdata.net/visits/1/')
            .then(response => {
                return response.json()
            })
            .then(data => {
                this.setState({visitorCount: data.visits})
            });
        // fetch('http://127.0.0.1:8000/sets/')
        fetch('http://efartifactsbuilder.alwaysdata.net/sets/')
            .then((response) => {
                return response.json()
            })
            .then((data) => {
                // Sorting 2 dimensions array to sort arts by their names
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
                this.setState({
                    // data: data
                    data: sortedData,
                    setTypes: setTypesArray,
                    loading: false
                });
            })
            .catch((error) => {
                console.log(error)
            })
    };

    handleList = (event) => {
        if ((this.state.selectedList.includes(event))) {
            // Selected Sets
            let array = [...this.state.selectedList]; // make a separate copy of the array
            let index = array.indexOf(event);
            array.splice(index, 1);
            // Total arts number
            let array2 = [...this.state.totalNumberOfArts];
            let index2 = array2.indexOf(event.set_arts_number);
            array2.splice(index2, 1);
            // Total game speed bonus
            let array3 = [...this.state.gameSpeedBonuses];
            let index3 = array3.indexOf(this.findBonus(event, /Game Speed/));
            array3.splice(index3, 1);
            // Total medals bonus
            let array4 = [...this.state.bonusMedals];
            let index4 = array4.indexOf(this.findBonus(event, /Increase Additional Medals Obtained/));
            array4.splice(index4, 1);
            this.setState({
                selectedList: array,
                totalNumberOfArts: array2,
                gameSpeedBonuses: array3,
                bonusMedals: array4
            });
        } else {
            this.setState(prevState => ({
                selectedList: [...prevState.selectedList, event],
                totalNumberOfArts: [...prevState.totalNumberOfArts, event.set_arts_number],
                gameSpeedBonuses: [...prevState.gameSpeedBonuses, this.findBonus(event, /Game Speed/)],
                bonusMedals: [...prevState.bonusMedals, this.findBonus(event, /Increase Additional Medals Obtained/)]
            }));
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

    getSelection = (set) => {
        return (
            <li key={set.set_name + set.setLevel} className="text-center">
                <div className="col-12 bolded">{set.setLevel} {set.set_tech_name}</div>
            </li>
        )
    };

    findBonus = (event, regex) => {
        for (let key in event) {
            if (/^bonus/.test(key))
                if (event[key].match(regex)) {
                    let valueKey = key.replace('bonus', 'value');
                    return event[valueKey];
                }
        }
    };

    triggerScreenshot = () => {
        html2canvas(document.querySelector("#capture"))
            .then(canvas => {
                this.setState({showScreenModal: true, canvas: canvas.toDataURL()});
            })
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
        let set = sets[0];
        let showIfMatch =
            // Match set tech name and set types, if All, every set is shown
            set.set_tech_name.toLowerCase().match(this.state.searchBySetName.toLowerCase()) &&
            (set.setType.toLowerCase().match(this.state.searchBySetType.toLowerCase()) ||
                this.state.searchBySetType === 'All');
        return (
            <div
                key={set.set_name}
                className={`col-md-3 col-6 set-border text-center hovered ${showIfMatch ? null : 'd-none'}`}>
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
                    />
                </div>
            </div>
        )
    };

    getSetsTypes = (setType) => {
        return (
            <label
                key={setType}
                className="col-4 col-md-2 mr-2 ml-2 mb-2 mt-2 radio-btn personnal-checkbox">
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

    artsNumber = (set) => {
        // let setName = set.set_name.replace(/ \(\dp\)/g, '');
        return (
            <div key={set.set_tech_name}>
                <label className="text-center text-color personnal-checkbox">
                    {set.set_arts_number}
                    <input
                        onClick={() => this.handleList(set)}
                        type="checkbox"
                        name={set.set_tech_name}
                        value={set.set_name}
                    >
                    </input>
                    <span className="checkmark"/>
                </label>
            </div>
        )
    };

    closeScreenModal = () => {
        this.setState({showScreenModal: false, canvas: null})
    };

    render() {
        return (
            <div className="container-fluid text-center">
                {this.state.loading ? (
                    <LoadingScreen visitorCount={this.state.visitorCount}/>
                ) : null}
                {this.state.showScreenModal ? (
                    <ScreenshotModal
                        handler={this.closeScreenModal}
                        canvas={this.state.canvas}
                        canvasMobile={this.state.canvasMobile}
                    />
                ) : null}
                <NavBar
                    triggerScreenshot={this.triggerScreenshot}
                    searchBySetName={(e) => this.setState({searchBySetName: e.target.value})}
                />
                <StatsSummaryAndArtsBox
                    totalNumberOfArts={this.sum(this.state.totalNumberOfArts)}
                    gameSpeedBonuses={this.sum(this.state.gameSpeedBonuses)}
                    bonusMedals={this.sum(this.state.bonusMedals)}
                    selectedList={this.state.selectedList.map(this.getSelection)}
                    setsData={this.state.data.map(this.getSets)}
                    setsTypes={this.state.setTypes.map(this.getSetsTypes)}
                />
            </div>
        );
    }
}