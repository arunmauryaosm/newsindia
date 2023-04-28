import React from "react";

const Newsitem = (props) => {

    let { title, description, imageUrl,  date,  url, author } = props;
    return (
      <>
        <div className="card" >
          <img style={{height:'200px' , width:'100%'}}
            src={imageUrl ? imageUrl : "https://aniportalimages.s3.amazonaws.com/media/details/ANI-20221217211747.jpg"}
            className="card-img-top"
            alt="..."
          />
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{description}...</p>
            <p className="card-text"><small className="text-danger" style={{width:'100%' , height:'50px'}}>By {author} on {new Date(date).toGMTString()}</small></p>            
            <a href={url} target="_blank" rel="noreferrer"  className="btn btn-dark btn-sm">
            
           Read More
            </a>
          </div>
        </div>
      </>
    );
  }


  export default Newsitem