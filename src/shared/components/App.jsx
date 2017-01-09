import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import {connect} from 'react-redux'
import * as actionCreators from '../actions'

import YoutubeForm from './YoutubeForm'

class AppCmp extends React.Component {
    constructor(props) {
        super(props);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }

    render() {
        return <div className="container">
            <div className="row">
                <div className="col-md-6 col-md-offset-3">
                    <h2>Enter a youtube URL</h2>
                    <YoutubeForm />
                </div>
            </div>
        </div>
    }
};

function mapStateToProps(state) {
    return {}
}

export const App = connect(mapStateToProps, actionCreators)(AppCmp);