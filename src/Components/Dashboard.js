import React, {Component} from 'react';
import WarehouseHealthUploaded from './Dashboard_Components/Uploaded_Graphs/WarehouseHealthUploaded.js';
import WarehouseUsageUploaded from './Dashboard_Components/Uploaded_Graphs/WarehouseUsageUploaded.js';
import '../main.css'

class Dashboard extends Component {

    render() {
        if (this.props.healthcheck_data) {
            return (
                <div className="mx-auto">
                    <WarehouseHealthUploaded healthcheck_data={this.props.healthcheck_data}/>
                    <WarehouseUsageUploaded healthcheck_data={this.props.healthcheck_data}/>
                </div>
                
            )}
        else {
            return  <div></div>
        }
        
    }
}

export default Dashboard