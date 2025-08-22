import { useNavigate } from "react-router-dom";
import "./card.css";
// UserCard.tsx
export interface IUser {
  bio: string;
  skills: string[];
  _id: string;
  username: string;
  email: string;
  profilePicture?: {
    url: string;
    public_id: string;
  };

}

export default function UserCard({ user }: { user: IUser }) {
  const nav = useNavigate();

  return (
    <div className="user-card" onClick={() => nav(`/profile/${user._id}`)}>
      <img
        src={user.profilePicture?.url || "/avatar-placeholder.png"}
        alt={user.username}
        className="avatar"
      />

      <div className="info">
        <h4 className="name">{user.username}</h4>
        <p className="email">{user.email}</p>

        <p className="bio">{user.bio}</p>

        <div className="skills">
          Skills :
          {user.skills.map((s) => (
            <span key={s} className="skill-tag">
               &nbsp;{s} &nbsp;
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}