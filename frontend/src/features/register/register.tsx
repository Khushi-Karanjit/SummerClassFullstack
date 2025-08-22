import { useState, type ChangeEvent, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { registerApi } from "../../config/api";
import "./register.css";

interface FormData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  bio: string;
  skills: string[];
  profilePicture?: File;
}

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<FormData>({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    bio: "",
    skills: [],
    profilePicture: undefined,
  });

  const [skillInput, setSkillInput] = useState("");
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({ ...prev, profilePicture: file }));
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSkillKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      const trimmed = skillInput.trim();
      if (trimmed && !formData.skills.includes(trimmed)) {
        setFormData((prev) => ({ ...prev, skills: [...prev.skills, trimmed] }));
      }
      setSkillInput("");
    }
  };

  const removeSkill = (skill: string) =>
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.filter((s) => s !== skill),
    }));

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    setLoading(true);
    const payload = new FormData();
    Object.entries(formData).forEach(([k, v]) => {
      if (k === "skills") payload.append(k, (v as string[]).join(","));
      else payload.append(k, v as string | Blob);
    });

    try {
      await registerApi(payload);
      alert("Registration successful! Please login.");
      navigate("/");
    } catch (err: any) {
      alert(err.response?.data?.message || "Registration failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="registerContainer">
      <h1>Register</h1>
      <form onSubmit={handleSubmit} className="registerForm">
        {/* Profile Picture */}
        <label className="fileLabel">
          Profile Picture
          <input type="file" accept="image/*" onChange={handleFile} />
          {preview && <img src={preview} alt="preview" className="preview" />}
        </label>

        {/* Basic inputs */}
        <input
          name="username"
          type="text"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          required
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <input
          name="confirmPassword"
          type="password"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
        />

        {/* Bio */}
        <textarea
          name="bio"
          rows={3}
          placeholder="Short bio…"
          value={formData.bio}
          onChange={handleChange}
        />

        {/* Skills */}
        <label>
          Skills (comma or Enter)
          <input
            type="text"
            placeholder="e.g. React, Node"
            value={skillInput}
            onChange={(e) => setSkillInput(e.target.value)}
            onKeyDown={handleSkillKeyDown}
          />
        </label>
        <div className="skill-chips">
          {formData.skills.map((s) => (
            <span key={s} className="chip">
              {s}
              <button type="button" onClick={() => removeSkill(s)}>
                &times;
              </button>
            </span>
          ))}
        </div>

        <button type="submit" disabled={loading} className="btn">
          {loading ? "Registering..." : "Register"}
        </button>
      </form>

      <p style={{ textAlign: "center", marginTop: "10px" }}>
        Already have an account? <a href="/">Login</a>
      </p>
    </div>
  );
};

export default Register;