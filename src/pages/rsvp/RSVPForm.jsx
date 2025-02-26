import { useState, useEffect } from "react";
import { db, collection, addDoc, getDocs } from "../../../firebaseConfig";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./rsvp.css";

const RSVPForm = () => {
  const [fullName, setFullName] = useState("");
  const [attending, setAttending] = useState("Yes");
  const [guests, setGuests] = useState("0");
  const [dietaryRestrictions, setDietaryRestrictions] = useState("");
  const [specialMessage, setSpecialMessage] = useState("");
  const [rsvpResponses, setRSVPResponses] = useState([]);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchRSVPs = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "rsvp"));
        const responses = querySnapshot.docs.map((doc) => doc.data());
        setRSVPResponses(responses);
      } catch (error) {
        toast.error("Error fetching RSVP responses.");
      }
    };
    fetchRSVPs();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let newErrors = {};
    if (!fullName.trim()) newErrors.fullName = "Full Name is required!";
    if (!attending) newErrors.attending = "Please select attendance status!";
    if (attending === "Yes" && (!guests.trim() || guests < 1))
      newErrors.guests = "Number of guests is required!";
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    try {
      await addDoc(collection(db, "rsvp"), {
        fullName,
        attending,
        guests: attending === "Yes" ? guests : "0",
        dietaryRestrictions: attending === "Yes" ? dietaryRestrictions : "",
        specialMessage: attending === "Yes" ? specialMessage : "",
      });

      setRSVPResponses([
        ...rsvpResponses,
        { fullName, attending, guests, dietaryRestrictions, specialMessage },
      ]);

      toast.success("Your RSVP has been submitted! 🎉");

      setFullName("");
      setAttending("");
      setGuests("");
      setDietaryRestrictions("");
      setSpecialMessage("");
      setErrors({});
    } catch (error) {
      toast.error("Error submitting RSVP. Please try again!");
    }
  };

  return (
    <div className="guest">
      <ToastContainer position="top-right" autoClose={3000} />
      <h2 className="guest_title">You're Invited! 🎉</h2>
      <p className="rsvp_para">Join us for an unforgettable experience in the stunning landscapes of Jamaica.</p>

      <div className="hj">
        <form onSubmit={handleSubmit} className="guest_form">
          <div className="input_section">
            <label className="input_label">Full Name</label>
            <input
              type="text"
              className="form_input"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
            {errors.fullName && (
              <span className="error">{errors.fullName}</span>
            )}
          </div>

          <div className="input_section">
            <label className="input_label">Will You Be Attending?</label>
            <div className="albert">
              <label>
                <input
                  type="radio"
                  name="attending"
                  className="kk"
                  value="Yes"
                  checked={attending === "Yes"}
                  onChange={(e) => setAttending(e.target.value)}
                />
                Yes, I’ll be there!
              </label>
              <label>
                <input
                  type="radio"
                  className="kk"
                  name="attending"
                  value="No"
                  checked={attending === "No"}
                  onChange={(e) => setAttending(e.target.value)}
                />
                No, I can’t make it.
              </label>
            </div>
            {errors.attending && (
              <span className="error">{errors.attending}</span>
            )}
          </div>

          {attending === "Yes" && (
            <>
              <div className="input_section">
                <label className="input_label">
                  Number of Guests Attending
                </label>
                <input
                  type="number"
                  className="form_input"
                  min="1"
                  value={guests}
                  onChange={(e) => setGuests(e.target.value)}
                />
                {errors.guests && (
                  <span className="error">{errors.guests}</span>
                )}
              </div>

              <div className="input_section">
                <label className="input_label">
                  Dietary Restrictions or Allergies
                </label>
                <input
                  type="text"
                  className="form_input"
                  value={dietaryRestrictions}
                  onChange={(e) => setDietaryRestrictions(e.target.value)}
                />
              </div>

              <div className="input_section">
                <label className="input_label">Special Message</label>
                <textarea
                  className="input_textarea"
                  value={specialMessage}
                  onChange={(e) => setSpecialMessage(e.target.value)}
                ></textarea>
              </div>
            </>
          )}

          <button className="submitter">Submit RSVP</button>
        </form>
      </div>
    </div>
  );
};

export default RSVPForm;
