import React, { useState, useEffect } from 'react';
import '../styles/Re.css'

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

// Student Registration Component
const StudentRegistration = ({ onRegistrationSuccess }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    gender: '',
    bloodGroup: '',
    nationality: 'Indian',
    religion: '',
    category: '',
    rollNumber: '',
    registrationNumber: '',
    branch: '',
    department: '',
    year: '',
    semester: '',
    batchYear: new Date().getFullYear(),
    section: '',
    permanentAddress: {
      street: '',
      city: '',
      state: '',
      pincode: '',
      country: 'India'
    },
    currentAddress: {
      street: '',
      city: '',
      state: '',
      pincode: '',
      country: 'India'
    },
    sameAsPermanent: false,
    fatherName: '',
    motherName: '',
    guardianName: '',
    parentPhone: '',
    parentEmail: '',
    parentOccupation: '',
    previousEducation: {
      schoolName: '',
      board: '',
      passingYear: '',
      percentage: '',
      subjects: ''
    },
    hobbies: [],
    skills: [],
    emergencyContact: {
      name: '',
      relation: '',
      phone: ''
    }
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [availableDepartments, setAvailableDepartments] = useState([]);

  const steps = [
    { id: 1, title: 'Personal Information', icon: '👤' },
    { id: 2, title: 'Academic Details', icon: '🎓' },
    { id: 3, title: 'Address Information', icon: '🏠' },
    { id: 4, title: 'Family Details', icon: '👨‍👩‍👧‍👦' },
    { id: 5, title: 'Academic Background', icon: '📚' },
    { id: 6, title: 'Additional Info', icon: '✨' }
  ];

  useEffect(() => {
    if (formData.branch) {
      setAvailableDepartments(DEPARTMENTS[formData.branch] || []);
      setFormData(prev => ({ ...prev, department: '' }));
    }
  }, [formData.branch]);

  const handleInputChange = (field, value, nested = null) => {
    if (nested) {
      setFormData(prev => ({
        ...prev,
        [nested]: {
          ...prev[nested],
          [field]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  const handleArrayInput = (field, value) => {
    const array = value.split(',').map(item => item.trim()).filter(item => item);
    setFormData(prev => ({
      ...prev,
      [field]: array
    }));
  };

  const copyPermanentAddress = () => {
    if (formData.sameAsPermanent) {
      setFormData(prev => ({
        ...prev,
        currentAddress: { ...prev.permanentAddress }
      }));
    }
  };

  useEffect(copyPermanentAddress, [formData.sameAsPermanent]);

  const validateStep = (step) => {
    const newErrors = {};
    
    switch (step) {
      case 1:
        if (!formData.firstName) newErrors.firstName = 'First name is required';
        if (!formData.lastName) newErrors.lastName = 'Last name is required';
        if (!formData.email) newErrors.email = 'Email is required';
        if (!formData.phone) newErrors.phone = 'Phone number is required';
        if (!formData.dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required';
        if (!formData.gender) newErrors.gender = 'Gender is required';
        break;
      case 2:
        if (!formData.rollNumber) newErrors.rollNumber = 'Roll number is required';
        if (!formData.branch) newErrors.branch = 'Branch is required';
        if (!formData.department) newErrors.department = 'Department is required';
        if (!formData.year) newErrors.year = 'Year is required';
        if (!formData.semester) newErrors.semester = 'Semester is required';
        break;
      case 3:
        if (!formData.permanentAddress.street) newErrors.permanentStreet = 'Street address is required';
        if (!formData.permanentAddress.city) newErrors.permanentCity = 'City is required';
        if (!formData.permanentAddress.state) newErrors.permanentState = 'State is required';
        if (!formData.permanentAddress.pincode) newErrors.permanentPincode = 'Pincode is required';
        break;
      case 4:
        if (!formData.fatherName) newErrors.fatherName = 'Father name is required';
        if (!formData.motherName) newErrors.motherName = 'Mother name is required';
        if (!formData.parentPhone) newErrors.parentPhone = 'Parent phone is required';
        break;
      default:
        break;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, steps.length));
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = async () => {
    if (!validateStep(currentStep)) return;
    
    setLoading(true);
    try {
      const result = await ApiService.registerStudent(formData);
      if (result.success) {
        alert('Registration successful!');
        if (onRegistrationSuccess) {
          onRegistrationSuccess(result.student);
        }
      }
    } catch (error) {
      alert('Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
       <div className="form-container">
  <h3 className="form-heading">Personal Information</h3>

  <div className="form-grid">
    <div className="form-group">
      <label className="form-label">First Name *</label>
      <input
        type="text"
        value={formData.firstName}
        onChange={(e) => handleInputChange('firstName', e.target.value)}
        className={`form-input ${errors.firstName ? 'input-error' : ''}`}
        placeholder="Enter first name"
      />
      {errors.firstName && <p className="error-text">{errors.firstName}</p>}
    </div>

    <div className="form-group">
      <label className="form-label">Last Name *</label>
      <input
        type="text"
        value={formData.lastName}
        onChange={(e) => handleInputChange('lastName', e.target.value)}
        className={`form-input ${errors.lastName ? 'input-error' : ''}`}
        placeholder="Enter last name"
      />
      {errors.lastName && <p className="error-text">{errors.lastName}</p>}
    </div>

    <div className="form-group">
      <label className="form-label">Email Address *</label>
      <input
        type="email"
        value={formData.email}
        onChange={(e) => handleInputChange('email', e.target.value)}
        className={`form-input ${errors.email ? 'input-error' : ''}`}
        placeholder="Enter email address"
      />
      {errors.email && <p className="error-text">{errors.email}</p>}
    </div>

    <div className="form-group">
      <label className="form-label">Phone Number *</label>
      <input
        type="tel"
        value={formData.phone}
        onChange={(e) => handleInputChange('phone', e.target.value)}
        className={`form-input ${errors.phone ? 'input-error' : ''}`}
        placeholder="Enter phone number"
      />
      {errors.phone && <p className="error-text">{errors.phone}</p>}
    </div>

    <div className="form-group">
      <label className="form-label">Date of Birth *</label>
      <input
        type="date"
        value={formData.dateOfBirth}
        onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
        className={`form-input ${errors.dateOfBirth ? 'input-error' : ''}`}
      />
      {errors.dateOfBirth && <p className="error-text">{errors.dateOfBirth}</p>}
    </div>

    <div className="form-group">
      <label className="form-label">Gender *</label>
      <select
        value={formData.gender}
        onChange={(e) => handleInputChange('gender', e.target.value)}
        className={`form-input ${errors.gender ? 'input-error' : ''}`}
      >
        <option value="">Select Gender</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
        <option value="Other">Other</option>
      </select>
      {errors.gender && <p className="error-text">{errors.gender}</p>}
    </div>

    <div className="form-group">
      <label className="form-label">Blood Group</label>
      <select
        value={formData.bloodGroup}
        onChange={(e) => handleInputChange('bloodGroup', e.target.value)}
        className="form-input"
      >
        <option value="">Select Blood Group</option>
        <option value="A+">A+</option>
        <option value="A-">A-</option>
        <option value="B+">B+</option>
        <option value="B-">B-</option>
        <option value="AB+">AB+</option>
        <option value="AB-">AB-</option>
        <option value="O+">O+</option>
        <option value="O-">O-</option>
      </select>
    </div>

    <div className="form-group">
      <label className="form-label">Category</label>
      <select
        value={formData.category}
        onChange={(e) => handleInputChange('category', e.target.value)}
        className="form-input"
      >
        <option value="">Select Category</option>
        <option value="General">General</option>
        <option value="OBC">OBC</option>
        <option value="SC">SC</option>
        <option value="ST">ST</option>
        <option value="EWS">EWS</option>
      </select>
    </div>
  </div>
</div>
        );
      case 2:
  return (
    <div className="form-section">
      <h3 className="form-heading">Academic Details</h3>

      <div className="form-grid">
        <div className="form-group">
          <label className="form-label">Roll Number *</label>
          <input
            type="text"
            value={formData.rollNumber}
            onChange={(e) => handleInputChange('rollNumber', e.target.value)}
            className={`form-input ${errors.rollNumber ? 'input-error' : ''}`}
            placeholder="Enter roll number"
          />
          {errors.rollNumber && <p className="error-text">{errors.rollNumber}</p>}
        </div>

        <div className="form-group">
          <label className="form-label">Registration Number</label>
          <input
            type="text"
            value={formData.registrationNumber}
            onChange={(e) => handleInputChange('registrationNumber', e.target.value)}
            className="form-input"
            placeholder="Enter registration number"
          />
        </div>

        <div className="form-group">
          <label className="form-label">Branch *</label>
          <select
            value={formData.branch}
            onChange={(e) => handleInputChange('branch', e.target.value)}
            className={`form-input ${errors.branch ? 'input-error' : ''}`}
          >
            <option value="">Select Branch</option>
            {BRANCHES.map(branch => (
              <option key={branch} value={branch}>{branch}</option>
            ))}
          </select>
          {errors.branch && <p className="error-text">{errors.branch}</p>}
        </div>

        <div className="form-group">
          <label className="form-label">Department *</label>
          <select
            value={formData.department}
            onChange={(e) => handleInputChange('department', e.target.value)}
            className={`form-input ${errors.department ? 'input-error' : ''}`}
            disabled={!formData.branch}
          >
            <option value="">Select Department</option>
            {availableDepartments.map(dept => (
              <option key={dept} value={dept}>{dept}</option>
            ))}
          </select>
          {errors.department && <p className="error-text">{errors.department}</p>}
        </div>

        <div className="form-group">
          <label className="form-label">Year *</label>
          <select
            value={formData.year}
            onChange={(e) => handleInputChange('year', e.target.value)}
            className={`form-input ${errors.year ? 'input-error' : ''}`}
          >
            <option value="">Select Year</option>
            {YEARS.map(year => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
          {errors.year && <p className="error-text">{errors.year}</p>}
        </div>

        <div className="form-group">
          <label className="form-label">Semester *</label>
          <select
            value={formData.semester}
            onChange={(e) => handleInputChange('semester', e.target.value)}
            className={`form-input ${errors.semester ? 'input-error' : ''}`}
          >
            <option value="">Select Semester</option>
            {SEMESTERS.map(sem => (
              <option key={sem} value={sem}>{sem}</option>
            ))}
          </select>
          {errors.semester && <p className="error-text">{errors.semester}</p>}
        </div>

        <div className="form-group">
          <label className="form-label">Batch Year</label>
          <input
            type="number"
            value={formData.batchYear}
            onChange={(e) => handleInputChange('batchYear', parseInt(e.target.value))}
            className="form-input"
            min="2020"
            max="2030"
          />
        </div>

        <div className="form-group">
          <label className="form-label">Section</label>
          <input
            type="text"
            value={formData.section}
            onChange={(e) => handleInputChange('section', e.target.value)}
            className="form-input"
            placeholder="e.g., A, B, C"
          />
        </div>
      </div>
    </div>
  );

case 3:
  return (
    <div className="form-section">
      <h3 className="form-heading">Address Information</h3>

      <div className="form-block">
        <div>
          <h4 className="form-subheading">Permanent Address</h4>
          <div className="form-grid">
            <div className="form-group full-width">
              <label className="form-label">Street Address *</label>
              <input
                type="text"
                value={formData.permanentAddress.street}
                onChange={(e) => handleInputChange('street', e.target.value, 'permanentAddress')}
                className={`form-input ${errors.permanentStreet ? 'input-error' : ''}`}
                placeholder="Enter street address"
              />
              {errors.permanentStreet && <p className="error-text">{errors.permanentStreet}</p>}
            </div>

            <div className="form-group">
              <label className="form-label">City *</label>
              <input
                type="text"
                value={formData.permanentAddress.city}
                onChange={(e) => handleInputChange('city', e.target.value, 'permanentAddress')}
                className={`form-input ${errors.permanentCity ? 'input-error' : ''}`}
                placeholder="Enter city"
              />
              {errors.permanentCity && <p className="error-text">{errors.permanentCity}</p>}
            </div>

            <div className="form-group">
              <label className="form-label">State *</label>
              <input
                type="text"
                value={formData.permanentAddress.state}
                onChange={(e) => handleInputChange('state', e.target.value, 'permanentAddress')}
                className={`form-input ${errors.permanentState ? 'input-error' : ''}`}
                placeholder="Enter state"
              />
              {errors.permanentState && <p className="error-text">{errors.permanentState}</p>}
            </div>

            <div className="form-group">
              <label className="form-label">Pincode *</label>
              <input
                type="text"
                value={formData.permanentAddress.pincode}
                onChange={(e) => handleInputChange('pincode', e.target.value, 'permanentAddress')}
                className={`form-input ${errors.permanentPincode ? 'input-error' : ''}`}
                placeholder="Enter pincode"
              />
              {errors.permanentPincode && <p className="error-text">{errors.permanentPincode}</p>}
            </div>

            <div className="form-group">
              <label className="form-label">Country</label>
              <input
                type="text"
                value={formData.permanentAddress.country}
                onChange={(e) => handleInputChange('country', e.target.value, 'permanentAddress')}
                className="form-input"
              />
            </div>
          </div>
        </div>

        <div>
          <div className="checkbox-group">
            <input
              type="checkbox"
              id="sameAsPermanent"
              checked={formData.sameAsPermanent}
              onChange={(e) => handleInputChange('sameAsPermanent', e.target.checked)}
            />
            <label htmlFor="sameAsPermanent">Current address is same as permanent address</label>
          </div>

          {!formData.sameAsPermanent && (
            <div>
              <h4 className="form-subheading">Current Address</h4>
              <div className="form-grid">
                <div className="form-group full-width">
                  <label className="form-label">Street Address</label>
                  <input
                    type="text"
                    value={formData.currentAddress.street}
                    onChange={(e) => handleInputChange('street', e.target.value, 'currentAddress')}
                    className="form-input"
                    placeholder="Enter street address"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">City</label>
                  <input
                    type="text"
                    value={formData.currentAddress.city}
                    onChange={(e) => handleInputChange('city', e.target.value, 'currentAddress')}
                    className="form-input"
                    placeholder="Enter city"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">State</label>
                  <input
                    type="text"
                    value={formData.currentAddress.state}
                    onChange={(e) => handleInputChange('state', e.target.value, 'currentAddress')}
                    className="form-input"
                    placeholder="Enter state"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Pincode</label>
                  <input
                    type="text"
                    value={formData.currentAddress.pincode}
                    onChange={(e) => handleInputChange('pincode', e.target.value, 'currentAddress')}
                    className="form-input"
                    placeholder="Enter pincode"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Country</label>
                  <input
                    type="text"
                    value={formData.currentAddress.country}
                    onChange={(e) => handleInputChange('country', e.target.value, 'currentAddress')}
                    className="form-input"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );

case 5:
  return (
    <div className="form-section">
      <h3 className="form-heading">Academic Background</h3>

      <div className="form-box">
        <h4 className="form-subheading">Previous Education (12th/Diploma)</h4>
        <div className="form-grid">
          <div className="form-group">
            <label className="form-label">School/Institution Name</label>
            <input
              type="text"
              value={formData.previousEducation.schoolName}
              onChange={(e) => handleInputChange('schoolName', e.target.value, 'previousEducation')}
              className="form-input"
              placeholder="Enter school/institution name"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Board/University</label>
            <input
              type="text"
              value={formData.previousEducation.board}
              onChange={(e) => handleInputChange('board', e.target.value, 'previousEducation')}
              className="form-input"
              placeholder="e.g., CBSE, State Board"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Passing Year</label>
            <input
              type="number"
              value={formData.previousEducation.passingYear}
              onChange={(e) => handleInputChange('passingYear', e.target.value, 'previousEducation')}
              className="form-input"
              placeholder="Enter passing year"
              min="2000"
              max={new Date().getFullYear()}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Percentage/CGPA</label>
            <input
              type="text"
              value={formData.previousEducation.percentage}
              onChange={(e) => handleInputChange('percentage', e.target.value, 'previousEducation')}
              className="form-input"
              placeholder="Enter percentage or CGPA"
            />
          </div>

          <div className="form-group full-width">
            <label className="form-label">Subjects/Stream</label>
            <input
              type="text"
              value={formData.previousEducation.subjects}
              onChange={(e) => handleInputChange('subjects', e.target.value, 'previousEducation')}
              className="form-input"
              placeholder="e.g., PCM, Commerce, Arts"
            />
          </div>
        </div>
      </div>
    </div>
  );

   case 6:
  return (
    <div className="form-section">
      <h3 className="form-heading">Additional Information</h3>

      <div className="form-grid">
        <div className="form-group">
          <label className="form-label">Hobbies</label>
          <input
            type="text"
            value={formData.hobbies.join(', ')}
            onChange={(e) => handleArrayInput('hobbies', e.target.value)}
            className="form-input"
            placeholder="Enter hobbies separated by commas"
          />
          <p className="form-hint">Separate multiple hobbies with commas</p>
        </div>

        <div className="form-group">
          <label className="form-label">Skills</label>
          <input
            type="text"
            value={formData.skills.join(', ')}
            onChange={(e) => handleArrayInput('skills', e.target.value)}
            className="form-input"
            placeholder="Enter skills separated by commas"
          />
          <p className="form-hint">Separate multiple skills with commas</p>
        </div>

        <div className="form-group">
          <label className="form-label">Religion</label>
          <input
            type="text"
            value={formData.religion}
            onChange={(e) => handleInputChange('religion', e.target.value)}
            className="form-input"
            placeholder="Enter religion"
          />
        </div>

        <div className="form-group">
          <label className="form-label">Nationality</label>
          <input
            type="text"
            value={formData.nationality}
            onChange={(e) => handleInputChange('nationality', e.target.value)}
            className="form-input"
            placeholder="Enter nationality"
          />
        </div>
      </div>

      <div className="form-info-box">
        <h4 className="form-info-heading">📝 Review Your Information</h4>
        <p className="form-info-text">
          Please review all the information you've entered before submitting your registration.
          Make sure all required fields are filled correctly.
        </p>
      </div>
    </div>
  );

      default:
        return null;
    }
  };

  return (
  <div className="page-container">
    <div className="form-wrapper">
      {/* Progress Steps */}
      <div className="steps-container">
        <div className="steps">
          {steps.map((step, index) => (
            <div key={step.id} className="step-item">
              <div
                className={`step-circle ${currentStep >= step.id ? 'active' : ''} ${
                  currentStep > step.id ? 'completed' : ''
                }`}
              >
                {currentStep > step.id ? '✓' : step.icon}
              </div>
              <div className="step-title">
                <p className={`step-text ${currentStep >= step.id ? 'active-text' : ''}`}>
                  {step.title}
                </p>
              </div>
              {index < steps.length - 1 && (
                <div className={`step-line ${currentStep > step.id ? 'completed-line' : ''}`} />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Registration Form */}
      <div className="form-container">
        <div className="form-header">
          <h1 className="form-title">Student Registration</h1>
          <p className="form-subtitle">Step {currentStep} of {steps.length}</p>
        </div>

        {renderStepContent()}

        {/* Navigation Buttons */}
        <div className="form-navigation">
          <button
            onClick={prevStep}
            disabled={currentStep === 1}
            className="btn btn-secondary"
          >
            Previous
          </button>

          {currentStep < steps.length ? (
            <button onClick={nextStep} className="btn btn-primary">Next</button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="btn btn-success"
            >
              {loading ? 'Registering...' : 'Complete Registration'}
            </button>
          )}
        </div>
      </div>
      
    </div>
  </div>
);
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



const RegistrationSystem = () => {
  const [currentView, setCurrentView] = useState('register');

  return (
    <div className="app-container">
      {/* Navigation */}
      <nav className="navbar">
        <div className="navbar-inner">
          <div className="navbar-brand">
            <span className="logo">🎓</span>
            <span className="brand-text">EduPortal Registration</span>
          </div>

          <div className="navbar-buttons">
            <button
              onClick={() => setCurrentView('register')}
              className={`nav-button ${currentView === 'register' ? 'active' : ''}`}
            >
              Student Registration
            </button>
            <button
              onClick={() => setCurrentView('filter')}
              className={`nav-button ${currentView === 'filter' ? 'active' : ''}`}
            >
              Teacher Dashboard
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="main-content">
        {currentView === 'register' ? (
          <StudentRegistration
            onRegistrationSuccess={(student) => {
              console.log('Student registered:', student);
              setTimeout(() => setCurrentView('filter'), 2000);
            }}
          />
        ) : (
          <TeacherStudentFilter />
        )}
      </div>
    </div>
  );
};

export default RegistrationSystem;