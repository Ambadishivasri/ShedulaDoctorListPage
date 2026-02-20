"use client";

import { useEffect, useState } from "react";

const doctorsData = [
  {
    id: 1,
    name: "Dr. Prakash Das",
    department: "Cardiology",
    specialization: "Sr. Psychologist",
    experience: 7,
    available: true,
    time: "10:00 AM - 5:00 PM",
  },
  {
    id: 2,
    name: "Dr. Sarah John",
    department: "Dermatology",
    specialization: "Skin Specialist",
    experience: 5,
    available: true,
    time: "9:00 AM - 4:00 PM",
  },
  {
    id: 3,
    name: "Dr. Michael Brown",
    department: "Pediatrics",
    specialization: "Child Specialist",
    experience: 10,
    available: false,
    time: "Not Available Today",
  },
];

export default function Dashboard() {
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    const email = localStorage.getItem("userEmail");
    if (email) {
      setUserEmail(email);
    }
  }, []);

  const handleImageUpload = (event: any) => {
    const file = event.target.files[0];
    if (file) {
      setProfileImage(URL.createObjectURL(file));
    }
  };

  const filteredDoctors = doctorsData.filter((doc) =>
    doc.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="dashboard">
      {/* Header */}
      <div className="header">
        <label className="profile-upload">
          <input type="file" hidden onChange={handleImageUpload} />
          <img
            src={
              profileImage ||
              "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            }
            alt="profile"
          />
        </label>

        <div>
          <h3>Hello {userEmail}</h3>
          <p>Find your doctor</p>
        </div>
      </div>

      {/* Search */}
      <input
        className="search-bar"
        type="text"
        placeholder="Search Doctors..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Doctors List */}
      <div className="doctor-list">
        {filteredDoctors.map((doc) => (
          <div key={doc.id} className="doctor-card">
            <img src="/doctor.png" alt="doctor" />

            <div className="doctor-info">
              <h4>{doc.name}</h4>
              <p>{doc.department}</p>
              <p>{doc.specialization}</p>
              <p>{doc.experience} Years Experience</p>

              <span
                className={
                  doc.available ? "available" : "not-available"
                }
              >
                {doc.available ? "Available Today" : "Not Available"}
              </span>

              <p style={{ fontSize: "12px", marginTop: "5px" }}>
                {doc.time}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="footer">
        <div>🔍<p>Find</p></div>
        <div>📅<p>Appointment</p></div>
        <div>📖<p>History</p></div>
        <div>👤<p>Profile</p></div>
      </div>
    </div>
  );
}