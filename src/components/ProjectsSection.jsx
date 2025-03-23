import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import ProjectCard from './ProjectCard';

function ProjectsSection() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch projects data from an external source
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        // This is where you would fetch from your actual API/data source
        // Example: const response = await fetch('https://api.github.com/users/username/repos');
        
        // For demonstration purposes, we'll use mock data
        // In a real application, replace this with actual API calls
        const mockData = [
          {
            id: '1',
            title: 'E-Commerce Platform',
            description: 'A full-stack e-commerce platform built with React, Node.js, and MongoDB.',
            image: 'https://via.placeholder.com/400x250',
            githubLink: 'https://github.com/username/ecommerce-project'
          },
          {
            id: '2',
            title: 'Weather App',
            description: 'A weather application that displays current weather data from OpenWeatherMap API.',
            image: 'https://via.placeholder.com/400x250',
            githubLink: 'https://github.com/username/weather-app'
          },
          {
            id: '3',
            title: 'Task Management System',
            description: 'A task management system with drag-and-drop functionality built using React and Firebase.',
            image: 'https://via.placeholder.com/400x250',
            githubLink: 'https://github.com/username/task-manager'
          }
        ];
        
        setProjects(mockData);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch projects data');
        setLoading(false);
        console.error('Error fetching projects:', err);
      }
    };

    fetchProjects();
    
    // You can set up a polling mechanism or webhook to update projects
    // when changes occur to the external data source
    const intervalId = setInterval(fetchProjects, 60000); // Poll every minute
    
    return () => clearInterval(intervalId);
  }, []);

  // Handle drag end event
  const handleDragEnd = (result) => {
    if (!result.destination) return;
    
    const items = Array.from(projects);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    
    setProjects(items);
  };

  if (loading) return <div className="text-center py-10">Loading projects...</div>;
  if (error) return <div className="text-center py-10 text-red-500">{error}</div>;

  return (
    <section id="projects" className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">My Projects</h2>
        
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="projects" direction="horizontal">
            {(provided) => (
              <div 
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {projects.map((project, index) => (
                  <Draggable key={project.id} draggableId={project.id} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <ProjectCard
                          title={project.title}
                          description={project.description}
                          image={project.image}
                          githubLink={project.githubLink}
                        />
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </section>
  );
}

export default ProjectsSection;