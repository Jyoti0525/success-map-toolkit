// src/components/auth/AuthModal.tsx
import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { SignInForm } from "./SignInForm";
import { SignUpForm } from "./SignUpForm";

export const AuthModal = ({ isOpen, onClose, initialView = "signin" }) => {
  const [view, setView] = useState(initialView);
  
  const handleClose = () => {
    // Reset to initial view when closing
    setView(initialView);
    onClose();
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md p-0 gap-0">
        {view === "signin" ? (
          <SignInForm 
            onClose={handleClose} 
            onSwitchToSignUp={() => setView("signup")} 
          />
        ) : (
          <SignUpForm 
            onClose={handleClose} 
            onSwitchToSignIn={() => setView("signin")} 
          />
        )}
      </DialogContent>
    </Dialog>
  );
};