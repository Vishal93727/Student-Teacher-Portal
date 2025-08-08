import React, { useState, useEffect } from 'react';
import '../styles/Re.css'
import { useNavigate } from 'react-router-dom';


// Mock data for dropdowns
const BRANCHES = [
  'Computer Science Engineering',
  'Mechanical Engineering',
  'Electrical Engineering',
  'Civil Engineering',
  'Electronics and Communication',
  'Information Technology',
  'Chemical Engineering',
  'Aerospace Engineering'
];

const DEPARTMENTS = {
  'Computer Science Engineering': ['Software Development', 'Data Science', 'Cybersecurity', 'AI/ML'],
  'Mechanical Engineering': ['Thermal Engineering', 'Manufacturing', 'Automotive', 'Robotics'],
  'Electrical Engineering': ['Power Systems', 'Control Systems', 'Electronics', 'Renewable Energy'],
  'Civil Engineering': ['Structural', 'Transportation', 'Environmental', 'Geotechnical'],
  'Electronics and Communication': ['VLSI', 'Communications', 'Signal Processing', 'Embedded Systems'],
  'Information Technology': ['Web Development', 'Mobile Apps', 'Database Systems', 'Network Security'],
  'Chemical Engineering': ['Process Engineering', 'Petrochemicals', 'Biochemical', 'Materials'],
  'Aerospace Engineering': ['Aerodynamics', 'Propulsion', 'Avionics', 'Space Technology']
};

const YEARS = ['1st Year', '2nd Year', '3rd Year', '4th Year'];
const SEMESTERS = ['1st Semester', '2nd Semester'];

