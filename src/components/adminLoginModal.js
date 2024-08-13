import { useState } from "react";
import { useRouter } from "next/router";
import { Card, CardContent, CardFooter } from "@/components/card";
import { Label } from "@/components/label";
import { Input } from "@/components/input";
import { Button } from "@/components/button";
import { Snackbar } from "@/components/snackbar";
import axios from "axios";

export const AdminLoginModal = ({ onClose }) => {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showSnackbar, setShowSnackbar] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("/api/admin", { username, password });
      if (response.status == 200) {
        const loginTime = new Date().getTime();
        localStorage.setItem("loggedIn", "true");
        localStorage.setItem("loginTime", loginTime);
        router.push("/dashboard");
        onClose();
      } else {
        setError(response?.data?.error || "An error occurred");
        setShowSnackbar(true);
      }
    } catch (err) {
      console.error("Error logging in:", err);
      setError(err.response?.data?.error || "An error occurred");
      setShowSnackbar(true);
    }
  };

  const closeSnackbar = () => {
    setShowSnackbar(false);
  };

  const handleBackdropClick = (e) => {
    e.stopPropagation();
    onClose();
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50"
      onClick={handleBackdropClick}
    >
      <div
        className="bg-gray-100 dark:bg-gradient-to-br from-[#0F172A] to-[#1E293B] rounded-lg shadow-lg max-w-sm w-full p-6"
        onClick={(e) => e.stopPropagation()}
      >
        {showSnackbar && (
          <Snackbar message={error} onClose={closeSnackbar} bgColor="red" />
        )}
        <div className="text-center mb-6">
          <img src="/kkLogo.jpg" className="h-12 mx-auto mb-3" alt="Logo" />
          <h1 className="text-3xl font-semibold text-primary">Admin Login</h1>
        </div>
        <Card className="bg-[#f9fafc] dark:bg-gray-700">
          <CardContent className="space-y-4">
            <div className="space-y-2 mt-5">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button
              variant="secondary"
              className="w-full dark:bg-gradient-to-br from-[#0F172A] to-[#1E293B] dark:text-white"
              onClick={handleLogin}
            >
              Login
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};
