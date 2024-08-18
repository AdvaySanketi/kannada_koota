import * as React from "react";
import { Button } from "@/components/button";

export const SettingsModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-lg font-semibold mb-4">Settings</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Settings have not yet been added
            </label>
            <label className="block text-sm font-medium text-gray-700">
              If you have any specific settings or requirements in mind, please
              let me know @ advay2807@gmail.com
            </label>
          </div>
        </div>
        <div className="mt-6 flex justify-end">
          <Button onClick={onClose} variant="outline">
            Close
          </Button>
        </div>
      </div>
    </div>
  );
};
