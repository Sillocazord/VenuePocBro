import React, { useState } from "react";
import useDrivePicker from "react-google-drive-picker";

export default function GoogleDrivePicker() {
  const [openPicker] = useDrivePicker();
  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleOpenPicker = () => {
    openPicker({
      clientId: "121691882278-pi3f7t7l3nunu8ianelq9lkreuvu10q5.apps.googleusercontent.com",
      developerKey: "AIzaSyCDV7Rm39Mzsdc_PqxM9h7P40HFv_aKCFk",
      viewId: "DOCS",
      showUploadView: true,
      showUploadFolders: true,
      supportDrives: true,
      multiselect: true,
      callbackFunction: (data) => {
        if (data.action === "cancel") {
          console.log("Usuário cancelou o seletor.");
          return;
        }
        if (data.action === "picked") {
          console.log("Arquivos selecionados:", data.docs);
          setSelectedFiles(data.docs);
        }
      },
    });
  };

  return (
    <div style={{ textAlign: "center", marginTop: "40px" }}>
      <button
        onClick={handleOpenPicker}
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

      {selectedFiles.length > 0 && (
        <ul style={{ marginTop: "20px" }}>
          {selectedFiles.map((file) => (
            <li key={file.id}>
              <strong>{file.name}</strong> — {file.mimeType}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
