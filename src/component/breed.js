import React from 'react';
import './BreedList.css';

const breed = (props) => {
    
    return (
        <div>
            <img style={{ width: 300, height: 300 }} alt="dogs" src={props.url}/>
        </div>
        )

}

export default breed;