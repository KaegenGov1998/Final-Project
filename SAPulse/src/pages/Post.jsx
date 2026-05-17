import React, { useState, useEffect } from "react";
import { supabase } from "../client";
import Sidebar from "../components/Sidebar";

const Post = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    async function fetchUserData() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      const { data } = await supabase
        .from("users")
        .select("full_name, area")
        .eq("email", user.email)
        .single();

      setUserData(data);
    }

    fetchUserData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    await supabase.from("post").insert([
      {
        title: title.trim(),
        content: content.trim(),
        area: userData.area,
        name_post: userData.full_name,
      },
    ]);

    setTitle("");
    setContent("");
  };

  return (
    <div>
      <div className="flex flex-row bg-gray-50">
        <div className="sticky top-0 h-screen"><Sidebar/></div>
        <div className="pl-8 pt-8 w-full">
        <h2 className="text-2xl font-bold text-black">Create a Post</h2>
        <p className="text-xl font-light text-gray-400">
          Posting as: <span className="text-blue-900 font-light">{userData?.full_name}</span>
        </p>
        <p className="text-xl font-light text-gray-400">
          Area: <span className="text-blue-900 font-light">{userData?.area}</span>
        </p>
        <div className="flex ">
        <form onSubmit={handleSubmit} className="w-300 h-120 flex flex-col justify-between border-2 bg-white border-gray-200 rounded-2xl mt-8 p-4">
          <div>
            <div>
            <label htmlFor="title" className="ml-2 text-xl">Title</label>
            <br />
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Post title"
              required
              className="w-280 p-2 border-2 border-gray-200 rounded-2xl"
            />
          </div>

          <br />

          <div>
            <label htmlFor="content" className="ml-2 text-xl">Content</label>
            <br />
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your post..."
              rows={6}
              required
              className="w-280 h-60 p-2 border-2 border-gray-200 rounded-2xl"
            />
          </div>

          <br />
          </div>

          <button type="submit" className="h-10 w-36 bg-blue-950 text-white border-2 border-blue-950 rounded-2xl mr-11 self-end cursor-pointer">Submit Post</button>
        </form>
        </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
