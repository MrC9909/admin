import React from 'react';
import './header.less';

export default class Header extends React.Component{
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className={'header'}>
                Header
            </div>
        );
    }

}