import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

export default class YoutubeForm extends React.Component {
    constructor(props) {
        super(props);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }

    render() {
        return <form>
                <div className="form-group">
                    <input className="form-control" placeholder="https://youtube.com..." />
                </div>
            </form>

    }
};
