import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getUserByIdApi } from "../../config/api";
import "./UserProfile.css";

interface IUser {
  _id: string;
  username: string;
  email: string;
  bio: string;
  skills: string[];
  profilePicture?: { url: string };
}

export default function UserProfile() {
  const { userId } = useParams();
  const [user, setUser] = useState<IUser | null>(null);
  const navigate = useNavigate();

  // get logged-in user from localStorage
  const loggedInUser = localStorage.getItem("currentUser")
    ? JSON.parse(localStorage.getItem("currentUser")!)
    : null;

  useEffect(() => {
    getUserByIdApi(userId!)
      .then((res) => setUser(res.data.user))
      .catch(console.error);
  }, [userId]);

  if (!user) return <p>Loading…</p>;

  const isOwnProfile = loggedInUser && loggedInUser._id === user._id;

  return (
    <div className="profile-page">
      <img
        src={user.profilePicture?.url || "/default-avatar.png"}
        alt={user.username}
        className="profile-avatar"
      />
      <h1>{user.username}</h1>
      <p className="email">{user.email}</p>

      {user.bio && <p className="bio">{user.bio}</p>}

      {user.skills.length > 0 && (
        <div className="skills">
          {user.skills.map((s) => (
            <span key={s} className="skill-tag">
              {s}
            </span>
          ))}
        </div>
      )}

      {/* ✅ Show edit button only for own profile */}
      {isOwnProfile && (
        <button
          className="edit-btn"
          onClick={() => navigate(`/profile/${user._id}/edit`)}
        >
          Edit Profile
        </button>
      )}
    </div>
  );
}
