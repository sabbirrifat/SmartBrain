import React from 'react';
import './imagerecog.css';


const Imagerecog = ({imageUrl, faceBox}) =>{
    return(
        <div className='center ma'>
            <div className='absolute mt2'>
                <img id="inputImage" src={imageUrl} alt="" width='500px' height='auto'/>
                <div className="faceBox" style={{top: faceBox.topRow, right: faceBox.rightCol, left: faceBox.leftCol, bottom: faceBox.bottomRow}}></div>
            </div>
            
        </div>
    )
}

export default Imagerecog;