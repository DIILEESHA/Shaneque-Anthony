import { useState, useEffect } from "react";
import { db } from "../../../firebaseConfig"; // Adjust the path to your Firebase setup
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  writeBatch,
} from "firebase/firestore";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import { FaFilePdf } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./dashboard.css";
import { MdDelete } from "react-icons/md";
import { ClipLoader } from "react-spinners";

const Dashboard = () => {
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [error, setError] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const dummyPassword = "rsvp25";

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    if (!password) {
      alert("Password cannot be empty!");
    } else if (password !== dummyPassword) {
      alert("Incorrect password!");
    } else {
      setIsLoggedIn(true);
      setError("");
    }
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, "rsvp"));
      const entries = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setData(entries);
    } catch (error) {
      console.error("Error fetching data: ", error);
      alert("Failed to fetch data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const deleteEntry = async (entryId) => {
    if (window.confirm("Are you sure you want to delete this entry?")) {
      try {
        await deleteDoc(doc(db, "rsvp", entryId));
        setData(data.filter((entry) => entry.id !== entryId));
        toast.success("Entry deleted successfully!");
      } catch (error) {
        console.error("Error deleting entry: ", error);
        toast.error("Failed to delete the entry. Please try again.");
      }
    }
  };

  const deleteAllEntries = async () => {
    if (window.confirm("Are you sure you want to delete ALL entries?")) {
      try {
        const batch = writeBatch(db);
        const querySnapshot = await getDocs(collection(db, "rsvp"));
        querySnapshot.forEach((doc) => batch.delete(doc.ref));
        await batch.commit();
        setData([]);
        toast.success("All entries deleted successfully!");
      } catch (error) {
        console.error("Error deleting all entries: ", error);
        toast.error("Failed to delete all entries. Please try again.");
      }
    }
  };

  const downloadPDF = () => {
    const doc = new jsPDF();
    const tableData = data.map((entry) => [
      entry.fullName,
      entry.attending || "Yes, I’ll be there!", // Default value
      entry.guests,
      entry.message,
    ]);
    
    const tableHeaders = ["Full Name", "Attending", "Guests", "Message"];
    
    doc.text("RSVP Details", 14, 10);
    doc.autoTable({ head: [tableHeaders], body: tableData });
    doc.save("RSVP_Details.pdf");
  };

  useEffect(() => {
    if (isLoggedIn) {
      fetchData();
    }
  }, [isLoggedIn]);

  return (
    <div className="dashboard_container">
      {!isLoggedIn ? (
        <div className="dash">
          <form className="holla" onSubmit={handleSubmit}>
            <h1 className="gggf">Enter Password to Access Details</h1>
            <div className="input_container">
              <input
                type="password"
                value={password}
                className="dals"
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
              />
            </div>
            <button type="submit" className="submit_button">Submit</button>
          </form>
        </div>
      ) : (
        <div className="hga">
          <h2 className="eq">RSVP Details</h2>
          <div className="data_display">
            {loading ? (
              <div className="spinner-container">
                <ClipLoader loading={loading} size={50} />
              </div>
            ) : data.length > 0 ? (
              <>
                <div className="action_buttons">
                  <button className="download_button" onClick={downloadPDF}>
                    Download PDF <FaFilePdf className="pdf" />
                  </button>
                  <button className="delete_all_button" onClick={deleteAllEntries}>
                    Delete All Entries <MdDelete />
                  </button>
                </div>
                <table className="data_table">
                  <thead>
                    <tr>
                      <th>Full Name</th>
                      <th>Attending</th>
                      <th>Guests</th>
                      <th>Message</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((entry) => (
                      <tr key={entry.id}>
                        <td>{entry.fullName}</td>
                        <td>{entry.attending || "Yes, I’ll be there!"}</td>
                        <td>{entry.guests}</td>
                        <td>{entry.specialMessage}</td>
                        <td>
                          <button className="delete_button" onClick={() => deleteEntry(entry.id)}>
                            <MdDelete />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </>
            ) : (
              <p className="kollo">No RSVP responses available at the moment.</p>
            )}
          </div>
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default Dashboard;
