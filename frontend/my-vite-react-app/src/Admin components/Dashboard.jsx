import React from 'react';

const Dashboard = () => {
  return (
    <div className="p-4">
      <div className="flex gap-4">
        {/* Sidebar */}
        <div className="w-[350px] h-40 bg-gray-400 opacity-35"></div>

        {/* Main Content */}
        <div className="flex-1 h-40 bg-blue-200"></div>

        {/* Additional Section */}
        <div className="w-[350px] h-40 bg-green-300"></div>
      </div>
    </div>
  );
};

export default Dashboard;
