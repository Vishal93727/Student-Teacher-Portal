


// // import React, { useEffect, useState } from "react";
// // import { jsPDF } from "jspdf";

// // const ProfilePage = ({ currentUser }) => {
// //   const [userData, setUserData] = useState(null);
// //   const [editable, setEditable] = useState(false);
// //   const [formData, setFormData] = useState({});

// //   // Fetch user data from DB
// //   useEffect(() => {
// //     fetch(`http://localhost:5000/api/users/${currentUser._id}`)
// //       .then(res => res.json())
// //       .then(data => {
// //         setUserData(data);
// //         setFormData(data);
// //       })
// //       .catch(err => console.error(err));
// //   }, [currentUser]);

// //   const handleChange = (e) => {
// //     const { name, value } = e.target;
// //     if (name.includes(".")) {
// //       const [section, key] = name.split(".");
// //       setFormData(prev => ({
// //         ...prev,
// //         [section]: { ...prev[section], [key]: value }
// //       }));
// //     } else {
// //       setFormData(prev => ({ ...prev, [name]: value }));
// //     }
// //   };

// //   const handleSave = () => {
// //     fetch(`http://localhost:5000/api/users/${currentUser._id}`, {
// //       method: "PUT",
// //       headers: { "Content-Type": "application/json" },
// //       body: JSON.stringify(formData)
// //     })
// //       .then(res => res.json())
// //       .then(data => {
// //         setUserData(data);
// //         setEditable(false);
// //       })
// //       .catch(err => console.error(err));
// //   };

// //   const downloadProfile = () => {
// //     const doc = new jsPDF();
// //     doc.setFontSize(16);
// //     doc.text("Student Profile", 20, 20);
// //     let y = 30;
// //     Object.entries(formData).forEach(([key, value]) => {
// //       if (typeof value === "object" && value !== null) {
// //         doc.setFontSize(14);
// //         doc.text(`${key}:`, 20, y);
// //         y += 6;
// //         Object.entries(value).forEach(([subKey, subValue]) => {
// //           doc.setFontSize(12);
// //           doc.text(`${subKey}: ${subValue}`, 30, y);
// //           y += 6;
// //         });
// //       } else if (Array.isArray(value)) {
// //         doc.setFontSize(14);
// //         doc.text(`${key}: ${value.join(", ")}`, 20, y);
// //         y += 6;
// //       } else {
// //         doc.setFontSize(12);
// //         doc.text(`${key}: ${value}`, 20, y);
// //         y += 6;
// //       }
// //     });
// //     doc.save(`${formData.name}_Profile.pdf`);
// //   };

// //   if (!userData) return <p className="text-center mt-10">Loading Profile...</p>;

// //   return (
// //     <div className="max-w-7xl mx-auto p-6 bg-white rounded-xl shadow-md mt-10 space-y-6">

// //       {/* Header */}
// //       <div className="flex justify-between items-center">
// //         <h1 className="text-2xl font-bold">👤 Student Profile</h1>
// //         <div>
// //           <button onClick={() => setEditable(!editable)} className="px-4 py-2 bg-blue-500 text-white rounded mr-2 hover:bg-blue-600">
// //             {editable ? "Cancel" : "Edit"}
// //           </button>
// //           <button onClick={downloadProfile} className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
// //             Download PDF
// //           </button>
// //         </div>
// //       </div>

// //       {/* Personal Info */}
// //       <section className="bg-gray-50 p-4 rounded shadow space-y-4">
// //         <h2 className="text-xl font-semibold">Personal Information</h2>
// //         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
// //           {["name","email","password","phone","dateOfBirth","gender","bloodGroup","nationality","religion","category","rollNumber","registrationNumber","branch","department","year","semester","batchYear","section","role"].map(field => (
// //             <label key={field} className="block">
// //               <span className="text-gray-700 font-medium">{field}:</span>
// //               {editable ? (
// //                 <input type="text" name={field} value={formData[field] || ""} onChange={handleChange} className="mt-1 block w-full rounded border-gray-300 shadow-sm" />
// //               ) : (
// //                 <p className="mt-1">{formData[field]}</p>
// //               )}
// //             </label>
// //           ))}
// //         </div>
// //       </section>

