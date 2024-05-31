import React, { Component } from "react";
import NewsComponent from "./NewsComponent";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

export class NewsItem extends Component {
  static defaultProps = {
    pagesize: 8,
    country: "in",
    category: "general",
  };

  static propTypes = {
    country: PropTypes.string,
    pagesize: PropTypes.number,
    category: PropTypes.string,
  };
  
  articles = [];
  constructor() {
    super();
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalResults: 0
    };
  }
  
  async componentDidMount() {
    this.fetchNews();
    document.title = "DailyDigest -" + this.Capitalize(this.props.category)
  }

  async fetchNews(page = 1) {
    this.props.setProgress(2)
    let url = `https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apiKey=09916e52a64c479d865e96b37e410bb9&page=${page}&pagesize=${this.props.pagesize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let parsedData = await data.json();
    this.props.setProgress(70)
    this.setState({
      articles: parsedData.articles,
      page: page,
      totalResults: parsedData.totalResults,
      loading: false,
    });
    this.props.setProgress(100)
  }

  fetchMoreData = async () => {
    const nextPage = this.state.page + 1;
    let url = `https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apiKey=09916e52a64c479d865e96b37e410bb9&page=${nextPage}&pagesize=${this.props.pagesize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      articles: this.state.articles.concat(parsedData.articles),
      page: nextPage,
      totalResults: parsedData.totalResults,
      loading: false,
    });
  };

  Capitalize=(str)=>{
    return str.charAt(0).toUpperCase()+str.slice(1);
  }
  render() {
    return (
      <div>
        <h1 className="container my-4 mb-4 text-center">
          DailyDigests - {this.Capitalize(this.props.category)} Top Headlines 
        </h1>
        {/* {this.state.loading && <Spinner />} */}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner/>}>

          <div className="main-container container">
            {this.state.articles.map((element) => {
              return (
                <div className="item" key={element.url}>
                  <NewsComponent
                    title={element.title}
                    description={element.description}
                    imageurl={element.urlToImage}
                    newsurl={element.url}
                    author={element.author}
                    IssueDate={element.publishedAt}
                    source={element.source.name}
                  />
                </div>
              );
            })}
          </div>
        </InfiniteScroll>
        {/* <div className="container d-flex justify-content-between my-4">
          <button
            disabled={this.state.page <= 1}
            type="button"
            className="btn btn-dark"
            onClick={this.handlePreviousNews}
          >
            &laquo; Previous
          </button>
          <button
            disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pagesize)}
            type="button"
            className="btn btn-dark"
            onClick={this.handleNextNews}
          >
            Next &raquo;
          </button>
        </div> */}
      </div>
    );
  }
}

export default NewsItem;
