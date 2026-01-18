
import React, { useState } from 'react';
import { Student } from '../types';
import StudentCard from './StudentCard';
// Added Monitor to imports from lucide-react
import { Search, AlertCircle, Monitor } from 'lucide-react';

interface StudentSearchProps {
  students: Student[];
}

const StudentSearch: React.FC<StudentSearchProps> = ({ students }) => {
  const [rollNumber, setRollNumber] = useState('');
  const [foundStudent, setFoundStudent] = useState<Student | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setFoundStudent(null);

    if (!rollNumber.trim()) {
      setError('Please enter a roll number');
      return;
    }

    const student = students.find(s => s.rollNumber.toLowerCase() === rollNumber.trim().toLowerCase());
    if (student) {
      setFoundStudent(student);
    } else {
      setError('No student found with this roll number. Please check and try again.');
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fadeIn">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-extrabold text-gray-900">Student Portal</h2>
        <p className="text-gray-600">Enter your roll number to view and download your details.</p>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-xl border border-gray-100 max-w-lg mx-auto">
        <form onSubmit={handleSearch} className="flex gap-2">
          <div className="relative flex-grow">
            <input
              type="text"
              value={rollNumber}
              onChange={(e) => setRollNumber(e.target.value)}
              placeholder="Enter Roll Number (e.g. RTI-2023-001)"
              className="w-full pl-4 pr-12 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-0 transition-all outline-none text-lg"
            />
          </div>
          <button
            type="submit"
            className="bg-indigo-700 text-white p-3 rounded-xl hover:bg-indigo-800 transition-colors shadow-lg active:scale-95"
          >
            <Search size={24} />
          </button>
        </form>

        {error && (
          <div className="mt-4 flex items-center gap-2 text-red-600 bg-red-50 p-3 rounded-lg text-sm border border-red-100">
            <AlertCircle size={18} />
            {error}
          </div>
        )}
      </div>

      {foundStudent && (
        <div className="mt-8 animate-slideUp">
          <StudentCard student={foundStudent} />
        </div>
      )}

      {!foundStudent && !error && (
        <div className="mt-12 opacity-50 text-center py-12 border-2 border-dashed border-gray-200 rounded-3xl">
          <Monitor className="mx-auto text-gray-400 mb-2" size={48} />
          <p className="text-gray-500">Search results will appear here</p>
        </div>
      )}
    </div>
  );
};

export default StudentSearch;
