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
        let downloadingMessage = ""
        let errorMessage = ""

        if(this.props.isDownloading){
            downloadingMessage = <h4>Downloading ...</h4>;
        }
        if(this.props.isError){
            errorMessage = <h4>An error occured</h4>;
        }

        return <div className="container">
            <div className="row">
                <div className="col-md-6 col-md-offset-3">
                    <h2>Enter a youtube URL</h2>
                    {errorMessage}

                    <YoutubeForm downloadVideo={this.props.downloadVideoAction} />

                    {downloadingMessage}
                </div>
            </div>
        </div>
    }
};

function mapStateToProps(state) {
    return {
        isDownloading: state.downloader.get('isDownloading'),
        isError: state.downloader.get('isError')
    }
}

export const App = connect(mapStateToProps, actionCreators)(AppCmp);