import { NavigationContainer } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { AuthProvider } from "./context/AuthContext";
import { useAuth } from "./hooks/useAuth";
import { AppNavigator, RootStackParamList } from "./navigation/AppNavigator";

function AppContent() {
  const { user } = useAuth();
  const [initialRoute, setInitialRoute] =
    useState<keyof RootStackParamList>("Onboarding");

  useEffect(() => {
    if (user) {
      setInitialRoute("AssessmentInfo");
    }
  }, [user]);

  return (
    <NavigationContainer>
      <AppNavigator initialRouteName={initialRoute} />
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </SafeAreaProvider>
  );
}
