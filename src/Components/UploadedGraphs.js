import React, {Component} from 'react';
import Plotly from 'plotly.js-basic-dist-min';
import createPlotlyComponent from 'react-plotly.js/factory';
import '../main.css'

class UploadedGraphs extends Component {
    // constructor(){
    //     super();
    //     this.state = {
    //         static_data: null
    //     };
    // }

    render() {
        var arr;
        var health = []
        var i;
        for (i=0; i<this.props.file_data.length; i++){
            arr = this.props.file_data[i];
            console.log(arr[0])
        }
        console.log(health)
        

        return <div className="col">
            something
        </div>
        
        }
        
        
    }


export default UploadedGraphs