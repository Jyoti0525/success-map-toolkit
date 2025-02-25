// src/components/auth/SignInForm.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Checkbox } from "@/components/ui/checkbox";

export const SignInForm = ({ onClose, onSwitchToSignUp }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [authError, setAuthError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleCheckboxChange = (checked) => {
    setFormData((prev) => ({ ...prev, rememberMe: checked }));
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    
    if (!formData.password) {
      newErrors.password = "Password is required";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAuthError("");
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    try {
      // In a real app, this would be an API call
      // For demo, we'll simulate authentication with a timeout
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simulate successful login
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("user", JSON.stringify({ email: formData.email }));
      
      // Close modal and redirect to dashboard
      onClose();
      navigate("/dashboard");
      window.location.reload(); // Force reload to update auth state
    } catch (error) {
      setAuthError("Invalid email or password. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto border-navy/10">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold text-navy">Sign In</CardTitle>
        <CardDescription>
          Enter your credentials to access your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {authError && (
            <Alert variant="destructive" className="mb-4">
              <AlertDescription>{authError}</AlertDescription>
            </Alert>
          )}
          
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="name@example.com"
              value={formData.email}
              onChange={handleChange}
              className={errors.email ? "border-red-500" : "border-navy/20"}
            />
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email}</p>
            )}
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label htmlFor="password">Password</Label>
              <Button
                variant="link"
                className="text-sm text-navy p-0 h-auto font-normal"
                type="button"
              >
                Forgot password?
              </Button>
            </div>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              className={errors.password ? "border-red-500" : "border-navy/20"}
            />
            {errors.password && (
              <p className="text-sm text-red-500">{errors.password}</p>
            )}
          </div>
          
          <div className="flex items-center space-x-2 mt-4">
            <Checkbox 
              id="rememberMe" 
              checked={formData.rememberMe}
              onCheckedChange={handleCheckboxChange}
            />
            <Label htmlFor="rememberMe" className="text-sm cursor-pointer">
              Remember me for 30 days
            </Label>
          </div>
          
          <Button
            type="submit"
            className="w-full bg-navy hover:bg-navy-dark"
            disabled={isLoading}
          >
            {isLoading ? "Signing in..." : "Sign In"}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col space-y-4">
        <div className="relative w-full">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="bg-white px-2 text-gray-500">Or continue with</span>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4 w-full">
          <Button variant="outline" className="border-navy/20">
            <svg className="mr-2 h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12.0002 4.75736C14.5002 4.75736 15.5002 5.75736 16.5002 7.25736L19.5002 5.25736C17.8752 3.13236 15.5002 1.75736 12.0002 1.75736C7.25016 1.75736 3.25016 5.63236 3.25016 10.2574C3.25016 11.8824 3.75016 13.3824 4.63266 14.6324L7.75016 11.7574V11.2574C7.75016 7.75736 9.50016 4.75736 12.0002 4.75736ZM21.5002 12.7574C21.5002 11.7574 21.3752 11.0074 21.2502 10.2574H12.0002V13.7574H17.5002C17.2502 15.0074 16.2502 16.0074 15.0002 16.7574L18.0002 19.5074C20.0002 17.5074 21.5002 15.5074 21.5002 12.7574ZM12.0002 22.2574C14.7502 22.2574 17.1252 21.2574 18.7502 19.6324L15.7502 16.8824C14.7502 17.6324 13.5002 18.0074 12.0002 18.0074C9.50016 18.0074 7.37516 16.2574 6.62516 13.7574L3.50016 16.6324C5.00016 20.0074 8.25016 22.2574 12.0002 22.2574Z" />
            </svg>
            Google
          </Button>
          <Button variant="outline" className="border-navy/20">
            <svg className="mr-2 h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M16.6 5.82s-1.4-.76-2.9-.76c-2.2 0-4.4 1.54-4.4 4.2 0 2.6 2.1 3.5 2.1 3.5s-1.6.4-1.6 2.3c0 1.9 1.4 2.5 1.4 2.5s-1.9.6-3.3 2.8c-1.4 2.2.8 3.8 2.4 3.8h7.8c.9 0 1.7-.7 1.7-1.6v-9.9c0-3.5-3.9-5.1-3.9-5.1s.9-.9 1.8-1.8c.7-.7.4-1.5-.2-1.5h-3.2c-.7-.1-1.4.4-1.5 1.2l-.6 1.8s-.6 1.8.2 2.5c.1.1.2.2.2.2z" />
            </svg>
            Microsoft
          </Button>
        </div>
        
        <div className="text-center text-sm">
          Don't have an account?{" "}
          <Button
            variant="link"
            className="p-0 h-auto text-navy font-normal"
            onClick={onSwitchToSignUp}
          >
            Sign up
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};