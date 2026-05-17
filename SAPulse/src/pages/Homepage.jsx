import React, { useState, useEffect } from "react";
import { supabase } from "../client";
import Sidebar from "../components/Sidebar";

const Homepage = () => {
  const [posts, setPosts] = useState([]);
  const [area, setArea] = useState("");

  useEffect(() => {
    async function fetchPosts() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      const { data: userData } = await supabase
        .from("users")
        .select("area")
        .eq("email", user.email)
        .single();

      setArea(userData.area);

      const { data: postsData } = await supabase
        .from("post")
        .select("*")
        .eq("area", userData.area)
        .order("created_at", { ascending: false });

      setPosts(postsData);
    }

    fetchPosts();
  }, []);

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return {
      date: date.toLocaleDateString("en-ZA"), // e.g. 17/05/2026
      time: date.toLocaleTimeString("en-ZA", {
        hour: "2-digit",
        minute: "2-digit",
      }), // e.g. 14:30
    };
  };

  return (
    <div className="flex flex-row bg-gray-50 h-auto">
      <div className="sticky top-0 h-screen"><Sidebar/></div>
      <div className="flex flex-col w-full gap-4 pr-4 pt-8 justify-around">
        <div className="pt-8 pl-12 text-2xl font-bold text-black">
          What's Happening in <span className="text-blue-900">{area}?</span>
        </div>
        <div className=" pl-12 text-xl font-light text-gray-400">
          Scroll through the latest updates in your neighbourhood
        </div>
        <div className="flex flex-row flex-wrap px-8 py-8 overflow-y-auto w-300">
          {posts.map((post) => (
            <div
              key={post.id}
              className="flex flex-col justify-between w-80 h-100 p-4 m-4 border-2 bg-white border-gray-200 rounded-md shadow-sm overflow-auto"
            >
              <h3 className="h-10 text-xl font-bold text-gray-600">{post.title}</h3>
              <p className="h-50">{post.content}</p>
              <div>
                <p className="text-blue-900 font-light">{post.name_post}</p>
                <p className="text-gray-400 font-light text-sm">{formatDate(post.created_at).time}</p>
                <p className="text-gray-400 font-light text-sm">{formatDate(post.created_at).date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Homepage;
