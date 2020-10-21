import React, {Component} from 'react';
import '../../../main.css'

class StaticGraphs extends Component {
    constructor(){
        super();
        this.state = {
            static_data: null
        };
    }

    render() {
        let {static_data} = this.state;
        return <h4>{static_data}</h4>
        
    }
}


export default StaticGraphs