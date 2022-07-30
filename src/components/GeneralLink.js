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

		// When an editable field is being edited (EditStatus = true)...
		let isEditMail = this.props.generalState.mail[1];
		let isEditNumber = this.props.generalState.number[1];
		let isEditLocation = this.props.generalState.location[1];
		let isEditGit = this.props.generalState.git[1];

		// ... Render an input element instead of the text to let user enter a new value.
		const renderEditMail = () => {
		  if (isEditMail) {
				return <EditInput field='mail' section="generalLink" value={this.props.generalState.mail[0]} onButtonClicked={this.props.onSaveClick} onInputChange={this.props.onInput} />;
			  } else {
				return <p onClick={this.props.onFieldClick} iseditable='true' field="mail" section="generalLink"> { this.props.generalState.mail[0] } </p>;
		  }
		};

		const renderEditNumber = () => {
			if (isEditNumber) {
				return <EditInput field='number' section="generalLink" value={this.props.generalState.number[0]} onButtonClicked={this.props.onSaveClick} onInputChange={this.props.onInput}  />;
			} else {
				return <p onClick={this.props.onFieldClick}  iseditable='true' field="number" section="generalLink"> { this.props.generalState.number[0] } </p>;
			}
		};

		const renderEditLoc = () => {
			if (isEditLocation) {
				return <EditInput field='location' section="generalLink" value={this.props.generalState.location[0]} onButtonClicked={this.props.onSaveClick} onInputChange={this.props.onInput}  />;
			} else {
				return <p onClick={this.props.onFieldClick}  iseditable='true' field="location" section="generalLink"> { this.props.generalState.location[0] } </p>;
			}
		};

		const renderEditGit = () => {
			if (isEditGit) {
				return <EditInput field='git' section="generalLink" value={this.props.generalState.git[0]} onButtonClicked={this.props.onSaveClick} onInputChange={this.props.onInput}  />;
			} else {
				return <p onClick={this.props.onFieldClick}  iseditable='true' field="git" section="generalLink"> { this.props.generalState.git[0] } </p>;
			}
		};

		return(	
			<div className="general-link">
				<ul>
					<li>
						{ renderEditMail() }
						<img src={ iconMail } alt="Mail icon"/>
					</li>
					<li>
						{ renderEditNumber() }
						<img src={ iconPhone } alt="Phone icon"/>
					</li>
					<li>
						{ renderEditLoc() }
						<img src={ iconLocation } alt="Map marker icon"/>
					</li>
					<li>
						{ renderEditGit() }
						<img src={ iconGit } alt="Github icon"/>
					</li>
				</ul>
			    </div>
		);
	}
}

export { GeneralLink };