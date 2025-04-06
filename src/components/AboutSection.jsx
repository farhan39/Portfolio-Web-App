import React from 'react';

function AboutSection({ profilePicture, skills, interests, description }) {
  // Convert comma-separated strings to arrays
  const skillsList = typeof skills === 'string' ? skills.split(',').map(skill => skill.trim()) : skills;
  const interestsList = typeof interests === 'string' ? interests.split(',').map(interest => interest.trim()) : interests;

  return (
    <section id="about" className="py-16 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">About Me</h2>
        
        <div className="flex flex-col md:flex-row items-center md:items-start gap-10">
          <div className="w-full md:w-1/3 flex justify-center">
            <img 
              src={profilePicture || 'https://via.placeholder.com/300'} 
              alt="Profile" 
              className="rounded-full w-64 h-64 object-cover shadow-lg"
            />
          </div>
        
          <div className="w-full md:w-2/3">
            <p className="text-lg mb-6">{description}</p>
            
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-3">My Skills</h3>
              <div className="flex flex-wrap gap-2">
                {skillsList.map((skill, index) => (
                  <span 
                    key={index} 
                    className="bg-yellow-500 text-white px-3 py-1 rounded-full text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-3">My Interests</h3>
              <div className="flex flex-wrap gap-2">
                {interestsList.map((interest, index) => (
                  <span 
                    key={index} 
                    className="bg-purple-500 text-white px-3 py-1 rounded-full text-sm"
                  >
                    {interest}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutSection;