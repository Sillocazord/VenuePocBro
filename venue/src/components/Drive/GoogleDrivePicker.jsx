// import React, { useState } from "react";
// import useDrivePicker from "react-google-drive-picker";

// export default function GoogleDrivePicker() {
//   const [openPicker] = useDrivePicker();
//   const [selectedFiles, setSelectedFiles] = useState([]);

//   const handleOpenPicker = () => {
//     openPicker({
//       clientId: "121691882278-pi3f7t7l3nunu8ianelq9lkreuvu10q5.apps.googleusercontent.com",
//       developerKey: "AIzaSyCDV7Rm39Mzsdc_PqxM9h7P40HFv_aKCFk",
//       viewId: "DOCS",
//       showUploadView: true,
//       showUploadFolders: true,
//       supportDrives: true,
//       multiselect: true,
//       callbackFunction: (data) => {
//         if (data.action === "cancel") {
//           console.log("Usuário cancelou o seletor.");
//           return;
//         }
//         if (data.action === "picked") {
//           console.log("Arquivos selecionados:", data.docs);
//           setSelectedFiles(data.docs);
//         }
//       },
//     });
//   };

//   return (
//     <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
//       <button
//         onClick={handleOpenPicker}
//         style={{
//           background: "#1a73e8",
//           color: "white",
//           border: "none",
//           borderRadius: "8px",
//           padding: "10px 16px",
//           cursor: "pointer",
//         }}
//       >
//         📂 Abrir Google Drive Picker
//       </button>

//       {selectedFiles.length > 0 && (
//         <ul style={{ marginTop: "20px" }}>
//           {selectedFiles.map((file) => (
//             <li key={file.id}>
//               <strong>{file.name}</strong> — {file.mimeType}
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// }
