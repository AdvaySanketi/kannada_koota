import { useState } from "react";
import { useRouter } from "next/router";
import { Card, CardContent, CardFooter } from "@/components/card";
import { Label } from "@/components/label";
import { Input } from "@/components/input";
import { Button } from "@/components/button";
import { PragatiSnackbar } from "@/components/snackbar";
import axios from "axios";

export const PragatiModal = ({ onClose }) => {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const [showSnackbar, setShowSnackbar] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username) {
      setError("Username is required");
      setShowSnackbar(true);
      return;
    }

    const response = await fetch("/api/pragati", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        action: "add",
        data: {
          username: username,
          score: 0,
          time: 0,
        },
      }),
    });

    if (!response.ok) {
      setError("Username Taken");
      setShowSnackbar(true);
      return;
    }

    handleModalSubmit({ username });
  };

  const handleModalSubmit = async ({ username }) => {
    try {
      const response = await fetch("/api/recordUser", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username }),
      });

      if (response.ok) {
        localStorage.setItem("username", username);
        onClose();
      } else {
        setError("Failed to record username");
        setShowSnackbar(true);
      }
    } catch (error) {
      console.error("Failed to add record:", error);
    }
  };

  const closeSnackbar = () => {
    setShowSnackbar(false);
  };

  const handleBackdropClick = (e) => {
    e.stopPropagation();
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50"
      onClick={handleBackdropClick}
    >
      <div
        className="bg-gradient-to-br from-[#0F172A] to-[#1E293B] rounded-lg shadow-lg max-w-sm w-full p-6"
        onClick={(e) => e.stopPropagation()}
      >
        {showSnackbar && (
          <PragatiSnackbar
            message={error}
            onClose={closeSnackbar}
            bgColor="black"
          />
        )}
        <div className="text-center mb-6">
          <img src="/kkLogo.jpg" className="h-12 mx-auto mb-3" alt="Logo" />
          <h1 className="text-2xl font-semibold text-white">
            Claim your username, Time Traveller!
          </h1>
        </div>
        <Card className="bg-gray-700">
          <CardContent className="space-y-4">
            <div className="space-y-2 mt-5">
              <Label htmlFor="username" className="text-white">
                Username
              </Label>
              <Input
                id="username"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button
              variant="secondary"
              className="w-full bg-gradient-to-br from-[#0F172A] to-[#1E293B] text-white"
              onClick={handleSubmit}
            >
              Start Quiz
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};
