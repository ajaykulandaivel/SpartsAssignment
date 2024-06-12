import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faGraduationCap, faChartLine, faCalendarAlt, faCog, faSignOutAlt, faBell ,faSearch,faFilter} from '@fortawesome/free-solid-svg-icons';

const StudentManagement = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newStudent, setNewStudent] = useState({
    firstName: '',
    lastName: '',
    gender: '',
    dob: '',
    bloodGroup: '',
    email: '',
    phone: '',
    yearGroup: '',
  });
  const [currentPage, setCurrentPage] = useState(1);
  const studentsPerPage = 10;

  useEffect(() => {
    axios.get('http://3.223.98.72:1337/api/students')
      .then(response => {
        setStudents(response.data.data);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewStudent({ ...newStudent, [name]: value });
  };

  const handleAddStudent = () => {
    axios.post('http://3.223.98.72:1337/api/students', {
      data: newStudent
    })
      .then(response => {
        setStudents([...students, response.data.data]);
        setIsModalOpen(false);
        setNewStudent({
          firstName: '',
          lastName: '',
          gender: '',
          dob: '',
          bloodGroup: '',
          email: '',
          phone: '',
          yearGroup: '',
        });
      })
      .catch(error => {
        setError(error);
      });
  };

  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  const currentStudents = students.slice(indexOfFirstStudent, indexOfLastStudent);

  const totalPages = Math.ceil(students.length / studentsPerPage);

  const handleNextPage = () => {
    setCurrentPage(prevPage => Math.min(prevPage + 1, totalPages));
  };

  const handlePreviousPage = () => {
    setCurrentPage(prevPage => Math.max(prevPage - 1, 1));
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="flex flex-col w-full h-full bg-white-800 rounded-lg p-8">
      <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-semibold text-gray-800">Students</h1>
              <span className="bg-gray-200 text-gray-800 rounded-full px-3 py-1 text-sm font-semibold">{students.length}</span>
            </div>
      <div className="flex justify-end items-center space-x-4 mb-8">
      <div className="relative">
          <input type="text" placeholder="Search" className="border rounded-l px-4 py-2 pl-10" />
          <FontAwesomeIcon icon={faSearch} className="absolute left-3 top-3 text-gray-400" />
        </div>
        <FontAwesomeIcon icon={faFilter} className="text-purple-800" />
        <FontAwesomeIcon icon={faBell} size="1x" className="text-purple-800" />
        <img src="https://i.pravatar.cc/50" alt="Profile" className="w-10 h-10 rounded-full" />
      </div>
      <hr></hr>
      <div className="p-6 flex items-center justify-between">
        <select className="border rounded px-4 py-2">
          <option value="Big Ben">Big Ben</option>
        </select>
        <button onClick={() => setIsModalOpen(true)} className="ml-4 bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700">
          + Add a student
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full bg-white rounded-lg">
          <thead>
            <tr>
              <th className="px-4 py-2 border-b text-left">Photo</th>
              <th className="px-4 py-2 border-b text-left">ID</th>
              <th className="px-4 py-2 border-b text-left">First name</th>
              <th className="px-4 py-2 border-b text-left">Last name</th>
              <th className="px-4 py-2 border-b text-left">Gender</th>
              <th className="px-4 py-2 border-b text-left">DOB</th>
              <th className="px-4 py-2 border-b text-left">Blood Group</th>
            </tr>
          </thead>
          <tbody>
            {currentStudents.map(student => (
              <tr key={student.id} className="hover:bg-gray-100">
                <td className="border-t px-4 py-2">
                  <img src={`https://i.pravatar.cc/150?u=${student.id}`} alt="student" className="w-8 h-8 rounded-full" />
                </td>
                <td className="border-t px-4 py-2">{student.id}</td>
                <td className="border-t px-4 py-2">{student.attributes.firstName}</td>
                <td className="border-t px-4 py-2">{student.attributes.lastName}</td>
                <td className="border-t px-4 py-2">{student.attributes.gender}</td>
                <td className="border-t px-4 py-2">{student.attributes.dob}</td>
                <td className="border-t px-4 py-2">{student.attributes.bloodGroup}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-between items-center mt-4">
        <button onClick={handlePreviousPage} className="p-2 bg-gray-200 rounded hover:bg-gray-300" disabled={currentPage === 1}>
          Previous
        </button>
        <span>{currentPage} of {totalPages}</span>
        <button onClick={handleNextPage} className="p-2 bg-gray-200 rounded hover:bg-gray-300" disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
};

export default StudentManagement;