// //       {/* Addresses */}
// //       <section className="bg-gray-50 p-4 rounded shadow space-y-4">
// //         <h2 className="text-xl font-semibold">Addresses</h2>
// //         {["permanentAddress","currentAddress"].map(addr => (
// //           <div key={addr} className="grid grid-cols-1 md:grid-cols-2 gap-4">
// //             <h3 className="col-span-full font-medium">{addr}</h3>
// //             {["street","city","state","pincode","country"].map(field => (
// //               <label key={field} className="block">
// //                 <span className="text-gray-700">{field}:</span>
// //                 {editable ? (
// //                   <input type="text" name={`${addr}.${field}`} value={formData[addr]?.[field] || ""} onChange={handleChange} className="mt-1 block w-full rounded border-gray-300 shadow-sm" />
// //                 ) : (
// //                   <p className="mt-1">{formData[addr]?.[field]}</p>
// //                 )}
// //               </label>
// //             ))}
// //           </div>
// //         ))}
// //       </section>

// //       {/* Parents & Emergency Contact */}
// //       <section className="bg-gray-50 p-4 rounded shadow space-y-4">
// //         <h2 className="text-xl font-semibold">Parents & Emergency Contact</h2>
// //         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
// //           {["fatherName","motherName","guardianName","parentPhone","parentEmail","parentOccupation"].map(field => (
// //             <label key={field} className="block">
// //               <span className="text-gray-700">{field}:</span>
// //               {editable ? (
// //                 <input type="text" name={field} value={formData[field] || ""} onChange={handleChange} className="mt-1 block w-full rounded border-gray-300 shadow-sm" />
// //               ) : (
// //                 <p className="mt-1">{formData[field]}</p>
// //               )}
// //             </label>
// //           ))}
// //           {["name","relation","phone"].map(field => (
// //             <label key={field} className="block">
// //               <span className="text-gray-700">Emergency {field}:</span>
// //               {editable ? (
// //                 <input type="text" name={`emergencyContact.${field}`} value={formData.emergencyContact?.[field] || ""} onChange={handleChange} className="mt-1 block w-full rounded border-gray-300 shadow-sm" />
// //               ) : (
// //                 <p className="mt-1">{formData.emergencyContact?.[field]}</p>
// //               )}
// //             </label>
// //           ))}
// //         </div>
// //       </section>

// //       {/* Previous Education */}
// //       <section className="bg-gray-50 p-4 rounded shadow space-y-4">
// //         <h2 className="text-xl font-semibold">Previous Education</h2>
// //         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
// //           {["schoolName","board","passingYear","percentage","subjects"].map(field => (
// //             <label key={field} className="block">
// //               <span className="text-gray-700">{field}:</span>
// //               {editable ? (
// //                 <input type="text" name={`previousEducation.${field}`} value={formData.previousEducation?.[field] || ""} onChange={handleChange} className="mt-1 block w-full rounded border-gray-300 shadow-sm" />
// //               ) : (
// //                 <p className="mt-1">{formData.previousEducation?.[field]}</p>
// //               )}
// //             </label>
// //           ))}
// //         </div>
// //       </section>

// //       {/* Hobbies & Skills */}
// //       <section className="bg-gray-50 p-4 rounded shadow space-y-4">
// //         <h2 className="text-xl font-semibold">Hobbies & Skills</h2>
// //         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// //           <label className="block">
// //             <span className="text-gray-700">Hobbies (comma separated):</span>
// //             {editable ? (
// //               <input type="text" value={formData.hobbies?.join(", ") || ""} onChange={e => setFormData({...formData,hobbies: e.target.value.split(",").map(h=>h.trim())})} className="mt-1 block w-full rounded border-gray-300 shadow-sm" />
// //             ) : (
// //               <p className="mt-1">{formData.hobbies?.join(", ")}</p>
// //             )}
// //           </label>
// //           <label className="block">
// //             <span className="text-gray-700">Skills (comma separated):</span>
// //             {editable ? (
// //               <input type="text" value={formData.skills?.join(", ") || ""} onChange={e => setFormData({...formData,skills: e.target.value.split(",").map(s=>s.trim())})} className="mt-1 block w-full rounded border-gray-300 shadow-sm" />
// //             ) : (
// //               <p className="mt-1">{formData.skills?.join(", ")}</p>
// //             )}
// //           </label>
// //         </div>
// //       </section>

// //       {/* Save Button */}
// //       {editable && (
// //         <div className="flex justify-end">
// //           <button onClick={handleSave} className="mt-4 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
// //             Save Profile
// //           </button>
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default ProfilePage;


// import React, { useEffect, useState } from "react";
// import { jsPDF } from "jspdf";

