import React, { useState } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../utils/firebaseConfig";
import { useAuth } from "../context/AuthContext";

const CreatePostPage = () => {
  const [text, setText] = useState("");
  const [image, setImage] = useState(null);
  const [video, setVideo] = useState(null);
  const { user } = useAuth();

  const handleSubmit = async () => {
    if (!text) return;
    try {
      const newPost = {
        text,
        image,
        video,
        user: user.uid,
        timestamp: serverTimestamp(),
      };
      await addDoc(collection(db, "posts"), newPost);
      setText("");
      setImage(null);
      setVideo(null);
      alert("Post created!");
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Create Post</h1>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="What's on your mind?"
        className="w-full p-2 border rounded mt-4"
      />
      <input
        type="file"
        accept="image/*,video/*"
        onChange={(e) => {
          const file = e.target.files[0];
          file.type.startsWith("image") ? setImage(file) : setVideo(file);
        }}
        className="mt-4"
      />
      <button
        onClick={handleSubmit}
        className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
      >
        Create
      </button>
    </div>
  );
};

export default CreatePostPage;
