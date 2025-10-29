import React, { useState } from 'react';

const TeacherRegistration = () => {
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
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 py-8">
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

          <div className="space-y-8">
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <span className="mr-2">👤</span>
                Personal Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">First Name *</label>
                  <input
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${errors.firstName ? 'border-red-500' : 'border-gray-300'}`}
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
              </h2>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
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

export default TeacherRegistration;
