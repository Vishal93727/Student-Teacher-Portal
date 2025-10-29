import React, { useState, useEffect } from 'react';
import { fetchAssignments, createAssignment, updateAssignment, deleteAssignment } from "../services/api";
const Assignment = () => {
  const [assignments, setAssignments] = useState([]);
  const [students, setStudents] = useState([]);
  const [submissions, setSubmissions] = useState([]);
  const [currentView, setCurrentView] = useState('list');
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [currentUser] = useState({ role: 'teacher', name: 'Professor Smith' });
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);

  // Mock data initialization
  // useEffect(() => {
  //   setAssignments([
  //     {
  //       id: 1,
  //       title: 'Mathematics Assignment 1',
  //       description: 'Solve algebraic equations and graph functions',
  //       subject: 'Mathematics',
  //       dueDate: '2025-08-15',
  //       createdDate: '2025-07-20',
  //       status: 'Active',
  //       totalMarks: 100,
  //       submissionType: 'file',
  //       instructions: 'Upload your solutions in PDF format. Show all work clearly.',
  //       attachments: ['sample_problems.pdf']
  //     },
  //     {
  //       id: 2,
  //       title: 'Science Project - Solar System',
  //       description: 'Create a detailed presentation about planets',
  //       subject: 'Science',
  //       dueDate: '2025-08-20',
  //       createdDate: '2025-07-25',
  //       status: 'Active',
  //       totalMarks: 150,
  //       submissionType: 'file',
  //       instructions: 'Create a PowerPoint presentation with at least 15 slides.',
  //       attachments: []
  //     },
  //     {
  //       id: 3,
  //       title: 'History Essay - World War II',
  //       description: 'Write an essay on the impact of WWII',
  //       subject: 'History',
  //       dueDate: '2025-08-25',
  //       createdDate: '2025-08-01',
  //       status: 'Draft',
  //       totalMarks: 75,
  //       submissionType: 'text',
  //       instructions: 'Write a 1000-word essay analyzing the social and economic impacts.',
  //       attachments: ['reference_materials.pdf']
  //     },
  //     {
  //       id: 4,
  //       title: 'English Literature Review',
  //       description: 'Analyze themes in Shakespeare plays',
  //       subject: 'English',
  //       dueDate: '2025-09-01',
  //       createdDate: '2025-08-05',
  //       status: 'Active',
  //       totalMarks: 80,
  //       submissionType: 'text',
  //       instructions: 'Focus on character development and thematic elements.',
  //       attachments: []
  //     }
  //   ]);

  //   setStudents([
  //     { id: 1, name: 'John Doe', email: 'john@student.com', rollNumber: 'S001' },
  //     { id: 2, name: 'Jane Smith', email: 'jane@student.com', rollNumber: 'S002' },
  //     { id: 3, name: 'Mike Johnson', email: 'mike@student.com', rollNumber: 'S003' },
  //     { id: 4, name: 'Sarah Wilson', email: 'sarah@student.com', rollNumber: 'S004' },
  //     { id: 5, name: 'Tom Brown', email: 'tom@student.com', rollNumber: 'S005' }
  //   ]);

  //   setSubmissions([
  //     {
  //       id: 1,
  //       assignmentId: 1,
  //       studentId: 1,
  //       studentName: 'John Doe',
  //       submittedAt: '2025-08-10T10:30:00',
  //       status: 'Submitted',
  //       grade: null,
  //       feedback: '',
  //       fileName: 'john_math_assignment.pdf',
  //       fileSize: '2.3 MB'
  //     },
  //     {
  //       id: 2,
  //       assignmentId: 1,
  //       studentId: 2,
  //       studentName: 'Jane Smith',
  //       submittedAt: '2025-08-12T14:15:00',
  //       status: 'Graded',
  //       grade: 85,
  //       feedback: 'Good work! Minor calculation errors in problem 3.',
  //       fileName: 'jane_math_assignment.pdf',
  //       fileSize: '1.8 MB'
  //     },
  //     {
  //       id: 3,
  //       assignmentId: 2,
  //       studentId: 1,
  //       studentName: 'John Doe',
  //       submittedAt: '2025-08-18T09:45:00',
  //       status: 'Late',
  //       grade: null,
  //       feedback: '',
  //       fileName: 'john_science_project.pptx',
  //       fileSize: '15.2 MB'
  //     }
  //   ]);
  // }, []);