// const ProfilePage = ({ currentUser }) => {
//   const [userData, setUserData] = useState(null);
//   const [editable, setEditable] = useState(false);
//   const [formData, setFormData] = useState({});

//   useEffect(() => {
//     fetch(`http://localhost:5000/api/users/${currentUser._id}`)
//       .then(res => res.json())
//       .then(data => {
//         setUserData(data);
//         setFormData(data);
//       })
//       .catch(err => console.error(err));
//   }, [currentUser]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     if (name.includes(".")) {
//       const [section, key] = name.split(".");
//       setFormData(prev => ({
//         ...prev,
//         [section]: { ...prev[section], [key]: value }
//       }));
//     } else {
//       setFormData(prev => ({ ...prev, [name]: value }));
//     }
//   };

//   const handleSave = () => {
//     fetch(`http://localhost:5000/api/users/${currentUser._id}`, {
//       method: "PUT",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(formData)
//     })
//       .then(res => res.json())
//       .then(data => {
//         setUserData(data);
//         setEditable(false);
//       })
//       .catch(err => console.error(err));
//   };

//   const downloadProfile = () => {
//     const doc = new jsPDF();
//     doc.setFontSize(16);
//     doc.text("Student Profile", 20, 20);
//     let y = 30;
//     Object.entries(formData).forEach(([key, value]) => {
//       if (typeof value === "object" && value !== null) {
//         doc.setFontSize(14);
//         doc.text(`${key}:`, 20, y);
//         y += 6;
//         Object.entries(value).forEach(([subKey, subValue]) => {
//           doc.setFontSize(12);
//           doc.text(`${subKey}: ${subValue}`, 30, y);
//           y += 6;
//         });
//       } else if (Array.isArray(value)) {
//         doc.setFontSize(14);
//         doc.text(`${key}: ${value.join(", ")}`, 20, y);
//         y += 6;
//       } else {
//         doc.setFontSize(12);
//         doc.text(`${key}: ${value}`, 20, y);
//         y += 6;
//       }
//     });
//     doc.save(`${formData.name}_Profile.pdf`);
//   };

//   if (!userData) return <p className="text-center text-gray-500 mt-10">Loading Profile...</p>;

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-100 via-white to-slate-200 py-10 px-6">
//       <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-lg p-8">
        
//         {/* Header */}
//         <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
//           <div>
//             <h1 className="text-3xl font-extrabold text-gray-800">👤 Student Profile</h1>
//             <p className="text-gray-500 mt-1">View and manage your personal information</p>
//           </div>
//           <div className="mt-4 md:mt-0 space-x-3">
//             <button
//               onClick={() => setEditable(!editable)}
//               className={`px-5 py-2 rounded-lg shadow transition ${
//                 editable
//                   ? "bg-gray-400 hover:bg-gray-500 text-white"
//                   : "bg-blue-600 hover:bg-blue-700 text-white"
//               }`}
//             >
//               {editable ? "Cancel" : "Edit"}
//             </button>
//             <button
//               onClick={downloadProfile}
//               className="px-5 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 shadow"
//             >
//               Download PDF
//             </button>
//           </div>
//         </div>

//         {/* Section Card */}
//         <div className="space-y-10">
//           {/* Personal Information */}
//           <ProfileSection
//             title="Personal Information"
//             fields={[
//               "name", "email", "phone", "dateOfBirth", "gender", "bloodGroup",
//               "nationality", "religion", "category", "rollNumber",
//               "registrationNumber", "branch", "department", "year", "semester",
//               "batchYear", "section", "role"
//             ]}
//             formData={formData}
//             editable={editable}
//             handleChange={handleChange}
//           />

//           {/* Addresses */}
//           {["permanentAddress", "currentAddress"].map(addr => (
//             <ProfileSection
//               key={addr}
//               title={`${addr.charAt(0).toUpperCase() + addr.slice(1)} `}
//               subFields={["street", "city", "state", "pincode", "country"]}
//               sectionName={addr}
//               formData={formData}
//               editable={editable}
//               handleChange={handleChange}
//             />
//           ))}

//           {/* Parents & Emergency Contact */}
//           <ProfileSection
//             title="Parents & Emergency Contact"
//             fields={["fatherName","motherName","guardianName","parentPhone","parentEmail","parentOccupation"]}
//             formData={formData}
//             editable={editable}
//             handleChange={handleChange}
//           />

