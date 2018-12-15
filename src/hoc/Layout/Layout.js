import React, {Component} from 'react';

export default class Layout extends Component{
    constructor(){
        super();
    }

    render(){
        return (
            <div>Layout
                <main>
                    {this.props.children}
                </main>
            </div>
        );
    }
}