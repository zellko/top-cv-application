import './styles/App.css';
import React from 'react';
import { GeneralIntro } from './components/GeneralIntro';
import { GeneralLink } from './components/GeneralLink';
import { Section } from './components/Section';
import { Skills } from './components/Skills';
import { WorkExperience } from './components/WorkExperience';
import { Education } from './components/Education';

class App extends React.Component {
	constructor(props) {
		super(props);

		this.editField = (() => {
			// Method to:
			// - Show an "edit field" (HTML input) instead of the text field. To allow user to modify text value of all CV fields.
			// - Hide the "edit field" (HTML input) and show back the text field.
			// - Save user input to the state variable. 

			const show = (e) =>{
				// Function to "mark" a text field has being edited
				// ... It's called when user click on an editable text field, Add Skills, Add Tasks buttons.

				// If any another field is being modified, stop editing it (text field are modified one by one). 
				hide();

				const fieldSection = e.target.getAttribute('section'); // Get section of the CV being modified
				const fieldName = e.target.getAttribute('field'); // Get name of field being modified
				let prevObject;
				
				switch (fieldSection) {
				case 'workExperiences':
					const workExpNumber = e.target.getAttribute('workid'); // Get ID of work experience to be modified

					prevObject= [...this.state.workExperiences]; // Get a copy of work experience array from the state variable
					prevObject[workExpNumber][fieldName][1] = true; // Set the edit status as true to show edit input field
					break;

				case 'education':
					const educationNumber = e.target.getAttribute('educationid'); // Get ID of work experience to be modified

					prevObject= [...this.state.education]; // Get a copy of work experience array from the state variable
					prevObject[educationNumber][fieldName][1] = true; // Set the edit status as true to show edit input field
					break;
				case 'skills':
					prevObject = [...this.state.skills]; // Get a copy of skills array from the state variable
					prevObject[1] = true; // Set the edit status as true to show edit input field
					break;
				
				default: // For General Intro / General Link section: 
					prevObject = {...this.state[fieldSection]}; // Get a copy of general object from the state variable
					prevObject[fieldName][1] = true; // Set the edit status as true to show edit input field
					break;
				}
				
				//Update state object using modified copy
				this.setState({
					[fieldSection]: prevObject,
				});		
			};

			const hide = () =>{
				// Function to remove all "edit" input field

				let prevGeneralIntro = {...this.state.generalIntro}; // Get a copy of generalIntro object from the state variable
				// Set editStatus has false to hide editField on the DOM.
				for (const key in prevGeneralIntro) {
					prevGeneralIntro[key][1] = false;
				}

				let prevGeneralLink = {...this.state.generalLink}; // Get a copy of generalLink object from the state variable
				// Set editStatus has false to hide editField on the DOM.
				for (const key in prevGeneralLink) {
					prevGeneralLink[key][1] = false;
				}

				let prevWorkExp = [...this.state.workExperiences]; // Get a copy of workExperiences array from the state variable
				// Set editStatus has false to hide editField on the DOM.
				for (const n in prevWorkExp) {
					prevWorkExp[n].jobTitle[1] = false;
					prevWorkExp[n].company[1] = false;
					prevWorkExp[n].date[1] = false;
					prevWorkExp[n].location[1] = false;
					prevWorkExp[n].tasks[1] = false;
				}

				let prevEducation = [...this.state.education]; // Get a copy of workExperiences array from the state variable
				// Set editStatus has false to hide editField on the DOM.
				for (const n in prevEducation) {
					prevEducation[n].eduTitle[1] = false;
					prevEducation[n].school[1] = false;
					prevEducation[n].date[1] = false;
				}

				// Update state object
				this.setState({
					generalIntro: prevGeneralIntro,
					generalLink: prevGeneralLink,
					skills: [this.state.skills[0], false],
					workExperiences: prevWorkExp,
					education: prevEducation,
				});
			};
	
			const save = () =>{
				// Function to save user entry into the state variable. 
				// ... user entry in saved each time he type on the field or when he click on "save" button.

				// Get the new text value from the input field.
				const input = document.querySelector('[field-input]');
				const value = input.value.trim();

				const fieldSection = input.getAttribute('section');  // Get section of the CV being modified
				const fieldName = input.getAttribute('field-input'); // Get name of field being modified
				let prevObject;

				switch (fieldSection) {
				case 'workExperiences':
					const workExpId = input.getAttribute('workid'); // Get ID of work experience to being modified

					prevObject= [...this.state.workExperiences]; // Get a copy of work experience object from the state variable

					if (value){
						// If a value is entered, update state object copy with new value entered by the user
						prevObject[workExpId][fieldName][0] = value;

					} else {
						// else (input is empty), show the default value
						prevObject[workExpId][fieldName][0] = prevObject[workExpId][fieldName][2];
					};			
					break;

				case 'education':
					const sectionid = input.getAttribute('educationid'); // Get ID of work experience to being modified

					prevObject= [...this.state.education]; // Get a copy of work experience object from the state variable

					if (value){
						// If a value is entered, update state object copy with new value entered by the user
						prevObject[sectionid][fieldName][0] = value;

					} else {
						// else (input is empty), show the default value
						prevObject[sectionid][fieldName][0] = prevObject[sectionid][fieldName][2];
					};	
					break;

				default: // For General Intro / General Link section: 
					prevObject = {...this.state[fieldSection]}; // Get a copy of general object from the state variable

					if (value){
						// If a value is entered, update state object copy with new value entered by the user
						prevObject[fieldName][0] = value;
					} else {
						// If input is empty, Update state object copy with the default value
						prevObject[fieldName][0] = prevObject[fieldName][2];
					};
					break;
				}

				// Update state object using modified copy
				this.setState({
					[fieldSection]: prevObject,
				});
			};

			return { show, hide, save };
		})();

		this.skill = (() => {
			// Method to save or delete a skill from the "Skills" section of the CV.
	
			const saveSkill = () =>{
				// Get the new skill from the input field.
				const input = document.querySelector('[field-input="skills"]');
				const value = input.value.trim();
		
				const fieldSection = input.getAttribute('section');  // Get section of the CV being modified
				if (fieldSection !== 'skills') return; 

				let prevSkillsList = [...this.state.skills]; // Get a copy of skills array from the state variable

				if (value){
					// If a value is entered, update state object copy with new value entered by the user
					prevSkillsList[0].push(value); // Update the copy array with the new skill
					prevSkillsList[1] = false; // Set the edit status as false to remove the edit input field
	
				} else {
					// else, discard the changes and close edit field. 
					prevSkillsList[1] = false;
				};

				//Update state object using modified copy
				this.setState({
					skills: prevSkillsList,
				});
			};
	
			const deleteSkill = (e) =>{			
				// Get ID of the skill to be deleted
				const skillId = e.target.getAttribute('skillid'); // Get ID of the work experience
	
				let prevSkills = [...this.state.skills]; // Get a copy of skill array from the state variable
	
				prevSkills[0].splice(skillId, 1); // Remove task for the copy array
	
				// Update state object using modified copy
				this.setState({
					skills: prevSkills,
				});

			};

			return { saveSkill, deleteSkill };
		})();

		this.workExperience = (() => {
			// Method to add or delete a "work experience" from the "Work Experience" section of the CV.
	
			const addWorkExperience = () =>{
				// Function to add a "work experience" from Work Experience Section

				const defaultWorkExperience = {
					jobTitle: ['Job Title', false, 'Job Title'],
					company: ['Company Name', false, 'Company Name'],
					date: ['Working date', false, 'Working date'],
					location: ['City, Country', false, 'City, Country'],
					tasks: [['Main Task 1', 'Main task 2'], false],
				};

				let prevWorkExp= [...this.state.workExperiences]; // Get a copy of workExperience array from the state variable
		
				prevWorkExp.push(defaultWorkExperience); // Add default work experience to the copy array. 
		
				// Update state object using modified copy
				this.setState({
					workExperiences: prevWorkExp,
				});
			};
		
			const deleteWorkExperience = (e) =>{
				// Function to delete a "work experience" from Work Experience Section
		
				// Get ID of the work experience to be deleted
				const workExpId = e.target.getAttribute('workid');
		
				let prevWorkExp= [...this.state.workExperiences]; // Get a copy of workExperience array from the state variable
		
				prevWorkExp.splice(workExpId, 1); // Remove the work experience from the copy array
		
				// Update state object using modified copy
				this.setState({
					workExperiences: prevWorkExp,
				});
			};

			return { addWorkExperience, deleteWorkExperience };
		})();

		this.task = (() => {
			// Method to save or delete a task from the "Work Experience" section of the CV.
	
			const saveTask = () =>{
				// Function to save a task to the Work Experience Section
	
				// Get the new task from the input field.
				const input = document.querySelector('[field-input="tasks"]');
				const workExpNumber = input.getAttribute('workid');
				const value = input.value.trim();
			
				const fieldSection = input.getAttribute('section');  // Get section of the CV being modified
				if (fieldSection !== 'workExperiences') return; 
	
				let prevWorkExp= [...this.state.workExperiences]; // Get a copy of work experience array from the state variable
			
				if (value){
					// If a value is entered, update state object copy with new value entered by the user
					prevWorkExp[workExpNumber].tasks[0].push(value); // Update the copy array with the new value
					prevWorkExp[workExpNumber].tasks[1] = false; // Set the edit status as false to remove edit input field		
				} else {
					// else, discard the changes and close edit field. 
					prevWorkExp[workExpNumber].tasks[1] = false; // Set the edit status as remove edit input field
				};

				// Update state object using modified copy
				this.setState({
					workExperiences: prevWorkExp,
				});
			};
	
	
			const deleteTask = (e) =>{
				// Function to delete a task from Work Experience Section
	
				// Get ID of the work experience task to be deleted
				const workExpId = e.target.getAttribute('workid'); // Get ID of the work experience
				const taskId = e.target.getAttribute('taskid'); // Get ID of the task
	
				let prevWorkExp= [...this.state.workExperiences]; // Get a copy of work experience object from the state variable
	
				prevWorkExp[workExpId].tasks[0].splice(taskId, 1); // Remove task for the copy array
	
				// Update state object using modified copy
				this.setState({
					workExperiences: prevWorkExp,
				});
			};

			return { saveTask, deleteTask };
		})();

		this.education = (() => {
			// Method to add or delete an "education" box from the "Education" section of the CV.
	
			const addEducation = () =>{

				const defaultEducation = {
					eduTitle: ['School Title', false, 'School Title'],
					school: ['School Name', false, 'School Name'],
					date: ['Schooling date', false, 'Schooling date'],
				};

				let prevEducation= [...this.state.education]; // Get a copy of education array from the state variable
		
				prevEducation.push(defaultEducation); // Add default education object to the copy array. 
		
				// Update state object using modified copy
				this.setState({
					education: prevEducation,
				});
			};
		
			const deleteEducation = (e) =>{
		
				// Get ID of the work experience to be deleted
				const sectionid = e.target.getAttribute('educationid');
		
				let prevEducation= [...this.state.education]; // Get a copy of education array from the state variable
		
				prevEducation.splice(sectionid, 1); // Remove default education object to the copy array. 
		
				// Update state object using modified copy
				this.setState({
					education: prevEducation,
				});
			};

			return { addEducation, deleteEducation };
		})();
		
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
			workExperiences: [{
				jobTitle: ['R&D specialist', false, 'Job Title'],
				company: ['Some Company SA', false, 'Company Name'],
				date: ['2021 - 2022', false, 'Working date'],
				location: ['New York, USA', false, 'City, Country'],
				tasks: [['Task1', 'Task2'], false],
			}, {
				jobTitle: ['Associate R&D specialist', false, 'Job Title'],
				company: ['Some Company SA', false, 'Company Name'],
				date: ['2015 - 2021', false, 'Working date'],
				location: ['New York, USA', false, 'City, Country'],
				tasks: [['Task3', 'Task4'], false],
			},
			],
			education: [{
				eduTitle: ['Bachelor of Engineering', false, 'School Title'],
				school: ['National School of Engineering, Chicago', false, 'School Name'],
				date: ['2014 - 2015', false, 'Schooling date'],
			}, {
				eduTitle: ['Car Mechanician', false, 'School Title'],
				school: ['Mechanical School of Chicago', false, 'School Name'],
				date: ['2011 - 2014', false, 'Schooling date'],
			},
			],
		};
	}

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
					<div className="general-container">
						<GeneralIntro  generalState={ this.state.generalIntro } 
							onFieldClick={ this.editField.show } onSaveClick={ this.editField.hide } onInput={ this.editField.save }/>
						<GeneralLink  generalState={ this.state.generalLink } 
							onFieldClick={ this.editField.show } onSaveClick={ this.editField.hide } onInput={ this.editField.save }/>
					</div>
					<Section sectionName="Skills" />
					<Skills skillsList = {this.state.skills} 
						onSaveClick={ this.skill.saveSkill } 
						onDeleteSkill={ this.skill.deleteSkill } 
						onAddSkill = { this.editField.show } />
					<Section sectionName="Work Experience" />
					<WorkExperience worksList={this.state.workExperiences} 
						onFieldClick={ this.editField.show } onSaveClick={ this.editField.hide } onInput={ this.editField.save }
						onAddWorkExperience={ this.workExperience.addWorkExperience } onDeleteWorkExperience={ this.workExperience.deleteWorkExperience }
						onEditTask={ this.editField.show } onDeleteTask={ this.task.deleteTask } onSaveTask={ this.task.saveTask }
					/>
					<Section sectionName="Education" />
					<Education educationList={this.state.education}
						onFieldClick={ this.editField.show } onSaveClick={ this.editField.hide } onInput={ this.editField.save } 
						onAddEducation={ this.education.addEducation } onDeleteEducation={ this.education.deleteEducation }
					/>
	  		</div>
	  	</div>
	  );
	}
}

export default App;
