import React from 'react';
import { EditInput } from '../components/EditInput';
import '../styles/GeneralLink.css';
import iconMail from '../img/email.svg';
import iconPhone from '../img/phone.svg';
import iconLocation from '../img/map-marker.svg';
import iconGit from '../img/github.svg';
/***************************************************************************************   
This component render the "General Link" section of the CV: mail, number location and github link.

All the fields can be edited by clicking on them. 
****************************************************************************************/

class GeneralLink extends React.Component{

	render(){
		const renderField = (fieldName) => {
			// Function to render either an text field or input (edit) field.
			let isEditField = this.props.generalState[fieldName][1];

			if (isEditField) {
				return <EditInput field={fieldName} section="generalLink" value={this.props.generalState[fieldName][0]} onButtonClicked={this.props.onSaveClick} onInputChange={this.props.onInput} />;
			  } else {
				return <p onClick={this.props.onFieldClick} iseditable='true' field={fieldName} section="generalLink"> { this.props.generalState[fieldName][0] } </p>;
			}
		  };

		return(	
			<div className="general-link">
				<ul>
					<li>
						{ renderField('mail') }
						<img src={ iconMail } alt="Mail icon"/>
					</li>
					<li>
						{ renderField('number') }
						<img src={ iconPhone } alt="Phone icon"/>
					</li>
					<li>
						{ renderField('location') }
						<img src={ iconLocation } alt="Map marker icon"/>
					</li>
					<li>
						{ renderField('git') }
						<img src={ iconGit } alt="Github icon"/>
					</li>
				</ul>
			    </div>
		);
	}
}

export { GeneralLink };