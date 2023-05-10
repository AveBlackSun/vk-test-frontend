"use client";
import { useState, useEffect } from "react";
import Post from "./Post";
import axios from "axios";

const PostList = ({ data }) => {
  console.log(data);
  return (
    <div className="w-full">
      {data.map((post) => (
        <Post key={post._id} post={post} />
      ))}
    </div>
  );
};

const Feed = () => {
  const [allPosts, setAllPosts] = useState([]);

  const [searchText, setSearchText] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchedResults, setSearchedResults] = useState([]);

  const fetchPosts = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/posts");
      const data = response.data;
      setAllPosts(data);
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const filterPrompts = (searchtext) => {
    const regex = new RegExp(searchtext, "i"); // 'i' flag for case-insensitive search
    return allPosts.filter((item) => regex.test(item.creatorname));
  };
  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    // debounce method
    setSearchTimeout(
      setTimeout(() => {
        const searchResult = filterPrompts(e.target.value);
        setSearchedResults(searchResult);
      }, 500)
    );
  };

  return (
    <section className="feed mx-auto">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a tag or a username"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="w-full py-2 px-3 border border-gray-400 rounded-md shadow-sm"
        />
      </form>

      {/* All Prompts */}
      {searchText ? (
        <PostList data={searchedResults} />
      ) : (
        <PostList data={allPosts} />
      )}
    </section>
  );
};

export default Feed;
