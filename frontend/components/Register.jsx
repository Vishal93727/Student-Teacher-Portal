import React, { useState, useEffect,useRef,useContext } from 'react';
import '../styles/Re.css'
import { useNavigate } from 'react-router-dom';
import AuthContext from '../AuthContext/AuthContext';
import Swal from "sweetalert2";

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
const StudentRegistration = ({ role,onRegistrationSuccess }) => {

  const { handleSubmited } = useContext(AuthContext);
  // const nameRef = useRef('');
  // const emailRef = useRef('');
  // const passwordRef = useRef('');

  // const handleRegister = async (e) => {
  //   e.preventDefault();
  //   const body = {
  //     name: nameRef.current.value,
  //     email: emailRef.current.value,
  //     password: passwordRef.current.value,
  //   };
  //   const { status, message } = await handleSubmited('/register', body);

  //   if (status === 201) {
  //     Swal.fire({
  //       title: message,
  //       icon: 'success',
  //       draggable: true,
  //     });
  //     console.log('user register message:', message);

  //     // Clear fields
  //     nameRef.current.value = '';
  //     emailRef.current.value = '';
  //     passwordRef.current.value = '';
  //   }
  // };
//   const handleRegister = async (e) => {
//   e.preventDefault();

//   // Prepare the full body with all formData
//   const body = {
//     name: `${formData.firstName} ${formData.lastName}`,
//     email: formData.email,
//     password: formData.password,
//     phone: formData.phone,
//     dateOfBirth: formData.dateOfBirth,
//     gender: formData.gender,
//     bloodGroup: formData.bloodGroup,
//     nationality: formData.nationality,
//     religion: formData.religion,
//     category: formData.category,

//     // Academic Details
//     rollNumber: formData.rollNumber,
//     registrationNumber: formData.registrationNumber,
//     branch: formData.branch,
//     department: formData.department,
//     year: formData.year,
//     semester: formData.semester,
//     batchYear: formData.batchYear,
//     section: formData.section,

//     // Addresses
//     permanentAddress: formData.permanentAddress,
//     currentAddress: formData.currentAddress,
//     sameAsPermanent: formData.sameAsPermanent,

//     // Family Details
//     fatherName: formData.fatherName,
//     motherName: formData.motherName,
//     guardianName: formData.guardianName,
//     parentPhone: formData.parentPhone,
//     parentEmail: formData.parentEmail,
//     parentOccupation: formData.parentOccupation,
//     emergencyContact: formData.emergencyContact,

//     // Previous Education
//     previousEducation: formData.previousEducation,

//     // Hobbies and Skills
//     hobbies: formData.hobbies,
//     skills: formData.skills
//   };

//   const { status, message } = await handleSubmited('/register', body);

//   if (status === 201) {
//     Swal.fire({
//       title: message,
//       icon: 'success',
//       draggable: true,
//     });
//     console.log('User register message:', message);

//     // Reset formData completely
//     setFormData({
//       firstName: '',
//       lastName: '',
//       email: '',
//       password: '',
//       phone: '',
//       dateOfBirth: '',
//       gender: '',
//       bloodGroup: '',
//       nationality: 'Indian',
//       religion: '',
//       category: '',
//       rollNumber: '',
//       registrationNumber: '',
//       branch: '',
//       department: '',
//       year: '',
//       semester: '',
//       batchYear: new Date().getFullYear(),
//       section: '',
//       permanentAddress: {
//         street: '',
//         city: '',
//         state: '',
//         pincode: '',
//         country: 'India'
//       },
//       currentAddress: {
//         street: '',
//         city: '',
//         state: '',
//         pincode: '',
//         country: 'India'
//       },
//       sameAsPermanent: false,
//       fatherName: '',
//       motherName: '',
//       guardianName: '',
//       parentPhone: '',
//       parentEmail: '',
//       parentOccupation: '',
//       previousEducation: {
//         schoolName: '',
//         board: '',
//         passingYear: '',
//         percentage: '',
//         subjects: ''
//       },
//       hobbies: [],
//       skills: [],
//       emergencyContact: {
//         name: '',
//         relation: '',
//         phone: ''
//       }
//     });
//   }
// };

const handleRegister = async (e) => {
e.preventDefault();
const body = {
name: `${formData.firstName} ${formData.lastName}`,
    email: formData.email,
    password: formData.password,
    phone: formData.phone,
    dateOfBirth: formData.dateOfBirth,
    gender: formData.gender,
    bloodGroup: formData.bloodGroup,
    nationality: formData.nationality,
    religion: formData.religion,
    category: formData.category,
role: formData.role,
    // Academic Details
    rollNumber: formData.rollNumber,
    registrationNumber: formData.registrationNumber,
    branch: formData.branch,
    department: formData.department,
    year: formData.year,
    semester: formData.semester,
    batchYear: formData.batchYear,
    section: formData.section,

    // Addresses
    permanentAddress: formData.permanentAddress,
    currentAddress: formData.currentAddress,
    sameAsPermanent: formData.sameAsPermanent,

    // Family Details
    fatherName: formData.fatherName,
    motherName: formData.motherName,
    guardianName: formData.guardianName,
    parentPhone: formData.parentPhone,
    parentEmail: formData.parentEmail,
    parentOccupation: formData.parentOccupation,
    emergencyContact: formData.emergencyContact,

    // Previous Education
    previousEducation: formData.previousEducation,

    // Hobbies and Skills
    hobbies: formData.hobbies,
    skills: formData.skills,

};
const { status, message } = await handleSubmited('/register', body);

if (status === 201) {
Swal.fire({
  title: message,
  icon: "success",
  draggable: true
});

console.log('User register message:', message);
}else{
//   Swal.fire({
//   icon: "error",
//   title: "Oops...",
//   text: "Something went wrong!",
//   footer: '<a href="#">Why do I have this issue?</a>'
// });
console.log('User failed register message:', message);
}

// Reset formData
setFormData(prev => ({
...prev,firstName: '',
      lastName: '',
      email: '',
      password: '',
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
      role:'',
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

}));

};




const [formData, setFormData] = useState({
  name: "",
  email: "",
  password: "",
  phone: "",
  dateOfBirth: "",
  gender: "",
  bloodGroup: "",
  nationality: "Indian",
  religion: "",
  category: "",
  rollNumber: "",
  registrationNumber: "",
  branch: "",
  department: "",
  year: "",
  semester: "",
  batchYear: "",
  section: "",
  role:role,

  permanentAddress: {
    street: "",
    city: "",
    state: "",
    pincode: "",
    country: "India",
  },
  currentAddress: {
    street: "",
    city: "",
    state: "",
    pincode: "",
    country: "India",
  },

  sameAsPermanent: false,

  fatherName: "",
  motherName: "",
  guardianName: "",
  parentPhone: "",
  parentEmail: "",
  parentOccupation: "",
  emergencyContact: {
    name: "",
    relation: "",
    phone: "",
  },
  previousEducation: {
    schoolName: "",
    board: "",
    passingYear: "",
    percentage: "",
    subjects: "",
  },
  hobbies: [],
  skills: [],
});


  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [availableDepartments, setAvailableDepartments] = useState([]);
  const navigate = useNavigate();

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
                if (!formData.password) newErrors.password= 'Password is required';
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
      console.log("Validating Step:", currentStep);
console.log("Errors:", errors);

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
      Swal.fire({
  title: "You have successfully Registed",
  icon: "success",
  draggable: true
});
//alert('Registration successful!');
        if (onRegistrationSuccess) return ( navigate('/') );
        //    {
        //   onRegistrationSuccess(result.student);
        // }
      }
    } catch (error) {
      ///alert('Registration failed. Please try again.');
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
      <label className="form-label">Password  *</label>
      <input
        type="password"
        value={formData.password}
        onChange={(e) => handleInputChange('password', e.target.value)}
        className={`form-input ${errors.password ? 'input-error' : ''}`}
        placeholder="Enter password"
      />
      {errors.password && <p className="error-text">{errors.password}</p>}
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
                value={formData.permanentAddress?.city || ''}

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
case 4:
  return (
    <div className="family-section">
      <h3 className="section-title">Family Details</h3>

      <div className="form-grid">
        <div>
          <label className="form-label">Father's Name *</label>
          <input
            type="text"
            value={formData.fatherName}
            onChange={(e) => handleInputChange('fatherName', e.target.value)}
            className={`form-input ${errors.fatherName ? 'input-error' : ''}`}
            placeholder="Enter father's name"
          />
          {errors.fatherName && <p className="error-text">{errors.fatherName}</p>}
        </div>

        <div>
          <label className="form-label">Mother's Name *</label>
          <input
            type="text"
            value={formData.motherName}
            onChange={(e) => handleInputChange('motherName', e.target.value)}
            className={`form-input ${errors.motherName ? 'input-error' : ''}`}
            placeholder="Enter mother's name"
          />
          {errors.motherName && <p className="error-text">{errors.motherName}</p>}
        </div>

        <div>
          <label className="form-label">Guardian Name (if different)</label>
          <input
            type="text"
            value={formData.guardianName}
            onChange={(e) => handleInputChange('guardianName', e.target.value)}
            className="form-input"
            placeholder="Enter guardian's name"
          />
        </div>

        <div>
          <label className="form-label">Parent/Guardian Phone *</label>
          <input
            type="tel"
            value={formData.parentPhone}
            onChange={(e) => handleInputChange('parentPhone', e.target.value)}
            className={`form-input ${errors.parentPhone ? 'input-error' : ''}`}
            placeholder="Enter parent/guardian phone"
          />
          {errors.parentPhone && <p className="error-text">{errors.parentPhone}</p>}
        </div>

        <div>
          <label className="form-label">Parent Email</label>
          <input
            type="email"
            value={formData.parentEmail}
            onChange={(e) => handleInputChange('parentEmail', e.target.value)}
            className="form-input"
            placeholder="Enter parent email"
          />
        </div>

        <div>
          <label className="form-label">Parent Occupation</label>
          <input
            type="text"
            value={formData.parentOccupation}
            onChange={(e) => handleInputChange('parentOccupation', e.target.value)}
            className="form-input"
            placeholder="Enter parent occupation"
          />
        </div>
      </div>

      <div className="emergency-box">
        <h4 className="sub-title">Emergency Contact</h4>
        <div className="form-grid-three">
          <div>
            <label className="form-label">Contact Name</label>
            <input
              type="text"
              value={formData.emergencyContact.name}
              onChange={(e) => handleInputChange('name', e.target.value, 'emergencyContact')}
              className="form-input"
              placeholder="Emergency contact name"
            />
          </div>

          <div>
            <label className="form-label">Relation</label>
            <input
              type="text"
              value={formData.emergencyContact.relation}
              onChange={(e) => handleInputChange('relation', e.target.value, 'emergencyContact')}
              className="form-input"
              placeholder="Relation"
            />
          </div>

          <div>
            <label className="form-label">Phone Number</label>
            <input
              type="tel"
              value={formData.emergencyContact.phone}
              onChange={(e) => handleInputChange('phone', e.target.value, 'emergencyContact')}
              className="form-input"
              placeholder="Emergency contact phone"
            />
          </div>
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
    <form className="form-wrapper" onSubmit={handleRegister}>
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
      
    </form>
  </div>
);
};

