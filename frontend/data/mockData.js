export const mockAssignments = [
  { id: 1, title: 'Math Assignment 1', dueDate: '2025-08-15', subject: 'Mathematics', status: 'Active' },
  { id: 2, title: 'Science Project', dueDate: '2025-08-20', subject: 'Science', status: 'Active' },
  { id: 3, title: 'History Essay', dueDate: '2025-08-25', subject: 'History', status: 'Draft' }
];

export const mockTests = [
  { id: 1, title: 'Algebra Quiz', duration: 30, questions: 15, status: 'Published' },
  { id: 2, title: 'Physics Test', duration: 45, questions: 20, status: 'Draft' }
];

export const mockStudents = [
  { id: 1, name: 'John Doe', email: 'john@student.com', grade: 'A', submissions: 5 },
  { id: 2, name: 'Jane Smith', email: 'jane@student.com', grade: 'B+', submissions: 4 },
  { id: 3, name: 'Mike Johnson', email: 'mike@student.com', grade: 'A-', submissions: 5 }
];

export const mockSubmissions = [
  { id: 1, studentName: 'John Doe', assignment: 'Math Assignment 1', submittedAt: '2025-08-01', status: 'Submitted', grade: null },
  { id: 2, studentName: 'Jane Smith', assignment: 'Science Project', submittedAt: '2025-08-02', status: 'Graded', grade: 'B+' }
];
