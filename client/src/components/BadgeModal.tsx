import { useAuth } from "@/hooks/useAuth";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface BadgeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function BadgeModal({ isOpen, onClose }: BadgeModalProps) {
  const { currentUser } = useAuth();
  const { toast } = useToast();
  const [isDownloading, setIsDownloading] = useState(false);
  const [isSharing, setIsSharing] = useState(false);
  
  // Generate a random badge ID
  const badgeId = `AIML${Math.floor(1000 + Math.random() * 9000)}`;

  const handleDownload = async () => {
    try {
      setIsDownloading(true);
      
      // Simulate download delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Badge Downloaded",
        description: "Your badge has been downloaded successfully!",
      });
    } catch (error) {
      toast({
        title: "Download Failed",
        description: "Failed to download your badge. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsDownloading(false);
    }
  };

  const handleShare = async () => {
    try {
      setIsSharing(true);
      
      // Simulate sharing delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Badge Shared",
        description: "Your badge has been shared successfully!",
      });
    } catch (error) {
      toast({
        title: "Sharing Failed",
        description: "Failed to share your badge. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSharing(false);
    }
  };

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
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">Your Custom Badge</h3>
            <button 
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              aria-label="Close"
            >
              <i className="ri-close-line text-xl"></i>
            </button>
          </div>
          
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Thank you for visiting my profile! Here's your personalized badge as a token of appreciation.
          </p>
          
          <div className="flex justify-center mb-6">
            <div className="relative w-64 h-64 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg shadow-lg flex flex-col items-center justify-center p-4">
              <div className="absolute -top-3 -right-3 bg-white dark:bg-gray-900 rounded-full p-2 shadow-lg">
                <div className="text-primary-600 dark:text-primary-500">
                  <i className="ri-verified-badge-fill text-xl"></i>
                </div>
              </div>
              
              <div className="h-24 w-24 rounded-full border-4 border-white overflow-hidden mb-3 bg-gray-200 flex items-center justify-center">
                {currentUser?.photoURL ? (
                  <img 
                    src={currentUser.photoURL} 
                    alt="User" 
                    className="w-full h-full object-cover" 
                  />
                ) : (
                  <div className="text-gray-400 text-3xl">
                    <i className="ri-user-fill"></i>
                  </div>
                )}
              </div>
              
              <h4 className="text-white font-bold text-lg">Sayar Basu</h4>
              <p className="text-white/90 text-sm mb-2">AI/ML Engineer & GenAI Specialist</p>
              
              <div className="bg-white/20 backdrop-blur-sm rounded-lg py-1 px-3">
                <span className="text-white text-xs">
                  {currentUser?.displayName || "Guest"}
                </span>
              </div>
              
              <div className="absolute bottom-3 text-xs text-white/70">
                Badge #{badgeId}
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <button 
              onClick={handleDownload}
              disabled={isDownloading}
              className="w-full flex items-center justify-center px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
            >
              {isDownloading ? (
                <>
                  <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                  <span>Downloading...</span>
                </>
              ) : (
                <>
                  <i className="ri-download-line mr-2"></i>
                  <span>Download Badge</span>
                </>
              )}
            </button>
            
            <button 
              onClick={handleShare}
              disabled={isSharing}
              className="w-full flex items-center justify-center px-6 py-3 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              {isSharing ? (
                <>
                  <div className="animate-spin h-4 w-4 border-2 border-gray-800 dark:border-gray-200 border-t-transparent rounded-full mr-2"></div>
                  <span>Sharing...</span>
                </>
              ) : (
                <>
                  <i className="ri-share-line mr-2"></i>
                  <span>Share Badge</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