// Teacher Student Filter Component
// const TeacherStudentFilter = () => {
//   const [filters, setFilters] = useState({
//     branch: '',
//     department: '',
//     year: '',
//     semester: '',
//     section: ''
//   });
//   const [students, setStudents] = useState([]);
//   const [filteredStudents, setFilteredStudents] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [availableDepartments, setAvailableDepartments] = useState([]);

//   useEffect(() => {
//     const loadAllStudents = async () => {
//       const allStudents = await ApiService.getAllStudents();
//       setStudents(allStudents);
//       setFilteredStudents(allStudents);
//     };
//     loadAllStudents();
//   }, []);

//   useEffect(() => {
//     if (filters.branch) {
//       setAvailableDepartments(DEPARTMENTS[filters.branch] || []);
//       setFilters(prev => ({ ...prev, department: '' }));
//     }
//   }, [filters.branch]);

//   const handleFilterChange = (field, value) => {
//     setFilters(prev => ({ ...prev, [field]: value }));
//   };

//   const applyFilters = async () => {
//     setLoading(true);
//     try {
//       const filtered = await ApiService.getStudentsByFilter(filters);
//       setFilteredStudents(filtered);
//     } catch (error) {
//       console.error('Error filtering students:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const clearFilters = () => {
//     setFilters({
//       branch: '',
//       department: '',
//       year: '',
//       semester: '',
//       section: ''
//     });
//     setFilteredStudents(students);
//   };

