import React, {Component} from 'react';
import {Tab, Tabs} from 'react-bootstrap';
import WarehouseDashboard from './WarehouseDashboard.js';
import DatabaseDashboard from './DatabaseDashboard.js';
import '../main.css'

class GraphTab extends Component {

    render() {
        return (
            <Tabs defaultActiveKey="Database" className="mt-4">
                <Tab eventKey="Warehouse" title="Warehouse">
                    <WarehouseDashboard warehouse_health_data={this.props.warehouse_health_data} warehouse_usage_data={this.props.warehouse_usage_data}/>
                </Tab>
                <Tab eventKey="Database" title="Database">
                    <DatabaseDashboard database_datasize_data={this.props.database_datasize_data}/>
                </Tab>
            </Tabs>
        )
    }
        
}

export default GraphTab;