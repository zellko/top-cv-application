import React from 'react';
import '../styles/Section.css';


/***************************************************************************************   
This component render the "General Intro" section of the CV: Name, Job title, description.

All the fields can be edited by clicking on them. 
****************************************************************************************/

const Section = (props) => {
   	return(	
		<div className="section">
			<h2>{ props.sectionName}</h2>
		</div>
	);
};

export { Section };