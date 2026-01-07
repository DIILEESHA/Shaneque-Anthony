import { useState, useEffect } from "react";
import { db } from "../../../firebaseConfig";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./rsvp.css";

const RSVPForm = () => {
  // 🔓 RSVP OPEN FLAG
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
        const querySnapshot = await getDocs(collection(db, "rsvp"));
        const responses = querySnapshot.docs.map((doc) => doc.data());
        setRSVPResponses(responses);
      } catch (error) {
        toast.error("Error fetching RSVP responses");
      }
    };
    fetchRSVPs();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    let newErrors = {};
    if (!fullName.trim()) newErrors.fullName = "Full Name is required";
    if (attending === "Yes" && (!guests || guests < 1)) {
      newErrors.guests = "Please enter number of guests";
    }

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    try {
      await addDoc(collection(db, "rsvp"), {
        fullName,
        attending,
        guests: attending === "Yes" ? guests : "0",
        dietaryRestrictions: attending === "Yes" ? dietaryRestrictions : "",
        specialMessage: attending === "Yes" ? specialMessage : "",
        createdAt: new Date(),
      });

      setRSVPResponses([
        ...rsvpResponses,
        { fullName, attending, guests, dietaryRestrictions, specialMessage },
      ]);

      toast.success("RSVP submitted successfully 🎉");

      setFullName("");
      setAttending("Yes");
      setGuests("1");
      setDietaryRestrictions("");
      setSpecialMessage("");
      setErrors({});
    } catch (error) {
      toast.error("Error submitting RSVP");
    }
  };

  return (
    <div className="guest">
      <ToastContainer />

      {!isRSVPOpen ? (
        <>
          <h2 className="guest_title">RSVP is closed</h2>
          <p className="guest_para">Thank you for your interest!</p>
        </>
      ) : (
        <form className="guest_form" onSubmit={handleSubmit}>
          <h2 className="guest_title">RSVP</h2>

          <input
            type="text"
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
          {errors.fullName && (
            <p className="error">{errors.fullName}</p>
          )}

          <select
            value={attending}
            onChange={(e) => setAttending(e.target.value)}
          >
            <option value="Yes">Yes, I will attend</option>
            <option value="No">Sorry, I can’t make it</option>
          </select>

          {attending === "Yes" && (
            <>
              <input
                type="number"
                min="1"
                placeholder="Number of Guests"
                value={guests}
                onChange={(e) => setGuests(e.target.value)}
              />
              {errors.guests && (
                <p className="error">{errors.guests}</p>
              )}

              <input
                type="text"
                placeholder="Dietary Restrictions"
                value={dietaryRestrictions}
                onChange={(e) =>
                  setDietaryRestrictions(e.target.value)
                }
              />

              <textarea
                placeholder="Special Message"
                value={specialMessage}
                onChange={(e) =>
                  setSpecialMessage(e.target.value)
                }
              />
            </>
          )}

          <button type="submit">Submit RSVP</button>
        </form>
      )}
    </div>
  );
};

export default RSVPForm;
