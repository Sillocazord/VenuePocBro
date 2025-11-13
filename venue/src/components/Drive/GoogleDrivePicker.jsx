import React, { useState } from "react";
import useDrivePicker from "react-google-drive-picker";

const GOOGLE_DRIVE_API = "https://www.googleapis.com/drive/v3/files";
const UPLOAD_API =
  "https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart";

export default function GoogleDriveIntegration() {
  const [openPicker] = useDrivePicker();
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [accessToken, setAccessToken] = useState(null);
  const [showActionModal, setShowActionModal] = useState(false);

  // === LOGIN ===
  const handleLogin = async () => {
    const clientId =
      "121691882278-pi3f7t7l3nunu8ianelq9lkreuvu10q5.apps.googleusercontent.com";
    const redirectUri = "http://localhost:3000";
    const scope =
      "https://www.googleapis.com/auth/drive.file https://www.googleapis.com/auth/drive.readonly";
    const responseType = "token";

    const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=${responseType}&scope=${encodeURIComponent(
      scope
    )}&include_granted_scopes=true&prompt=consent`;

    const popup = window.open(authUrl, "_blank", "width=500,height=600");

    const timer = setInterval(() => {
      try {
        if (!popup || popup.closed) {
          clearInterval(timer);
          return;
        }
        if (popup.location.hash) {
          const hash = popup.location.hash.substring(1);
          const params = new URLSearchParams(hash);
          const token = params.get("access_token");
          if (token) {
            setAccessToken(token);
            popup.close();
            clearInterval(timer);
            setShowActionModal(true);
          }
        }
      } catch (err) {}
    }, 500);
  };

  // === ABRIR PICKER ===
  const handleOpenPicker = () => {
    openPicker({
      clientId:
        "121691882278-pi3f7t7l3nunu8ianelq9lkreuvu10q5.apps.googleusercontent.com",
      developerKey: "AIzaSyCDV7Rm39Mzsdc_PqxM9h7P40HFv_aKCFk",
      viewId: "DOCS",
      token: accessToken,
      showUploadView: true,
      showUploadFolders: true,
      supportDrives: true,
      multiselect: true,
      callbackFunction: (data) => {
        if (data.action === "picked") setSelectedFiles(data.docs);
      },
    });
  };

  // === UPLOAD ===
  const handleUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const metadata = { name: file.name, mimeType: file.type };
    const form = new FormData();
    form.append(
      "metadata",
      new Blob([JSON.stringify(metadata)], { type: "application/json" })
    );
    form.append("file", file);

    const res = await fetch(UPLOAD_API, {
      method: "POST",
      headers: { Authorization: `Bearer ${accessToken}` },
      body: form,
    });

    const data = await res.json();
    alert(`✅ Upload concluído: ${data.name}`);
  };

  // === DOWNLOAD ===
  const handleDownload = async (fileId, name) => {
    const res = await fetch(`${GOOGLE_DRIVE_API}/${fileId}?alt=media`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    const blob = await res.blob();
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.download = name;
    link.click();
  };

  // === VISUALIZAR ===
  const handleView = (fileId) => {
    const viewUrl = `https://drive.google.com/file/d/${fileId}/view`;
    window.open(viewUrl, "_blank");
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* === BOTÃO DE LOGIN === */}
      {!accessToken && (
        <button className="access-btn" onClick={handleLogin} style={{
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
        onMouseOut={(e) => (e.target.style.backgroundColor = "white")}>
          Acessar
        </button>
      )}

      {/* === BOTÃO PARA REABRIR O MODAL (se já estiver logado) === */}
      {accessToken && !showActionModal && (
        <button className="access-btn" onClick={() => setShowActionModal(true)}>
          Abrir opções
        </button>
      )}

      {/* === MODAL === */}
      {showActionModal && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(0,0,0,0.6)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 999,
          }}
        >
          <div
            style={{
              position: "relative",
              background: "linear-gradient(135deg, #1B0034, #3B0C59)",
              borderRadius: "20px",
              padding: "40px",
              width: "90%",
              maxWidth: "600px",
              textAlign: "center",
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "20px",
              color: "white",
              boxShadow: "0 0 30px rgba(0,0,0,0.5)",
            }}
          >
            {/* Botão X no canto superior direito */}
            <button
              onClick={() => setShowActionModal(false)}
              style={{
                position: "absolute",
                top: "10px",
                right: "15px",
                background: "transparent",
                border: "none",
                color: "white",
                fontSize: "22px",
                cursor: "pointer",
              }}
            >
              ❌
            </button>

            <h2 style={{ gridColumn: "1 / span 2", marginBottom: "10px" }}>
              📁 Escolha o que deseja fazer
            </h2>

            <button className="custom-btn" onClick={handleOpenPicker}>
              📂 Selecionar Arquivos
            </button>

            <label className="custom-btn">
              ⬆️ Fazer Upload
              <input
                type="file"
                style={{ display: "none" }}
                onChange={handleUpload}
              />
            </label>

            {selectedFiles.length > 0 && (
              <>
                <button
                  className="custom-btn"
                  onClick={() =>
                    handleDownload(selectedFiles[0].id, selectedFiles[0].name)
                  }
                >
                  ⬇️ Download
                </button>

                <button
                  className="custom-btn"
                  onClick={() => handleView(selectedFiles[0].id)}
                >
                  👁️ Visualizar
                </button>
              </>
            )}
          </div>
        </div>
      )}

      <style>{`
        .access-btn {
          background: gray;
          color: #a020f0;
          border: none;
          border-radius: 9999px;
          padding: 10px 30px;
          font-size: 15px;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .access-btn:hover {
          background: #bfbfbf;
        }

        .custom-btn {
          background: white;
          color: #000;
          border: none;
          border-radius: 9999px;
          padding: 14px 30px;
          cursor: pointer;
          font-size: 1rem;
          font-weight: 500;
          transition: all 0.2s ease;
        }

        .custom-btn:hover {
          transform: scale(1.05);
          box-shadow: 0 0 15px rgba(255,255,255,0.3);
        }
      `}</style>
    </div>
  );
}
