import React, { Component } from 'react'


export class NewsComponent extends Component {
  render() {
    let {title,description,imageurl,newsurl,author,IssueDate,source} = this.props;
    return (
    <div>
       <div className="card">
            <img src={!imageurl?"https://inc42.com/cdn-cgi/image/quality=75/https://asset.inc42.com/2024/05/acquisition-social.png":imageurl} className="card-img-top" alt="..." />
            
            <div className="card-body">
               <h5 className="card-title">{title}<span className="position-absolute   translate-middle badge rounded-pill bg-danger" style={{left:'90%',top:'12px', zIndex:'1'}}> {source} </span></h5>
                <p className="card-text">{description}...</p>
                <div className="card-footer text-body-secondary ">
                 <div className="text-dark"> By {author===null?"Uknown":author} on {new Date(IssueDate).toGMTString()}</div>
                </div>
                <a href={newsurl} rel='noreferrer' target='_blank' className="btn btn-sm btn-secondary">Read more</a>
            </div>
      </div>
      
   </div>
    )
  }
}

export default NewsComponent
