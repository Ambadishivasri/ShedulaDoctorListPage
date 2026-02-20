"use client";

const doctors = [
  {
    id: 1,
    name: "Dr. John Smith",
    specialization: "Cardiologist",
  },
  {
    id: 2,
    name: "Dr. Sarah Johnson",
    specialization: "Dermatologist",
  },
  {
    id: 3,
    name: "Dr. Michael Brown",
    specialization: "Pediatrician",
  },
];

export default function DoctorsPage() {
  return (
    <div style={{ padding: "40px" }}>
      <h1 style={{ fontSize: "28px", marginBottom: "20px" }}>
        Doctors List
      </h1>

      {doctors.map((doctor) => (
        <div
          key={doctor.id}
          style={{
            padding: "20px",
            border: "1px solid #ddd",
            borderRadius: "10px",
            marginBottom: "15px",
          }}
        >
          <h2>{doctor.name}</h2>
          <p>{doctor.specialization}</p>
        </div>
      ))}

      <a
        href="/dashboard"
        style={{
          display: "inline-block",
          marginTop: "20px",
          color: "#2ec4b6",
        }}
      >
        ← Back to Dashboard
      </a>
    </div>
  );
}