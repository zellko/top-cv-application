import React from 'react';
import { EditInput } from '../components/EditInput';
import '../styles/GeneralIntro.css';


/***************************************************************************************   
This component render the "General Intro" section of the CV: Name, Job title, description.

All the fields can be edited by clicking on them. 
****************************************************************************************/

const GeneralIntro = (props) => {
   
	const renderField = (fieldName) => {
		// Function to render either an text field or input (edit) field.
		let isEditField =  props.generalState[fieldName][1];

		if (isEditField) {
				  return <EditInput field={fieldName} section="generalIntro" value={ props.generalState[fieldName][0]} onButtonClicked={ props.onSaveClick} onInputChange={ props.onInput} />;
			  } else {
			return <p onClick={ props.onFieldClick} iseditable='true' field={fieldName}  section="generalIntro">{ props.generalState[fieldName][0]}</p>;
		}
		  };
		
	return(	
		<div className="general-intro">
			{renderField('name')}
			{renderField('job')}
			{renderField('desc')}
		</div>
	);
	
};

export { GeneralIntro };