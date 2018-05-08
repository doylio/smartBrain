import React from 'react';

const ImageLinkForm = ({ onUrlInputChange, onButtonSubmit, onLocalInputChange}) => {

	const inputSelect = () => {
		const localInput = document.querySelector("#local-input");
		const webInput = document.querySelector("#web-input");
		if(localInput.value) {
			webInput.setAttribute('disabled', undefined);
			webInput.style.backgroundColor = 'green';
			const file = localInput.files[0];
			const reader = new FileReader();
			reader.onloadend = function() {
				const base64data = reader.result.slice(23);
				onLocalInputChange(base64data);
			}
			reader.readAsDataURL(file);
		} else if (webInput.value) {
			localInput.setAttribute('disabled', undefined);
			localInput.style.backgroundColor = 'green';
			onUrlInputChange(webInput.value);
		} else {
			webInput.removeAttribute('disabled');
			webInput.style.backgroundColor = '';
			localInput.removeAttribute('disabled');
			localInput.style.backgroundColor = '';
		}
	}


	return (
		<div>
			<div style={{margin:'30px auto', maxWidth: '800px'}}>
				<p className="f3 center white">
					This clever brain will detect faces in your pictures.  Give it a try!
				</p>
			</div>
				<div className='pa1' style={{maxWidth: '800px', margin: 'auto'}}>
					<input className='gray f4 pa2 w-70 center bg-light-yellow' id="local-input" type="file" onChange={inputSelect} />
					<p className="f3 white">OR</p>
					<input id="web-input" className='f4 pa2 w-70 center bn bg-light-yellow' type='text' placeholder="Enter Image URL" onChange={inputSelect}/>
					<br/>
					<button className='ma3 pa2 w-30 grow f4 link ph3 dib white bw0 bg-green' onClick={onButtonSubmit}>Detect</button>
				</div>
		</div>
	);
}

export default ImageLinkForm;