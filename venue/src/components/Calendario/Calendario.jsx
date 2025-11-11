import React from 'react'
import { useState } from 'react';

const Calendario = () => {
 const [showModal, setShowModal] = useState(false);

  const calendarUrl =
    "https://calendar.google.com/calendar/embed?height=600&wkst=1&ctz=America%2FSao_Paulo&showPrint=0&src=c2lsbG9jYXpvcmR2aWRlb3NAZ21haWwuY29t&src=ZmFtaWx5MDIyMDgxODc4MzAxMDY2NDIyNDhAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ&src=cHQtYnIuYnJhemlsaWFuI2hvbGlkYXlAZ3JvdXAudi5jYWxlbmRhci5nb29nbGUuY29t&color=%23039be5&color=%23b39ddb&color=%230b8043";

  return (
    <div style={{ textAlign: "center", marginTop: "40px" }}>
      {/* Botão principal */}
      <button
        onClick={() => setShowModal(true)}
        style={{
          backgroundColor: 'white',
          marginTop: '0',
          width: '135px',
          height: '40px',
          borderRadius: '32px',
          border: '1px solid rgba(255, 255, 255, 0.10)',
          background: '#FFF',
          color: "blueviolet",
          transition: "0.3s",
        }}
        onMouseOver={(e) => (e.target.style.backgroundColor = "#9a9a9aff")}
        onMouseOut={(e) => (e.target.style.backgroundColor = "white")}
      >
        Acessar
      </button>

      {/* Modal */}
      {showModal && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0, 0, 0, 0.7)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              borderRadius: "12px",
              boxShadow: "0 4px 20px rgba(0,0,0,0.4)",
              padding: "10px",
              position: "relative",
              width: "850px",
              maxWidth: "95vw",
            }}
          >
            {/* Botão de fechar */}
            <button
              onClick={() => setShowModal(false)}
              style={{
                position: "absolute",
                top: "-7px",
                right: "-5px",
                background: "transparent",
                border: "none",
                fontSize: "26px",
                cursor: "pointer",
                color: "#333",
              }}
              title="Fechar"
            >
              ×
            </button>

            {/* Iframe do calendário */}
            <iframe
              title="Google Calendar"
              src={calendarUrl}
              style={{
                border: "solid 1px #777",
                width: "100%",
                height: "600px",
                borderRadius: "10px",
              }}
              frameBorder="0"
              scrolling="no"
              loading="lazy"
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default Calendario
