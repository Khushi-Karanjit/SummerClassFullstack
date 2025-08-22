// Home.tsx
import { useEffect, useState } from "react";
import "./home.css";
import { Link } from "react-router-dom";
import { getUsersApi } from "../../config/api";
import type { AxiosResponse } from "axios";
import UserCard from "../cards/card";

interface IUser {
    _id: string;
    username: string;
    email: string;
    bio: string;
    skills: string[];
}

interface IUserResponse {
  message: string;
  users: IUser[];
}

export default function Home() {
  const [allUsers, setAllUsers] = useState<IUser[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<IUser[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");

  // 1️⃣ Read logged-in user from localStorage
  const [loggedInUser, setLoggedInUser] = useState<IUser | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("currentUser");
    if (stored && stored !== "undefined") {
      try {
        setLoggedInUser(JSON.parse(stored));
      } catch {
        // ignore invalid JSON
      }
    }
  }, []);

  // 2️⃣ Fetch users once
  useEffect(() => {
    getUsersApi()
      .then((res: AxiosResponse<IUserResponse>) => {
        setAllUsers(res.data.users);
        setFilteredUsers(res.data.users);
      })
      .catch(console.error);
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const q = e.target.value.toLowerCase();
    setSearchQuery(q);
    if (!q) {
      setFilteredUsers(allUsers);
    } else {
      setFilteredUsers(
        allUsers.filter((u) =>
          u.username.toLowerCase().includes(q)
        )
      );
    }
  };

  return (
    <>
      <nav className="navbar">
        <div className="navbar-brand">PofTech</div>
        <ul className="navbar-links">
          <li><Link to="/home">Home</Link></li>
          <li>
            {/* Link to logged-in user's profile */}
            <Link to={loggedInUser ? `/profile/${loggedInUser._id}` : "/profile"}>
              Profile
            </Link>
          </li>
          <li>
            <Link
              to="/"
              onClick={() => {
                localStorage.removeItem("token");
                localStorage.removeItem("currentUser");
              }}
            >
              Logout
            </Link>
          </li>
        </ul>
      </nav>

      {loggedInUser && (
        <div className="welcome-banner">
          Welcome, <strong>{loggedInUser.username}</strong>!
        </div>
      )}

      {/* 3-column grid */}
      <div className="three-columns">
        {/* LEFT */}
        <aside className="left-column">
          <h3>Most&nbsp;Used</h3>
          <nav className="left-nav">
            <Link to="/top-users" className="left-link">
              <span>🤵</span> Account
            </Link>

            <Link to="/top-charts" className="left-link">
              <span>📊</span> Feed
            </Link>

            <Link to="/create-post" className="left-link">
              <span>✍️</span> Add Post
            </Link>

            <Link to="/settings" className="left-link">
              <span>🔏</span> Privacy
            </Link>
          </nav>
        </aside>

        {/* MIDDLE */}
        <main className="middle-column">
          {/* SEARCH */}
          <div className="search-container">
            <input
              type="text"
              placeholder="Search users..."
              value={searchQuery}
              onChange={handleSearch}
              className="search-input"
            />
          </div>

          {/* SINGLE SCROLLABLE BOX */}
          <section className="unified-scroll">
            {/* USERS */}
            <h3>Users ({filteredUsers.length})</h3>
            {filteredUsers.length === 0 && searchQuery && (
              <p>No users found</p>
            )}
            <div className="user-row">
              {filteredUsers.map(u => (
                <UserCard key={u._id} user={u} />
              ))}
            </div>

            {/* DIVIDER */}
            <br />
            <hr />
            <br />
          
          </section>
        </main>


      </div>
    </>
  );
}
