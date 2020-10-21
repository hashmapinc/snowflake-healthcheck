import React, {Component} from 'react';
import StaticGraphs from './StaticGraphs.js';
import UploadedGraphs from './UploadedGraphs.js';
import '../main.css'

class Dashboard extends Component {

    render() {
        if (this.props.file_data) {
            return (
                <div className="mx-auto">
                    <h4>We have a file!</h4>
                    <UploadedGraphs file_data={this.props.file_data}/>
                </div>
                
            )}
        else {
            return <StaticGraphs />
        }
        
    }
}

export default Dashboard