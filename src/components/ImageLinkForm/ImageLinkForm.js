import React from 'react';

const ImageLinkForm = ({ onInputChange, onButtonSubmit }) => {
	return (
		<div>
			<p className="f3 white">
				{'This clever brain will detect faces in your pictures.  Give it a try!'}
			</p>
				<div className='center pa1' style={{maxWidth: '800px'}}>
					<input className='f4 pa2 w-70 center bg-light-yellow' type='text' placeholder="Enter Image URL" onChange={onInputChange}/>
					<button className='w-30 grow f4 link ph3 dib white bw0 bg-green' onClick={onButtonSubmit}>Detect</button>
				</div>
		</div>
	);
}

export default ImageLinkForm;