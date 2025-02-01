import React, { useState, useEffect } from "react";
import "./App.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Options from "./Options";
import confetti from "canvas-confetti";

const App = () => {
  const [questions, setQuestions] = useState([]);
  const [data, setData] = useState([]);
  const [timeLeft, setTimeLeft] = useState(200);
  const [selected, setSelected] = useState(false);
  const [score, setScore] = useState(0);

  const fireConfetti = () => {
    confetti({
      particleCount: 200,
      spread: 80,
      origin: { y: 0.8 },
      colors: ["#f9f", "#f80", "#2ef"],
    });
  };

  useEffect(() => {
    fetch("http://localhost:5000/api/data")
      .then((response) => response.json())
      .then((data) => {
        setQuestions(data.questions);
        setData(data);
      })
      .catch((error) => console.error("Error:", error));
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev === 0) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds) =>
    `${Math.floor(seconds / 60)}:${(seconds % 60).toString().padStart(2, "0")}`;

  const settings = {
    speed: 500,
    infinite: false,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const handleData = (data) => {
    setSelected(data);
    if (selected === true) {
      setScore(score + 1);
    } else {
      fireConfetti();
      setScore(score - 1);
    }
  };

  return (
    <div className="question-container">
      <div className="desc">
        {formatTime(timeLeft)}
        <h2>{data.topic}</h2>
        <p>{data.title}</p>
      </div>

      <Slider {...settings}>
        {questions.map((prev) => {
          return (
            <div className="questions">
              <h2 className="question">
                {prev.description} key={prev.id}
              </h2>

              <div className="options">
                {prev.options.map((option) => (
                  <Options
                    key={option.id}
                    id={option.id}
                    is_true={option.is_correct}
                    description={option.description}
                    correct={handleData}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </Slider>
      <p className="score">{score == 0 ? 0 : score}</p>

      {selected ? (
        <p className="ans">Correct answer! 🎉</p>
      ) : (
        <p className="ans">Wrong Answer 😔</p>
      )}
    </div>
  );
};

export default App;
