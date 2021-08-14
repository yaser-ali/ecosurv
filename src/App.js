import axios from 'axios';
import React from 'react';
// import Select from 'react-select';

import ReactDom from 'react-dom';

import './App.css';

import Breedlist from './component/BreedList';


class App extends React.Component {
    constructor() {
        super();
        this.state = {
            imgUrl: "",
            breed: [""],
            select: "",
            dogs: [],
            selectVal: []
        };
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
    getSubBreed = () => {
        const { Sub } = this.state;
        axios
            .get("https://dog.ceo/api/breeds/hound/list")
            .then(response => {
                this.setState({
                    Sub: Sub.concat(response.data.message)
                })
            })
            .catch(err => {
                console.log("error fetching list");
            });
    }

    getNumOfImg = () => {
        const { selectVal } = this.state;
        let url = ("https://dog.ceo/api/breeds/image/random/" + selectVal);
        fetch(url)
            .then((res) => res.json())
            .then((data) => {
                this.setState({ dogs: data.message })
            })
            .catch(err => {
                console.log("error fetching image");
            });
    };

    componentDidMount() {
        this.getBreed();
        // this.getSubBreed();
        this.getNumOfImg();
    }

    handleSelect = (e) => {
        this.setState({
            select: e.target.value
        })
    }

    setSelectValue = (event) => {
        this.setState({
            selectVal: event.target.value
        });
    }

    render() {
        const { breed, imgURL, select, selectVal } = this.state;

        return (
            <div>

                <h1 style={{ textAlign: "center" }}>Welcome to dog.ceo</h1>
                <h2 style={{ textAlign: "center" }}>Select a type of breed:</h2>

                <div class="con">
                    <label>
                        <p>Breed</p>
                        <select value={select} onChange={this.handleSelect}>
                            {breed.map(e =>
                                <option value={e}> {e} </option>
                            )}
                        </select>
                    </label>

                    <label>
                        <p>Sub-Breed:</p>
                        <select>

                        </select>
                    </label>

                    <label>
                        <p>Number of Images</p>
                        <select value={selectVal} onChange={this.setSelectValue}>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                            <option value="8">8</option>
                            <option value="9">9</option>
                            <option value="10">10</option>
                        </select>
                    </label>
                    <p>{this.state.selectVal}</p>

                    <button id="submit" disabled={!select} onClick={event => { this.getNumOfImg(event); this.getDogImage() }}>View Images</button>

                </div>


                {/* Shows which type of breed */}
                {/* <p>Breed: {select}</p> */}

                <p></p>

                <div className="container">
                    <img style={{ width: 300, height: 300 }} alt="dog image" src={imgURL} />
                </div>
                <Breedlist dogs={this.state.dogs} />

            </div>
        )
    }
}
ReactDom.render(
    <App />,
    document.getElementById('root')
);

export default App;