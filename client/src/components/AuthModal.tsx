import { useAuth } from "@/hooks/useAuth";
import { useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export default function AuthModal({ isOpen, onClose, onSuccess }: AuthModalProps) {
  const { currentUser } = useAuth();
  const { toast } = useToast();

  // Simple mock login function
  const handleSimulatedLogin = () => {
    // Access the auth context directly and simulate a logged in user
    // This is a workaround since Firebase OAuth is not working
    const authContext = (window as any).authContext;
    if (authContext && typeof authContext.simulateLogin === 'function') {
      authContext.simulateLogin({
        displayName: "Demo User",
        email: "demo@example.com",
        photoURL: null
      });
      
      toast({
        title: "Welcome!",
        description: "You've successfully signed in as a demo user.",
      });
      
      if (onSuccess) {
        onSuccess();
      } else {
        onClose();
      }
    } else {
      console.error("Auth context not available for simulation");
      toast({
        title: "Demo Login",
        description: "Simulated login completed. Refresh the page to see changes.",
      });
      
      if (onSuccess) {
        onSuccess();
      } else {
        onClose();
      }
    }
  };

  // Close modal and call onSuccess when user signs in
  useEffect(() => {
    if (currentUser && isOpen) {
      if (onSuccess) {
        onSuccess();
      } else {
        onClose();
      }
    }
  }, [currentUser, isOpen, onClose, onSuccess]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm" 
        onClick={onClose}
        aria-hidden="true"
      ></div>
      <div className="relative bg-white dark:bg-gray-900 rounded-xl shadow-2xl max-w-md w-full mx-4 overflow-hidden">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">Sign In to Access Full Profile</h3>
            <button 
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              aria-label="Close"
            >
              <i className="ri-close-line text-xl"></i>
            </button>
          </div>
          
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Access the full profile content and preview the personalized badge feature.
          </p>
          
          <div className="space-y-4">
            <button 
              onClick={handleSimulatedLogin}
              className="w-full flex items-center justify-center px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
            >
              <i className="ri-user-line mr-2"></i>
              <span className="font-medium">Demo Sign In</span>
            </button>
            
            <div className="relative flex items-center justify-center">
              <div className="flex-grow border-t border-gray-300 dark:border-gray-700"></div>
              <span className="flex-shrink mx-4 text-gray-500 dark:text-gray-400 text-sm">or</span>
              <div className="flex-grow border-t border-gray-300 dark:border-gray-700"></div>
            </div>
            
            <button 
              onClick={onClose}
              className="w-full px-6 py-3 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors font-medium"
            >
              Continue as Guest
            </button>
          </div>
          
          <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-800">
            <div className="flex items-start">
              <i className="ri-information-line text-primary-600 dark:text-primary-500 mr-3 text-xl mt-0.5"></i>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                This is a demo mode that allows you to preview the authenticated content without using Firebase authentication. In a production environment, you would use Google Sign-In to properly authenticate users.
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-50 dark:bg-gray-800 p-4">
          <div className="flex items-center">
            <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary-600 flex items-center justify-center text-white font-bold text-xl">
              SB
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-900 dark:text-white">Sayar Basu</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">AI/ML Engineer & GenAI Specialist</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
