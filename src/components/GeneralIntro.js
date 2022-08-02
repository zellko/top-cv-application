import React from 'react';
import { EditInput } from '../components/EditInput';
import '../styles/GeneralIntro.css';


/***************************************************************************************   
This component render the "General Intro" section of the CV: Name, Job title, description.

All the fields can be edited by clicking on them. 
****************************************************************************************/

class GeneralIntro extends React.Component{
   
	render(){
		const renderField = (fieldName) => {
			// Function to render either an text field or input (edit) field.
			let isEditField = this.props.generalState[fieldName][1];

			if (isEditField) {
				  return <EditInput field={fieldName} section="generalIntro" value={this.props.generalState[fieldName][0]} onButtonClicked={this.props.onSaveClick} onInputChange={this.props.onInput} />;
			  } else {
				return <p onClick={this.props.onFieldClick} iseditable='true' field={fieldName}  section="generalIntro">{this.props.generalState[fieldName][0]}</p>;
			}
		  };
		
		return(	
			<div className="general-intro">
				{renderField('name')}
				{renderField('job')}
				{renderField('desc')}
			</div>
		);
	}
}

export { GeneralIntro };