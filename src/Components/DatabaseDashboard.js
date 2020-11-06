import React, {Component} from 'react';
import DatabaseUsage from './Database_Dashboard_Components/Graphs/DatabaseUsage.js';
import TableActiveStorage from './Database_Dashboard_Components/Graphs/TableActiveStorage.js'
import '../main.css'

class DatabaseDashboard extends Component {

    render() {
        if (this.props.database_datasize_data) {
            return (
                <div className="mx-auto">
                    <DatabaseUsage database_datasize_data={this.props.database_datasize_data}/>
                    <TableActiveStorage table_active_storage_data={this.props.table_active_storage_data}/>
                </div>
            )
        } else {
            return <div></div>
        }
            
                    
    }
}

export default DatabaseDashboard