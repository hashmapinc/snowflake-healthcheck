import React from 'react';
import '../../main.css'

class CsvUploader extends React.Component {

    render() {
        let {file_name} = this.props;
        let file_label = null;
        
        if (file_name === "Please upload the .csv file with your query results") {
            file_label = (<span style={{color:"red"}}>{file_name}</span>)
        } else {
            file_label = file_name ? (<span>{file_name}</span>) : (<span>Download your query results as a CSV and upload here </span>)
        }
        return (
                <div className="custom-file">
                    <input
                    type="file"
                    className="custom-file-input"
                    id="inputGroupFile01"
                    aria-describedby="inputGroupFileAddon01"
                    onChange={this.props.handleInputChange}
                    accept=".csv"
                    required
                    />
                    <label className="custom-file-label" htmlFor="inputGroupFile01">
                        {file_label}                  
                    </label>
                </div>
            

            
            
        );
    }
}

export default CsvUploader;