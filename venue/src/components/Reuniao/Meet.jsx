import React from 'react'
import { useState } from 'react';

const Meet = () => {
  const [showModal, setShowModal] = useState(false);

  // Nome da sala (você pode gerar dinamicamente se quiser)
  const roomName = "ReuniaoDoSillocazord";
  const jitsiUrl = `https://meet.jit.si/${roomName}`;

  return (
    <div style={{ textAlign: "center", marginTop: "40px" }}>
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
        Acessar (Jitsi)
      </button>

      {showModal && (
        <div
          onClick={() => setShowModal(false)}
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
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: "white",
              borderRadius: "12px",
              boxShadow: "0 4px 20px rgba(0,0,0,0.4)",
              padding: "10px",
              position: "relative",
              width: "90%",
              height: "90%",
              maxWidth: "1200px",
            }}
          >
            <button
              onClick={() => setShowModal(false)}
              style={{
                position: "absolute",
                top: "10px",
                right: "10px",
                background: "transparent",
                border: "none",
                fontSize: "28px",
                cursor: "pointer",
                color: "#333",
              }}
              title="Fechar"
            >
              ×
            </button>

            <iframe
              title="Jitsi Meet"
              src={jitsiUrl}
              allow="camera; microphone; fullscreen; display-capture"
              style={{
                border: "none",
                width: "100%",
                height: "100%",
                borderRadius: "8px",
              }}
              allowFullScreen
            />
          </div>
        </div>
      )}
    </div>
  );
}
export default Meet