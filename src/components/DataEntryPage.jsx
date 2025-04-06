import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


function DataEntryPage({ onSubmit }) {

    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        shortBio: '',
        aboutMe: {
            profilePicture: '',
            skills: '',
            interests: '',
            description: ''
        },
        projects: [],
        socialMedia: []
    });

    const [newProject, setNewProject] = useState({
        title: '',
        description: '',
        image: '',
        githubLink: ''
    });

    const [newSocialMedia, setNewSocialMedia] = useState({
        name: '',
        url: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        if (name.includes('.')) {
            const [parent, child] = name.split('.');
            setFormData({
                ...formData,
                [parent]: {
                    ...formData[parent],
                    [child]: value
                }
            });
        } else {
            setFormData({
                ...formData,
                [name]: value
            });
        }
    };

    const addProject = () => {
        setFormData({
            ...formData,
            projects: [...formData.projects, newProject]
        });
        setNewProject({ title: '', description: '', image: '', githubLink: '' });
    };

    const addSocialMedia = () => {
        setFormData({
            ...formData,
            socialMedia: [...formData.socialMedia, newSocialMedia]
        });
        setNewSocialMedia({ name: '', url: '' });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
        navigate('/portfolio');
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Portfolio Data Entry</h1>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="bg-gray-100 p-4 rounded-lg">
                    <h2 className="text-xl font-semibold mb-2">Basic Information</h2>
                    <div className="grid grid-cols-1 gap-4">
                        <div>
                            <label className="block mb-1">Name</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                className="w-full p-2 border rounded"
                                required
                            />
                        </div>
                        <div>
                            <label className="block mb-1">Short Bio</label>
                            <textarea
                                name="shortBio"
                                value={formData.shortBio}
                                onChange={handleInputChange}
                                className="w-full p-2 border rounded"
                                required
                            />
                        </div>
                    </div>
                </div>

                <div className="bg-gray-100 p-4 rounded-lg">
                    <h2 className="text-xl font-semibold mb-2">About Me</h2>
                    <div className="grid grid-cols-1 gap-4">
                        <div>
                            <label className="block mb-1">Profile Picture URL</label>
                            <input
                                type="text"
                                name="aboutMe.profilePicture"
                                value={formData.aboutMe.profilePicture}
                                onChange={handleInputChange}
                                className="w-full p-2 border rounded"
                            />
                        </div>
                        <div>
                            <label className="block mb-1">Skills (comma separated)</label>
                            <input
                                type="text"
                                name="aboutMe.skills"
                                value={formData.aboutMe.skills}
                                onChange={handleInputChange}
                                className="w-full p-2 border rounded"
                            />
                        </div>
                        <div>
                            <label className="block mb-1">Interests (comma separated)</label>
                            <input
                                type="text"
                                name="aboutMe.interests"
                                value={formData.aboutMe.interests}
                                onChange={handleInputChange}
                                className="w-full p-2 border rounded"
                            />
                        </div>
                        <div>
                            <label className="block mb-1">Detailed Description</label>
                            <textarea
                                name="aboutMe.description"
                                value={formData.aboutMe.description}
                                onChange={handleInputChange}
                                className="w-full p-2 border rounded"
                                rows="4"
                            />
                        </div>
                    </div>
                </div>

                <div className="bg-gray-100 p-4 rounded-lg">
                    <h2 className="text-xl font-semibold mb-2">Projects</h2>

                    {formData.projects.length > 0 && (
                        <div className="mb-4">
                            <h3 className="text-lg font-medium mb-2">Added Projects:</h3>
                            <ul className="list-disc ml-5">
                                {formData.projects.map((project, index) => (
                                    <li key={index}>{project.title}</li>
                                ))}
                            </ul>
                        </div>
                    )}

                    <div className="grid grid-cols-1 gap-4 border p-4 rounded-lg">
                        <div>
                            <label className="block mb-1">Project Title</label>
                            <input
                                type="text"
                                value={newProject.title}
                                onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                                className="w-full p-2 border rounded"
                            />
                        </div>
                        <div>
                            <label className="block mb-1">Project Description</label>
                            <textarea
                                value={newProject.description}
                                onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                                className="w-full p-2 border rounded"
                                rows="3"
                            />
                        </div>
                        <div>
                            <label className="block mb-1">Project Image URL</label>
                            <input
                                type="text"
                                value={newProject.image}
                                onChange={(e) => setNewProject({ ...newProject, image: e.target.value })}
                                className="w-full p-2 border rounded"
                            />
                        </div>
                        <div>
                            <label className="block mb-1">GitHub Link</label>
                            <input
                                type="text"
                                value={newProject.githubLink}
                                onChange={(e) => setNewProject({ ...newProject, githubLink: e.target.value })}
                                className="w-full p-2 border rounded"
                            />
                        </div>
                        <button
                            type="button"
                            onClick={addProject}
                            className="bg-yellow-500 text-white p-2 rounded hover:bg-yellow-600"
                        >
                            Add Project
                        </button>
                    </div>
                </div>

                <div className="bg-gray-100 p-4 rounded-lg">
                    <h2 className="text-xl font-semibold mb-2">Social Media</h2>

                    {formData.socialMedia.length > 0 && (
                        <div className="mb-4">
                            <h3 className="text-lg font-medium mb-2">Added Social Media:</h3>
                            <ul className="list-disc ml-5">
                                {formData.socialMedia.map((social, index) => (
                                    <li key={index}>{social.name}</li>
                                ))}
                            </ul>
                        </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border p-4 rounded-lg">
                        <div>
                            <label className="block mb-1">Platform Name</label>
                            <input
                                type="text"
                                value={newSocialMedia.name}
                                onChange={(e) => setNewSocialMedia({ ...newSocialMedia, name: e.target.value })}
                                className="w-full p-2 border rounded"
                            />
                        </div>
                        <div>
                            <label className="block mb-1">URL</label>
                            <input
                                type="text"
                                value={newSocialMedia.url}
                                onChange={(e) => setNewSocialMedia({ ...newSocialMedia, url: e.target.value })}
                                className="w-full p-2 border rounded"
                            />
                        </div>
                        <button
                            type="button"
                            onClick={addSocialMedia}
                            className="bg-yellow-500 text-white p-2 rounded hover:bg-yellow-600 md:col-span-2"
                        >
                            Add Social Media
                        </button>
                    </div>
                </div>

                <button
                    type="submit"
                    className="bg-green-500 text-white py-3 px-6 rounded-lg font-semibold hover:bg-green-600"
                >
                    Generate Portfolio
                </button>
            </form>
        </div>
    );
}

export default DataEntryPage;