//   const exportToCSV = () => {
//     const headers = ['Name', 'Roll Number', 'Email', 'Branch', 'Department', 'Year', 'Semester', 'Phone'];
//     const csvContent = [
//       headers.join(','),
//       ...filteredStudents.map(student => [
//         `"${student.firstName} ${student.lastName}"`,
//         student.rollNumber,
//         student.email,
//         `"${student.branch}"`,
//         `"${student.department}"`,
//         student.year,
//         student.semester,
//         student.phone
//       ].join(','))
//     ].join('\n');

//     const blob = new Blob([csvContent], { type: 'text/csv' });
//     const url = window.URL.createObjectURL(blob);
//     const link = document.createElement('a');
//     link.href = url;
//     link.download = `students_${new Date().toISOString().split('T')[0]}.csv`;
//     link.click();
//     window.URL.revokeObjectURL(url);
//   };
// return (
//   <div className="filter-page">
//     <div className="container">
//       <div className="filter-card">
//         <h1 className="filter-title">Student Management - Filter by Criteria</h1>

//         {/* Filters */}
//         <div className="filters-grid">
//           <div className="form-group">
//             <label>Branch</label>
//             <select value={filters.branch} onChange={(e) => handleFilterChange('branch', e.target.value)}>
//               <option value="">All Branches</option>
//               {BRANCHES.map(branch => (
//                 <option key={branch} value={branch}>{branch}</option>
//               ))}
//             </select>
//           </div>

