import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

export default class YoutubeForm extends React.Component {
    constructor(props) {
        super(props);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }

    _handleSubmit(e){
        e.preventDefault()
        let url = this.refs.videoId.value
        this.props.downloadVideo(url)
    }

    render() {
        return <form onSubmit={this._handleSubmit.bind(this)}>
                <div className="form-group">
                    <input ref="videoId"
                           className="form-control"
                           placeholder="https://youtube.com..." />
                </div>
            </form>

    }
};
