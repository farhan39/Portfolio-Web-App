import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import ProjectCard from './ProjectCard';

function ProjectsSection({ initialProjects }) {
  const [projects, setProjects] = useState(initialProjects || []);

  useEffect(() => {
    if (initialProjects) {
      setProjects(initialProjects);
    }
  }, [initialProjects]);

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const reordered = Array.from(projects);
    const [moved] = reordered.splice(result.source.index, 1);
    reordered.splice(result.destination.index, 0, moved);

    setProjects(reordered);
  };

  if (!projects || projects.length === 0) {
    return <div className="text-center py-10">No projects to display.</div>;
  }

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
                          image={project.image || 'https://via.placeholder.com/400x250'}
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
