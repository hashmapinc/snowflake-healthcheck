import React, {Component} from 'react';
import Plotly from 'plotly.js-basic-dist-min';
import createPlotlyComponent from 'react-plotly.js/factory';
import '../../../main.css'

class MostAccessedObjects extends Component {
  
  render() {
    const PlotlyComponent = createPlotlyComponent(Plotly);
    const useResizeHandler = true;
    const style = { "width": "100%", "height": "100%" };

    var table_trace = {
      type: 'bar',
      y: this.props.top10_most_accessed_objects_data.map(data_obj => data_obj.data.DISTINCT_QUERIES_FIRED),
      x: this.props.top10_most_accessed_objects_data.map(data_obj => {
        var objects = data_obj.data.OBJECT_NAME.split('.');
        return `${ objects[2].length > 10 ? objects[2].substring(0,10)+'...' : objects[2]}`
      }) ,
      text: this.props.top10_most_accessed_objects_data.map(data_obj => {
        var objects = data_obj.data.OBJECT_NAME.split('.');
        return `<b>Database</b>: ${objects[0]}<br>
        <b>Schema</b>: ${objects[1]}<br>
        <b>Object Name</b>: ${ objects[2].length > 30 ? objects[2].substring(0,30)+'...' : objects[2]}<br>
        <b>Quried</b>: ${data_obj.data.DISTINCT_QUERIES_FIRED} times`}),
      textposition: 'none',
      hoverinfo: 'text',
      marker: {
        color: '#1f77b4',
        opacity: 0.6,
        line: {
          color: 'rgb(8,48,107)',
          width: 1.5
        }
      }
    };

    var layout = {
      title: 'Most accessed Snowflake objects by query hits - Top 20',
      font:{
        family: 'Raleway, sans-serif'
      },
      showlegend: false,
      xaxis: {
        "title": 'Object Name', 
        "titlefont": { 
          "size": 12, 
          "color": "black" 
        }, 
       "automargin": true,
        tickangle: -45
      },
      yaxis: {
        "title": 'Distinct Queries Fired', 
          "titlefont": { 
            "size": 12, 
            "color": "black" 
          }, 
        "automargin": true,
        zeroline: false,
        gridwidth: 2
      },
      bargap :0.05,
      showlegend: false,
      height: 700,
      width: 700, 
      margin: {
        l: 75,
        r: 75,
        b: 75,
        t: 75
      },
      paper_bgcolor: 'rgb(256, 250, 245)',
      plot_bgcolor: 'rgb(254, 247, 234)',
      hovermode: 'closest'
     };

    return (
      <PlotlyComponent data={[table_trace]} layout={layout} useResizeHandler={useResizeHandler} style={style} />
    );
  }
}


export default MostAccessedObjects