useEffect(() => {
  const loadAssignments = async () => {
    try {
      const res = await fetchAssignments();
      setAssignments(res.data);
    } catch (err) {
      console.error("Error fetching assignments:", err);
    }
  };
  loadAssignments();
}, []);




  // Assignment Form Component
  const AssignmentForm = ({ assignment, onSave, onCancel }) => {
    const [formData, setFormData] = useState({
      title: assignment?.title || '',
      description: assignment?.description || '',
      subject: assignment?.subject || 'Mathematics',
      dueDate: assignment?.dueDate || '',
      totalMarks: assignment?.totalMarks || 100,
      submissionType: assignment?.submissionType || 'file',
      instructions: assignment?.instructions || '',
      status: assignment?.status || 'Draft'
    });

    const [attachments, setAttachments] = useState([]);

    const subjects = ['Mathematics', 'Science', 'History', 'English', 'Physics', 'Chemistry', 'Biology'];

    // const handleSubmit = (e) => {
    //   e.preventDefault();
    //   const newAssignment = {
    //     ...formData,
    //     id: assignment?.id || Date.now(),
    //     createdDate: assignment?.createdDate || new Date().toISOString().split('T')[0],
    //     attachments: attachments.map(file => file.name)
    //   };
    //   onSave(newAssignment);
    // };
const handleSubmit = (e) => {
  e.preventDefault();

  const newAssignment = {
    title: formData.title,
    description: formData.description,
    subject: formData.subject,
    dueDate: formData.dueDate,
    totalMarks: formData.totalMarks,
    submissionType: formData.submissionType,
    instructions: formData.instructions,
    status: formData.status,
  };

  onSave(newAssignment, attachments);
};

    const handleFileUpload = (e) => {
      const files = Array.from(e.target.files);
      setAttachments(prev => [...prev, ...files]);
    };

    const removeAttachment = (index) => {
      setAttachments(prev => prev.filter((_, i) => i !== index));
    };

    return (
      <div className="assignment-form-container">
        <div className="form-header">
          <h2>{assignment ? 'Edit Assignment' : 'Create New Assignment'}</h2>
          <button className="close-btn" onClick={onCancel}>×</button>
        </div>

        <form onSubmit={handleSubmit} className="assignment-form">
          <div className="form-row">
            <div className="form-group">
              <label>Assignment Title *</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                placeholder="Enter assignment title"
                required
              />
            </div>
            <div className="form-group">
              <label>Subject *</label>
              <select
                value={formData.subject}
                onChange={(e) => setFormData({...formData, subject: e.target.value})}
                required
              >
                {subjects.map(subject => (
                  <option key={subject} value={subject}>{subject}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              placeholder="Brief description of the assignment"
              rows="3"
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Due Date *</label>
              <input
                type="date"
                value={formData.dueDate}
                onChange={(e) => setFormData({...formData, dueDate: e.target.value})}
                required
              />
            </div>
            <div className="form-group">
              <label>Total Marks *</label>
              <input
                type="number"
                value={formData.totalMarks}
                onChange={(e) => setFormData({...formData, totalMarks: parseInt(e.target.value)})}
                min="1"
                max="1000"
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Submission Type</label>
              <select
                value={formData.submissionType}
                onChange={(e) => setFormData({...formData, submissionType: e.target.value})}
              >
                <option value="file">File Upload</option>
                <option value="text">Text Submission</option>
                <option value="both">Both File and Text</option>
              </select>
            </div>
            <div className="form-group">
              <label>Status</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({...formData, status: e.target.value})}
              >
                <option value="Draft">Draft</option>
                <option value="Active">Active</option>
                <option value="Closed">Closed</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label>Instructions</label>
            <textarea
              value={formData.instructions}
              onChange={(e) => setFormData({...formData, instructions: e.target.value})}
              placeholder="Detailed instructions for students"
              rows="4"
            />
          </div>

          <div className="form-group">
            <label>Attachments</label>
            <div className="file-upload-area">
              <input
                type="file"
                multiple
                onChange={handleFileUpload}
                className="file-input"
                id="file-upload"
              />
              <label htmlFor="file-upload" className="file-upload-label">
                📎 Click to upload files or drag and drop
              </label>
            </div>
            {attachments.length > 0 && (
              <div className="attachment-list">
                {attachments.map((file, index) => (
                  <div key={index} className="attachment-item">
                    <span>📄 {file.name}</span>
                    <button type="button" onClick={() => removeAttachment(index)}>×</button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="form-actions">
            <button type="button" className="cancel-btn" onClick={onCancel}>
              Cancel
            </button>
            <button type="submit" className="save-btn">
              {assignment ? 'Update Assignment' : 'Create Assignment'}
            </button>
          </div>
        </form>
      </div>
    );
  };

  // Assignment Details Component
  const AssignmentDetails = ({ assignment, onEdit, onBack }) => {
    const assignmentSubmissions = submissions.filter(s => s.assignmentId === assignment.id);
    const submittedCount = assignmentSubmissions.length;
    const gradedCount = assignmentSubmissions.filter(s => s.grade !== null).length;

    return (
      <div className="assignment-details">
        <div className="details-header">
          <button className="back-btn" onClick={onBack}>← Back to List</button>
          <div className="header-actions">
            <button className="edit-btn" onClick={() => onEdit(assignment)}>
              ✏️ Edit Assignment
            </button>
            <button className="delete-btn" onClick={() => handleDeleteAssignment(assignment.id)}>
              🗑️ Delete
            </button>
          </div>
        </div>

        <div className="assignment-info-card">
          <div className="assignment-header">
            <h1>{assignment.title}</h1>
            <span className={`status-badge ${assignment.status.toLowerCase()}`}>
              {assignment.status}
            </span>
          </div>

          <div className="assignment-meta">
            <div className="meta-item">
              <strong>Subject:</strong> {assignment.subject}
            </div>
            <div className="meta-item">
              <strong>Due Date:</strong> {new Date(assignment.dueDate).toLocaleDateString()}
            </div>
            <div className="meta-item">
              <strong>Total Marks:</strong> {assignment.totalMarks}
            </div>
            <div className="meta-item">
              <strong>Submission Type:</strong> {assignment.submissionType}
            </div>
          </div>

          <div className="assignment-description">
            <h3>Description</h3>
            <p>{assignment.description}</p>
          </div>

          <div className="assignment-instructions">
            <h3>Instructions</h3>
            <p>{assignment.instructions}</p>
          </div>

          {assignment.attachments && assignment.attachments.length > 0 && (
            <div className="assignment-attachments">
              <h3>Attachments</h3>
              <div className="attachment-list">
                {assignment.attachments.map((attachment, index) => (
                  <div key={index} className="attachment-item">
                    <span>📄 {attachment}</span>
                    <button className="download-btn">Download</button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="submission-stats">
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-number">{students.length}</div>
              <div className="stat-label">Total Students</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">{submittedCount}</div>
              <div className="stat-label">Submissions</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">{gradedCount}</div>
              <div className="stat-label">Graded</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">{students.length - submittedCount}</div>
              <div className="stat-label">Pending</div>
            </div>
          </div>
        </div>

        <div className="submissions-section">
          <h3>Student Submissions</h3>
          <div className="submissions-table">
            <div className="table-header">
              <div>Student</div>
              <div>Submitted At</div>
              <div>Status</div>
              <div>Grade</div>
              <div>Actions</div>
            </div>
            {assignmentSubmissions.map(submission => (
              <div key={submission.id} className="table-row">
                <div className="student-info">
                  <strong>{submission.studentName}</strong>
                  <small>{submission.fileName}</small>
                </div>
                <div>{new Date(submission.submittedAt).toLocaleString()}</div>
                <div>
                  <span className={`status-badge ${submission.status.toLowerCase()}`}>
                    {submission.status}
                  </span>
                </div>
                <div>
                  {submission.grade ? (
                    <span className="grade">{submission.grade}/{assignment.totalMarks}</span>
                  ) : (
                    <span className="no-grade">Not graded</span>
                  )}
                </div>
                <div className="action-buttons">
                  <button className="view-btn">👁️</button>
                  <button className="grade-btn">✏️</button>
<a
  href={`http://localhost:5000/uploads/${attachment}`}
  target="_blank"
  rel="noopener noreferrer"
  className="download-btn"
>
  ⬇️ Download
</a>

                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  // Assignment List Component
  const AssignmentList = () => {
    const filteredAssignments = assignments.filter(assignment => {
      const matchesSearch = assignment.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           assignment.subject.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilter = filterStatus === 'all' || assignment.status.toLowerCase() === filterStatus;
      return matchesSearch && matchesFilter;
    });

    const totalPages = Math.ceil(filteredAssignments.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentAssignments = filteredAssignments.slice(startIndex, startIndex + itemsPerPage);

    return (
      <div className="assignment-list">
        <div className="list-header">
          <div className="header-content">
            <h1>📝 Assignment Management</h1>
            <p>Create, manage, and track student assignments</p>
          </div>
          <button 
            className="create-btn"
            onClick={() => setCurrentView('create')}
          >
            ➕ Create Assignment
          </button>
        </div>

        <div className="filters-section">
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search assignments..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="filter-dropdown">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="draft">Draft</option>
              <option value="closed">Closed</option>
            </select>
          </div>
        </div>

        <div className="assignments-grid">
          {currentAssignments.map(assignment => (
            <div key={assignment.id} className="assignment-card">
              <div className="card-header">
                <h3>{assignment.title}</h3>
                <span className={`status-badge ${assignment.status.toLowerCase()}`}>
                  {assignment.status}
                </span>
              </div>
              
              <div className="card-content">
                <p className="assignment-description">{assignment.description}</p>
                <div className="assignment-meta">
                  <div className="meta-item">
                    <span className="label">Subject:</span>
                    <span className="value">{assignment.subject}</span>
                  </div>
                  <div className="meta-item">
                    <span className="label">Due Date:</span>
                    <span className="value">{new Date(assignment.dueDate).toLocaleDateString()}</span>
                  </div>
                  <div className="meta-item">
                    <span className="label">Total Marks:</span>
                    <span className="value">{assignment.totalMarks}</span>
                  </div>
                </div>
              </div>

              <div className="card-actions">
                <button 
                  className="view-btn"
                  onClick={() => {
                    setSelectedAssignment(assignment);
                    setCurrentView('details');
                  }}
                >
                  👁️ View Details
                </button>
                <button 
                  className="edit-btn"
                  onClick={() => {
                    setSelectedAssignment(assignment);
                    setCurrentView('edit');
                  }}
                >
                  ✏️ Edit
                </button>
                <button 
                  className="delete-btn"
                  onClick={() => handleDeleteAssignment(assignment.id)}
                >
                  🗑️ Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredAssignments.length === 0 && (
          <div className="empty-state">
            <h3>No assignments found</h3>
            <p>Create your first assignment to get started!</p>
            <button 
              className="create-btn"
              onClick={() => setCurrentView('create')}
            >
              ➕ Create Assignment
            </button>
          </div>
        )}

      {totalPages > 1 && (
          <div className="pagination">
            <button 
              className="page-btn"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
            >
              Previous
            </button>
            
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <button
                key={page}
                className={`page-btn ${currentPage === page ? 'active' : ''}`}
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </button>
            ))}
            
            <button 
              className="page-btn"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              Next
            </button>
          </div>
        )}
      </div>
    );
  };

  // Event Handlers
  // const handleSaveAssignment = (assignmentData) => {
  //   if (selectedAssignment) {
  //     // Update existing assignment
  //     setAssignments(prev => prev.map(a => 
  //       a.id === selectedAssignment.id ? assignmentData : a
  //     ));
  //   } else {
  //     // Create new assignment
  //     setAssignments(prev => [...prev, assignmentData]);
  //   }
  //   setCurrentView('list');
  //   setSelectedAssignment(null);
  // };


const handleSaveAssignment = async (assignmentData, files = []) => {
  try {
    const formData = new FormData();
    Object.entries(assignmentData).forEach(([key, value]) => {
      formData.append(key, value);
    });

    if (files.length > 0) {
      files.forEach(file => formData.append("attachments", file));
    }

    let response;
    if (selectedAssignment) {
      // Update existing
      response = await updateAssignment(selectedAssignment._id, formData);
      setAssignments(prev =>
        prev.map(a => (a._id === selectedAssignment._id ? response.data : a))
      );
    } else {
      // Create new
      response = await createAssignment(formData);
      setAssignments(prev => [response.data, ...prev]);
    }

    setCurrentView("list");
    setSelectedAssignment(null);
  } catch (error) {
    console.error("Error saving assignment:", error);
  }
};


  // const handleDeleteAssignment = (assignmentId) => {
  //   if (window.confirm('Are you sure you want to delete this assignment?')) {
  //     setAssignments(prev => prev.filter(a => a.id !== assignmentId));
  //     if (currentView === 'details') {
  //       setCurrentView('list');
  //     }
  //   }
  // };
const handleDeleteAssignment = async (assignmentId) => {
  if (!window.confirm("Are you sure you want to delete this assignment?")) return;

  try {
    await deleteAssignment(assignmentId);
    setAssignments(prev => prev.filter(a => a._id !== assignmentId));
    if (currentView === "details") setCurrentView("list");
  } catch (err) {
    console.error("Error deleting assignment:", err);
  }
};

  // Render current view
  const renderCurrentView = () => {
    switch (currentView) {
      case 'create':
        return (
          <AssignmentForm
            onSave={handleSaveAssignment}
            onCancel={() => setCurrentView('list')}
          />
        );
      case 'edit':
        return (
          <AssignmentForm
            assignment={selectedAssignment}
            onSave={handleSaveAssignment}
            onCancel={() => setCurrentView('list')}
          />
        );
      case 'details':
        return (
          <AssignmentDetails
            assignment={selectedAssignment}
            onEdit={(assignment) => {
              setSelectedAssignment(assignment);
              setCurrentView('edit');
            }}
            onBack={() => setCurrentView('list')}
          />
        );
      default:
        return <AssignmentList />;
    }
  };

  return (
    <div className="assignment-management">
      {renderCurrentView()}

     
    </div>
  );
};

export default Assignment;