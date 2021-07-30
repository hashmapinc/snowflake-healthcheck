import React, { Component } from 'react';
import MostAccessedObjects from './Access_History_Dashboard_Components/Graphs/MostAccessedObjects.js';
import LeastAccessedObjects from './Access_History_Dashboard_Components/Graphs/LeastAccessedObjects.js';
import PowerUsers from './Access_History_Dashboard_Components/Graphs/PowerUsers.js';
import '../main.css'

class AccessHistoryDashboard extends Component {

    render() {
        // if (this.props.database_datasize_data) {

        // } else {
        //     return <div></div>
        // }

        return (
            <p>
                <div className="mx-auto">
                    <div>
                        <p>
                            <MostAccessedObjects top10_most_accessed_objects_data={this.props.top10_most_accessed_objects_data} />
                        </p>
                        <p>
                            <LeastAccessedObjects bottom10_least_accessed_objects_data={this.props.bottom10_least_accessed_objects_data} />
                        </p>
                    </div>
                    <div>
                        <p>
                            <PowerUsers power_users_data={this.props.power_users_data} />
                        </p>
                    </div>
                </div>
            </p>
        )

    }
}

export default AccessHistoryDashboard