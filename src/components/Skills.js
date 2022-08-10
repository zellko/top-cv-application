import React from 'react';
import { EditInput } from './EditInput';
import '../styles/Skills.css';


/***************************************************************************************   
This component render the "Skills" section of the CV.

User can add skills by clicking on the "+" AddSkill button
****************************************************************************************/

const Skills = (props) => {
	  
	// When user click on the "+" AddSkill button...
	// ... App.js will set the skills state object as "editing"...
	let addSkill =  props.skillsList[1];

	// ... so an input element will be rendered instead of the "+" AddSkill button to let user enter a new value.
	const renderAddButton = () => {
		  if (addSkill) {
			return <EditInput field='skills' section="skills" onButtonClicked={ props.onSaveClick} />;
		} else {
		  		return <button  section="skills" onClick={ props.onAddSkill}>✚</button>;
		  }
	};

	return(	
		<div className="skills-container">
			{  props.skillsList[0].map( (task, index) => {
				return (
					<div key={index.toString()} className="skills" iseditable='true'>
						<p p-id={`${index}`}> { task } </p>
						<button skillid = { index } onClick={ props.onDeleteSkill}>✕</button>
					</div>);
			})
			}
			{ renderAddButton() }
		</div>
	);

};

export { Skills };