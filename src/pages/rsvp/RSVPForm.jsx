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
      <div className="guest">
      <h2 className="guest_title">RSVP is closed.</h2>
      <p className="guest_para">Thank you for your interest!</p>
    </div>
    </div>
  );
};

export default RSVPForm;
