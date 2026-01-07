import { useState, useEffect } from "react";
import { db } from "../../../firebaseConfig";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./rsvp.css";

const RSVPForm = () => {
  // 🔓 RSVP OPEN
  const isRSVPOpen = true;

  const [fullName, setFullName] = useState("");
  const [attending, setAttending] = useState("Yes");
  const [guests, setGuests] = useState("1");
  const [dietaryRestrictions, setDietaryRestrictions] = useState("");
  const [specialMessage, setSpecialMessage] = useState("");
  const [rsvpResponses, setRSVPResponses] = useState([]);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchRSVPs = async () => {
      try {
        const snapshot = await getDocs(collection(db, "rsvp"));
        const data = snapshot.docs.map((doc) => doc.data());
        setRSVPResponses(data);
      } catch {
        toast.error("Failed to load RSVPs");
      }
    };
    fetchRSVPs();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    let newErrors = {};
    if (!fullName.trim()) newErrors.fullName = "Full name is required";
    if (attending === "Yes" && guests < 1)
      newErrors.guests = "Guests required";

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    try {
      await addDoc(collection(db, "rsvp"), {
        fullName,
        attending,
        guests: attending === "Yes" ? guests : "0",
        dietaryRestrictions,
        specialMessage,
        createdAt: new Date(),
      });

      toast.success("RSVP submitted successfully 🎉");

      setFullName("");
      setAttending("Yes");
      setGuests("1");
      setDietaryRestrictions("");
      setSpecialMessage("");
      setErrors({});
    } catch {
      toast.error("Submission failed");
    }
  };

  return (
    <div className="guest">
      <ToastContainer />

      {!isRSVPOpen ? (
        <div className="rsvp_closed">
          <h2 className="guest_title">RSVP is Closed</h2>
          <p className="guest_para">Thank you for your interest</p>
        </div>
      ) : (
        <form className="rsvp_form" onSubmit={handleSubmit}>
          <h2 className="rsvp_title">RSVP</h2>

          <div className="rsvp_field">
            <input
              className="rsvp_input"
              type="text"
              placeholder="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
            {errors.fullName && (
              <span className="rsvp_error">{errors.fullName}</span>
            )}
          </div>

          <div className="rsvp_field">
            <select
              className="rsvp_select"
              value={attending}
              onChange={(e) => setAttending(e.target.value)}
            >
              <option value="Yes">Yes, I will attend</option>
              <option value="No">Sorry, I can’t make it</option>
            </select>
          </div>

          {attending === "Yes" && (
            <>
              <div className="rsvp_field">
                <input
                  className="rsvp_input"
                  type="number"
                  min="1"
                  placeholder="Number of Guests"
                  value={guests}
                  onChange={(e) => setGuests(e.target.value)}
                />
                {errors.guests && (
                  <span className="rsvp_error">{errors.guests}</span>
                )}
              </div>

              <div className="rsvp_field">
                <input
                  className="rsvp_input"
                  type="text"
                  placeholder="Dietary Restrictions"
                  value={dietaryRestrictions}
                  onChange={(e) =>
                    setDietaryRestrictions(e.target.value)
                  }
                />
              </div>

              <div className="rsvp_field">
                <textarea
                  className="rsvp_textarea"
                  placeholder="Special Message"
                  value={specialMessage}
                  onChange={(e) =>
                    setSpecialMessage(e.target.value)
                  }
                />
              </div>
            </>
          )}

          <button type="submit" className="rsvp_button">
            Submit RSVP
          </button>
        </form>
      )}
    </div>
  );
};

export default RSVPForm;
