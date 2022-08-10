import userEvent from '@testing-library/user-event';
import React, {useEffect} from 'react';
import '../styles/EditInput.css';


/***************************************************************************************   
This component will an input (or textarea) field and a save button to let user
edit the CV. 

It's showed on page when user click on a field. 
The field is hidden, and instead of it, an input or textarea is displayed,
to let the user enter a new value. 
****************************************************************************************/

const EditInput = (props) => {
	useEffect(()=>{
		// Focus input or textarea field when this component is rendered.
		const input = document.querySelector('input');
		const textarea = document.querySelector('textarea');
		if (input) input.focus();
		if (textarea) textarea.focus();
	}, []);

	const renderInputOrTextArea = () => {
		// If the field to be edited is the description "desc" field...
		// ... a textarea will be showed instead of a input.

		if (props.field === 'desc') {
			let textValue =  props.value;
			textValue = textValue.replace(/\s+/g, ' ').trim();

			return <textarea field-input={ props.field} section={ props.section} workid={ props.workid} educationid={ props.educationid} rows="4" cols="50" defaultValue={textValue} onChange={ props.onInputChange}></textarea>;
		} else {
			return <input field-input={ props.field} section={ props.section} workid={ props.workid} educationid={ props.educationid} defaultValue={ props.value} onChange={ props.onInputChange}></input>;
		}
	};


	return(
		<div className='edit-input'>
			{renderInputOrTextArea()}
			<button onClick={ props.onButtonClicked}>Save</button>
		</div>
	);
};

export { EditInput };