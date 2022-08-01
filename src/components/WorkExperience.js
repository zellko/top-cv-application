import React from 'react';
import { EditInput } from './EditInput';
import '../styles/WorkExperience.css';

class WorkExperience extends React.Component{
	render(){
		const renderAddTaskButton = (n) => {
			// Render "+ Task" button or Task edit field
		    let isEdit = this.props.worksList[n].tasks[1];

		    if (isEdit) {
				return <EditInput field="tasks" section="workExperiences" workid={ n } onButtonClicked={this.props.onSaveTask} />;
			} else {
		  		return <button field="tasks" section="workExperiences" workid={ n } onClick={this.props.onEditTask} >✚ Task</button>;
		  }
		};

		const renderField= (n, field, workObject) => {
			// Render text field or edit field
		    let isEdit = this.props.worksList[n][field][1];

		    if (isEdit) {
				return <EditInput field={ field } section="workExperiences" workid={ n } value={ workObject[field][0] } onButtonClicked={this.props.onSaveClick}  onInputChange={this.props.onInput} />;
			} else {
		  		return <p className='iseditable' field={ field } section="workExperiences" workid={ n }  onClick={this.props.onFieldClick}> { workObject[field][0] } </p>;
		  }
		};

		return(	
			<div className="work-container">
            	{ this.props.worksList.map( (workExperience, workExperienceIndex) => {
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
											<button onClick={this.props.onDeleteTask} workid={ workExperienceIndex } taskid={ taskIndex }>✕</button>
										</li>
									);
								})
								}							
								{ renderAddTaskButton(workExperienceIndex) }
							</ul>
							<button onClick={this.props.onDeleteWorkExperience}>✕</button>
						</div>);
					}
				})
				}
				<button onClick={this.props.onAddWorkExperience}>✚ Work Experience</button>
			</div>
		);
	}
}

export  { WorkExperience };