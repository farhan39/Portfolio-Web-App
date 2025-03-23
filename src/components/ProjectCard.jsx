import React from 'react';

function ProjectCard({ title, description, image, githubLink }) {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden h-full transition-transform transform hover:-translate-y-1 hover:shadow-xl">
      <img 
        src={image || 'https://via.placeholder.com/400x250'} 
        alt={title} 
        className="w-full h-48 object-cover"
      />
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-600 mb-4">{description}</p>
        <a 
          href={githubLink} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="inline-block bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700 transition-colors"
        >
          GitHub
        </a>
      </div>
      <div className="p-2 bg-gray-100 text-center text-sm text-gray-500">
        Drag to reorder
      </div>
    </div>
  );
}

export default ProjectCard;