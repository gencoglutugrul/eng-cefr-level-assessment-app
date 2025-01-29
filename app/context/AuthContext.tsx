import AsyncStorage from "@react-native-async-storage/async-storage";
import * as AppleAuthentication from "expo-apple-authentication";
import * as Google from "expo-auth-session/providers/google";
import {
  GoogleAuthProvider,
  OAuthProvider,
  User,
  onAuthStateChanged,
  signInWithCredential,
} from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { Platform } from "react-native";
import { auth } from "../firebase";

const STORAGE_KEY_DISPLAY_NAME = "displayName";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  displayName: string;
  signInWithGoogle: () => Promise<void>;
  signInWithApple: () => Promise<void>;
  setDisplayName: (displayName: string) => void;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  displayName: "",
  signInWithGoogle: async () => {},
  signInWithApple: async () => {},
  setDisplayName: () => {},
  logout: async () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [displayName, setDisplayName] = useState("");
  const [loading, setLoading] = useState(true);
  const [_request, _response, promptAsync] = Google.useAuthRequest({
    clientId: process.env.EXPO_PUBLIC_GOOGLE_CLIENT_ID,
    iosClientId: process.env.EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID,
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      try {
        if (user) {
          setUser({
            ...user,
          });

          if (
            displayName.length === 0 &&
            typeof user.displayName === "string" &&
            user.displayName.length > 0
          ) {
            setDisplayName(user.displayName);
          }
        }
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    const loadDisplayName = async () => {
      const displayNameOnStorage = await AsyncStorage.getItem(
        STORAGE_KEY_DISPLAY_NAME
      );

      if (displayNameOnStorage) {
        setDisplayName(displayNameOnStorage);
      }
    };

    loadDisplayName();
  }, [displayName]);

  const signInWithGoogle = async () => {
    const result = await promptAsync();
    if (result?.type === "success" && result.authentication?.idToken) {
      const credential = GoogleAuthProvider.credential(
        result.authentication.idToken
      );
      await signInWithCredential(auth, credential);
    }
  };

  const signInWithApple = async () => {
    if (Platform.OS !== "ios")
      throw new Error("Apple Sign In is available only on iOS");

    const credential = await AppleAuthentication.signInAsync({
      requestedScopes: [
        AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
        AppleAuthentication.AppleAuthenticationScope.EMAIL,
      ],
    });

    if (credential.identityToken) {
      const provider = new OAuthProvider("apple.com");
      const oauthCredential = provider.credential({
        idToken: credential.identityToken,
      });

      await signInWithCredential(auth, oauthCredential);
    } else {
      throw new Error("Apple Sign In failed");
    }
  };

  const logout = async () => {
    await auth.signOut();
    setUser(null);
    handleSetDisplayName("");
  };

  const handleSetDisplayName = async (displayName: string) => {
    setDisplayName(displayName);
    await AsyncStorage.setItem(STORAGE_KEY_DISPLAY_NAME, displayName);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        displayName,
        signInWithGoogle,
        signInWithApple,
        logout,
        setDisplayName: handleSetDisplayName,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
