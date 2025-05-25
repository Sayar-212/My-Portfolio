import { createContext, useState, useEffect, ReactNode } from "react";
import { 
  User, 
  onAuthStateChanged, 
  signOut as firebaseSignOut,
  signInWithPopup,
  getRedirectResult
} from "firebase/auth";
import { auth, googleProvider } from "../lib/firebase";
import { apiRequest } from "../lib/queryClient";
import { useToast } from "@/hooks/use-toast";

interface AuthContextProps {
  currentUser: User | null;
  isLoading: boolean;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
  handleRedirectResult: () => Promise<void>;
  simulateLogin: (userData: any) => void; // For demo purposes
}

export const AuthContext = createContext<AuthContextProps>({
  currentUser: null,
  isLoading: true,
  signInWithGoogle: async () => {},
  signOut: async () => {},
  handleRedirectResult: async () => {},
  simulateLogin: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { toast } = useToast();

  // Make auth context accessible for demo mode
  useEffect(() => {
    if (typeof window !== "undefined") {
      (window as any).authContext = {
        simulateLogin: simulateLogin
      };
    }
  }, []);

  // Listen for auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Function to simulate login for demo purposes
  const simulateLogin = (userData: any) => {
    const fakeUser = {
      uid: "demo-user-123",
      displayName: userData.displayName || "Demo User",
      email: userData.email || "demo@example.com",
      photoURL: userData.photoURL || null,
      emailVerified: true,
      // Add other required User properties
      isAnonymous: false,
      metadata: {},
      providerData: [],
      refreshToken: "",
      tenantId: null,
      delete: () => Promise.resolve(),
      getIdToken: () => Promise.resolve("demo-token"),
      getIdTokenResult: () => Promise.resolve({} as any),
      reload: () => Promise.resolve(),
      toJSON: () => ({})
    } as unknown as User;

    setCurrentUser(fakeUser);
    
    // Simulate sending the badge email
    apiRequest("POST", "/api/send-badge", {
      email: fakeUser.email,
      name: fakeUser.displayName,
      photoURL: fakeUser.photoURL
    }).catch(error => {
      console.error("Error sending badge in demo mode:", error);
    });
  };

  const signInWithGoogle = async () => {
    try {
      console.log("Starting Google sign-in process with popup");
      console.log("Firebase config:", {
        apiKey: import.meta.env.VITE_FIREBASE_API_KEY ? "Set" : "Not set",
        projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID ? "Set" : "Not set",
        appId: import.meta.env.VITE_FIREBASE_APP_ID ? "Set" : "Not set"
      });
      
      // Using popup method instead of redirect
      const result = await signInWithPopup(auth, googleProvider);
      console.log("Popup sign-in successful");
      
      // If sign-in successful, send badge email
      if (result.user) {
        const { user } = result;
        await apiRequest("POST", "/api/send-badge", {
          email: user.email,
          name: user.displayName,
          photoURL: user.photoURL
        });
        
        toast({
          title: "Welcome!",
          description: "You've successfully signed in. Check your email for a special badge!",
        });
      }
    } catch (error) {
      console.error("Error signing in with Google:", error);
      toast({
        title: "Sign In Failed",
        description: "Failed to sign in with Google. Please try again.",
        variant: "destructive",
      });
    }
  };

  const signOut = async () => {
    try {
      // If current user is demo user, just clear state
      if (currentUser?.uid === "demo-user-123") {
        setCurrentUser(null);
        toast({
          title: "Signed Out",
          description: "You have been signed out of demo mode.",
        });
        return;
      }
      
      // Otherwise use Firebase signout
      await firebaseSignOut(auth);
      toast({
        title: "Signed Out",
        description: "You have been successfully signed out.",
      });
    } catch (error) {
      console.error("Error signing out:", error);
      toast({
        title: "Sign Out Failed",
        description: "Failed to sign out. Please try again.",
        variant: "destructive",
      });
    }
  };

  // Keep this for compatibility
  const handleRedirectResult = async () => {
    try {
      const result = await getRedirectResult(auth);
      if (result) {
        // User just signed in - send email with badge
        const { user } = result;
        await apiRequest("POST", "/api/send-badge", {
          email: user.email,
          name: user.displayName,
          photoURL: user.photoURL
        });
        
        toast({
          title: "Welcome!",
          description: "You've successfully signed in. Check your email for a special badge!",
        });
      }
    } catch (error) {
      console.error("Error handling redirect result:", error);
    }
  };

  const value = {
    currentUser,
    isLoading,
    signInWithGoogle,
    signOut,
    handleRedirectResult,
    simulateLogin
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