//           <div className="form-group">
//             <label>Department</label>
//             <select
//               value={filters.department}
//               onChange={(e) => handleFilterChange('department', e.target.value)}
//               disabled={!filters.branch}
//             >
//               <option value="">All Departments</option>
//               {availableDepartments.map(dept => (
//                 <option key={dept} value={dept}>{dept}</option>
//               ))}
//             </select>
//           </div>

//           <div className="form-group">
//             <label>Year</label>
//             <select value={filters.year} onChange={(e) => handleFilterChange('year', e.target.value)}>
//               <option value="">All Years</option>
//               {YEARS.map(year => (
//                 <option key={year} value={year}>{year}</option>
//               ))}
//             </select>
//           </div>

//           <div className="form-group">
//             <label>Semester</label>
//             <select value={filters.semester} onChange={(e) => handleFilterChange('semester', e.target.value)}>
//               <option value="">All Semesters</option>
//               {SEMESTERS.map(sem => (
//                 <option key={sem} value={sem}>{sem}</option>
//               ))}
//             </select>
//           </div>

//           <div className="form-group">
//             <label>Section</label>
//             <input
//               type="text"
//               value={filters.section}
//               onChange={(e) => handleFilterChange('section', e.target.value)}
//               placeholder="e.g., A, B, C"
//             />
//           </div>
//         </div>

//         <div className="button-group">
//           <button onClick={applyFilters} disabled={loading} className="btn btn-primary">
//             {loading ? 'Filtering...' : 'Apply Filters'}
//           </button>
//           <button onClick={clearFilters} className="btn btn-secondary">Clear Filters</button>
//           <button onClick={exportToCSV} disabled={filteredStudents.length === 0} className="btn btn-success">
//             Export CSV
//           </button>
//         </div>

//         <div className="student-count">
//           Showing {filteredStudents.length} of {students.length} students
//         </div>
//       </div>

//       {/* Students Table */}
//       <div className="table-wrapper">
//         {filteredStudents.length > 0 ? (
//           <div className="table-scroll">
//             <table className="student-table">
//               <thead>
//                 <tr>
//                   <th>Student Details</th>
//                   <th>Academic Info</th>
//                   <th>Contact</th>
//                   <th>Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {filteredStudents.map((student) => (
//                   <tr key={student.id}>
//                     <td>
//                       <div className="student-info">
//                         <div className="student-avatar">
//                           {student.firstName?.[0]}{student.lastName?.[0]}
//                         </div>
//                         <div>
//                           <div className="student-name">{student.firstName} {student.lastName}</div>
//                           <div className="student-roll">{student.rollNumber}</div>
//                         </div>
//                       </div>
//                     </td>
//                     <td>
//                       <div>{student.branch}</div>
//                       <div className="text-muted">{student.department}</div>
//                       <div className="text-muted">{student.year} - {student.semester}</div>
//                     </td>
//                     <td>
//                       <div>{student.email}</div>
//                       <div className="text-muted">{student.phone}</div>
//                     </td>
//                     <td>
//                       <button className="action-link view-link">View Profile</button>
//                       <button className="action-link message-link">Send Message</button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         ) : (
//           <div className="no-data">
//             <div className="icon">👥</div>
//             <h3>No Students Found</h3>
//             <p>Try adjusting your filters or register new students.</p>
//           </div>
//         )}
//       </div>
      
