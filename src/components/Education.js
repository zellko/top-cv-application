import React from 'react';
import { EditInput } from './EditInput';
import '../styles/Education.css';

class Education extends React.Component{

	render(){

		const renderField= (n, field, workObject) => {
			// Render text field or edit field
		    let isEdit = this.props.educationList[n][field][1];

		    if (isEdit) {
				return <EditInput field={ field } section="education" educationid={ n } value={ workObject[field][0] } onButtonClicked={this.props.onSaveClick}  onInputChange={this.props.onInput} />;
			} else {
		  		return <p className='iseditable' field={ field } section="education" educationid={ n }  onClick={this.props.onFieldClick}> { workObject[field][0] } </p>;
		  }
		};

		return(
			<div className='education-container'>
				{this.props.educationList.map((education, educationIndex)=>{
					{return(
						<div className='education' educationid = { educationIndex } key={ educationIndex.toString()}>
							{ renderField(educationIndex, 'eduTitle', education) }
							{ renderField(educationIndex, 'school', education) }
							{ renderField(educationIndex, 'date', education) }
							<button educationid = { educationIndex } onClick={this.props.onDeleteEducation}>✕</button>
						</div>
					);
					}
				})}
				<button onClick={this.props.onAddEducation}>✚ Education</button>			
			</div>
		);
	}
}

export { Education };