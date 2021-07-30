import React, { Component } from 'react';
import { Tab, Tabs } from 'react-bootstrap';
import WarehouseDashboard from './WarehouseDashboard.js';
import DatabaseDashboard from './DatabaseDashboard.js';
import AccessHistoryDashboard from './AccessHistoryDashboard.js';
import '../main.css'

class GraphTab extends Component {
  componentDidMount() {
    setInterval(function () {
      // this is a short term fix to bad plotly resize handling.
      window.dispatchEvent(new Event('resize'));
    }, 500);
  }

  render() {
    return (
      <Tabs defaultActiveKey="Warehouse" className="mt-4" mountOnEnter={true}>
        <Tab eventKey="Warehouse" title="Warehouse">
          <WarehouseDashboard warehouse_health_data={this.props.warehouse_health_data} warehouse_usage_data={this.props.warehouse_usage_data} />
        </Tab>
        <Tab eventKey="Database" title="Database">
          <DatabaseDashboard database_datasize_data={this.props.database_datasize_data} table_active_storage_data={this.props.table_active_storage_data} />
        </Tab>
        <Tab eventKey="AccessHistory" title="Access History">
          <AccessHistoryDashboard top10_most_accessed_objects_data={this.props.top10_most_accessed_objects_data} bottom10_least_accessed_objects_data={this.props.bottom10_least_accessed_objects_data} power_users_data={this.props.power_users_data} />
        </Tab>
      </Tabs>
    )
  }

}

export default GraphTab;