import React from 'react';
import { EditInput } from '../components/EditInput';
import '../styles/GeneralIntro.css';


/***************************************************************************************   
This component render the "General Intro" section of the CV: Name, Job title, description.

All the fields can be edited by clicking on them. 
****************************************************************************************/

class GeneralIntro extends React.Component{
   
	render(){
		// When an editable field is being edited (EditStatus = true)...
		
		let isEditName = this.props.generalState.name[1];
		let isEditJob = this.props.generalState.job[1];
		let isEditDesc = this.props.generalState.desc[1];

		// ... Render an input element instead of the text to let user enter a new value.
		const renderEditName = () => {
		  if (isEditName) {
				return <EditInput field='name' section="generalIntro" value={this.props.generalState.name[0]} onButtonClicked={this.props.onSaveClick} onInputChange={this.props.onInput} />;
			} else {
		  		return <h1 onClick={this.props.onFieldClick} iseditable='true' field="name"  section="generalIntro">{this.props.generalState.name[0]}</h1>;
		  }
		};

		const renderEditJob = () => {
			if (isEditJob) {
				return <EditInput field='job' section="generalIntro" value={this.props.generalState.job[0]} onButtonClicked={this.props.onSaveClick} onInputChange={this.props.onInput} />;
			} else {
				  return <h4 onClick={this.props.onFieldClick}  iseditable='true' field="job"  section="generalIntro">{this.props.generalState.job[0]}</h4>;
			}
		};

		const renderEditDesc = () => {
			if (isEditDesc) {
				return <EditInput field='desc' section="generalIntro" value={this.props.generalState.desc[0]} onButtonClicked={this.props.onSaveClick} onInputChange={this.props.onInput} />;
			} else {
				  return <p onClick={this.props.onFieldClick} iseditable='true' field="desc"  section="generalIntro">{this.props.generalState.desc[0]}</p>;
			}
		};
		
		return(	
			<div className="general-intro">
				{ renderEditName() }
				{ renderEditJob() }
				{ renderEditDesc() }
			</div>
		);
	}
}

export { GeneralIntro };