import React, { Component } from 'react'
import './PokeFetch.css';



class PokeFetch extends Component {
  constructor() {
    super()
    this.state = {
      pokeInfo: '',
      pokeSprite: '',
      pokeName: '',
      seconds: 10,
      isOn: false,
      isVisible: false
    }
  }


  fetchPokemon() {
    let min = Math.ceil(1);
    let max = Math.floor(152);
    let pokeNum = Math.floor(Math.random() * (max - min) + min);
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokeNum}`, {
      method: 'GET'
    }).then(res => res.json())
      .then(res => {
        this.setState({
          pokeInfo: res,
          pokeSprite: res.sprites.front_default,
          pokeName: res.species.name,
          isOn: true,
          seconds: 10,
          isVisible: false
        })
      })
      .catch((err) => console.log(err))
  }

  myTimer() {
    if( this.state.isOn === true && this.state.seconds > 0) {
            
      this.setState(({ seconds }) => ({
          seconds: seconds - 1,
      }))

  } 
  }
  componentDidMount() {
      this.myInterval = setInterval(() => {
        this.myTimer()
    }, 1000)
} 

componentDidUpdate() {
  console.log('Update')
  if(this.state.seconds === 0 && this.state.isVisible === false) {
    this.setState({
      isVisible: true
    })
  }
}
componentWillUnmount() {
    clearInterval(this.myInterval)
}
  

  render() {
    return (
      <div className={'wrapper'}>
        <button className={'start'} onClick={() => this.fetchPokemon()}>Start!</button>
        <h1 className={'timer'}>Time:{this.state.seconds}</h1>
        {(this.state.isVisible === false) 
        ? <div className={'pokeWrap'}>
          <img id={'pokeDark'} src={this.state.pokeSprite} /> </div>
        : <div className={'pokeWrap'}>
          <img id={'pokeLight'} src={this.state.pokeSprite} />
          <h1 className={'pokeName'}>{this.state.pokeName}</h1> 
        </div> }
      </div> 
    )
  }
}



export default PokeFetch;