// src/components/TimelineCard.js
import React from 'react';
import { Link } from 'react-router-dom';

function TimelineCard({ title, tags, image, summary, date, highlight, guid, publisher, parent_url }) {
  
  const articleLink = `/IN/article/${guid}`;
  const displayedTags = tags.slice(0, 6);
  // Define a base style for the card
  let cardStyle = "card-base-style";
  
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

  if (highlight) {
    cardStyle += " highlight-styles"; // Append additional styles for highlighting
  }

  return (
    <div className={cardStyle}>
    <div className="h-screen w-full overflow-y-auto max-w-sm rounded overflow-hidden shadow-lg my-4 mx-auto">
      <img className="w-full h-48 object-cover" src={image} />
      <div className="px-6 py-4">
      <p className="font-bold text-m mb-2 text-red-700">{humanReadableDate}</p>
      <Link to={articleLink} className="font-bold text-xl mb-2 text-blue-700 hover:text-blue-900">
        <div className="font-bold text-xl mb-2 text-blue-700">{title}</div>
      </Link>
      <div className="">
        <a href={parent_url} target="_blank" rel="noopener noreferrer">
          <p className="mt-4 text-gray-700 text-sm font-bold text-base">{publisher} <sup>🔗</sup></p>
      </a>
      </div>
        <p className="text-gray-700 text-base">{summary}</p>
        
      </div>
      <div className="tag-container m-5">
        {displayedTags.map((tag, index) => (
          <Link key={index} to={`/IN/tag/${tag}/`} className="tag-link">
            {tag.replace(/-/g, ' ')}
          </Link>
        ))}
      </div>
    </div>
    </div>
  );
}

export default TimelineCard;