import React from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import { Search } from "lucide-react";

const admin = ({ token }) => {
  return (
    <>
      <div className="flex flex-row bg-gray-50 h-screen">
        <Sidebar />
        <div className="flex flex-col w-full gap-4 pr-4 pt-8 justify-around">
          <div>
          <h1 className="text-4xl font-bold">
            Welcome back, Admin {token.user.user_metadata.full_name}
          </h1>
          <div>
            <p className="text-lg font-light">
              Manage members of the app and control their levels of access
            </p>
            <div className="flex flex-row justify-between items-center">
            <div className="flex flex-row w-120 bg-white border-2 border-gray-100 rounded-md p-2 my-2">
              <Search className="mr-2"/>
              <input placeholder="search" />
            </div>
            <button className="bg-blue-950 rounded-md p-2 text-white cursor-pointer">
              + Add Member
            </button>
          </div>
            <div className="bg-white border-2 border-gray-100 p-2 rounded-md w-full">
              <table class="table-auto" className="w-full table-fixed border-separate border-spacing-y-6">
                <thead className="border-b-2 border-gray-100">
                  <tr>
                    <th className="w-1/4 text-xl font-bold">Name</th>
                    <th className="w-1/4 text-xl font-bold">Location</th>
                    <th className="w-1/4 text-xl font-bold">
                      Leadership Status
                    </th>
                    <th className="w-1/4 text-xl font-bold">Admin Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="font-medium">Kaegen Govender</td>
                    <td className="font-light">Johannesburg</td>
                    <td>Yes</td>
                    <td>Yes</td>
                  </tr>
                  <tr>
                    <td className="font-medium">Harry Potter</td>
                    <td className="font-light">Hogwarts</td>
                    <td>Yes</td>
                    <td>No</td>
                  </tr>
                  <tr>
                    <td className="font-medium">Jasmine Kennedie</td>
                    <td className="font-light">New York</td>
                    <td>No</td>
                    <td>No</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          </div>
          <Footer/>
        </div>
      </div>
    </>
  );
};

export default admin;
