import React, { Component } from 'react'
import loading from './logo.gif'
export default class Spinner extends Component {
  render() {
    return (
      <div className='container text-center '>
        <img className='image' src={loading} alt="loading" />
      </div>
    )
  }
}
