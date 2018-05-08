import React from 'react';
import './FaceRecognition.css';
import Loader from 'react-loader';

const FaceRecognition = ({ imageUrl, boxes, loaded }) => {
	const boundingBoxes = boxes.map(box => {
		return (<div className='bounding-box' style={{top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol}}></div>)
	})

	return (
		<div className='center ma'>
			<div className='absolute mt2'>
				<Loader loaded={loaded}></Loader>
				<img id='inputImage' src={imageUrl} alt='' width='500px' height='auto'/>
				{boundingBoxes}
			</div>
		</div>
	);
}

//	<div className='bounding-box' style={{top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol}}></div>


export default FaceRecognition;