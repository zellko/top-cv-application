import React from 'react';
import '../styles/EditInput.css';


/***************************************************************************************   
This component will an input (or textarea) field and a save button to let user
edit the CV. 

It's showed on page when user click on a field. 
The field is hidden, and instead of it, an input or textarea is displayed,
to let the user enter a new value. 
****************************************************************************************/

class EditInput extends React.Component{

	componentDidMount(){
		// Focus input or textarea field when this component is rendered.
		const input = document.querySelector('input');
		const textarea = document.querySelector('textarea');
		if (input) input.focus();
		if (textarea) textarea.focus();
	};

	render(){
		const renderInputOrTextArea = () => {
			// If the field to be edited is the description "desc" field...
			// ... a textarea will be showed instead of a input.

			if (this.props.field === 'desc') {
				let textValue = this.props.value;
				textValue = textValue.replace(/\s+/g, ' ').trim();

				return <textarea field-input={this.props.field} section={this.props.section} workid={this.props.workid} rows="4" cols="50" defaultValue={textValue} onChange={this.props.onInputChange}></textarea>;
			} else {
				return <input field-input={this.props.field} section={this.props.section} workid={this.props.workid} defaultValue={this.props.value} onChange={this.props.onInputChange}></input>;
			}
		};
		
		return(
			<div className='edit-input'>
				{renderInputOrTextArea()}
				<button onClick={this.props.onButtonClicked}>Save</button>
			</div>
		);
	}
}

export { EditInput };