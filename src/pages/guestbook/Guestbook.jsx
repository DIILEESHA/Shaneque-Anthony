import "./guest.css";
import { useState, useEffect } from "react";
import { db, collection, addDoc, getDocs } from "../../../firebaseConfig";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Guestbook = () => {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [guestMessages, setGuestMessages] = useState([]);
  const [errors, setErrors] = useState({ name: "", message: "" });

  // Fetch messages from Firestore
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "guestbook"));
        const messages = querySnapshot.docs.map((doc) => doc.data());
        setGuestMessages(messages);
      } catch (error) {
        toast.error("Error fetching messages.");
      }
    };
    fetchMessages();
  }, []);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    let newErrors = { name: "", message: "" };
    if (!name.trim()) newErrors.name = "Name is required!";
    if (!message.trim()) newErrors.message = "Message is required!";
    setErrors(newErrors);

    if (newErrors.name || newErrors.message) return;

    try {
      await addDoc(collection(db, "guestbook"), { name, message });
      setGuestMessages([...guestMessages, { name, message }]);
      toast.success("Your message has been added! 🎉");

      // Clear form
      setName("");
      setMessage("");
      setErrors({ name: "", message: "" });
    } catch (error) {
      toast.error("Error adding message. Please try again!");
    }
  };

  return (
    <div className="guest">
      <ToastContainer position="top-right" autoClose={3000} />
      <h2 className="guest_title">Share Your Love & Wishes!</h2>
      <p className="guest_para">
        We would love to hear from you! Leave a heartfelt message, words of
        wisdom, or well wishes as we celebrate our special day.
      </p>

      <div className="hj">
        <form onSubmit={handleSubmit} className="guest_form">
          <div className="input_section">
            <label className="input_label">Your Name</label>
            <input
              type="text"
              className="form_input"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {errors.name && <span className="error">{errors.name}</span>}
          </div>

          <div className="input_section">
            <label className="input_label">Your Message</label>
            <textarea
              className="input_textarea"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            ></textarea>
            {errors.message && <span className="error">{errors.message}</span>}
          </div>

          <button className="submitter">Submit a Wish</button>
        </form>
      </div>

      {/* Display Guest Messages */}
      <div className="guest_messages">
        <h3 className="hg"> Guest Messages</h3>
        {guestMessages.length > 0 ? (
          guestMessages.map((msg, index) => (
            <div key={index} className="message_card">
              <div className="jhh">
                <h4 className="gg">{msg.name}:</h4>
                <p className="guest_message">{msg.message}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="prba">
            No messages yet. Be the first to share your wishes! 🎉
          </p>
        )}
      </div>
    </div>
  );
};

export default Guestbook;
