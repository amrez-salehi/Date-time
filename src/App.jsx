import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import moment from "moment-timezone";
import { FaSun, FaMoon } from "react-icons/fa";

const App = () => {
  const [theme, setTheme] = useState("light");
  const [dateTime, setDateTime] = useState({
    time: "",
    date: "",
  });
  const [worldTime, setWorldTime] = useState({});

  useEffect(() => {
    const updateLocalTime = () => {
      const now = new Date();
      setDateTime({
        time: now.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        }),
        date: now.toLocaleDateString("en-US", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
      });
    };

    updateLocalTime();
    const interval = setInterval(updateLocalTime, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fetchWorldTime = () => {
      const zones = ["America/New_York", "Europe/London", "Asia/Tehran"];
      const times = {};
      zones.forEach((zone) => {
        times[zone] = moment.tz(zone).format("hh:mm:ss A");
      });
      setWorldTime(times);
    };

    fetchWorldTime();
    const interval = setInterval(fetchWorldTime, 1000);

    return () => clearInterval(interval);
  }, []);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-center ${
        theme === "light" ? "bg-gray-50 text-gray-900" : "bg-gray-800 text-gray-100"
      }`}
    >
      <button
        className="absolute top-4 right-4 p-2 rounded-full bg-blue-500 text-white shadow-lg"
        onClick={toggleTheme}
      >
        {theme === "light" ? <FaMoon /> : <FaSun />}
      </button>

      <motion.div
        className="text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="text-7xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500">
          {dateTime.time}
        </div>
        <div className="text-2xl mb-6 font-medium text-gray-600">
          {dateTime.date}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Object.entries(worldTime).map(([zone, time]) => (
            <div
              key={zone}
              className={`p-4 rounded-lg shadow-lg ${
                theme === "light" ? "bg-gray-200 text-gray-800" : "bg-gray-700 text-white"
              }`}
            >
              <div className="font-semibold text-lg">{zone.split("/")[1]}</div>
              <div className="text-sm mt-1">{time}</div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default App;
