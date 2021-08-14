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
            selectVal: [],
            sub: [""],
            selectSub: ""
        };
    }



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
        const { sub } = this.state;
        axios
            .get("https://dog.ceo/api/breed/hound/list")
            .then(response => {
                this.setState({
                    sub: sub.concat(response.data.message)
                })
            })
            .catch(err => {
                console.log("error fetching list");
            });
    }

    getNumOfImg = () => {
        const { selectVal, select } = this.state;
        let url1 = ("https://dog.ceo/api/breed/" + select + "/images/random/" + selectVal);
        axios
        .get(url1)
            .then(response => {
                this.setState({
                    dogs: response.data.message
                });
                console.log(response.data.message)
            })
            .catch(err => {
                console.log("error fetching image");
            });
    };

    componentDidMount() {
        //Declaring the functions by calling them.
        this.getBreed();
        this.getSubBreed();
        this.getNumOfImg();
    }

    handleSelect = (e) => {
        this.setState({
            select: e.target.value
        })
    }

    handleSubSelect = (x) => {
        this.setState({
            selectSub: x.target.value
        })
    }

    setSelectValue = (event) => {
        this.setState({
            selectVal: event.target.value
        });
    }

    render() {
        const { breed, imgURL, select, selectVal, sub, selectSub } = this.state;

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


                    {/* Sub breed does not work */}
                    <label>
                        <p>Sub-Breed</p>
                        <select value={selectSub} onChange={this.handleSubSelect}>
                            {sub.map(x =>
                                <option value={x}> {x} </option>
                            )}
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

                    <button disabled={!select} onClick={this.getNumOfImg}>View Images</button>

                </div>

                <p></p>

                <div className="container">
                <Breedlist dogs={this.state.dogs} />
                </div>
                {/* Shows which type of breed */}
                <p>Breed: {select}</p>

                <p></p>


            </div>
        )
    }
}
ReactDom.render(
    <App />,
    document.getElementById('root')
);

export default App;