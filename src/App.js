import './App.css';
import React, { Component } from 'react';
import Navbar from './Components/Navbar';
import NewsItem from './Components/NewsItem';
import LoadingBar from 'react-top-loading-bar'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

export class App extends Component {

  state={
    progress:0
  }
  setProgress=(progress)=>{
    this.setState({progress:progress})
  }
  render() {
    return (
      <div>
        <Router>
        <LoadingBar
        height={3}
        color='#f11946'
        progress={this.state.progress}
        />
        <Navbar />
          <Routes>
            <Route exact path="/home" element={<NewsItem setProgress={this.setProgress} key={"general"} pagesize={6} country="us" category="general" />} />
            <Route exact path="/business" element={<NewsItem setProgress={this.setProgress} key={"business"} pagesize={6} country="us" category="business" />} />
            <Route exact path="/entertainment" element={<NewsItem setProgress={this.setProgress} key={"entertainment"} pagesize={6} country="us" category="entertainment" />} />
            <Route exact path="/health" element={<NewsItem setProgress={this.setProgress} key={"health"} pagesize={6} country="us" category="health" />} />
            <Route exact path="/science" element={<NewsItem setProgress={this.setProgress} key={"science"} pagesize={6} country="us" category="science" />} />
            <Route exact path="/sports" element={<NewsItem setProgress={this.setProgress} key={"sports"} pagesize={6} country="us" category="sports" />} />
            <Route exact path="/technology" element={<NewsItem setProgress={this.setProgress} key={"technology"} pagesize={6} country="us" category="technology" />} />
          </Routes>
        </Router>
      </div>
    );
  }
}

export default App;
