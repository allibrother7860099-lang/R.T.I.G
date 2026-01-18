
import React, { useState, useEffect } from 'react';
import { AppView, Student } from './types';
import Header from './components/Header';
import StudentSearch from './components/StudentSearch';
import AdminLogin from './components/AdminLogin';
import AdminDashboard from './components/AdminDashboard';

const App: React.FC = () => {
  const [view, setView] = useState<AppView>(AppView.SEARCH);
  const [students, setStudents] = useState<Student[]>([]);

  // Load students from localStorage on mount
  useEffect(() => {
    const savedStudents = localStorage.getItem('rti_students');
    if (savedStudents) {
      setStudents(JSON.parse(savedStudents));
    }
  }, []);

  const saveStudents = (updatedStudents: Student[]) => {
    setStudents(updatedStudents);
    localStorage.setItem('rti_students', JSON.stringify(updatedStudents));
  };

  const handleAddStudent = (student: Student) => {
    const updated = [...students, student];
    saveStudents(updated);
  };

  const handleDeleteStudent = (id: string) => {
    const updated = students.filter(s => s.id !== id);
    saveStudents(updated);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header currentView={view} setView={setView} />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        {view === AppView.SEARCH && (
          <StudentSearch students={students} />
        )}
        
        {view === AppView.ADMIN_LOGIN && (
          <AdminLogin onLogin={() => setView(AppView.ADMIN_DASHBOARD)} />
        )}
        
        {view === AppView.ADMIN_DASHBOARD && (
          <AdminDashboard 
            students={students} 
            onAdd={handleAddStudent} 
            onDelete={handleDeleteStudent}
            onLogout={() => setView(AppView.ADMIN_LOGIN)}
          />
        )}
      </main>

      <footer className="bg-white border-t py-6">
        <div className="container mx-auto px-4 text-center text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} Rama Technical Institute (R.T.I). All rights reserved.</p>
          <p className="mt-1">Ghughali, Maharajganj, Uttar Pradesh, India</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
