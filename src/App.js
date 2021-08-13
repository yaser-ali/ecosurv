import './App.css';
import axios from 'axios';
import React from 'react';

import ReactDom from 'react-dom';


import Breedlist from './component/BreedList';


class App extends React.Component {
    constructor() {
        super();
        this.state = {
            imgUrl: "",
            breed: [""],
            select: "",
            dogs: [],
            selectNum: []
        }
    }

    getDogImage = () => {
        const { select } = this.state;
        let url = "https://dog.ceo/api/breed/" + select + "/images/random";
        axios
            .get(url)
            .then(response => {
                this.setState({
                    imgURL: response.data.message
                });
                console.log(response.data.message)
            })
            .catch(err => {
                console.log("error fetching image");
            });
    };

    getBreed = () => {
        const { breed } = this.state;
        axios
            .get("https://dog.ceo/api/breeds/list")
            .then(response => {
                this.setState({
                    breed: breed.concat(response.data.message)
                })
            })
            .catch(err => {
                console.log("error fetching list");
            });
    }

    //   getThreeBreedImg = () => {
    //       const {select} = this.state;
    //       let urlBreed3 = "https://dog.ceo/api/breed/" + select + "/images/random/3";
    //       axios
    //       .get(urlBreed3)
    //       .then(response => {
    //           this.setState({
    //             imgUrl3: response.data.message
    //           });
    //           console.log(response.data.message)
    //       })
    //       .catch(err => {
    //         console.log("error fetching image");
    //       });
    //   }



    handleSelect = (e) => {
        this.setState({
            select: e.target.value
        })
    }

    handleNum = (x) => {
        this.setState({
            selectNum: x.target.value
        })
    }


    componentDidMount() {
        this.getBreed();
        const {selectNum} = this.state;
        let url = ("https://dog.ceo/api/breeds/image/random/3");
        fetch(url)
        .then((res) => res.json())
        .then((data) => {
            this.setState({dogs: data.message})
        })
    }

    render() {
        const { breed, imgURL, select, selectNum } = this.state;

        return (
            <div>
          
                <h1>Dogs by Breed</h1>

                <p>Choose a dog from the drop down menu and click submit.</p>
                <div class="con">
                <select value={select} onChange={this.handleSelect}>
                    {breed.map(e =>
                        <option value={e}> {e} </option>
                    )}
                </select>
                <p>Number of Images:</p>
                    <select value={selectNum} onChange={this.handleNum}>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                    </select>
                    <button id="submit" disabled={!select} onClick={this.getDogImage}>View Images</button>
                    <p></p>

                </div>
                
                <p>Breed: {select}</p>

                <p></p>

                <div className="container">
                    <img style={{ width: 300, height: 300 }} alt="dog" src={imgURL} />
                </div>
                <Breedlist dogs={this.state.dogs}/>

            </div>
        )
    }
}
ReactDom.render(
    <App />,
    document.getElementById('root')
);

export default App;