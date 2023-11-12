// src/components/Card.js
import React from 'react';
import { Link } from 'react-router-dom';
import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  FacebookIcon,
  TwitterIcon,
  WhatsappIcon,
  LinkedinIcon
} from 'react-share';

function Card({ guid, tags, date, publisher, parent_url, title, image, summary, country}) {
  
  const shareUrl = `https://newsmuncher.com/#/${country}/article/${guid}`;

  // const publisherFormatted = publisher.split(',').join(' - ');
  const publisherFormatted = publisher.replace(/([a-z])([A-Z])/g, '$1 $2');
  const articleLink = `/${country}/article/${guid}`;
  const displayedTags = tags.slice(0, 6);
  const publishDate = new Date(date);
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true // Use 12-hour format, set to false for 24-hour format
  };
  const humanReadableDate = publishDate.toLocaleDateString('en-GB', options);

  return (
    <div className="card-box">
    <div className="w-full max-w-2xl rounded overflow-hidden shadow-lg my-4 mx-auto card-body">
      <img className="w-full h-48 object-cover" src={image} alt={title} />
      <div className="px-6 py-4">
      <p className="font-bold text-m mb-2 text-red-700">{humanReadableDate}</p>
        <Link to={articleLink} className="font-bold text-xl mb-2 text-blue-700 hover:text-blue-900"> {/* Add Link here */}
          {title}
        </Link>
        
        <div className="">
        <a href={parent_url} target="_blank" rel="noopener noreferrer">
          <p className="mt-4 text-gray-700 text-sm font-bold text-base">{publisherFormatted} <sup>🔗</sup></p>
      </a>
      </div>
        
        <p className="mt-4 text-gray-700 text-base">{summary}</p>

  <br/>
  <div className="share-buttons">
  <FacebookShareButton url={shareUrl} quote={title}>
    <FacebookIcon size={32} round />
  </FacebookShareButton>

  <TwitterShareButton url={shareUrl} title={title}>
    <TwitterIcon size={32} round />
  </TwitterShareButton>

  <WhatsappShareButton url={shareUrl} title={title}>
    <WhatsappIcon size={32} round />
  </WhatsappShareButton>

  <LinkedinShareButton url={shareUrl}>
    <LinkedinIcon size={32} round />
  </LinkedinShareButton>


</div>


      </div>


        <div className="tag-container m-5">
        {displayedTags.map((tag, index) => (
          <div key={index} className="tag-link">
             {tag.replace(/-/g, ' ')}
           </div>
          // <Link key={index} to={`/IN/tag/${tag}/`} className="tag-link">
          //   {tag.replace(/-/g, ' ')}
          // </Link>
        ))}
      </div>
    </div>
    </div>
  );
}

export default Card;
