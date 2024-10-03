import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import { Bricolage_Grotesque } from "next/font/google";
import { Space_Mono } from "next/font/google";
import { PragatiSnackbar } from "@/components/snackbar";

const fontHeading = Bricolage_Grotesque({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-heading",
});

const fontBody = Space_Mono({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-body",
});

export default function QuizPage() {
  const router = useRouter();
  const { stage } = router.query;
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentStreak, setCurrentStreak] = useState(0);
  const [totalScore, setTotalScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(15);
  const [isGameOver, setIsGameOver] = useState(false);
  const [totalTime, setTotalTime] = useState(0);
  const [startTime, setStartTime] = useState(null);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(null);
  const [correctOptionIndex, setCorrectOptionIndex] = useState(null);
  const [showAnswerFeedback, setShowAnswerFeedback] = useState(false);
  const [error, setError] = useState("");
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [isRunning, setIsRunning] = useState(true);
  const progressBarRef = useRef(null);
  const startTimeRef = useRef(null);

  useEffect(() => {
    if (stage) {
      const fetchQuestions = async () => {
        const response = await fetch("/questions.json");
        const data = await response.json();
        const allQuestions = data.questions[stage];
        const shuffledQuestions = allQuestions.sort(() => 0.5 - Math.random());
        const randomQuestions = shuffledQuestions.slice(0, 5);
        setQuestions(randomQuestions);
        setStartTime(Date.now());
      };
      fetchQuestions();
    }
  }, [stage]);

  useEffect(() => {
    if (timeLeft === 0) {
      if (showAnswerFeedback) {
        handleNextQuestion();
      } else {
        setCorrectOptionIndex(
          currentQuestion.options.findIndex((opt) => opt.isCorrect)
        );
        setShowAnswerFeedback(true);
        setTimeLeft(5);
        setIsRunning(true);
      }
    } else {
      const timerId = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timerId);
    }
  }, [timeLeft]);

  useEffect(() => {
    const updateProgressBar = () => {
      if (isRunning) {
        const currentTime = Date.now();
        const elapsed = (currentTime - startTimeRef.current) / 1000;
        const remaining = Math.max(timeLeft - elapsed, 0);

        if (progressBarRef.current) {
          progressBarRef.current.style.transform = `scaleX(${remaining / 15})`;
        }

        if (remaining <= 0) {
          setIsRunning(false);
        } else {
          requestAnimationFrame(updateProgressBar);
        }
      }
    };

    if (isRunning) {
      startTimeRef.current = Date.now();
      requestAnimationFrame(updateProgressBar);
    }

    return () => {
      setIsRunning(false);
    };
  }, [isRunning, timeLeft]);

  const handleOptionClick = (isCorrect, score, index) => {
    setSelectedOptionIndex(index);
    setCorrectOptionIndex(
      currentQuestion.options.findIndex((opt) => opt.isCorrect)
    );
    if (isCorrect) {
      setCurrentStreak((prev) => prev + 1);
      setTotalScore((prev) => prev + score);
    } else {
      setCurrentStreak(0);
    }

    setShowAnswerFeedback(true);
    setTimeLeft(5);
    setIsRunning(true);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setTimeLeft(15);
      setIsRunning(true);
      setSelectedOptionIndex(null);
      setCorrectOptionIndex(null);
      setShowAnswerFeedback(false);
    } else {
      const endTime = Date.now();
      setTotalTime((endTime - startTime - 25000) / 1000);
      setTotalScore(totalScore + currentStreak);
      setIsGameOver(true);
    }
  };

  if (isGameOver) {
    setTimeout(async () => {
      try {
        const username = localStorage.getItem("username");
        const response = await fetch("/api/pragati", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            action: "update",
            data: {
              username,
              score: totalScore,
              time: totalTime,
            },
          }),
        });

        if (!response.ok) {
          setError("Failed to update score");
          setShowSnackbar(true);
        } else {
          const stage_response = await fetch("/api/updateStage", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username }),
          });

          if (stage_response.ok) {
            router.push("/pragati/#timeline");
          } else {
            setError("Failed to update stage");
            setShowSnackbar(true);
          }
        }
      } catch (error) {
        setError("Failed to update record");
        setShowSnackbar(true);
        console.error("Failed to update record:", error);
      }
    }, 10000);

    return (
      <div
        className={`bg-[hsl(210,100%,6%)] text-[hsl(180,100%,90%)] min-h-screen items-center justify-center flex flex-col ${fontBody.variable} ${fontHeading.variable}`}
      >
        <h1 className="text-3xl font-bold mb-2">{`${stage} Complete!`}</h1>
        <h1 className="text-2xl font-bold mb-3">Great Work!!</h1>
        <p>Your Score: {totalScore}</p>
        <p>Total Time Taken: {totalTime} seconds</p>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="min-h-screen bg-[hsl(210,100%,6%)] text-[hsl(180,100%,90%)] flex items-center justify-center">
        <p className="text-2xl font-bold">Loading Questions...</p>
      </div>
    );
  }

  const closeSnackbar = () => {
    setShowSnackbar(false);
  };

  const currentQuestion = questions[currentQuestionIndex];

  document.addEventListener("keydown", (event) => {
    if (
      event.key === "F5" ||
      (event.ctrlKey && event.key === "r") ||
      (event.ctrlKey && event.shiftKey && event.key === "r")
    ) {
      event.preventDefault();
    }
  });

  document.addEventListener("contextmenu", (event) => event.preventDefault());

  return (
    <div
      className={`bg-[hsl(210,100%,6%)] text-[hsl(180,100%,90%)] min-h-screen flex flex-col ${fontBody.variable} ${fontHeading.variable}`}
      style={{
        fontFamily: "var(--font-body)",
      }}
    >
      {showSnackbar && (
        <PragatiSnackbar
          message={error}
          onClose={closeSnackbar}
          bgColor="black"
        />
      )}
      <div className="container max-w-6xl w-full flex-1 flex flex-col justify-center">
        <div className="bg-[hsl(210,100%,12%)] rounded-2xl overflow-hidden">
          <div className="p-6 flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <div className="flex flex-col gap-1">
                <h2
                  className="text-2xl font-bold"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  {currentQuestion.question}
                </h2>
                <p
                  className="text-[hsl(180,100%,90%)]"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  {currentQuestion.question_kannada}
                </p>
              </div>
              <div className="bg-[hsl(200,100%,28%)] text-[hsl(180,100%,90%)] px-3 py-1 rounded-full text-sm font-medium text-center">
                {`${currentQuestion.score} pts`}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {currentQuestion.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() =>
                    handleOptionClick(
                      option.isCorrect,
                      currentQuestion.score,
                      index
                    )
                  }
                  className={`bg-[hsl(180,100%,90%)]/10 bg-[hsl(180,100%,90%)]/20 rounded-2xl px-4 py-3 text-left hover:bg-[hsl(180,100%,90%)]/20 hover:bg-[hsl(180,100%,90%)]/30 transition-colors  ${
                    showAnswerFeedback && correctOptionIndex === index
                      ? "bg-green-700"
                      : ""
                  } ${
                    showAnswerFeedback &&
                    selectedOptionIndex === index &&
                    !option.isCorrect
                      ? "bg-red-600"
                      : ""
                  }`}
                >
                  <div className="font-medium">{option.answer}</div>
                </button>
              ))}
            </div>
          </div>
          <div className="bg-[hsl(180,100%,90%)]/10 bg-[hsl(180,100%,90%)]/20 px-6 py-4 ">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="bg-[hsl(200,100%,28%)] text-[hsl(180,100%,90%)] px-3 py-1 rounded-full text-sm font-medium">
                  Current Streak: {currentStreak}
                </div>
                <div className="text-[hsl(180,100%,90%)] text-sm">
                  Question {currentQuestionIndex + 1} / {questions.length}
                </div>
              </div>
              <div className="text-[hsl(180,100%,90%)] text-sm">
                Time Left: {timeLeft}s
              </div>
            </div>
            {showAnswerFeedback && correctOptionIndex !== null && (
              <div className="mt-2 pl-2 text-[hsl(180,100%,90%)] text-md justify-center items-center">
                Correct Answer:{" "}
                <span className="text-md">
                  {currentQuestion.options[correctOptionIndex].answer}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="w-full h-3 bg-[hsl(210,100%,90%)]/20 bg-[hsl(210,100%,90%)]/30 mt-4">
        <div
          ref={progressBarRef}
          className="h-full bg-[hsl(180,100%,90%)] transition-transform duration-100 ease-linear"
          style={{
            transformOrigin: "left",
          }}
        />
      </div>
    </div>
  );
}
