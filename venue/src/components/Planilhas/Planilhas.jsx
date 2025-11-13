import React from 'react'
import { useState } from 'react';

const Planilhas = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [gristUrl, setGristUrl] = useState("https://docs.getgrist.com");

  // Função de login simulada
  const handleLogin = () => {
    const googleWindow = window.open(
      "https://accounts.google.com/signin",
      "LoginGoogle",
      "width=600,height=700,left=200,top=100"
    );

    // Aqui seria o ponto onde você validaria o retorno do Google (Firebase, OAuth, etc)
    const checkLogin = setInterval(() => {
      if (googleWindow.closed) {
        clearInterval(checkLogin);
        setIsLoggedIn(true);
        setShowPopup(true);
      }
    }, 500);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  return (
    <div style={{ textAlign: "center", padding: "2rem" }}>
      {!isLoggedIn ? (
        <>
          <button
            onClick={handleLogin}
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
            }}onMouseOver={(e) => (e.target.style.backgroundColor = "#9a9a9aff")}
        onMouseOut={(e) => (e.target.style.backgroundColor = "white")}
          >
            Acessar
          </button>
        </>
      ) : (
        <button
          onClick={() => setShowPopup(true)}
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
      )}

      {showPopup && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            background: "rgba(0,0,0,0.6)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999,
          }}
        >
          <div
            style={{
              width: "85%",
              height: "85%",
              background: "#fff",
              borderRadius: "12px",
              boxShadow: "0 0 20px rgba(0,0,0,0.3)",
              overflow: "hidden",
              position: "relative",
            }}
          >
            <button
              onClick={handleClosePopup}
              style={{
                position: "absolute",
                 top: "-6px",
                right: "-6px",
                background: "transparent",
                border: "none",
                fontSize: "20px",
                cursor: "pointer",
                color: "#666",
              }}
            >
              ✕
            </button>

            <iframe
              src={gristUrl}
              width="100%"
              height="100%"
              style={{ border: "none" }}
              title="Grist Spreadsheet"
            ></iframe>
          </div>
        </div>
      )}
    </div>
  );
};

export default Planilhas
