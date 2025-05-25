import { useAuth } from "@/hooks/useAuth";
import { useEffect } from "react";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export default function AuthModal({ isOpen, onClose, onSuccess }: AuthModalProps) {
  const { signInWithGoogle, currentUser } = useAuth();

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      console.error("Google sign in failed:", error);
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
            Sign in with your Google account to unlock the full profile, download resources, and get personalized content.
          </p>
          
          <div className="space-y-4">
            <button 
              onClick={handleGoogleSignIn}
              className="w-full flex items-center justify-center px-6 py-3 border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="w-5 h-5 mr-3" />
              <span className="text-gray-800 dark:text-gray-200 font-medium">Sign in with Google</span>
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
              <i className="ri-shield-check-line text-primary-600 dark:text-primary-500 mr-3 text-xl mt-0.5"></i>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Your information is securely handled in accordance with our privacy policy. We'll send you a personalized badge as a token of appreciation.
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
