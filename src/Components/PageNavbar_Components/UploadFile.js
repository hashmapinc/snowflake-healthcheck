import React from 'react';
import '../../main.css'

class UploadFile extends React.Component {

    render() {
        let {file_name} = this.props;
        let file_label = null;

        file_label = file_name ? (<span>{file_name}</span>) : (<span>Download your query results as a CSV and upload here </span>)
        return (
                <div className="custom-file">
                    <input
                    type="file"
                    className="custom-file-input"
                    id="inputGroupFile01"
                    aria-describedby="inputGroupFileAddon01"
                    onChange={this.props.handleInputChange}
                    accept=".csv"
                    />
                    <label className="custom-file-label" htmlFor="inputGroupFile01">
                        {file_label}                  
                    </label>
                </div>
            

            
            
        );
    }
}

export default UploadFile;