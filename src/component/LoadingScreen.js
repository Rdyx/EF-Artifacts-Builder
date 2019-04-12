import React, {Component} from 'react';
import PropTypes from 'prop-types';

export class LoadingScreen extends Component {
    static propTypes = {
        // visitorCount: PropTypes.number,
        offline: PropTypes.string.isRequired,
    };

    // Keeping it in case of visitor counter again at some time
    // randomVisitorSentence = () => {
    //     let v = `Visitor ${this.props.visitorCount}`;
    //     let sentencesArray = [];
    //     sentencesArray.push(`Yaaaaarrhhhhh ! ${v} ! DO WHAT YOU WANT CAUSE A PIRATE IS FREE ! YOU ARE A PIRATE !`);
    //     sentencesArray.push(`Kawaaaaiiiii ${v} !`);
    //     sentencesArray.push(`Omae wa mou shinderu ${v}. `);
    //     sentencesArray.push(`May the SR be with you, ${v}.`);
    //     sentencesArray.push(`All your base are belong to us, ${v} !`);
    //     sentencesArray.push(`Thank you ${v} ! But our Princess is in another castle !`);
    //     sentencesArray.push(`It's a-me ! ${v} !`);
    //     sentencesArray.push(`I used to be an adventurer like you, ${v}, until I took an arrow to the knee.`);
    //     sentencesArray.push(`${v}, do a barrel roll !`);
    //     sentencesArray.push(`Praise the sun ${v} !`);
    //     sentencesArray.push(`The cake is a lie  ${v} !`);
    //     sentencesArray.push(`${v} JEEEENNKKIIIINNNNS !`);
    //     sentencesArray.push(`${v}, it's time to kick ass and chew bubble gum, and I'm all outta gum !`);
    //     let randomIndex = Math.floor(Math.random() * Math.floor(sentencesArray.length));
    //     if (this.props.visitorCount) {
    //         return (
    //             <h3>{sentencesArray[randomIndex]}</h3>
    //         )
    //     }
    // };

    render() {
        return (
            <div className="row">
                <div className="loading bolded white-text">
                    <h1 className="col-12 mt-5">Loading...</h1>
                    {this.props.offline !== '' ? (
                        <div className="col mt-5">
                            this.props.offline
                        </div>) : null}
                </div>
            </div>
        )
    }
}