//           {/* Education */}
//           <ProfileSection
//             title="Previous Education"
//             subFields={["schoolName","board","passingYear","percentage","subjects"]}
//             sectionName="previousEducation"
//             formData={formData}
//             editable={editable}
//             handleChange={handleChange}
//           />

//           {/* Hobbies & Skills */}
//           <div className="bg-slate-50 p-6 rounded-xl shadow-md border border-slate-200">
//             <h2 className="text-xl font-semibold text-gray-800 mb-4">Hobbies & Skills</h2>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <EditableInput
//                 label="Hobbies (comma separated)"
//                 editable={editable}
//                 value={formData.hobbies?.join(", ") || ""}
//                 onChange={e =>
//                   setFormData({
//                     ...formData,
//                     hobbies: e.target.value.split(",").map(h => h.trim())
//                   })
//                 }
//               />
//               <EditableInput
//                 label="Skills (comma separated)"
//                 editable={editable}
//                 value={formData.skills?.join(", ") || ""}
//                 onChange={e =>
//                   setFormData({
//                     ...formData,
//                     skills: e.target.value.split(",").map(s => s.trim())
//                   })
//                 }
//               />
//             </div>
//           </div>
//         </div>

//         {/* Save Button */}
//         {editable && (
//           <div className="flex justify-end mt-10">
//             <button
//               onClick={handleSave}
//               className="px-6 py-2 bg-blue-700 hover:bg-blue-800 text-white rounded-lg shadow-md transition"
//             >
//               💾 Save Changes
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// /* ---------- Reusable Components ---------- */
// const ProfileSection = ({ title, fields, subFields, sectionName, formData, editable, handleChange }) => (
//   <section className="bg-slate-50 p-6 rounded-xl shadow-md border border-slate-200">
//     <h2 className="text-xl font-semibold text-gray-800 mb-4">{title}</h2>
//     <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//       {(fields || subFields)?.map(field => (
//         <EditableInput
//           key={field}
//           label={field}
//           name={sectionName ? `${sectionName}.${field}` : field}
//           value={sectionName ? formData[sectionName]?.[field] || "" : formData[field] || ""}
//           editable={editable}
//           onChange={handleChange}
//         />
//       ))}
//     </div>
//   </section>
// );

// const EditableInput = ({ label, name, value, editable, onChange }) => (
//   <label className="block">
//     <span className="text-gray-700 font-medium">{label}:</span>
//     {editable ? (
//       <input
//         type="text"
//         name={name}
//         value={value}
//         onChange={onChange}
//         className="mt-1 w-full px-3 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-sm"
//       />
//     ) : (
//       <p className="mt-1 text-gray-800 bg-white px-3 py-2 rounded-md border border-gray-100 shadow-sm">{value}</p>
//     )}
//   </label>
// );

// export default ProfilePage;
import React, { useEffect, useState } from "react";
import { jsPDF } from "jspdf";

const styles = {
  page: { minHeight: "100vh", padding: 24, paddingTop: 110, background: "linear-gradient(#ffffff,#eaf3ff)" },
  container: { maxWidth: 900, margin: "20px auto" },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    background: "linear-gradient(90deg,#2563eb,#1e40af)",
    color: "#fff",
    padding: 24,
    borderRadius: 18,
    boxShadow: "0 6px 18px rgba(0,0,0,0.1)",
    marginBottom: 24,
  },
  title: { fontSize: 32, fontWeight: 700 },
  button: {
    padding: "10px 16px",
    border: "none",
    borderRadius: 10,
    fontWeight: 600,
    cursor: "pointer",
  },
  editBtn: { background: "#fff", color: "#1e40af", marginRight: 10 },
  saveBtn: { background: "#2563eb", color: "#fff" },
  card: {
    background: "#fff",
    borderRadius: 18,
    padding: 20,
    boxShadow: "0 6px 18px rgba(35,47,63,0.08)",
    border: "1px solid #edf2f7",
    marginBottom: 20,
  },
  sectionTitle: { fontSize: 22, fontWeight: 700, color: "#2b6cb0", marginBottom: 12, borderBottom: "2px solid #e2e8f0", paddingBottom: 4 },
  label: { fontWeight: 600, color: "#2d3748", display: "block", marginBottom: 6 },
  input: {
    width: "100%",
    borderRadius: 10,
    border: "1px solid #cbd5e1",
    padding: "10px 12px",
    fontSize: 15,
    marginBottom: 12,
  },
  text: { color: "#2d3748", marginBottom: 12 },
};

