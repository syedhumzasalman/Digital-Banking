import React, { useEffect, useState } from 'react';
import Navbar from '../../Components/Navbar/Navbar';
import { useDispatch, useSelector } from 'react-redux';
import { fetchComplaintThunk } from '../../Store/features/complaints/complaint.thunk';

const MyComplaints = () => {
    const dispatch = useDispatch();
    const { data: complaints, loading, error } = useSelector((state) => state.complaint);
    const [selectedComplaint, setSelectedComplaint] = useState(null);
    const [imageModal, setImageModal] = useState(null);
    const [filterStatus, setFilterStatus] = useState('all');
    const [filterPriority, setFilterPriority] = useState('all');

    useEffect(() => {
        dispatch(fetchComplaintThunk());
    }, [dispatch]);

    // Sort complaints - latest first
    const sortedComplaints = React.useMemo(() => {
        if (!complaints || complaints.length === 0) return [];

        return [...complaints].sort((a, b) =>
            new Date(b.createdAt) - new Date(a.createdAt)
        );
    }, [complaints]);

    // Filter complaints
    const filteredComplaints = React.useMemo(() => {
        let filtered = sortedComplaints;

        if (filterStatus !== 'all') {
            filtered = filtered.filter(c =>
                (c.status?.toLowerCase() || 'pending') === filterStatus
            );
        }

        if (filterPriority !== 'all') {
            filtered = filtered.filter(c =>
                c.priority?.toLowerCase() === filterPriority
            );
        }

        return filtered;
    }, [sortedComplaints, filterStatus, filterPriority]);

    const getStatusColor = (status) => {
        const statusLower = status?.toLowerCase() || 'pending';
        const colors = {
            pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
            inprogress: 'bg-blue-100 text-blue-800 border-blue-200',
            resolved: 'bg-green-100 text-green-800 border-green-200',
            rejected: 'bg-red-100 text-red-800 border-red-200'
        };
        return colors[statusLower] || 'bg-gray-100 text-gray-800 border-gray-200';
    };

    const getPriorityColor = (priority) => {
        const priorityLower = priority?.toLowerCase();
        const colors = {
            low: 'bg-gray-100 text-gray-700 border-gray-200',
            medium: 'bg-orange-100 text-orange-700 border-orange-200',
            high: 'bg-red-100 text-red-700 border-red-200'
        };
        return colors[priorityLower] || 'bg-gray-100 text-gray-700 border-gray-200';
    };

    const getPriorityIcon = (priority) => {
        const icons = {
            low: '🔽',
            medium: '➡️',
            high: '🔺'
        };
        return icons[priority?.toLowerCase()] || '➡️';
    };

    const getStatusIcon = (status) => {
        const statusLower = status?.toLowerCase() || 'pending';
        const icons = {
            pending: '⏳',
            inprogress: '🔄',
            resolved: '✅',
            rejected: '❌'
        };
        return icons[statusLower] || '⏳';
    };

    if (loading) {
        return (
            <>
                <Navbar />
                <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100 flex items-center justify-center">
                    <div className="text-center">
                        <div className="relative">
                            <div className="animate-spin rounded-full h-20 w-20 border-4 border-gray-200 mx-auto"></div>
                            <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-blue-600 mx-auto absolute top-0 left-1/2 -translate-x-1/2"></div>
                        </div>
                        <p className="mt-6 text-gray-600 font-medium">Loading your complaints...</p>
                    </div>
                </div>
            </>
        );
    }

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100 py-8 px-4">
                <div className="max-w-7xl mx-auto">

                    {/* Header Section */}
                    <div className="mb-8">
                        <div className="flex items-center justify-between mb-4">
                            <div>
                                <h1 className="text-4xl font-bold text-gray-900 mb-2">My Complaints</h1>
                                <p className="text-gray-600">Track and manage all your submitted complaints</p>
                            </div>
                            <div className="hidden md:flex items-center gap-2 bg-white px-4 py-2 rounded-xl shadow-sm">
                                <div className="h-10 w-10 bg-blue-500 rounded-full flex items-center justify-center">
                                    <span className="text-white font-bold text-lg">{filteredComplaints.length}</span>
                                </div>
                                <div className="text-sm">
                                    <p className="text-gray-500">Total</p>
                                    <p className="font-semibold text-gray-800">Complaints</p>
                                </div>
                            </div>
                        </div>

                        {/* Filters */}
                        <div className="flex flex-wrap gap-3">
                            <select
                                value={filterStatus}
                                onChange={(e) => setFilterStatus(e.target.value)}
                                className="px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                            >
                                <option value="all">All Status</option>
                                <option value="pending">⏳ Pending</option>
                                <option value="inprogress">🔄 In Progress</option>
                                <option value="resolved">✅ Resolved</option>
                                <option value="rejected">❌ Rejected</option>
                            </select>

                            <select
                                value={filterPriority}
                                onChange={(e) => setFilterPriority(e.target.value)}
                                className="px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                            >
                                <option value="all">All Priority</option>
                                <option value="low">🔽 Low</option>
                                <option value="medium">➡️ Medium</option>
                                <option value="high">🔺 High</option>
                            </select>

                            {(filterStatus !== 'all' || filterPriority !== 'all') && (
                                <button
                                    onClick={() => {
                                        setFilterStatus('all');
                                        setFilterPriority('all');
                                    }}
                                    className="px-4 py-2 bg-gray-100 hover:bg-gray-200 border border-gray-200 rounded-xl text-sm font-medium text-gray-700 transition-colors"
                                >
                                    Clear Filters
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Error Message */}
                    {error && (
                        <div className="bg-red-50 border-l-4 border-red-500 text-red-700 px-6 py-4 rounded-xl mb-6 shadow-sm">
                            <div className="flex items-center gap-3">
                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span className="font-medium">{error}</span>
                            </div>
                        </div>
                    )}

                    {/* Complaints Grid */}
                    {!filteredComplaints || filteredComplaints.length === 0 ? (
                        <div className="bg-white rounded-2xl shadow-lg p-16 text-center">
                            <div className="inline-flex items-center justify-center w-24 h-24 bg-gray-100 rounded-full mb-6">
                                <svg className="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-bold text-gray-800 mb-2">No complaints found</h3>
                            <p className="text-gray-500 mb-6">
                                {filterStatus !== 'all' || filterPriority !== 'all'
                                    ? 'Try adjusting your filters'
                                    : "You haven't submitted any complaints yet"}
                            </p>
                        </div>
                    ) : (
                        <div className="grid gap-6">
                            {filteredComplaints.map((complaint) => (
                                <div
                                    key={complaint._id}
                                    className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 group"
                                >
                                    {/* Color Bar */}
                                    <div className={`h-2 ${complaint.priority?.toLowerCase() === 'high' ? 'bg-red-500' :
                                        complaint.priority?.toLowerCase() === 'medium' ? 'bg-orange-500' :
                                            'bg-gray-400'
                                        }`}></div>

                                    <div className="p-4 sm:p-6 md:p-6">

                                        {/* Header Row */}
                                        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-5 gap-3 md:gap-0">

                                            {/* Left section */}
                                            <div className="flex-1">
                                                <div className="flex flex-wrap gap-2 mb-3">
                                                    <span className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-semibold border ${getPriorityColor(complaint.priority)} flex items-center gap-1.5`}>
                                                        {getPriorityIcon(complaint.priority)} {complaint.priority?.toUpperCase()}
                                                    </span>
                                                    <span className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-semibold border ${getStatusColor(complaint.status)} flex items-center gap-1.5`}>
                                                        {getStatusIcon(complaint.status)} {(complaint.status || 'Pending').replace('-', ' ').toUpperCase()}
                                                    </span>
                                                </div>
                                                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1">{complaint.complaintType}</h3>
                                                <p className="text-xs sm:text-sm text-gray-500 font-mono">ID: #{complaint._id.slice(-6)}</p>
                                            </div>

                                            {/* Right section */}
                                            <div className="text-left md:text-right">
                                                <p className="text-xs sm:text-sm font-medium text-gray-700">
                                                    {new Date(complaint.createdAt).toLocaleDateString('en-US', {
                                                        month: 'short',
                                                        day: 'numeric',
                                                        year: 'numeric'
                                                    })}
                                                </p>
                                                <p className="text-xs sm:text-sm text-gray-500">
                                                    {new Date(complaint.createdAt).toLocaleTimeString('en-US', {
                                                        hour: '2-digit',
                                                        minute: '2-digit'
                                                    })}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Category */}
                                        <div className="mb-4 inline-flex items-center gap-2 bg-gray-50 px-2 sm:px-3 py-1 sm:py-2 rounded-lg">
                                            <svg className="h-4 w-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                                            </svg>
                                            <span className="text-xs sm:text-sm font-medium text-gray-700">{complaint.category}</span>
                                        </div>

                                        {/* Description */}
                                        <div className="mb-5">
                                            <p className="text-gray-700 leading-relaxed text-sm sm:text-base md:text-lg line-clamp-3">
                                                {complaint.description}
                                            </p>
                                        </div>

                                        {/* Evidence Gallery */}
                                        {complaint.uploadedEvidence && complaint.uploadedEvidence.length > 0 && (
                                            <div className="mb-5">
                                                <div className="flex items-center gap-2 mb-3">
                                                    <svg className="h-4 w-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                    </svg>
                                                    <span className="text-xs sm:text-sm font-semibold text-gray-700">
                                                        {complaint.uploadedEvidence.length} Evidence Attached
                                                    </span>
                                                </div>
                                                <div className="flex flex-wrap gap-3">
                                                    {complaint.uploadedEvidence.slice(0, 4).map((evidence, index) => (
                                                        <div key={index} className="relative group/img cursor-pointer" onClick={() => setImageModal(evidence.url || evidence.secure_url)}>
                                                            <img
                                                                src={evidence.url || evidence.secure_url}
                                                                alt={`Evidence ${index + 1}`}
                                                                className="h-24 sm:h-28 w-24 sm:w-28 object-cover rounded-xl border-2 border-gray-200 hover:border-blue-500 transition-all duration-200 hover:scale-105"
                                                            />
                                                            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover/img:bg-opacity-40 rounded-xl transition-all duration-200 flex items-center justify-center">
                                                                <svg className="h-8 w-8 text-white opacity-0 group-hover/img:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                                                                </svg>
                                                            </div>
                                                        </div>
                                                    ))}
                                                    {complaint.uploadedEvidence.length > 4 && (
                                                        <div className="h-24 sm:h-28 w-24 sm:w-28 bg-gray-100 rounded-xl border-2 border-gray-200 flex items-center justify-center">
                                                            <p className="text-xs sm:text-sm text-gray-600 font-semibold">
                                                                +{complaint.uploadedEvidence.length - 4}
                                                            </p>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        )}

                                        {/* Action Button */}
                                        <div className="pt-4 border-t border-gray-100">
                                            <button
                                                onClick={() => setSelectedComplaint(complaint)}
                                                className="w-full md:w-auto px-5 sm:px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-colors flex items-center justify-center gap-2 group/btn"
                                            >
                                                <span>View Full Details</span>
                                                <svg className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>

                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Image Modal */}
            {imageModal && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4 animate-fadeIn"
                    onClick={() => setImageModal(null)}
                >
                    <button
                        onClick={() => setImageModal(null)}
                        className="absolute top-6 right-6 text-white hover:text-gray-300 transition-colors bg-black bg-opacity-50 p-3 rounded-full"
                    >
                        <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                    <img
                        src={imageModal}
                        alt="Evidence"
                        className="max-w-full max-h-[90vh] object-contain rounded-2xl shadow-2xl"
                        onClick={(e) => e.stopPropagation()}
                    />
                </div>
            )}

            {/* Detail Modal */}
            {selectedComplaint && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-40 flex items-center justify-center p-4 animate-fadeIn"
                    onClick={() => setSelectedComplaint(null)}
                >
                    <div
                        className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Modal Header */}
                        <div className="sticky top-0 bg-white border-b border-gray-200 px-8 py-6 flex justify-between items-center z-10">
                            <div>
                                <h2 className="text-1xl md:text-3xl font-bold text-gray-900">Complaint Details</h2>
                                <p className="text-sm text-gray-500 font-mono mt-1">
                                    ID: #{selectedComplaint._id}
                                </p>
                            </div>
                            <button
                                onClick={() => setSelectedComplaint(null)}
                                className="text-gray-400 hover:text-gray-600 transition-colors p-2 hover:bg-gray-100 rounded-lg"
                            >
                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        {/* Modal Content */}
                        <div className="px-4 sm:px-6 md:px-8 py-6 space-y-6">

                            {/* Type & Category */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-600 mb-2">Type</label>
                                    <p className="text-base sm:text-lg md:text-xl text-gray-900 font-medium">{selectedComplaint.complaintType}</p>
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-600 mb-2">Category</label>
                                    <p className="text-base sm:text-lg md:text-xl text-gray-900 font-medium">{selectedComplaint.category}</p>
                                </div>
                            </div>

                            {/* Priority & Status */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-600 mb-2">Priority</label>
                                    <span className={`inline-flex items-center gap-2 px-3 sm:px-4 py-1 sm:py-2 rounded-lg text-sm sm:text-base font-semibold border ${getPriorityColor(selectedComplaint.priority)}`}>
                                        {getPriorityIcon(selectedComplaint.priority)} {selectedComplaint.priority?.toUpperCase()}
                                    </span>
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-600 mb-2">Status</label>
                                    <span className={`inline-flex items-center gap-2 px-3 sm:px-4 py-1 sm:py-2 rounded-lg text-sm sm:text-base font-semibold border ${getStatusColor(selectedComplaint.status)}`}>
                                        {getStatusIcon(selectedComplaint.status)} {(selectedComplaint.status || 'Pending').replace('-', ' ').toUpperCase()}
                                    </span>
                                </div>
                            </div>

                            {/* Description */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-600 mb-2">Description</label>
                                <p className="text-gray-800 bg-gray-50 p-3 sm:p-4 rounded-xl border border-gray-200 text-sm sm:text-base md:text-lg lg:text-xl 
                                          overflow-x-auto whitespace-nowrap">
                                    {selectedComplaint.description}
                                </p>
                            </div>

                            {/* Submitted On */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-600 mb-2">Submitted On</label>
                                <p className="text-gray-900 font-medium text-sm sm:text-base md:text-lg">
                                    {new Date(selectedComplaint.createdAt).toLocaleString('en-US', {
                                        weekday: 'long',
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric',
                                        hour: '2-digit',
                                        minute: '2-digit'
                                    })}
                                </p>
                            </div>

                            {/* Evidence Images */}
                            {selectedComplaint.uploadedEvidence && selectedComplaint.uploadedEvidence.length > 0 && (
                                <div>
                                    <label className="block text-sm font-semibold text-gray-600 mb-3">
                                        All Evidence ({selectedComplaint.uploadedEvidence.length})
                                    </label>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                                        {selectedComplaint.uploadedEvidence.map((evidence, index) => (
                                            <img
                                                key={index}
                                                src={evidence.url || evidence.secure_url}
                                                alt={`Evidence ${index + 1}`}
                                                onClick={() => setImageModal(evidence.url || evidence.secure_url)}
                                                className="w-full h-40 sm:h-32 object-cover rounded-xl border-2 border-gray-200 hover:border-blue-500 cursor-pointer transition-all hover:scale-105"
                                            />
                                        ))}
                                    </div>
                                </div>
                            )}

                        </div>

                    </div>
                </div>
            )}
        </>
    );
};

export default MyComplaints;