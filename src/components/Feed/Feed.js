import React, { useState, useEffect } from "react";
import {
  collection,
  query,
  getDocs,
  orderBy,
  startAfter,
  limit,
} from "firebase/firestore";
import { db } from "../../utils/firebaseConfig";
import PostCard from "./PostCard";

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [lastDoc, setLastDoc] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchPosts = async () => {
    setLoading(true);
    const q = query(
      collection(db, "posts"),
      orderBy("timestamp", "desc"),
      limit(20)
    );
    const querySnapshot = await getDocs(q);
    const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
    setLastDoc(lastVisible);
    setPosts(querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    setLoading(false);
  };

  const fetchMorePosts = async () => {
    if (!lastDoc) return;
    const q = query(
      collection(db, "posts"),
      orderBy("timestamp", "desc"),
      startAfter(lastDoc),
      limit(20)
    );
    const querySnapshot = await getDocs(q);
    const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
    setLastDoc(lastVisible);
    setPosts((prev) => [
      ...prev,
      ...querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })),
    ]);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div>
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
      <button onClick={fetchMorePosts} disabled={loading}>
        Load More
      </button>
    </div>
  );
};

export default Feed;
