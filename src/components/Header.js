import React from 'react';
import '../styles/Header.css';

class Header extends React.Component{

	render(){
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
					<div className='btn-edit' onClick = { this.props.onEditClick }>
						<p>Edit CV</p>
					</div>
					<div className='btn-preview' onClick = { this.props.onPreviewClick } >
						<p>Preview CV</p>
					</div>
				</div>
			</div>
		);
	}
}

export { Header };