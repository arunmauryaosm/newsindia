import React, { useEffect, useState } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

  const News = (props) => {
    const [articles, setArticles] = useState([])
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [totalResults, setTotalResults] = useState(0)



  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };


  const updateNews = async () => {
    
    props.setProgress(20);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=fd0192f7da30431296ce26e3baefb414&page=${page}&pageSize=${props.pageSize}`;
    setLoading(true);
    let data = await fetch(url);
    let parsedData = await data.json();

    setArticles(parsedData.articles)
    setTotalResults(parsedData.totalResults)
    setLoading(false)

    props.setProgress(100);
    
  }

  useEffect(() => {
    updateNews();
}, [])

  document.title = `${capitalizeFirstLetter(
    props.category
  )} - NewsIndia`;

  const fetchMoreData = async () => {
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=fd0192f7da30431296ce26e3baefb414&page=${page+1}&pageSize=${props.pageSize}`;
    setPage(page+1)

    let data = await fetch(url);
    let parsedData = await data.json();

    setArticles(articles.concat(parsedData.articles))
    setTotalResults(parsedData.totalResults)
  };

  // const handlePrevClick = async ()=>{
  //   this.setState({page: this.state.page-1})
  //   this.updateNews();

  // }
  // const handleNextClick = async ()=>{
  //   this.setState({page: this.state.page+   1}) 
  //   this.updateNews();

  // }


    return (
      <>
        <div style={{marginTop :'5rem'}}>
          <h1 className="container my-4 text-center">
            {capitalizeFirstLetter(props.category)} -Top headlines
          </h1>
        </div>
         {/* {this.state.loading && <Spinner/>} */}

        {/* infinite scroll  */}

        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResults}
          loader= {<Spinner/>}
        >
          <div className="container my-3">
            <div className="row">
              {
              
                articles?.map((element,index) => { 
                  
                  return (
                    <div className="col-md-4 my-3" key={index}>
                      <NewsItem
                        title={element.title ? element.title.slice(0, 20) : ""}
                        description={
                          element.description
                            ? element.description.slice(0, 50)
                            : ""
                        }
                        imageUrl={element.urlToImage}
                        url={element.url}
                        productPrice={element.price}
                        productDiscount={element.discountPercentage}
                        brand={element.brand}
                        date={element.publishedAt}
                        author={element.author ? element.author : "Unknown"}
                      />
                    </div>
                  );
                })
              }
            </div>
          </div>
        </InfiniteScroll>
        {/* <div className="container d-flex justify-content-between my-3">
        <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}>&larr; Previous</button>
        <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults/props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
        </div> */}
      </>
    );
  }

  News.defaultProps = {
    country: 'in',
    pageSize: 8,
    category: 'general',
}
News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
}

  export default News