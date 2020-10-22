import React, {Component} from 'react';
import WarehouseHealth from './Dashboard_Components/Graphs/WarehouseHealth.js';
import WarehouseUsage from './Dashboard_Components/Graphs/WarehouseUsage.js';
import '../main.css'

class Dashboard extends Component {

    render() {
        if (this.props.warehouse_health_data) {
            return (
                <div className="mx-auto">
                    <WarehouseHealth warehouse_health_data={this.props.warehouse_health_data}/>
                    <WarehouseUsage warehouse_usage_data={this.props.warehouse_usage_data}/>
                </div>
            )
        } else {
            return <div></div>
        }
            
                    
    }
}

export default Dashboard