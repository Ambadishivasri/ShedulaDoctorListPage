"use client";

import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";

const doctorsData = [
  {
    id: 1,
    name: "Dr. Prakash Das",
    department: "Cardiology",
    specialization: "MBBS ,MS (Surgeon)",
    experience: 15,
    fees: "₹800",
    hospital: "Apollo Hospital",
    hospitalImage: "/hospital.jpg",
    mapLink: "https://www.google.com/maps",
  },
  {
    id: 2,
    name: "Dr. Sarah John",
    department: "Dermatology",
    specialization: "Skin Specialist",
    experience: 5,
    fees: "₹600",
    hospital: "City Care Hospital",
    hospitalImage: "/hospital.jpg",
    mapLink: "https://www.google.com/maps",
  },
];

export default function DoctorDetails() {
  const params = useParams();
  const router = useRouter();

  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [mode, setMode] = useState<string | null>(null);
  const [bookings, setBookings] = useState<any[]>([]);
  const [showModal, setShowModal] = useState(false);

  const doctor = doctorsData.find(
    (doc) => doc.id === Number(params.id)
  );

  useEffect(() => {
    const stored = localStorage.getItem("appointments");
    if (stored) {
      setBookings(JSON.parse(stored));
    }
  }, []);

  if (!doctor) {
    return <div style={{ padding: "40px" }}>Doctor not found</div>;
  }

  const today = new Date();
  const dates = Array.from({ length: 4 }).map((_, i) => {
    const d = new Date();
    d.setDate(today.getDate() + i);
    return d;
  });

  const bookedSlots = bookings
    .filter(
      (b) =>
        b.doctorId === doctor.id &&
        b.date === selectedDate
    )
    .map((b) => b.time);

  return (
    <div
      style={{
        background: "#f5f7f9",
        height: "100vh",
        overflowY: "auto",
        paddingBottom: "40px",
      }}
    >
      {/* Header */}
      <div
        style={{
          background: "linear-gradient(135deg,#2ec4b6,#20b2aa)",
          padding: "20px 20px 80px 20px",
          color: "white",
          borderBottomLeftRadius: "30px",
          borderBottomRightRadius: "30px",
        }}
      >
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          style={{
            background: "none",
            border: "none",
            color: "white",
            fontSize: "16px",
            cursor: "pointer",
          }}
        >
          ← Back
        </button>

        {/* Hospital Image */}
        <img
          src={doctor.hospitalImage}
          alt="hospital"
          style={{
            width: "100%",
            height: "150px",
            objectFit: "cover",
            borderRadius: "15px",
            marginTop: "15px",
          }}
        />
      </div>

      {/* Doctor Card */}
      <div
        style={{
          background: "white",
          margin: "-40px 20px 20px",
          padding: "20px",
          borderRadius: "16px",
          boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {/* Left Side - Doctor Info */}
        <div>
          <h3>{doctor.name}</h3>
          <p>{doctor.department}</p>
          <p style={{ color: "#2ec4b6" }}>
            {doctor.specialization}
          </p>

          <p style={{ marginTop: "10px", fontWeight: "600" }}>
            Consultation Fees: {doctor.fees}
          </p>

          <p style={{ marginTop: "8px" }}>
            Hospital: {doctor.hospital}
          </p>

          <a
            href={doctor.mapLink}
            target="_blank"
            style={{
              fontSize: "14px",
              color: "#2ec4b6",
              textDecoration: "none",
            }}
          >
            View on Map
          </a>
        </div>

        {/* Right Side - Doctor Image */}
        <img
          src="/doctor.png"
          alt="doctor"
          style={{
            width: "90px",
            height: "90px",
            borderRadius: "12px",
            objectFit: "cover",
          }}
        />
      </div>


      {/* Availability */}
      <div style={{ padding: "0 20px 30px" }}>
        <h4>Mode Of Consultation</h4>

<div style={{ display: "flex", gap: "10px", margin: "10px 0 20px" }}>
  {["Online", "Offline"].map((type) => (
    <button
      key={type}
      onClick={() => setMode(type)}
      style={{
        flex: 1,
        padding: "10px",
        borderRadius: "10px",
        border: mode === type ? "none" : "1px solid #ddd",
        background:
          mode === type
            ? "linear-gradient(135deg,#2ec4b6,#20b2aa)"
            : "white",
        color: mode === type ? "white" : "black",
        cursor: "pointer",
      }}
    >
      {type}
    </button>
  ))}
</div>
        <h4>Availability For Consulting</h4>

        {/* Dates */}
        <div style={{ display: "flex", gap: "10px", margin: "15px 0" }}>
          {dates.map((date) => {
            const formatted = `${date.getDate()} ${date.toLocaleString("default", { weekday: "short" })}`;
            return (
              <button
                key={formatted}
                onClick={() => setSelectedDate(formatted)}
                style={{
                  flex: 1,
                  padding: "10px",
                  borderRadius: "10px",
                  border:
                    selectedDate === formatted
                      ? "none"
                      : "1px solid #ddd",
                  background:
                    selectedDate === formatted
                      ? "linear-gradient(135deg,#2ec4b6,#20b2aa)"
                      : "white",
                  color:
                    selectedDate === formatted
                      ? "white"
                      : "black",
                  cursor: "pointer",
                }}
              >
                {formatted}
              </button>
            );
          })}
        </div>

        {/* Time Slots */}
        <h4>Select slot</h4>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "10px",
          }}
        >
          {[
            "09:30 AM - 09:45AM",
            "10:00 AM - 10:15AM",
            "10:30 AM - 10:45AM",
            "11:00 AM - 11:15AM",
            "12:00 PM - 12:15PM",
            "01:00 PM - 01:15PM",
          ].map((time) => {
            const isBooked = bookedSlots.includes(time);

            return (
              <button
                key={time}
                disabled={isBooked}
                onClick={() => setSelectedTime(time)}
                style={{
                  padding: "10px",
                  borderRadius: "10px",
                  border:
                    selectedTime === time
                      ? "none"
                      : "1px solid #ddd",
                  background: isBooked
                    ? "#e0e0e0"
                    : selectedTime === time
                    ? "linear-gradient(135deg,#2ec4b6,#20b2aa)"
                    : "white",
                  color:
                    selectedTime === time
                      ? "white"
                      : "black",
                  cursor: isBooked
                    ? "not-allowed"
                    : "pointer",
                }}
              >
                {time}
              </button>
            );
          })}
        </div>

        {/* Book Button */}
        <div style={{ marginTop: "20px" }}>
          <button
            onClick={() => {
              if (!selectedDate || !selectedTime || !mode) return;

              const newBooking = {
              id: Date.now(),
              doctorId: doctor.id,
              doctorName: doctor.name,
              hospital: doctor.hospital,
              fees: doctor.fees,
              mode: mode,
              date: selectedDate,
              time: selectedTime,
};

              const updated = [...bookings, newBooking];

              localStorage.setItem(
                "appointments",
                JSON.stringify(updated)
              );

              setBookings(updated);
              setShowModal(true);
            }}
            style={{
              width: "100%",
              padding: ".8rem",
              border: "none",
              borderRadius: "12px",
              background:
                "linear-gradient(135deg,#2ec4b6,#20b2aa)",
              color: "#fff",
              fontWeight: "600",
              cursor: "pointer",
            }}
          >
            Book appointment
          </button>
        </div>
      </div>

      {/* Success Modal */}
      {showModal && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.4)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              background: "white",
              padding: "30px",
              borderRadius: "16px",
              width: "90%",
              textAlign: "left",
            }}
          >
            <h3 style={{ color: "#2ec4b6", textAlign: "center" }}>
              Appointment Confirmed
            </h3>

            <p><strong>Doctor:</strong> {doctor.name}</p>
            <p><strong>Date:</strong> {selectedDate}</p>
            <p><strong>Time:</strong> {selectedTime}</p>
            <p><strong>Fees:</strong> {doctor.fees}</p>
            <p><strong>Hospital:</strong> {doctor.hospital}</p>
            <p><strong>Mode:</strong> {mode}</p>

            <div style={{ textAlign: "center" }}>
              <button
                onClick={() => setShowModal(false)}
                style={{
                  marginTop: "20px",
                  padding: ".6rem 1.5rem",
                  border: "none",
                  borderRadius: "10px",
                  background:
                    "linear-gradient(135deg,#2ec4b6,#20b2aa)",
                  color: "white",
                  cursor: "pointer",
                }}
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}