//     </div>
    
//   </div>
// );
// };

const TeacherStudentFilter = ({role,onRegistrationSuccess}) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    gender: '',
    bloodGroup: '',
    nationality: 'Indian',
    employeeId: '',
    department: '',
    designation: '',
    specialization: '',
    qualification: '',
    experience: '',
    joiningDate: '',
    role:role,
    address: {
      street: '',
      city: '',
      state: '',
      pincode: '',
      country: 'India'
    },
    emergencyContact: {
      name: '',
      relation: '',
      phone: ''
    },
    teacherIdFile: null,
    idFilePreview: null,
    subjects: [],
    classes: []
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const DEPARTMENTS = [
    'Computer Science Engineering',
    'Mechanical Engineering',
    'Electrical Engineering',
    'Civil Engineering',
    'Electronics and Communication',
    'Information Technology',
    'Mathematics',
    'Physics',
    'Chemistry'
  ];

  const DESIGNATIONS = [
    'Professor',
    'Associate Professor',
    'Assistant Professor',
    'Lecturer',
    'Senior Lecturer',
    'Guest Faculty'
  ];

  const handleInputChange = (field, value, nested) => {
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

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setErrors(prev => ({ ...prev, teacherIdFile: 'File size should be less than 5MB' }));
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({
          ...prev,
          teacherIdFile: file,
          idFilePreview: reader.result
        }));
        setErrors(prev => ({ ...prev, teacherIdFile: '' }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleArrayInput = (field, value) => {
    const array = value.split(',').map(item => item.trim()).filter(item => item);
    setFormData(prev => ({
      ...prev,
      [field]: array
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.firstName) newErrors.firstName = 'First name is required';
    if (!formData.lastName) newErrors.lastName = 'Last name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.phone) newErrors.phone = 'Phone number is required';
    if (!formData.dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required';
    if (!formData.gender) newErrors.gender = 'Gender is required';
    if (!formData.employeeId) newErrors.employeeId = 'Employee ID is required';
    if (!formData.department) newErrors.department = 'Department is required';
    if (!formData.designation) newErrors.designation = 'Designation is required';
    if (!formData.qualification) newErrors.qualification = 'Qualification is required';
    if (!formData.joiningDate) newErrors.joiningDate = 'Joining date is required';
    if (!formData.teacherIdFile) newErrors.teacherIdFile = 'Teacher ID card is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    
    setTimeout(() => {
      const teacherData = {
        id: 'TCH' + Date.now(),
        ...formData,
        registeredAt: new Date().toISOString(),
        status: 'Active'
      };
      
      const teachers = JSON.parse(localStorage.getItem('teachers') || '[]');
      teachers.push(teacherData);
      localStorage.setItem('teachers', JSON.stringify(teachers));
      
      setSuccess(true);
      alert('Teacher registration successful!');
      
      setTimeout(() => {
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          dateOfBirth: '',
          gender: '',
          bloodGroup: '',
          nationality: 'Indian',
          employeeId: '',
          department: '',
          designation: '',
          specialization: '',
          qualification: '',
          experience: '',
          joiningDate: '',
          address: { street: '', city: '', state: '', pincode: '', country: 'India' },
          emergencyContact: { name: '', relation: '', phone: '' },
          teacherIdFile: null,
          idFilePreview: null,
          subjects: [],
          classes: []
        });
        setSuccess(false);
        setLoading(false);
      }, 2000);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 py-8 m-10">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-xl shadow-2xl p-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mb-4">
              <span className="text-3xl">👨‍🏫</span>
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Teacher Registration</h1>
            <p className="text-gray-600">Join our educational institution</p>
          </div>

          {success && (
            <div className="mb-6 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">
              Registration successful! Welcome to our team.
            </div>
          )}

          <div className="space-y-8 p-8 m-10 ">
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center mr-10">
                <span className="mr-2">👤</span>
                Personal Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">First Name *</label>
                  <input
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    className={`w-full px-10 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${errors.firstName ? 'border-red-500' : 'border-gray-300'}`}
                    placeholder="Enter first name"
                  />
                  {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Last Name *</label>
                  <input
                    type="text"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${errors.lastName ? 'border-red-500' : 'border-gray-300'}`}
                    placeholder="Enter last name"
                  />
                  {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                    placeholder="Enter email address"
                  />
                  {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${errors.phone ? 'border-red-500' : 'border-gray-300'}`}
                    placeholder="Enter phone number"
                  />
                  {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth *</label>
                  <input
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${errors.dateOfBirth ? 'border-red-500' : 'border-gray-300'}`}
                  />
                  {errors.dateOfBirth && <p className="text-red-500 text-sm mt-1">{errors.dateOfBirth}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Gender *</label>
                  <select
                    value={formData.gender}
                    onChange={(e) => handleInputChange('gender', e.target.value)}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${errors.gender ? 'border-red-500' : 'border-gray-300'}`}
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                  {errors.gender && <p className="text-red-500 text-sm mt-1">{errors.gender}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Blood Group</label>
                  <select
                    value={formData.bloodGroup}
                    onChange={(e) => handleInputChange('bloodGroup', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
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

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Nationality</label>
                  <input
                    type="text"
                    value={formData.nationality}
                    onChange={(e) => handleInputChange('nationality', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <span className="mr-2">💼</span>
                Professional Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Employee ID *</label>
                  <input
                    type="text"
                    value={formData.employeeId}
                    onChange={(e) => handleInputChange('employeeId', e.target.value)}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${errors.employeeId ? 'border-red-500' : 'border-gray-300'}`}
                    placeholder="Enter employee ID"
                  />
                  {errors.employeeId && <p className="text-red-500 text-sm mt-1">{errors.employeeId}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Department *</label>
                  <select
                    value={formData.department}
                    onChange={(e) => handleInputChange('department', e.target.value)}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${errors.department ? 'border-red-500' : 'border-gray-300'}`}
                  >
                    <option value="">Select Department</option>
                    {DEPARTMENTS.map(dept => (
                      <option key={dept} value={dept}>{dept}</option>
                    ))}
                  </select>
                  {errors.department && <p className="text-red-500 text-sm mt-1">{errors.department}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Designation *</label>
                  <select
                    value={formData.designation}
                    onChange={(e) => handleInputChange('designation', e.target.value)}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${errors.designation ? 'border-red-500' : 'border-gray-300'}`}
                  >
                    <option value="">Select Designation</option>
                    {DESIGNATIONS.map(desig => (
                      <option key={desig} value={desig}>{desig}</option>
                    ))}
                  </select>
                  {errors.designation && <p className="text-red-500 text-sm mt-1">{errors.designation}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Specialization</label>
                  <input
                    type="text"
                    value={formData.specialization}
                    onChange={(e) => handleInputChange('specialization', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="e.g., Data Structures, Machine Learning"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Highest Qualification *</label>
                  <input
                    type="text"
                    value={formData.qualification}
                    onChange={(e) => handleInputChange('qualification', e.target.value)}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${errors.qualification ? 'border-red-500' : 'border-gray-300'}`}
                    placeholder="e.g., Ph.D., M.Tech, M.Sc"
                  />
                  {errors.qualification && <p className="text-red-500 text-sm mt-1">{errors.qualification}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Years of Experience</label>
                  <input
                    type="number"
                    value={formData.experience}
                    onChange={(e) => handleInputChange('experience', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Years of teaching experience"
                    min="0"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Joining Date *</label>
                  <input
                    type="date"
                    value={formData.joiningDate}
                    onChange={(e) => handleInputChange('joiningDate', e.target.value)}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${errors.joiningDate ? 'border-red-500' : 'border-gray-300'}`}
                  />
                  {errors.joiningDate && <p className="text-red-500 text-sm mt-1">{errors.joiningDate}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Subjects Teaching</label>
                  <input
                    type="text"
                    value={formData.subjects.join(', ')}
                    onChange={(e) => handleArrayInput('subjects', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Separate with commas"
                  />
                  <p className="text-xs text-gray-500 mt-1">e.g., Data Structures, Algorithms, Database</p>
                </div>
              </div>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <span className="mr-2">🆔</span>
                Teacher ID Card Upload
              </h2>              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
                <div className="text-center">
                  {formData.idFilePreview ? (
                    <div className="mb-4">
                      <img
                        src={formData.idFilePreview}
                        alt="Teacher ID Preview"
                        className="max-w-full h-64 mx-auto object-contain rounded-lg shadow-md"
                      />
                      <button
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, teacherIdFile: null, idFilePreview: null }))}
                        className="mt-4 text-red-600 hover:text-red-800 font-medium"
                      >
                        Remove Image
                      </button>
                    </div>
                  ) : (
                    <div className="text-gray-400 mb-4">
                      <svg className="mx-auto h-12 w-12" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                        <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <p className="mt-2">Click to upload or drag and drop</p>
                      <p className="text-xs text-gray-500">PNG, JPG, PDF up to 5MB</p>
                    </div>
                  )}
                  <input
                    type="file"
                    accept="image,.pdf"
                    onChange={handleFileUpload}
                    className="hidden"
                    id="teacherIdUpload"
                  />
                  <label
                    htmlFor="teacherIdUpload"
                    className="cursor-pointer inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                  >
                    {formData.idFilePreview ? 'Change Image' : 'Upload Teacher ID'}
                  </label>
                  {errors.teacherIdFile && <p className="text-red-500 text-sm mt-2">{errors.teacherIdFile}</p>}
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <span className="mr-2">🏠</span>
                Address Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Street Address</label>
                  <input
                    type="text"
                    value={formData.address.street}
                    onChange={(e) => handleInputChange('street', e.target.value, 'address')}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Enter street address"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                  <input
                    type="text"
                    value={formData.address.city}
                    onChange={(e) => handleInputChange('city', e.target.value, 'address')}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Enter city"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">State</label>
                  <input
                    type="text"
                    value={formData.address.state}
                    onChange={(e) => handleInputChange('state', e.target.value, 'address')}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Enter state"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Pincode</label>
                  <input
                    type="text"
                    value={formData.address.pincode}
                    onChange={(e) => handleInputChange('pincode', e.target.value, 'address')}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Enter pincode"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Country</label>
                  <input
                    type="text"
                    value={formData.address.country}
                    onChange={(e) => handleInputChange('country', e.target.value, 'address')}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <span className="mr-2">🚨</span>
                Emergency Contact
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Contact Name</label>
                  <input
                    type="text"
                    value={formData.emergencyContact.name}
                    onChange={(e) => handleInputChange('name', e.target.value, 'emergencyContact')}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Emergency contact name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Relation</label>
                  <input
                    type="text"
                    value={formData.emergencyContact.relation}
                    onChange={(e) => handleInputChange('relation', e.target.value, 'emergencyContact')}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Relation"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                  <input
                    type="tel"
                    value={formData.emergencyContact.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value, 'emergencyContact')}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Emergency contact phone"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-center pt-6">
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-lg shadow-lg hover:from-purple-700 hover:to-blue-700 transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Registering...
                  </span>
                ) : (
                  'Complete Registration'
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


const RegistrationSystem = () => {
  const [currentView, setCurrentView] = useState('register');
  const navigate = useNavigate();

const handlelogin = (e) => {
    e.preventDefault();
    navigate('/');
  };
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
              onClick={() => setCurrentView('dregister')}
              className={`nav-button ${currentView === 'register' ? 'active' : ''}`}
            >
              Teacher Registration
            </button>
             <button
              onClick={handlelogin}
              className={`nav-button `}
            >
              Login
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="main-content">
        {currentView === 'register' ? (
          // <StudentRegistration
          //   onRegistrationSuccess={(student) => {
          //     console.log('Student registered:', student);
          //     setTimeout(() => setCurrentView('filter'), 2000);
          //   }}
          // />
          <StudentRegistration
  role="student"
  onRegistrationSuccess={(student) => {
    console.log('Student registered:', student);
    setTimeout(() => setCurrentView('filter'), 2000);
  }}
/>

        ) : (
          <TeacherStudentFilter
          role="teacher"
  onRegistrationSuccess={(teacher) => {
    console.log('Teacher registered:', teacher);
    setTimeout(() => setCurrentView('filter'), 2000);
  }}
  />
        )}
        
      </div>
    </div>
  );
};

export default RegistrationSystem;