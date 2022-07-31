import './styles/App.css';
import React from 'react';
import { GeneralIntro } from './components/GeneralIntro';
import { GeneralLink } from './components/GeneralLink';
import { Section } from './components/Section';
import { Skills } from './components/Skills';

class App extends React.Component {
	constructor(props) {
		super(props);

		this.openEditField = this.openEditField.bind(this);
		this.hideEditField = this.hideEditField.bind(this);
		this.modifyState = this.modifyState.bind(this);
		this.saveNewSkill = this.saveNewSkill.bind(this);
		this.openSkillsEditField = this.openSkillsEditField.bind(this);
		// Create a state object with some default values...
		// ... State object properties store text value for every section of the CV (Intro, link, work experience, ...).
		// ... Each properties is an array with [textValue, EditStatus, defaultValue]
		// ... If EditStatus = True, the component is being edited, text field is changed for a input field
		// ... Which allow user to enter a new text value.

		this.state = {
			generalIntro: {
				name: ['John doe', false, 'Full Name'],
				job: ['Web Developer', false, 'Job Title'],
				desc: [`Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
				Proin id placerat est. Mauris sed lacus mi. Ut vel mattis purus. 
				Suspendisse mollis tincidunt arcu a vehicula.`, false, 'Short Description'],
			},
			generalLink: {
				mail: ['john.doe@mail.com', false, 'mail@mail.com'],
				number: ['000 123 456 789', false, '000 123 456 789'],
				location: ['New York, USA', false, 'City, Country'],
				git: ['johndoe', false, 'johndoe'],
			},
			skills: [['Web Dev', 'CAD'], false],
		};
	}

	hideEditField () {
		// Function to remove all the "edit" input and turn to false EditStatus of the state object. 
		// ... It's used when user click outside the input or on another editable field.

		// Restore state value to their previous one (no change).
		this.setState({
			generalIntro: {
				name: [this.state.generalIntro.name[0], false, 'Full Name'],
				job: [this.state.generalIntro.job[0], false, 'Job Title'],
				desc: [this.state.generalIntro.desc[0], false, 'Short Description'],
			},
			generalLink: {
				mail: [this.state.generalLink.mail[0], false, 'mail@mail.com'],
				number: [this.state.generalLink.number[0], false, '000 123 456 789'],
				location: [this.state.generalLink.location[0], false, 'City, Country'],
				git: [this.state.generalLink.git[0], false, 'johndoe'],
			},
			skills: [this.state.skills[0], false],
		  });
	};

	openEditField(e){
		// Function to "mark" a text field has being edited
		// ... It's called when user click on an editable text field.

		// If any another field is being modified, stop editing it (text field are modified one by one). 
		this.hideEditField();

		const fieldSection = e.target.getAttribute('section'); // Get section of the CV being modified
		const fieldName = e.target.getAttribute('field'); // Get name of field being modified

		// Get the field values [Text, EditStatus] from state object.
		let fieldState = [...this.state[fieldSection][fieldName]];

		if (!fieldState[1]){
			// Mark the field as being edited EditStatus = true...
			// ...Which show the edit input field on the DOM
			fieldState[1] = true;

			this.setState(prevState => ({
				[fieldSection]: {
				  ...prevState[fieldSection],
				  [fieldName]: fieldState
				},
			}));
		};
	}

	modifyState(){
		// Function to save user entry into the state variable. 
		// ... user entry in saved each time he type on the field or when he click on "save" button.

		// Get the new text value from the input field.
		const input = document.querySelector('[field-input]');
		const value = input.value.trim();

		const fieldSection = input.getAttribute('section');  // Get section of the CV being modified
		const fieldName = input.getAttribute('field-input'); // Get name of field being modified

		// Get the field values [Text, EditStatus, defaultValue] from state object.
		let fieldState = [...this.state[fieldSection][fieldName]];

		if (value){
			// Update state object with new value entered by the user
			fieldState[0] = value;

			this.setState(prevState => ({
				[fieldSection]: {
				  ...prevState[fieldSection],
				  [fieldName]: fieldState
				},
			}));

		} else {
			// If input is empty, show the default value
			fieldState[0] = fieldState[2];
			
			this.setState(prevState => ({
				[fieldSection]: {
				  ...prevState[fieldSection],
				  [fieldName]: fieldState
				},
			}));
		};
	};

	openSkillsEditField(){
		// Function to "mark" a skill list has being edited
		// ... It's called when user click on the "+" button.

		// If any another field is being modified, stop editing it (text field are modified one by one). 
		this.hideEditField();

		let prevSkillsList = [...this.state.skills]; // Get a copy of skills array from the state variable
		prevSkillsList[1] = true; // Set the edit status as true to show edit input field

		//Update state object
		this.setState({
			skills: prevSkillsList,
		});
	};


	saveNewSkill(){
		// Function to add a new skill to the skills section
		
		// Get the new skill from the input field.
		const input = document.querySelector('[field-input="skills"]');
		const value = input.value.trim();
		
		const fieldSection = input.getAttribute('section');  // Get section of the CV being modified
		if (fieldSection !== 'skills') return; 

		let prevSkillsList = [...this.state.skills]; // Get a copy of skills array from the state variable

		if (value){
			prevSkillsList[0].push(value); // Update the copy array with the new value
			prevSkillsList[1] = false; // Set the edit status as false to remove the edit input field

			//Update state object with new value entered by the user.
			this.setState({
				skills: prevSkillsList,
			});
		
		} else {
			//If input field is empty, Set the edit status as false to remove the edit input field.
			prevSkillsList[1] = false;

			this.setState({
				skills: prevSkillsList,
			});
		};
	};

	render(){	

	  return (
	  	<div className="App">
	  		<div className="App-header">
					{/* NOTE: DRAFT HEADER */}
	  			<h2>CV React</h2>
					<h3>Instruction:</h3>
					<ul>
						<li> Click on fields to edit them! </li>
						<li> Save your CV in PDF using "Save CV" Button </li>
					</ul>
	  		</div>
				<div className="App-cv">
					<div className="general">
						<GeneralIntro  generalState={ this.state.generalIntro } onFieldClick={ this.openEditField } onSaveClick={ this.hideEditField } onInput={ this.modifyState }/>
						<GeneralLink  generalState={ this.state.generalLink } onFieldClick={ this.openEditField } onSaveClick={ this.hideEditField } onInput={ this.modifyState }/>
					</div>
					<Section sectionName="Skills" />
					<Skills skillsList = {this.state.skills} onSaveClick={ this.saveNewSkill }  onAddTask = { this.openSkillsEditField } />
	  		</div>
	  	</div>
	  );
	}
}

export default App;
