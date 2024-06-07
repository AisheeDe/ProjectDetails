import React, { useState } from 'react';
import './CreateProjectForm.css';

const CreateProjectForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    projectName: '',
    client: '',
    startDate: '',
    endDate: '',
    notes: '',
    projectType: 'Time & Materials',
    hourlyRate: '',
    budgetType: 'Hours per Person',
    budget: '',
    emailAlert: true,
    alertThreshold: 80,
    view: 'Board',
    manageProjects: 'Only Admins',
    tasks: [],
    team: [],
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleNext = () => {
    setStep(step + 1);
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  const handleTaskAdd = (task) => {
    setFormData({
      ...formData,
      tasks: [...formData.tasks, task],
    });
  };

  const handleTaskRemove = (taskToRemove) => {
    setFormData({
      ...formData,
      tasks: formData.tasks.filter(task => task !== taskToRemove),
    });
  };

  const handleTeamAdd = (member) => {
    setFormData({
      ...formData,
      team: [...formData.team, member],
    });
  };

  const handleTeamRemove = (memberToRemove) => {
    setFormData({
      ...formData,
      team: formData.team.filter(member => member !== memberToRemove),
    });
  };

  return (
    <div className="create-project-form">
      {step === 1 && (
        <div className="form-step">
          <h2>Create a project</h2>
          <input
            type="text"
            name="projectName"
            placeholder="Enter project name here"
            value={formData.projectName}
            onChange={handleChange}
          />
          <select name="client" value={formData.client} onChange={handleChange}>
            <option value="">Select a client</option>
            <option value="new">New Client</option>
            {/* Add more clients as needed */}
          </select>
          <div className="date-range">
            <input
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
            />
            <input
              type="date"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
            />
          </div>
          <textarea
            name="notes"
            placeholder="Notes"
            value={formData.notes}
            onChange={handleChange}
          />
          <button onClick={handleNext}>Next</button>
        </div>
      )}
      {step === 2 && (
        <div className="form-step">
          <h2>Project type</h2>
          <div className="project-type">
            <button
              className={formData.projectType === 'Time & Materials' ? 'active' : ''}
              onClick={() => setFormData({ ...formData, projectType: 'Time & Materials' })}
            >
              Time & Materials
            </button>
            <button
              className={formData.projectType === 'Fixed Fee' ? 'active' : ''}
              onClick={() => setFormData({ ...formData, projectType: 'Fixed Fee' })}
            >
              Fixed Fee
            </button>
            <button
              className={formData.projectType === 'Non-Billable' ? 'active' : ''}
              onClick={() => setFormData({ ...formData, projectType: 'Non-Billable' })}
            >
              Non-Billable
            </button>
          </div>
          <input
            type="number"
            name="hourlyRate"
            placeholder="Project Hourly Rate"
            value={formData.hourlyRate}
            onChange={handleChange}
          />
          <select name="budgetType" value={formData.budgetType} onChange={handleChange}>
            <option value="Hours per Person">Hours per Person</option>
            {/* Add more budget types as needed */}
          </select>
          <div className="budget">
            <input
              type="number"
              name="budget"
              placeholder="Budget"
              value={formData.budget}
              onChange={handleChange}
            />
            <label>
              <input
                type="checkbox"
                name="emailAlert"
                checked={formData.emailAlert}
                onChange={handleChange}
              />
              Send email alerts if project exceeds
            </label>
            <input
              type="number"
              name="alertThreshold"
              value={formData.alertThreshold}
              onChange={handleChange}
            />
            % of budget
          </div>
          <button onClick={handleBack}>Back</button>
          <button onClick={handleNext}>Next</button>
        </div>
      )}
      {step === 3 && (
        <div className="form-step">
          <h2>Select a view</h2>
          <div className="view-selection">
            <button
              className={formData.view === 'List' ? 'active' : ''}
              onClick={() => setFormData({ ...formData, view: 'List' })}
            >
              List
            </button>
            <button
              className={formData.view === 'Board' ? 'active' : ''}
              onClick={() => setFormData({ ...formData, view: 'Board' })}
            >
              Board
            </button>
          </div>
          <button onClick={handleBack}>Back</button>
          <button onClick={handleNext}>Next</button>
        </div>
      )}
      {step === 4 && (
        <div className="form-step">
          <h2>Who can manage projects</h2>
          <div className="manage-projects">
            <button
              className={formData.manageProjects === 'Everyone' ? 'active' : ''}
              onClick={() => setFormData({ ...formData, manageProjects: 'Everyone' })}
            >
              Everyone
            </button>
            <button
              className={formData.manageProjects === 'Only Admins' ? 'active' : ''}
              onClick={() => setFormData({ ...formData, manageProjects: 'Only Admins' })}
            >
              Only Admins
            </button>
            <button
              className={formData.manageProjects === 'Specific people' ? 'active' : ''}
              onClick={() => setFormData({ ...formData, manageProjects: 'Specific people' })}
            >
              Specific people
            </button>
          </div>
          <button onClick={handleBack}>Back</button>
          <button onClick={handleNext}>Next</button>
        </div>
      )}
      {step === 5 && (
        <div className="form-step">
          <h2>Tasks</h2>
          <div className="task-list">
            <input
              type="text"
              placeholder="Add a task"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleTaskAdd(e.target.value);
                  e.target.value = '';
                }
              }}
            />
            <ul>
              {formData.tasks.map((task, index) => (
                <li key={index}>
                  <input
                    type="checkbox"
                    checked={true}
                    onChange={() => handleTaskRemove(task)}
                  />
                  {task}
                  <button onClick={() => handleTaskRemove(task)}>x</button>
                </li>
              ))}
            </ul>
          </div>
          <button onClick={handleBack}>Back</button>
          <button onClick={handleNext}>Next</button>
        </div>
      )}
      {step === 6 && (
        <div className="form-step">
          <h2>Team</h2>
          <div className="team-list">
            <input
              type="text"
              placeholder="Invite or Add a person"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleTeamAdd(e.target.value);
                  e.target.value = '';
                }
              }}
            />
            <ul>
              {formData.team.map((member, index) => (
                <li key={index}>
                  <input
                    type="checkbox"
                    checked={true}
                    onChange={() => handleTeamRemove(member)}
                  />
                  {member}
                  <button onClick={() => handleTeamRemove(member)}>x</button>
                </li>
              ))}
            </ul>
          </div>
          <button onClick={handleBack}>Back</button>
          <button onClick={handleSubmit}>Create Project</button>
        </div>
      )}
    </div>
  );
};

export default CreateProjectForm;
