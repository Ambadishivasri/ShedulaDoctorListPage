"use client";

import { useEffect, useState } from "react";

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState<any[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("appointments");
    if (stored) {
      setAppointments(JSON.parse(stored));
    }
  }, []);

  const cancelAppointment = (id: number) => {
    const updated = appointments.filter((a) => a.id !== id);
    localStorage.setItem("appointments", JSON.stringify(updated));
    setAppointments(updated);
  };

  const postponeAppointment = (id: number) => {
    alert("Postpone feature can be implemented later");
  };

  return (
    <div style={{ padding: "20px", background: "#f5f7f9", minHeight: "100vh" }}>
      <h2 style={{ marginBottom: "20px" }}>My Appointments</h2>

      {appointments.length === 0 && <p>No appointments booked.</p>}

      {appointments.map((a) => (
        <div
          key={a.id || `${a.doctorName}-${a.date}-${a.time}`}
          style={{
            background: "white",
            padding: "20px",
            borderRadius: "16px",
            marginBottom: "15px",
            boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
          }}
        >
          <p><strong>Doctor:</strong> {a.doctorName}</p>
          <p><strong>Hospital:</strong> {a.hospital}</p>
          <p><strong>Date:</strong> {a.date}</p>
          <p><strong>Time:</strong> {a.time}</p>
          <p><strong>Fees:</strong> {a.fees}</p>
          <p><strong>Mode:</strong> {a.mode}</p>

          <div style={{ display: "flex", gap: "10px", marginTop: "15px" }}>
            <button
              onClick={() => cancelAppointment(a.id)}
              style={{
                flex: 1,
                padding: "8px",
                borderRadius: "8px",
                border: "none",
                background: "red",
                color: "white",
                cursor: "pointer",
              }}
            >
              Cancel
            </button>

            <button
              onClick={() => postponeAppointment(a.id)}
              style={{
                flex: 1,
                padding: "8px",
                borderRadius: "8px",
                border: "none",
                background: "#2ec4b6",
                color: "white",
                cursor: "pointer",
              }}
            >
              Postpone
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}