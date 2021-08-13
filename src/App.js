import './App.css';
import axios from 'axios';
import React from 'react';
import Select from 'react-select';

import ReactDom from 'react-dom';


import Breedlist from './component/BreedList';

const options = [
    { value: '1', label: '1' },
    { value: '2', label: '2' },
    { value: '3', label: '3' },
];

const options2 = [
    { value: '1', label: '1' },
    { value: '2', label: '2' },
    { value: '3', label: '3' },
];


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


    state = {
        selectedOption: null,
      };
      handleChange = (selectedOption) => {
        this.setState({ selectedOption }, () =>
          console.log(`Option selected:`, this.state.selectedOption)
        );
      };

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


    // subBreed() {

    // }


    componentDidMount() {
        this.getBreed();
        let url = "https://dog.ceo/api/breeds/image/random/3";
        fetch(url)
            .then((res) => res.json())
            .then((data) => {
                this.setState({ dogs: data.message })
            })
    }

    render() {
        const { breed, imgURL, select, selectedOption } = this.state;

        return (
            <div>

                <h1 style={{textAlign: "center"}}>Welcome to eco surv exercise for dog.ceo</h1>

                <div class="con">
                    <p>Breed:</p>
                    <select value={select} onChange={this.handleSelect}>
                        {breed.map(e =>
                            <option value={e}> {e} </option>
                        )}
                    </select>
                    
                    {/*Where sub-breed comes in*/}
                    <p>Sub-Breed:</p>
                    <Select value={selectedOption}
                    onChange={this.handleChange}
                    options={options2   }/>
                    {/*End */}

                    <p>Number of Images:</p>
                    <Select
                        value={selectedOption}
                        onChange={this.handleChange}
                        options={options}
                    />
                    <button id="submit" disabled={!select} onClick={this.getDogImage}>View Images</button>
                    <p></p>

                </div>
                

                {/* Shows which type of breed */}
                {/* <p>Breed: {select}</p> */}

                <p></p>

                <div className="container">
                    <img style={{ width: 300, height: 300 }} alt="dog" src={imgURL} />
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