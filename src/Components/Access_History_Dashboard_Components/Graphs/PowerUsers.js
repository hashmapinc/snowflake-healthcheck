import React, { Component } from 'react';
import Plotly from 'plotly.js-basic-dist-min';
import createPlotlyComponent from 'react-plotly.js/factory';
import '../../../main.css'

class PowerUsers extends Component {

  render() {

    const PlotlyComponent = createPlotlyComponent(Plotly);
    const useResizeHandler = true;
    const style = { "width": "100%", "height": "100%" };

    const extracted_power_user_data = this.props.power_users_data.map(data_obj => data_obj.data);
    const distinct_queries_count = extracted_power_user_data.map(data_obj => data_obj.DISTINCT_QUERIES_FIRED);
    const unique_users = extracted_power_user_data.map(data_obj => data_obj.USER_NAME);
     

    var trace1 = {
      type: 'scatter',
      y: distinct_queries_count,
      x: unique_users,
      mode: 'markers',
      name: 'Number of distinct queries fired',
      marker: {
        color: '#ff7f0e',
        line: {
          color: 'rgba(156, 165, 196, 1.0)',
          width: 1,
        },
        symbol: 'circle',
        size: 16
      }
    };

    var layout = {
      title: {
        text: 'Power users from the last 30 days',
        xanchor: 'center',
        yanchor: 'top'         
      },
      xaxis: {
        showgrid: true,
        showline: true,
        linecolor: 'rgb(102, 102, 102)',
        title : 'Users', 
        titlefont: { 
          "size": 12, 
          "color": "black" 
        }, 
       "automargin": true,
       tickangle: -45,
        tickfont: {
          font: {
            color: 'rgb(102, 142, 102)'
          }
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
        autotick: true,
        dtick: 2500,
        ticks: 'outside',
        tickcolor: 'rgb(102, 102, 102)'
      },
      margin: {
        l: 100,
        r: 75,
        b: 75,
        t: 75
      },
      autosize: true,
      width: 700,
      height: 700,
      paper_bgcolor: 'rgb(256, 250, 245)',
      plot_bgcolor: 'rgb(254, 247, 234)',
      hovermode: 'closest'
    };


    return (
      <PlotlyComponent data={[trace1]} layout={layout} useResizeHandler={useResizeHandler} style={style} />
    );
  }
}


export default PowerUsers