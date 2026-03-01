"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

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
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilter, setShowFilter] = useState(false);
  const [selectedDepartments, setSelectedDepartments] = useState<string[]>([]);

  // adjust these names to match your departments
  const departments = ["Cardiology", "Dermatology", "Pediatrics"];

  const router = useRouter();

  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [userName, setUserName] = useState("");
  const [appointments, setAppointments] = useState<any[]>([]);

  useEffect(() => {
    const name = localStorage.getItem("userName");
    if (name) setUserName(name);

    const stored = localStorage.getItem("appointments");
    if (stored) setAppointments(JSON.parse(stored));
  }, []);

  const handleImageUpload = (event: any) => {
    const file = event.target.files[0];
    if (file) setProfileImage(URL.createObjectURL(file));
  };

  // filteredDoctors uses searchTerm + selectedDepartments
  const filteredDoctors = doctorsData.filter((doc) => {
    const matchesSearch =
      doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.department.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesDepartment =
      selectedDepartments.length === 0 ||
      selectedDepartments.includes(doc.department);

    return matchesSearch && matchesDepartment;
  });

  return (
    <div className="dashboard">
      {/* Header */}
      <div
        className="header"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
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
            <h3>Hello {userName}</h3>
            <p>Find your doctor</p>
          </div>
        </div>

        {/* Notification Bell */}
        <div style={{ position: "relative", cursor: "pointer" }}>
          🔔
          {appointments.length > 0 && (
            <span
              style={{
                position: "absolute",
                top: "-5px",
                right: "-8px",
                background: "red",
                color: "white",
                borderRadius: "50%",
                fontSize: "10px",
                padding: "2px 6px",
              }}
            >
              {appointments.length}
            </span>
          )}
        </div>
      </div>

      {/* Search + Filter */}
      <div className="search-row">
        {/* give search bar a bit less width so Filter fits */}
        <div className="search-input-wrapper">
          <input
            className="search-bar"
            type="text"
            placeholder="Search doctors..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Filter dropdown trigger */}
        <div className="filter-wrapper">
          <button
            type="button"
            className="filter-button"
            onClick={() => setShowFilter(!showFilter)}
          >
            Filter
          </button>

          {showFilter && (
            <div className="filter-dropdown">
              {departments.map((dept) => (
                <label key={dept} className="filter-option">
                  <span className="filter-dept-label">{dept}</span>
                  <input
                    type="checkbox"
                    checked={selectedDepartments.includes(dept)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedDepartments([
                          ...selectedDepartments,
                          dept,
                        ]);
                      } else {
                        setSelectedDepartments(
                          selectedDepartments.filter((d) => d !== dept)
                        );
                      }
                    }}
                  />
                </label>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Doctors List */}
      <div className="doctor-list">
        {filteredDoctors.map((doc) => (
          <div
            key={doc.id}
            className="doctor-card"
            onClick={() => router.push(`/doctors/${doc.id}`)}
            style={{ cursor: "pointer" }}
          >
            <img src="/doctor.png" alt="doctor" />
            <div className="doctor-info">
              <h4>{doc.name}</h4>
              <p>{doc.department}</p>
              <p>{doc.specialization}</p>
              <p>{doc.experience} Years Experience</p>

              <span
                className={doc.available ? "available" : "not-available"}
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
        <div
          onClick={() => router.push("/appointments")}
          style={{ cursor: "pointer" }}
        >
          📅
          <p>Appointment</p>
        </div>
        <div>📖<p>History</p></div>
        <div>👤<p>Profile</p></div>
      </div>
    </div>
  );
}
