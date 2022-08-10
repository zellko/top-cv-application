import React from 'react';
import { EditInput } from './EditInput';
import '../styles/Education.css';

const Education = (props) => {

	const renderField= (n, field, workObject) => {
		// Render text field or edit field
		let isEdit =  props.educationList[n][field][1];

		if (isEdit) {
			return <EditInput field={ field } section="education" educationid={ n } value={ workObject[field][0] } onButtonClicked={ props.onSaveClick}  onInputChange={ props.onInput} />;
		} else {
			  return <p iseditable='true' field={ field } section="education" educationid={ n }  onClick={ props.onFieldClick}> { workObject[field][0] } </p>;
	  }
	};

	return(
		<div className='education-container'>
			{ props.educationList.map((education, educationIndex)=>{
				{return(
					<div className='education' educationid = { educationIndex } key={ educationIndex.toString()}>
						{ renderField(educationIndex, 'eduTitle', education) }
						{ renderField(educationIndex, 'school', education) }
						{ renderField(educationIndex, 'date', education) }
						<button educationid = { educationIndex } onClick={ props.onDeleteEducation}>✕</button>
					</div>
				);
				}
			})}
			<button onClick={ props.onAddEducation}>✚ Education</button>			
		</div>
	);
	
};

export { Education };