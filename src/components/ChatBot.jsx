import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { FaPaperPlane } from "react-icons/fa";
import { RiRobot2Line } from "react-icons/ri";
import styles from "./ChatBot.module.css";
import { Typewriter } from 'react-simple-typewriter'
import getJwt from "../utils/JwtFetcher.jsx";

const ChatBot = () => {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "What brings you here today?" },
  ]);
  const predefinedQuestions = [
    "Book a charging session?",
    "Show me my bookings",
    "What's my wallet balance",
    "Nearest EV station?",
  ];
  const [userInput, setUserInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [location, setLocation] = useState(null);
  const [options, setOptions] = useState(predefinedQuestions);
  const [optionSubtype, setOptionSubtype] = useState("predefinedQuestions");
  const [selectedStation, setSelectedStation] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);

  const chatContainerRef = useRef(null);


  const handleAvailableDates = async (station) => {
    setTyping(true);
    setOptions([]);
    try {
      const response = await axios.post("https://chatbot-backend-1mld.onrender.com/api/chat/available-dates", {
        station,
      });

      const dates = response.data.availableDates || [];
      const dateOptions = dates.map((date) => date);

      setOptions(dateOptions);
      setOptionSubtype("dates");
      setSelectedStation(station);
    } catch (error) {
      console.error("Error fetching available dates:", error);
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "Sorry, I couldn't fetch the available dates right now." },
      ]);
    } finally {
      setTyping(false);
    }
  };

  const handleAvailableTimes = async (date) => {
    setTyping(true);
    setOptions([]);
    try {
      const response = await axios.post("https://chatbot-backend-1mld.onrender.com/api/chat/available-times", {
        station: selectedStation,
        date,
      });

      const times = response.data.availableTimes || [];
      const timeOptions = times.map((time) => time);

      setOptions(timeOptions);
      setOptionSubtype("times");
      setSelectedDate(date);
    } catch (error) {
      console.error("Error fetching available times:", error);
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "Sorry, I couldn't fetch the available times right now." },
      ]);
    } finally {
      setTyping(false);
    }
  };

  const handleBookTimeslot = async (time) => {
    setTyping(true);
    setOptions([]);
    try {
      const response = await axios.post("https://chatbot-backend-1mld.onrender.com/api/chat/book-timeslot", {
        station: selectedStation,
        date: selectedDate,
        time,
      });

      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: response.data.message || "Your session has been booked." },
      ]);
    } catch (error) {
      console.error("Error booking timeslot:", error);
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "Sorry, I couldn't book the session right now." },
      ]);
    } finally {
      setTyping(false);
      setSelectedStation(null);
      setSelectedDate(null);
      setSelectedTime(null);
      setOptions(predefinedQuestions);
    }
  };


  const handleNearestStation = async () => {
    setTyping(true);
    setOptions([]);
    try {
      const response = await axios.post("https://chatbot-backend-1mld.onrender.com/api/chat/nearest-stations", {
        coordinates: {
          latitude: location.latitude,
          longitude: location.longitude,
        },
      });

      const stations = response.data.nearestStations || [];
      const stationOptions = stations.map(
        (station) =>
          `${station.area}, ${station.city} - ${station.distanceInKm} km`
      );

      setOptions(stationOptions);
      setOptionSubtype("stations");
    } catch (error) {
      console.error("Error fetching nearest stations:", error);
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "Sorry, I couldn't fetch the nearest stations right now." },
      ]);
    } finally {
      setTyping(false);
    }
  };


  const handleOptionClick = async (option) => {
    setMessages((prev) => [...prev, { sender: "user", text: option }]);
    setTyping(true);
    console.log("optionSubtype", optionSubtype);
    console.log("option", option);
    try {
      if (optionSubtype === "stations") {
        await handleAvailableDates(option);
      } else if (optionSubtype === "dates") {
        await handleAvailableTimes(option);
      } else if (optionSubtype === "times") {
        await handleBookTimeslot(option);
      } else if (option.toLowerCase().includes("nearest ev station") || option.toLowerCase().includes("find ev station")) {
        console.log("nearest ev station");
        await handleNearestStation();
      } else {
        const response = await axios.post("https://chatbot-backend-1mld.onrender.com/api/chat/selected-option", {
          option,
          optionSubtype,
        });

        setMessages((prev) => [
          ...prev,
          { sender: "bot", text: response.data.message || "Thank you for your selection." },
        ]);
      }
    } catch (error) {
      console.error("Error sending selected option:", error);
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "Sorry, I couldn't process your selection. Please try again." },
      ]);
      setOptions(predefinedQuestions);
    } finally {
      setTyping(false);
    }
  };


  const handleSendMessage = async (question) => {
    if (!question && !userInput.trim()) return;

    const userMessage = { sender: "user", text: question || userInput };
    setMessages((prev) => [...prev, userMessage]);
    setUserInput("");
    setTyping(true);

    if (userInput?.toLowerCase().includes("nearest ev") || userInput.toLowerCase().includes("find ev")) {
      await handleNearestStation();
    } else {
      try {
        const response = await axios.post("https://chatbot-backend-1mld.onrender.com/api/chat/message", {
          message: question || userInput,
        });

        const botResponse = { sender: "bot", text: response.data.message };
        setMessages((prev) => [...prev, botResponse]);
      } catch (error) {
        console.error("Error sending message:", error);
        setMessages((prev) => [
          ...prev,
          { sender: "bot", text: "Sorry, something went wrong. Please try again." },
        ]);
        setOptions(predefinedQuestions);
      } finally {
        setTyping(false);
      }
    }
  };

  const getPreciseLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (err) => {
          console.error("Error fetching location:", err.message);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0,
        }
      );
    } else {
      console.error("Geolocation is not supported by your browser.");
    }
  };

  useEffect(() => {
    getPreciseLocation();
    console.log(getJwt());
  }, []);

  useEffect(() => {
    chatContainerRef.current?.scrollTo({
      top: chatContainerRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, typing]);

  return (
    // remove later outerdiv
    <div className={styles.pageContainer}>
      <div className={styles.container}>
        <div className={styles.header}>oser.ai</div>

        <div className={styles.chatBox} ref={chatContainerRef}>
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`${styles.message} ${msg.sender === "user" ? styles.userMessage : styles.botMessage
                }`}
            >
              {msg.sender !== "user" ? (
                <Typewriter
                  className={styles.botMessageIcon}
                  words={[msg.text]}
                  cursor={false}
                  cursorBlinking={false}
                  typeSpeed={25}
                  deleteSpeed={20}
                />
              ) : (
                msg.text
              )}
            </div>
          ))}

          {typing && (
            <div className={`${styles.message} ${styles.botMessage}`}>
              <RiRobot2Line className={styles.botMessageIcon} />
              <div className={styles.typingAnimation}>
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          )}
        </div>

        {options.length > 0 && (
          <div className={styles.predefinedQuestions}>
            {options.map((question, index) => (
              <button
                key={index}
                className={styles.questionButton}
                onClick={() => handleOptionClick(question)}
              >
                {question}
              </button>
            ))}
          </div>
        )}

        <div className={styles.inputBox}>
          <input
            type="text"
            placeholder="Type your message..."
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            className={styles.input}
            onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
          />
          <button
            onClick={() => handleSendMessage()}
            className={styles.sendButton}
          >
            <FaPaperPlane />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatBot;


