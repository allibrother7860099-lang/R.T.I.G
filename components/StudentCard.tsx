
import React, { useRef } from 'react';
import { Student } from '../types';
import { INSTITUTE_DETAILS, COURSES } from '../constants';
import { Download, Share2, MapPin, Calendar, BookOpen, Fingerprint, Monitor, CheckCircle } from 'lucide-react';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

interface StudentCardProps {
  student: Student;
}

const StudentCard: React.FC<StudentCardProps> = ({ student }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const downloadPDF = async () => {
    if (!cardRef.current) return;

    try {
      const canvas = await html2canvas(cardRef.current, {
        scale: 3, // Increased scale for better PDF quality
        useCORS: true,
        backgroundColor: '#ffffff',
        logging: false,
      });
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`${student.name.replace(/\s+/g, '_')}_RTI.pdf`);
    } catch (err) {
      console.error('Error generating PDF:', err);
      alert('Failed to generate PDF. Please try again.');
    }
  };

  const sharePDF = async () => {
    if (!cardRef.current) return;

    try {
      const canvas = await html2canvas(cardRef.current, { scale: 2 });
      canvas.toBlob(async (blob) => {
        if (!blob) return;
        const file = new File([blob], `RTI_${student.rollNumber}.png`, { type: 'image/png' });
        
        if (navigator.share) {
          await navigator.share({
            title: 'Student Details - Rama Technical Institute',
            text: `Record for ${student.name} (${student.rollNumber}) at R.T.I`,
            files: [file]
          });
        } else {
          alert('Sharing is not supported on this device. Use the download button.');
        }
      });
    } catch (err) {
      console.error('Error sharing:', err);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div 
        ref={cardRef}
        className="bg-white border-[12px] border-indigo-700 rounded-lg shadow-2xl overflow-hidden relative"
        style={{ minHeight: '600px' }}
      >
        {/* Background Watermark */}
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none select-none z-0">
           <h1 className="text-8xl font-black rotate-45 text-center">RAMA TECHNICAL INSTITUTE</h1>
        </div>

        {/* Decorative Header Background */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-50 rounded-bl-full -z-0 opacity-40"></div>

        {/* PDF Header Section */}
        <div className="bg-indigo-700 text-white p-8 text-center space-y-2 relative z-10 border-b-4 border-yellow-400">
          <h2 className="text-4xl font-black uppercase tracking-tighter leading-tight">{INSTITUTE_DETAILS.name}</h2>
          <p className="text-indigo-100 text-sm font-bold tracking-[0.2em] uppercase">{INSTITUTE_DETAILS.tagline}</p>
          <div className="flex items-center justify-center gap-2 text-xs text-indigo-200 mt-2 font-medium">
            <MapPin size={14} className="text-yellow-400" />
            <p>{INSTITUTE_DETAILS.address}</p>
          </div>
        </div>

        <div className="p-10 flex flex-col md:flex-row gap-10 relative z-10">
          {/* Photo Section */}
          <div className="flex-shrink-0 flex flex-col items-center gap-6">
            <div className="w-44 h-52 border-4 border-indigo-700 p-1 rounded-md overflow-hidden shadow-2xl bg-white">
              <img 
                src={student.photo} 
                alt={student.name} 
                className="w-full h-full object-cover rounded-sm"
              />
            </div>
            <div className="text-center space-y-1">
              <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest block">Student Signature</span>
              <div className="w-36 h-10 border-b-2 border-dashed border-indigo-200 mt-2"></div>
            </div>
          </div>

          {/* Details Section */}
          <div className="flex-grow space-y-6">
            <div className="border-b-2 border-indigo-700/20 pb-2 flex justify-between items-center">
               <h3 className="text-sm font-black text-indigo-700 uppercase tracking-widest">STUDENT PARTICULARS</h3>
               <span className="text-[10px] text-gray-400 font-bold">VERIFIED RECORD</span>
            </div>

            <div className="grid grid-cols-1 gap-5">
              <div className="flex items-start gap-4 group">
                <div className="p-2.5 bg-indigo-50 rounded-xl text-indigo-700 shadow-sm">
                  <Fingerprint size={22} />
                </div>
                <div>
                  <p className="text-[10px] text-gray-400 font-black uppercase tracking-wider">ROLL NUMBER</p>
                  <p className="text-xl font-black text-indigo-900">{student.rollNumber}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-2.5 bg-indigo-50 rounded-xl text-indigo-700 shadow-sm">
                  <BookOpen size={22} />
                </div>
                <div>
                  <p className="text-[10px] text-gray-400 font-black uppercase tracking-wider">FULL NAME</p>
                  <p className="text-2xl font-black text-gray-900 leading-none mt-1">{student.name}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-2.5 bg-indigo-50 rounded-xl text-indigo-700 shadow-sm">
                  <Monitor size={22} />
                </div>
                <div>
                  <p className="text-[10px] text-gray-400 font-black uppercase tracking-wider">COURSE NAME</p>
                  <p className="text-lg font-bold text-gray-800">{student.course}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-2.5 bg-indigo-50 rounded-xl text-indigo-700 shadow-sm">
                  <Calendar size={22} />
                </div>
                <div>
                  <p className="text-[10px] text-gray-400 font-black uppercase tracking-wider">DATE OF BIRTH</p>
                  <p className="text-lg font-bold text-gray-800">{student.dob}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* PDF Footer / Courses List / Stamp */}
        <div className="bg-gray-50 border-t-2 border-indigo-700/10 p-8 flex flex-col gap-6">
           <div className="text-center">
             <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">APPROVED CERTIFICATION COURSES</h4>
             <div className="flex flex-wrap justify-center gap-x-4 gap-y-1">
               {COURSES.map((c, i) => (
                 <span key={i} className="text-[9px] font-bold text-gray-500">• {c}</span>
               ))}
             </div>
           </div>
           
           <div className="flex justify-between items-center mt-4">
             <div className="space-y-1">
               <p className="text-[11px] text-gray-900 font-bold italic">Verification Status:</p>
               <div className="flex items-center gap-1.5 text-emerald-600 font-black text-[10px] uppercase">
                 <CheckCircle size={14} />
                 AUTHENTIC RTI RECORD
               </div>
               <p className="text-[9px] text-gray-400 mt-2">Generated on: {new Date().toLocaleDateString()}</p>
             </div>

             {/* RTI OFFICIAL DIGITAL STAMP */}
             <div className="relative flex flex-col items-center group">
               <div className="w-32 h-32 border-4 border-indigo-700/80 rounded-full flex flex-col items-center justify-center text-center p-2 relative bg-white/50 backdrop-blur-[1px] rotate-[-12deg] shadow-lg">
                 {/* Inner Stamp Rings */}
                 <div className="absolute inset-1 border-2 border-indigo-700/60 rounded-full"></div>
                 <div className="absolute inset-2 border border-indigo-700/40 rounded-full"></div>
                 
                 <span className="text-[8px] font-black text-indigo-800 leading-tight uppercase z-10 px-2">RAMA TECHNICAL INSTITUTE</span>
                 <div className="w-16 h-0.5 bg-indigo-700/80 my-1 z-10"></div>
                 <span className="text-[10px] font-black text-indigo-900 z-10">R.T.I</span>
                 <span className="text-[7px] font-bold text-indigo-700 mt-1 uppercase z-10">AUTHORIZED<br/>SIGNATORY</span>
                 
                 {/* Visual "Ink" Effect with SVG */}
                 <div className="absolute inset-0 opacity-20 pointer-events-none z-0 overflow-hidden rounded-full">
                    <svg viewBox="0 0 100 100" className="w-full h-full">
                      <filter id="noise">
                        <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" stitchTiles="stitch" />
                      </filter>
                      <rect width="100%" height="100%" filter="url(#noise)" fill="indigo" />
                    </svg>
                 </div>
               </div>
               <span className="text-[9px] font-black mt-2 text-indigo-800 uppercase tracking-widest opacity-80">Official Seal</span>
             </div>
           </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4 no-print mt-8">
        <button
          onClick={downloadPDF}
          className="flex-1 flex items-center justify-center gap-3 bg-indigo-700 text-white py-5 rounded-2xl font-black hover:bg-indigo-800 shadow-2xl transition-all active:scale-[0.98] uppercase tracking-widest"
        >
          <Download size={24} />
          Download Document
        </button>
        <button
          onClick={sharePDF}
          className="flex-1 flex items-center justify-center gap-3 bg-emerald-600 text-white py-5 rounded-2xl font-black hover:bg-emerald-700 shadow-2xl transition-all active:scale-[0.98] uppercase tracking-widest"
        >
          <Share2 size={24} />
          Share PDF
        </button>
      </div>
    </div>
  );
};

export default StudentCard;
