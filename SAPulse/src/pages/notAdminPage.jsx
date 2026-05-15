import React from "react";
import { Lock } from "lucide-react";
import { useNavigate, Link  } from 'react-router-dom';

const notAdminPage = () => {
return (
    <>
    <div className="flex flex-col h-screen w-screen items-center justify-center bg-gray-100">
        <div className="h-100 w-100 flex flex-col items-center justify-around bg-white border-2 border-gray-300 rounded-2xl pt-10">
          <div className="h-24 w-24 bg-red-100 border-0 rounded-full flex items-center justify-center mb-6">
            <Lock className="h-16 w-16 text-red-800 " />
          </div>
          <div className="flex flex-col h-30 items-center border-b-2 border-gray-300 justify-around">
            <div className="text-xl font-bold">Uh Oh!</div>
            <div className="text-md">This page is for Admins Only</div>
          </div>
          <div>
            <button
              className="h-10 w-50 bg-white text-blue-950 border-2 border-blue-950 rounded-2xl"
            >
              <Link to='/homepage'>Return Home</Link>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default notAdminPage