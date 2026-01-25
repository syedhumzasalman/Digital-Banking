import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../../Components/Navbar/Navbar";
import { fetchComplaintThunk } from "../../Store/features/complaints/complaint.thunk";

const Dashboard = () => {
  const dispatch = useDispatch();


  // Capitalize first letter, rest lowercase
  const capitalize = (str) => {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };


  // Grab complaints state from Redux
  const { data: complaints, loading, error } = useSelector(
    (state) => state.complaint
  );

  // Fetch complaints on mount
  useEffect(() => {
    dispatch(fetchComplaintThunk());
  }, [dispatch]);

  const stats = React.useMemo(() => {
    if (!complaints || complaints.length === 0) return {
      total: 0,
      pending: 0,
      inProcess: 0,
      resolved: 0,
      rejected: 0,
    };
    // console.log(complaints);

    const total = complaints.length;
    const pending = complaints.filter(c => c.status === "pending").length;
    const inProcess = complaints.filter(c => c.status === "inProgress").length;
    const resolved = complaints.filter(c => c.status === "resolved").length;
    const rejected = complaints.filter(c => c.status === "rejected").length;

    return { total, pending, inProcess, resolved, rejected };
  }, [complaints]);

  if (loading) return <p className="p-4 text-gray-700">Loading complaints...</p>;
  if (error) return <p className="p-4 text-red-500">Error: {error}</p>;

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-100 p-4 md:p-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
          📊 Dashboard
        </h1>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <StatCard title="Total Complaints" value={stats.total} color="indigo" />
          <StatCard title="Pending Complaints" value={stats.pending} color="yellow" />
          <StatCard title="In-Process Complaints" value={stats.inProcess} color="blue" />
          <StatCard title="Resolved Complaints" value={stats.resolved} color="green" />
          <StatCard title="Rejected Complaints" value={stats.rejected} color="red" />
        </div>

        {/* Recent Complaints Table */}
        <div className="mt-8 bg-white rounded-2xl shadow-md p-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">
            📝 Recent Complaints
          </h2>

          <div className="overflow-x-auto">
            <table className="min-w-full table-auto border border-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left text-gray-600">ID</th>
                  <th className="px-4 py-2 text-left text-gray-600">Type</th>
                  <th className="px-4 py-2 text-left text-gray-600">Status</th>
                  <th className="px-4 py-2 text-left text-gray-600">Priority</th>
                  <th className="px-4 py-2 text-left text-gray-600">Create Date</th>
                </tr>
              </thead>
              <tbody>
                {complaints?.map((c) => (
                  <tr key={c._id} className="border-t hover:bg-gray-50 transition">
                    <td className="px-4 py-2"> #{c._id.slice(-6)}</td>
                    <td className="px-4 py-2">{c.complaintType}</td>
                    <td className={`px-4 py-2 font-semibold ${c.status === "pending"
                      ? "text-yellow-500"
                      : c.status === "resolved"
                        ? "text-green-500"
                        : c.status === "rejected"
                          ? "text-red-500"
                          : "text-blue-500"
                      }`}>
                      {capitalize(c.status)}
                    </td>
                    <td className="px-4 py-2">{c.priority}</td>
                    <td className="px-4 py-2">{new Date(c.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

// Reusable card component
const StatCard = ({ title, value, color }) => (
  <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition">
    <h2 className="text-gray-500 text-sm font-semibold">{title}</h2>
    <p className={`text-3xl font-bold text-${color}-500 mt-2`}>{value}</p>
  </div>
);

export default Dashboard;
