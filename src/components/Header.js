import React from 'react';
import '../styles/Header.css';

const Header = (props) => {
	return(
		<div className="App-header">
			<h2>CV React</h2>
			<h3>Instruction:</h3>
			<ul>
				<li> Click on fields to edit them! </li>
			</ul>
			<div className='btn-edit-preview'>
				<div className='btn-slider'>
				</div>
				<div className='btn-edit' onClick = {  props.onEditClick }>
					<p>Edit CV</p>
				</div>
				<div className='btn-preview' onClick = {  props.onPreviewClick } >
					<p>Preview CV</p>
				</div>
			</div>
		</div>
	);
};

export { Header };