import React from 'react';
import { EditInput } from './EditInput';
import '../styles/WorkExperience.css';

const WorkExperience = (props) => {
	const renderAddTaskButton = (n) => {
		// Render "+ Task" button or Task edit field
		    let isEdit =  props.worksList[n].tasks[1];

		    if (isEdit) {
			return <EditInput field="tasks" section="workExperiences" workid={ n } onButtonClicked={ props.onSaveTask} />;
		} else {
		  		return <button field="tasks" section="workExperiences" workid={ n } onClick={ props.onEditTask} >✚ Task</button>;
		  }
	};

	const renderField= (n, field, workObject) => {
		// Render text field or edit field
		    let isEdit =  props.worksList[n][field][1];

		    if (isEdit) {
			return <EditInput field={ field } section="workExperiences" workid={ n } value={ workObject[field][0] } onButtonClicked={ props.onSaveClick}  onInputChange={ props.onInput} />;
		} else {
		  		return <p iseditable="true" field={ field } section="workExperiences" workid={ n }  onClick={ props.onFieldClick}> { workObject[field][0] } </p>;
		  }
	};

	return(	
		<div className="work-container">
            	{  props.worksList.map( (workExperience, workExperienceIndex) => {
				{return (
					<div key={workExperienceIndex.toString()} className="work" workid={ workExperienceIndex }>
						{ renderField(workExperienceIndex, 'jobTitle', workExperience) }
						{ renderField(workExperienceIndex, 'company', workExperience) }

						<div className="work-date-location">
							{ renderField(workExperienceIndex, 'date', workExperience) }
							{ renderField(workExperienceIndex, 'location', workExperience) }
						</div>
						<ul>
							{ workExperience.tasks[0].map( (task, taskIndex) => {
								return (
									<li  key={taskIndex.toString()} workid={ workExperienceIndex }> 
										{ task } 
										<button onClick={ props.onDeleteTask} workid={ workExperienceIndex } taskid={ taskIndex }>✕</button>
									</li>
								);
							})
							}							
							{ renderAddTaskButton(workExperienceIndex) }
						</ul>
						<button workid={ workExperienceIndex } onClick={ props.onDeleteWorkExperience}>✕</button>
					</div>);
				}
			})
			}
			<button onClick={ props.onAddWorkExperience}>✚ Work Experience</button>
		</div>
	);
};

export  { WorkExperience };