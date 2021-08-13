import React from 'react';
import Dogs from './breed';
import './BreedList.css';

const BreedList = (props) => {
    const BreedArray = props.dogs.map((dogUrl) =>{
        return <Dogs url={dogUrl}/>
    })

    return (
        <div className="container">
            {BreedArray}
        </div>
    )
}

export default BreedList;