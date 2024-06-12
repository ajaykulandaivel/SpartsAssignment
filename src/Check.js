import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUser,
  faGraduationCap,
  faChartLine,
  faCalendarAlt,
  faCog,
  faSignOutAlt,
  faSearch,
  faBell
} from '@fortawesome/free-solid-svg-icons';
import StudentManagement from './StudentManagement';
function Check() {
  return (
    <div className="h-screen bg-purple-200 flex items-center justify-center">
      <div className="w-4/5  h-4/5 flex  justify-center bg-purple-800 rounded-[50px] p-4 ">
      <div className=" text-white w-16 h-16 flex flex-col rounded-3xl items-center p-8">
     <div className="mt-8 mb-8">
          <FontAwesomeIcon icon={faUser} size="1x" />
        </div>
        <div className="mb-8">
          <FontAwesomeIcon icon={faGraduationCap} size="1x" />
        </div>
        <div className="mb-8">
          <FontAwesomeIcon icon={faChartLine} size="1x" />
        </div>
        <div className="mb-8">
          <FontAwesomeIcon icon={faCalendarAlt} size="1x" />
        </div>
        <div className="mb-8">
          <FontAwesomeIcon icon={faCog} size="1x" />
        </div>
        <div className="mt-auto mb-8 py-72">
          <FontAwesomeIcon icon={faSignOutAlt} size="1x" />
        </div>
    </div>
        <div className="w-11/12 h-full bg-white rounded-[40px]">
        <StudentManagement />
        </div>
      </div>
    </div>
  )
}

export default Check