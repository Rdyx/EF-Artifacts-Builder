import React, {Component} from 'react';
import PropTypes from 'prop-types';

export class ArtsBox extends Component {
    static propTypes = {
        setsData: PropTypes.array.isRequired,
    };

    render() {
        return (
            <div className="col-12 col-md-9 left-box mt-2 mb-3">
                <div className="row mt-1">
                    {this.props.setsData}
                </div>
            </div>
        )
    }
}