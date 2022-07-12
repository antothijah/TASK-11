import React from "react";

class AffiItemRow extends React.Component {
    render() {
        return (
            <li>{this.props.affi}</li>
        )
    }
}

class StarWars extends React.Component {

    constructor () {
        super()

        this.state = {
            loaded: false,
            name: null,
            image: null,
            height: null,
            homeworld: null,
            species: null,
            affiliations: []
        }
    }

    getChracter() {
        const randomNumber = Math.round(Math.random() * 88)
        fetch(`https://akabab.github.io/starwars-api/api/id/${randomNumber}.json`)
            .then(res => res.json())
            .then(data => {
                // console.log(data);
                // const affiliations = data.affiliations;
                // console.log(affiliations.length);
                this.setState(
                    {
                        name: data.name,
                        image: data.image,
                        height: data.height,
                        homeworld: data.homeworld,
                        species: data.species,
                        affiliations: data.affiliations,
                        loaded: true
                    }
                )
            })
    }

    render() {
        const affiliationsList = this.state.affiliations.map((affi, index) => {
            return <AffiItemRow key={index} affi={affi} />
        })
        return (
            <div>
                <button type="button" className="btn" onClick={() => this.getChracter()}>Generate Character</button>
                {
                    this.state.loaded &&
                    <div className="container">
                        <h1>This is starwars</h1>
                        <h3>Name: {this.state.name}</h3>
                        <img src={this.state.image} className="charImg"></img>
                        <p>Height: {this.state.height} cm</p>
                        <p>Homeworld: {this.state.homeworld}</p>                        
                        <p>Species: {this.state.species}</p>
                        <h4>Affiliations:-</h4>
                        <ol>
                            {affiliationsList}    
                        </ol>
                    </div>
                }        
            </div>
        );
    }
}

export default StarWars;