const ProfilePage = ({ currentUser }) => {
  const [userData, setUserData] = useState(null);
  const [editable, setEditable] = useState(false);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (!currentUser?._id) return;
    fetch(`http://localhost:5000/api/users/${currentUser._id}`)
      .then((res) => res.json())
      .then((data) => {
        setUserData(data);
        setFormData(data);
      })
      .catch((err) => console.error(err));
  }, [currentUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes(".")) {
      const [section, key] = name.split(".");
      setFormData((prev) => ({
        ...prev,
        [section]: { ...prev[section], [key]: value },
      }));
    } else setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    fetch(`http://localhost:5000/api/users/${currentUser._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => {
        setUserData(data);
        setEditable(false);
      })
      .catch((err) => console.error(err));
  };

  const downloadProfile = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("Student Profile", 20, 20);
    let y = 30;
    Object.entries(formData).forEach(([key, value]) => {
      if (typeof value === "object" && value !== null) {
        doc.text(`${key}:`, 20, y);
        y += 6;
        Object.entries(value).forEach(([k, v]) => {
          doc.text(`  ${k}: ${v}`, 25, y);
          y += 6;
        });
      } else {
        doc.text(`${key}: ${value}`, 20, y);
        y += 6;
      }
    });
    doc.save(`${formData.name || "Profile"}_Profile.pdf`);
  };

  if (!userData)
    return (
      <p style={{ textAlign: "center", marginTop: 60, color: "#4a5568", fontSize: 18 }}>
        Loading Profile...
      </p>
    );

  const Section = ({ title, children }) => (
    <div style={styles.card}>
      <h2 style={styles.sectionTitle}>{title}</h2>
      {children}
    </div>
  );

  const renderField = (label, name) => (
    <div key={name}>
      <label style={styles.label}>{label}</label>
      {editable ? (
        <input
          style={styles.input}
          type="text"
          name={name}
          value={formData[name] || ""}
          onChange={handleChange}
        />
      ) : (
        <p style={styles.text}>{formData[name] || "—"}</p>
      )}
    </div>
  );

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <div style={styles.header}>
          <h1 style={styles.title}>👤 Student Profile</h1>
          <div>
            <button
              style={{ ...styles.button, ...styles.editBtn }}
              onClick={() => setEditable(!editable)}
            >
              {editable ? "Cancel" : "Edit"}
            </button>
            
            <button
              style={{ ...styles.button, background: "#16a34a", color: "#fff" }}
              onClick={downloadProfile}
            >
              Download PDF
            </button>
          </div>
        </div>

        {/* Personal Info */}
        <Section title="Personal Information">
          {[
            "name",
            "email",
            "phone",
            "dateOfBirth",
            "gender",
            "branch",
            "department",
            "year",
            "semester",
          ].map((field) =>
            renderField(field.replace(/([A-Z])/g, " $1"), field)
          )}
        </Section>

        {/* Address */}
        <Section title="Address">
          {["street", "city", "state", "pincode", "country"].map((field) => (
            <div key={field}>
              <label style={styles.label}>{field}</label>
              {editable ? (
                <input
                  style={styles.input}
                  type="text"
                  name={`currentAddress.${field}`}
                  value={formData.currentAddress?.[field] || ""}
                  onChange={handleChange}
                />
              ) : (
                <p style={styles.text}>{formData.currentAddress?.[field] || "—"}</p>
              )}
            </div>
          ))}
        </Section>

        {/* Parent Info */}
        <Section title="Parent & Guardian">
          {["fatherName", "motherName", "parentPhone", "parentEmail"].map((f) =>
            renderField(f, f)
          )}
        </Section>

        {/* Education */}
        <Section title="Previous Education">
          {["schoolName", "board", "passingYear", "percentage"].map((f) => (
            <div key={f}>
              <label style={styles.label}>{f}</label>
              {editable ? (
                <input
                  style={styles.input}
                  type="text"
                  name={`previousEducation.${f}`}
                  value={formData.previousEducation?.[f] || ""}
                  onChange={handleChange}
                />
              ) : (
                <p style={styles.text}>{formData.previousEducation?.[f] || "—"}</p>
              )}
            </div>
          ))}
        </Section>

        {/* Save Button */}
        {editable && (
          <button
            style={{ ...styles.button, ...styles.saveBtn, width: "100%", marginTop: 20 }}
            onClick={handleSave}
          >
            Save Profile
          </button>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;

