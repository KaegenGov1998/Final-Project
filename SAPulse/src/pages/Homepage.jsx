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
        .eq("area", userData.area);

      setPosts(postsData);
    }

    fetchPosts();
  }, []);

  return (
    <div className="flex flex-row bg-gray-50 min-h-screen">
      <Sidebar />
      <div className="flex flex-col">
        <div className="pt-8 pl-12 text-2xl font-bold text-black">What's Happening in <span className="text-blue-900">{area}?</span></div>
        <div className=" pl-12 text-xl font-light text-gray-400">Scroll through the latest updates in your neighbourhood</div>
        <div className="flex flex-row flex-wrap px-8 py-8 overflow-y-auto">
          {posts.map((post) => (
            <div
              key={post.id}
              className="flex flex-col justify-between w-50 h-60 p-4 m-4 border-2 bg-white border-gray-200 rounded-md shadow-sm overflow-auto"
            >
              <h3 className="text-xl font-bold text-gray-400">{post.title}</h3>
              <p>{post.content}</p>
              <div>
                <p className="text-blue-900 font-light">{post.name_post}</p>
                <p className="text-blue-900 font-light">{post.area}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Homepage;
