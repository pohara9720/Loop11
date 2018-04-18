import React, { Component } from 'react';
import logo from './sunpng.png';
import './App.css';
import { Row, Col } from 'react-grid-system'

class App extends Component {
  constructor(props){
    super(props)
    this.state ={
      city:'melbourne',
      data:'loading',
      celcius:true,
      activeImage:'',
      images:{
        melbourne:{
          winter:'https://i.pinimg.com/originals/f5/9d/3b/f59d3becc708fdd610ad9d9b2175a404.jpg',
          summer:'https://thumb1.shutterstock.com/display_pic_with_logo/1198295/280586960/stock-photo-melbourne-city-skyline-cityscape-and-white-tour-boat-ferry-cruise-under-princes-bridge-with-280586960.jpg'
        },
        sydney:{
          summer:'http://blog.aussiecampervans.com/image.axd?picture=%2F2015%2F02%2FOpera-sydney.jpg',
          winter:'https://thumbs.dreamstime.com/b/sydney-firework-vertical-balls-australia-new-year-fireworks-view-above-city-cbd-landmarking-cityline-bright-colourful-fire-48249015.jpg'
        },
        brisbane:{
          summer:'http://c8.alamy.com/comp/M37DGY/view-from-brisbane-botanic-gardens-queensland-australia-vertical-image-M37DGY.jpg',
          winter:'https://upload.wikimedia.org/wikipedia/commons/6/60/Christmas_tree_at_night_in_Brisbane%2C_Australia_in_2016.jpg'
        }
      }
    }
  }

pickCity(){
  if(this.state.city ==='melbourne'){
    return '37.8136, 144.9631'
  }
  else if(this.state.city ==='sydney'){
    return '-33.8688, 151.2093'
  }
  else{
    return '-27.4698, 153.0251'
  }
}


runCall(){
  this.setState({data:'loading'})
  const location = this.pickCity()
   console.log("LOCATION",location)
    return fetch(`http://api.weatherunlocked.com/api/current/${location}?app_id=930fc96a&app_key=bd8f96bc469b5f3a186a7b87da0f8ddd`)
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({data:responseJson})
            })
            .catch((error) => {
                console.error(error)
        })
  }

  switchCity(city){
    this.setState({city})
    this.runCall()
}


 componentWillMount(){
        this.runCall()
    }

  pickMelb(){
    if(this.state.data.temp_c >= 18 && this.state.city ==='melbourne' || this.state.data.temp_f >= 65 && this.state.city ==='melbourne'){
      return this.state.images.melbourne.summer
    }
    else{
      return this.state.images.melbourne.winter
    }
  }
  pickBris(){
    if(this.state.data.temp_c >= 18 && this.state.city ==='brisbane' || this.state.data.temp_f >= 65 && this.state.city ==='brisbane'){
      return this.state.images.brisbane.summer
    }
    else{
      return this.state.images.brisbane.winter
    }
  }
  pickSyd(){
    if(this.state.data.temp_c >= 18 && this.state.city ==='sydney' || this.state.data.temp_f >= 65 && this.state.city ==='sydney'){
      return this.state.images.sydney.summer
    }
    else{
      return this.state.images.sydney.winter
    }
  }
  render() {
    console.log('DATA',this.state.data)
    return (
      <div>
      { this.state.data === 'loading' ?
          <div  className="container">
              <div>
                  <img src={logo} className="App-logo" alt="logo" />
                  <h3>Loading weather</h3>
              </div>
          </div>
          :
          <div  className='weather'>
              <Row>
                  <Col sm={12} md={10} lg={10}>
                      <span>
                          <h1>{this.state.celcius ? `${this.state.data.temp_c} °C` : `${this.state.data.temp_f} °F`}</h1>
                          <a className='tempToggle' onClick ={() => this.setState({celcius:!this.state.celcius})} href='#'>{this.state.celcius ? '°F' : '°C'}</a>
                      </span>
                  </Col>
                  <Col sm={12} md={2} lg={2}>
                      <ul className='list'>
                        <li><div onClick={() => this.switchCity('melbourne')} className={this.state.city === 'melbourne' ? 'active' : 'cityBtn'}>Melbourne</div></li>
                        <li><div onClick={() => this.switchCity('brisbane')} className={this.state.city === 'brisbane' ? 'active' : 'cityBtn'}>Brisbane</div></li>
                        <li><div onClick={() => this.switchCity('sydney')} className={this.state.city === 'sydney' ? 'active' : 'cityBtn'}>Sydney</div></li>
                      </ul>
                  </Col>
              </Row>
              <Row>
                  <Col sm={12} md={6} lg={6}>
                      <label>{this.state.data.wx_desc}</label>
                      <div className='whiteBox'>
                          <ul className='infoList'>
                              <li>
                                <div>
                                  <h5>LAT:</h5>
                                  <p className='info'>{this.state.data.lat}</p>
                                </div>
                                <div className='clear'></div>
                              </li>
                              <li>
                                <div>
                                  <h5>LONG:</h5>
                                  <p className='info'>{this.state.data.lon}</p>
                                </div>
                                <div className='clear'></div>
                              </li>
                              <li>
                                <div>
                                  <h5>FEELS LIKE:</h5>
                                  <p className='info'>{this.state.celcius ? `${this.state.data.feelslike_c} °C` : `${this.state.data.feelslike_f} °F`}</p>
                                </div>
                                <div className='clear'></div>
                              </li>
                              <li>
                                <div>
                                  <h5>HUMIDITY:</h5>
                                  <p className='info'>{`${this.state.data.humid_pct} %`}</p>
                                </div>
                                <div className='clear'></div>
                              </li>
                              <li>
                                <div>
                                  <h5>WIND SPEED:</h5>
                                  <p className='info'>{this.state.celcius ? `${this.state.data.windspd_kmh} km` : `${this.state.data.windspd_mph} mph`}</p>
                                </div>
                                <div className='clear'></div>
                              </li>
                              <li>
                                <div>
                                  <h5>DEW POINT:</h5>
                                  <p className='info'>{this.state.celcius ? `${this.state.data.dewpoint_c} °C` : `${this.state.data.dewpoint_f} °F`}</p>
                                </div>
                                <div className='clear'></div>
                              </li>
                              <li>
                                <div>
                                  <h5>VISIBILITY:</h5>
                                  <p className='info'>{this.state.celcius ? `${this.state.data.vis_km} km` : `${this.state.data.vis_mi} mph`}</p>
                                </div>
                                <div className='clear'></div>
                              </li>
                              <li>
                                <div>
                                  <h5>CLOUDY:</h5>
                                  <p className='info'>{`${this.state.data.cloudtotal_pct} %`}</p>
                                </div>
                                <div className='clear'></div>
                              </li>
                          </ul>
                      </div>
                  </Col>
                  <Col sm={12} md={6} lg={6}>
                  <label>{`${this.state.city.toUpperCase()}, AUS`}</label>
                      <div className='imageCon'>
                        <img className='image' src={this.state.city ==='melbourne' ? this.pickMelb() : this.state.city ==='sydney' ? this.pickSyd() : this.pickBris()}/>
                      </div>
                  </Col>
              </Row>
          </div>
      }
      </div>
    );
  }
}

export default App;