// Mock API Service
const ApiService = {
  async registerStudent(studentData) {
    await new Promise(resolve => setTimeout(resolve, 1000));
    const newStudent = {
      id: Date.now(),
      ...studentData,
      registeredAt: new Date().toISOString()
    };
    
    const students = JSON.parse(localStorage.getItem('students') || '[]');
    students.push(newStudent);
    localStorage.setItem('students', JSON.stringify(students));
    
    return { success: true, student: newStudent };
  },

  async getStudentsByFilter(filters) {
    await new Promise(resolve => setTimeout(resolve, 500));
    const students = JSON.parse(localStorage.getItem('students') || '[]');
    
    let filteredStudents = students;
    
    if (filters.branch) {
      filteredStudents = filteredStudents.filter(s => s.branch === filters.branch);
    }
    if (filters.department) {
      filteredStudents = filteredStudents.filter(s => s.department === filters.department);
    }
    if (filters.year) {
      filteredStudents = filteredStudents.filter(s => s.year === filters.year);
    }
    if (filters.semester) {
      filteredStudents = filteredStudents.filter(s => s.semester === filters.semester);
    }
    
    return filteredStudents;
  },

  async getAllStudents() {
    await new Promise(resolve => setTimeout(resolve, 300));
    return JSON.parse(localStorage.getItem('students') || '[]');
  }
};
// Teacher Student Filter Component
const TeacherStudentFilter = () => {
  const [filters, setFilters] = useState({
    branch: '',
    department: '',
    year: '',
    semester: '',
    section: ''
  });
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [availableDepartments, setAvailableDepartments] = useState([]);

  useEffect(() => {
    const loadAllStudents = async () => {
      const allStudents = await ApiService.getAllStudents();
      setStudents(allStudents);
      setFilteredStudents(allStudents);
    };
    loadAllStudents();
  }, []);

  useEffect(() => {
    if (filters.branch) {
      setAvailableDepartments(DEPARTMENTS[filters.branch] || []);
      setFilters(prev => ({ ...prev, department: '' }));
    }
  }, [filters.branch]);

  const handleFilterChange = (field, value) => {
    setFilters(prev => ({ ...prev, [field]: value }));
  };

  const applyFilters = async () => {
    setLoading(true);
    try {
      const filtered = await ApiService.getStudentsByFilter(filters);
      setFilteredStudents(filtered);
    } catch (error) {
      console.error('Error filtering students:', error);
    } finally {
      setLoading(false);
    }
  };

  const clearFilters = () => {
    setFilters({
      branch: '',
      department: '',
      year: '',
      semester: '',
      section: ''
    });
    setFilteredStudents(students);
  };

  const exportToCSV = () => {
    const headers = ['Name', 'Roll Number', 'Email', 'Branch', 'Department', 'Year', 'Semester', 'Phone'];
    const csvContent = [
      headers.join(','),
      ...filteredStudents.map(student => [
        `"${student.firstName} ${student.lastName}"`,
        student.rollNumber,
        student.email,
        `"${student.branch}"`,
        `"${student.department}"`,
        student.year,
        student.semester,
        student.phone
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `students_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
    window.URL.revokeObjectURL(url);
  };
return (
  <div className="filter-page">
    <div className="container">
      <div className="filter-card">
        <h1 className="filter-title">Student Management - Filter by Criteria</h1>

        {/* Filters */}
        <div className="filters-grid">
          <div className="form-group">
            <label>Branch</label>
            <select value={filters.branch} onChange={(e) => handleFilterChange('branch', e.target.value)}>
              <option value="">All Branches</option>
              {BRANCHES.map(branch => (
                <option key={branch} value={branch}>{branch}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Department</label>
            <select
              value={filters.department}
              onChange={(e) => handleFilterChange('department', e.target.value)}
              disabled={!filters.branch}
            >
              <option value="">All Departments</option>
              {availableDepartments.map(dept => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Year</label>
            <select value={filters.year} onChange={(e) => handleFilterChange('year', e.target.value)}>
              <option value="">All Years</option>
              {YEARS.map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Semester</label>
            <select value={filters.semester} onChange={(e) => handleFilterChange('semester', e.target.value)}>
              <option value="">All Semesters</option>
              {SEMESTERS.map(sem => (
                <option key={sem} value={sem}>{sem}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Section</label>
            <input
              type="text"
              value={filters.section}
              onChange={(e) => handleFilterChange('section', e.target.value)}
              placeholder="e.g., A, B, C"
            />
          </div>
        </div>

        <div className="button-group">
          <button onClick={applyFilters} disabled={loading} className="btn btn-primary">
            {loading ? 'Filtering...' : 'Apply Filters'}
          </button>
          <button onClick={clearFilters} className="btn btn-secondary">Clear Filters</button>
          <button onClick={exportToCSV} disabled={filteredStudents.length === 0} className="btn btn-success">
            Export CSV
          </button>
        </div>

        <div className="student-count">
          Showing {filteredStudents.length} of {students.length} students
        </div>
      </div>

      {/* Students Table */}
      <div className="table-wrapper">
        {filteredStudents.length > 0 ? (
          <div className="table-scroll">
            <table className="student-table">
              <thead>
                <tr>
                  <th>Student Details</th>
                  <th>Academic Info</th>
                  <th>Contact</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.map((student) => (
                  <tr key={student.id}>
                    <td>
                      <div className="student-info">
                        <div className="student-avatar">
                          {student.firstName?.[0]}{student.lastName?.[0]}
                        </div>
                        <div>
                          <div className="student-name">{student.firstName} {student.lastName}</div>
                          <div className="student-roll">{student.rollNumber}</div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div>{student.branch}</div>
                      <div className="text-muted">{student.department}</div>
                      <div className="text-muted">{student.year} - {student.semester}</div>
                    </td>
                    <td>
                      <div>{student.email}</div>
                      <div className="text-muted">{student.phone}</div>
                    </td>
                    <td>
                      <button className="action-link view-link">View Profile</button>
                      <button className="action-link message-link">Send Message</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="no-data">
            <div className="icon">👥</div>
            <h3>No Students Found</h3>
            <p>Try adjusting your filters or register new students.</p>
          </div>
        )}
      </div>
      
    </div>
    
  </div>
);
};
export default TeacherStudentFilter;


