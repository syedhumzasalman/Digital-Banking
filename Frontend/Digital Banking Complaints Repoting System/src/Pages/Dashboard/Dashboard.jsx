import React, { useEffect, useState } from 'react'
import Navbar from '../../Components/Navbar/Navbar'

const Dashboard = () => {

  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    inProcess: 0,
  });

  const fetchComplaintStats = () => {
    const response = {
      total: 12,
      pending: 5,
      inProcess: 4,
    };

    setStats(response);
  };

  useEffect(() => {
    fetchComplaintStats();
  }, []);


  return (
    <>

      <Navbar />

      <div className="min-h-screen bg-gray-100 p-4 md:p-6">
        {/* Page Heading */}
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
          📊 Dashboard
        </h1>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">

          {/* Total Complaints */}
          <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition">
            <h2 className="text-gray-500 text-sm font-semibold">
              Total Complaints
            </h2>
            <p className="text-3xl font-bold text-indigo-600 mt-2">
              {stats.total}
            </p>
          </div>

          {/* Pending Complaints */}
          <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition">
            <h2 className="text-gray-500 text-sm font-semibold">
              Pending Complaints
            </h2>
            <p className="text-3xl font-bold text-yellow-500 mt-2">
              {stats.pending}
            </p>
          </div>

          {/* In Process Complaints */}
          <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition">
            <h2 className="text-gray-500 text-sm font-semibold">
              In-Process Complaints
            </h2>
            <p className="text-3xl font-bold text-blue-500 mt-2">
              {stats.inProcess}
            </p>
          </div>

        </div>

        {/* Extra Section (future charts / table) */}
        <div className="mt-8 bg-white rounded-2xl shadow-md p-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-2">
            📌 Complaint Overview
          </h2>
          <p className="text-gray-500 text-sm">
            Yahan future me charts, tables ya recent complaints show ho sakti hain.
          </p>
        </div>
      </div>


    </>
  )
}

export default Dashboard
