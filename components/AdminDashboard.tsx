
import React, { useState } from 'react';
import { Student } from '../types';
import { COURSES } from '../constants';
import { PlusCircle, Trash2, UserPlus, Users, Image as ImageIcon, Camera, LogOut } from 'lucide-react';

interface AdminDashboardProps {
  students: Student[];
  onAdd: (student: Student) => void;
  onDelete: (id: string) => void;
  onLogout: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ students, onAdd, onDelete, onLogout }) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [newStudent, setNewStudent] = useState({
    name: '',
    course: COURSES[0],
    dob: '',
    rollNumber: '',
    photo: ''
  });

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewStudent(prev => ({ ...prev, photo: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check if roll number is unique
    if (students.some(s => s.rollNumber.toLowerCase() === newStudent.rollNumber.toLowerCase())) {
      alert('Roll Number must be unique. This roll number already exists.');
      return;
    }

    if (!newStudent.photo) {
      alert('Please upload a student photo.');
      return;
    }

    const student: Student = {
      ...newStudent,
      id: Date.now().toString(),
      enrollmentDate: new Date().toISOString()
    };

    onAdd(student);
    setNewStudent({
      name: '',
      course: COURSES[0],
      dob: '',
      rollNumber: '',
      photo: ''
    });
    setShowAddForm(false);
  };

  return (
    <div className="animate-fadeIn">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <div>
          <h2 className="text-3xl font-extrabold text-gray-900 flex items-center gap-3">
            <Users className="text-indigo-700" size={32} />
            Student Management
          </h2>
          <p className="text-gray-500">Manage records for RTI students</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="flex items-center gap-2 bg-indigo-700 text-white px-6 py-3 rounded-xl font-bold hover:bg-indigo-800 transition-all shadow-lg"
          >
            {showAddForm ? 'Cancel' : (
              <>
                <PlusCircle size={20} />
                Add New Student
              </>
            )}
          </button>
          <button
            onClick={onLogout}
            className="flex items-center gap-2 bg-white border-2 border-red-100 text-red-600 px-6 py-3 rounded-xl font-bold hover:bg-red-50 transition-all"
          >
            <LogOut size={20} />
            Logout
          </button>
        </div>
      </div>

      {showAddForm && (
        <div className="bg-white p-8 rounded-2xl shadow-2xl border border-indigo-100 mb-12 animate-slideUp">
          <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <UserPlus className="text-indigo-700" />
            Register New Student
          </h3>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Student Name</label>
                <input
                  type="text"
                  required
                  value={newStudent.name}
                  onChange={e => setNewStudent(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
                  placeholder="Full Name"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Select Course</label>
                <select
                  required
                  value={newStudent.course}
                  onChange={e => setNewStudent(prev => ({ ...prev, course: e.target.value }))}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
                >
                  {COURSES.map(course => (
                    <option key={course} value={course}>{course}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Date of Birth</label>
                <input
                  type="text"
                  required
                  value={newStudent.dob}
                  onChange={e => setNewStudent(prev => ({ ...prev, dob: e.target.value }))}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
                  placeholder="DD/MM/YYYY"
                />
                <p className="text-[10px] text-gray-400 mt-1 italic">Type manually (e.g., 15/08/2000)</p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Unique Roll Number</label>
                <input
                  type="text"
                  required
                  value={newStudent.rollNumber}
                  onChange={e => setNewStudent(prev => ({ ...prev, rollNumber: e.target.value }))}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
                  placeholder="e.g. RTI-2023-001"
                />
              </div>
            </div>

            <div className="space-y-4">
              <label className="block text-sm font-semibold text-gray-700 mb-1">Student Photograph</label>
              <div className="border-4 border-dashed border-gray-200 rounded-3xl p-8 flex flex-col items-center justify-center gap-4 hover:border-indigo-300 transition-colors cursor-pointer relative group">
                {newStudent.photo ? (
                  <div className="relative">
                    <img src={newStudent.photo} alt="Preview" className="w-40 h-52 object-cover rounded-lg shadow-md" />
                    <button 
                      type="button"
                      onClick={() => setNewStudent(prev => ({ ...prev, photo: '' }))}
                      className="absolute -top-2 -right-2 bg-red-600 text-white p-1 rounded-full hover:bg-red-700"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="bg-indigo-50 p-4 rounded-full text-indigo-700 group-hover:scale-110 transition-transform">
                      <Camera size={40} />
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-bold text-gray-700">Click to upload photo</p>
                      <p className="text-xs text-gray-400 mt-1">PNG, JPG up to 2MB</p>
                    </div>
                  </>
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  disabled={!!newStudent.photo}
                />
              </div>
              <button
                type="submit"
                className="w-full bg-indigo-700 text-white py-4 rounded-xl font-bold hover:bg-indigo-800 shadow-xl transition-all active:scale-95 flex items-center justify-center gap-2"
              >
                <UserPlus size={20} />
                Save Student Record
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
        <div className="p-6 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
           <h3 className="font-bold text-gray-900 flex items-center gap-2">
             <span className="text-indigo-700"><Users size={20} /></span>
             Enrolled Students ({students.length})
           </h3>
           <div className="text-xs font-semibold text-gray-400 bg-gray-200 px-3 py-1 rounded-full">
             LIVE DATABASE
           </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 text-gray-500 uppercase text-[10px] font-bold tracking-widest border-b">
              <tr>
                <th className="px-6 py-4">Student</th>
                <th className="px-6 py-4">Roll Number</th>
                <th className="px-6 py-4">Course</th>
                <th className="px-6 py-4">Date of Birth</th>
                <th className="px-6 py-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {students.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-gray-500 italic">
                    No students registered yet. Click "Add New Student" to begin.
                  </td>
                </tr>
              ) : (
                students.map(student => (
                  <tr key={student.id} className="hover:bg-indigo-50/30 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img src={student.photo} className="w-10 h-12 object-cover rounded-md shadow-sm border border-gray-200" alt="" />
                        <span className="font-bold text-gray-900">{student.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-mono bg-indigo-50 text-indigo-700 px-2 py-1 rounded text-xs font-bold border border-indigo-100">
                        {student.rollNumber}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{student.course}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{student.dob}</td>
                    <td className="px-6 py-4 text-center">
                      <button
                        onClick={() => {
                          if (confirm(`Are you sure you want to delete ${student.name}'s record?`)) {
                            onDelete(student.id);
                          }
                        }}
                        className="text-red-400 hover:text-red-600 p-2 hover:bg-red-50 rounded-lg transition-all"
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
