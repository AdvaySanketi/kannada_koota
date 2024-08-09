import { useState } from "react";
import { Card, CardContent, CardFooter } from "@/components/card";
import { Label } from "@/components/label";
import { Input } from "@/components/input";
import { Button } from "@/components/button";
import { Snackbar } from "@/components/snackbar";

export const AdminLoginModal = ({ onClose, onAuthenticate }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showSnackbar, setShowSnackbar] = useState(false);

  const handleLogin = () => {
    if (!username || !password) {
      setError("Please enter your username and password.");
      setShowSnackbar(true);
      return;
    }

    if (username === "admin" && password === "0909") {
      onAuthenticate();
      onClose();
    } else {
      setError("Invalid username or password.");
      setShowSnackbar(true);
    }
  };

  const closeSnackbar = () => {
    setShowSnackbar(false);
  };

  // Handle click on the backdrop to close the modal
  const handleBackdropClick = (e) => {
    e.stopPropagation(); // Prevent click event from bubbling up to the backdrop
    onClose(); // Close the modal
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50"
      onClick={handleBackdropClick} // Close the modal when clicking outside
    >
      <div
        className="bg-gray-100 dark:bg-gradient-to-br from-[#0F172A] to-[#1E293B] rounded-lg shadow-lg max-w-sm w-full p-6"
        onClick={(e) => e.stopPropagation()} // Prevent click event from bubbling up
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
