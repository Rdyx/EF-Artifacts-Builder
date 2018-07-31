import React, {Component} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as html2canvas from 'html2canvas';
import Modal from 'react-modal';
import Set from './component/Set';

Modal.setAppElement('#root');

const customStyles = {
    overlay: {
        zIndex: 1045
    },
    content: {
        position: 'absolute',
        zIndex: 1050,
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    }
};

export default class App extends Component {
    constructor() {
        super();
        this.state = {
            selectedList: [],
            data: [],
            totalNumberOfArts: [],
            gameSpeedBonuses: [],
            bonusMedals: [],
            set: null,
            artifact: null,
            showArtStats: false,
            showScreenModal: false,
            canvas: null,
            canvasMobile: null,
            searchBySetName: '',
            loading: false
        };
        this.triggerScreenshot = this.triggerScreenshot.bind(this);
        this.closeScreenModal = this.closeScreenModal.bind(this);
    }

    componentWillMount() {
        this.setState({loading: true});
        // fetch('http://127.0.0.1:8002/sets/')
        fetch('http://efartifactsbuilder.alwaysdata.net/sets/')
            .then((response) => {
                return response.json()
            })
            .then((data) => {
                // Sorting 2 dimensions array to sort arts by their names
                let sortedData = [];
                let pushInArray = [];
                let i = 0;
                while (i < data.length) {
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

    sum(input) {
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
    }

    getSelection(set) {
        return (
            <li className="text-center">
                <div className="col-12 bolded">{set.setLevel} {set.set_tech_name}</div>
            </li>
        )
    }

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
                    t0Array.push(set);
                    break;
                case 'T1':
                    t1Array.push(set);
                    break;
                case 'T2':
                    t2Array.push(set);
                    break;
                case 'T3':
                    t3Array.push(set);
                    break;
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
        let showIfMatch = set.set_name.toLowerCase().match(this.state.searchBySetName.toLowerCase());
        return (
            <div
                className={`col-md-3 col-6 set-border text-center hovered ${showIfMatch ? null : 'd-none'}`}>
                {globalArray.map((sets, index) => {
                        // Seems on sets with 1 pair of bonus can't be fetched by sets[index] so
                        // setting if/else to get sets[0] in this case
                        if (sets[index]) {
                            return (
                                <div className="row justify-content-around parent">
                                    <div className="col-2 white-text child">
                                        {sets[index].setLevel}
                                    </div>
                                    <div className="col-10 row justify-content-around">
                                        {sets.map(this.artsNumber)}
                                    </div>
                                </div>
                            )
                        } else {
                            return (
                                <div className="row justify-content-around parent">
                                    <div className="col-2 white-text child">
                                        {sets[0].setLevel}
                                    </div>
                                    <div className="col-10 row justify-content-around">
                                        {sets.map(this.artsNumber)}
                                    </div>
                                </div>
                            )
                        }
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

    artsNumber = (set) => {
        // let setName = set.set_name.replace(/ \(\dp\)/g, '');
        return (
            <div>
                <label className="text-center text-color personnal-checkbox">
                    {set.set_arts_number}
                    <input onClick={() => this.handleList(set)}
                           type="checkbox"
                           name={set.set_name}
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
                    <div className="row">
                        <h1 className="loading bolded white-text">Loading...</h1>
                    </div>
                ) : null}
                <div onClick={() => this.closeScreenModal}>
                    <Modal
                        isOpen={this.state.showScreenModal}
                        onRequestClose={this.closeScreenModal}
                        style={customStyles}
                    >
                        <img className="screenshot"
                             src={this.state.canvas ? this.state.canvas : this.state.canvasMobile}
                             alt="Screenshot"/>
                    </Modal>
                </div>
                <nav className="sticky-top row navbar navbar-dark bg-dark justify-content-between">
                    <a className="navbar-brand">EFAB</a>
                    <button
                        className="btn btn-outline-warning my-2 my-sm-0 d-none d-sm-block"
                        onClick={this.triggerScreenshot}>Screen Stats
                    </button>
                    <div className="col-xs-12 margin-top">
                        <input
                            type="text"
                            className="col-xs-12 form-control"
                            placeholder="Search By Set Name"
                            onChange={(e) => this.setState({searchBySetName: e.target.value})}/>
                    </div>
                </nav>
                <div className="screenstats row text-center sticky-top d-block d-sm-none">
                    <h2 className="col-12">Stats Resume</h2>
                    <p className="col-12">Number of arts : {this.sum(this.state.totalNumberOfArts)}</p>
                    <p className="col-12">Total game speed bonus : {this.sum(this.state.gameSpeedBonuses)}</p>
                    <p className="col-12">Total bonus medals : {this.sum(this.state.bonusMedals)}</p>
                    <p className="col-12">List of selected sets</p>
                    <ul className="list-unstyled col-xs-12">
                        {this.state.selectedList.map(this.getSelection)}
                    </ul>
                </div>
                <div className="row">
                    <div className="col-12 col-md-9 left-box">
                        <div className="row">
                            {this.state.data.map(this.getSets)}
                        </div>
                    </div>
                    <div id="capture" className="right-box d-none d-sm-block">
                        <h1 className="bolded pr-2 pl-2">Stats Resume</h1>
                        <p className="col-12">Number of arts : <span className="bolded">{this.sum(this.state.totalNumberOfArts)}</span></p>
                        <p className="col-12">Total game speed bonus : <span className="bolded">{this.sum(this.state.gameSpeedBonuses)}</span></p>
                        <p className="col-12">Total bonus medals : <span className="bolded">{this.sum(this.state.bonusMedals)}</span></p>
                        <p className="col-12">List of selected sets</p>
                        <ul className="list-unstyled">
                            {this.state.selectedList.map(this.getSelection)}
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}