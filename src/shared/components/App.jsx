import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

export class App extends React.Component {
    constructor(props) {
        super(props);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }

    render() {
        return <div>contwxxwcent</div>
    }
};
