import { StackNavigationProp } from "@react-navigation/stack";
import * as AppleAuthentication from "expo-apple-authentication";
import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";
import React, { useEffect } from "react";
import { Alert, Image, StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-paper";
import { useAuth } from "../hooks/useAuth";
import { useTranslation } from "../hooks/useTranslation";
import { RootStackParamList } from "../navigation/AppNavigator";

WebBrowser.maybeCompleteAuthSession();

type AuthGateScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "AuthGate"
>;

interface AuthGateScreenProps {
  navigation: AuthGateScreenNavigationProp;
}

export const AuthGateScreen = ({ navigation }: AuthGateScreenProps) => {
  const { signInWithGoogle, signInWithApple } = useAuth();
  const { t } = useTranslation();
  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId: process.env.EXPO_PUBLIC_GOOGLE_CLIENT_ID,
    iosClientId: process.env.EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID,
  });
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      navigation.replace("EditProfile");
    }
  }, [user]);

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
    } catch (error: any) {
      Alert.alert(t("auth.failed_to_login"), error.message);
    }
  };

  const handleAppleSignIn = async () => {
    try {
      await signInWithApple();
    } catch (error: any) {
      Alert.alert(t("auth.failed_to_login"), error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/logo.png")}
        style={styles.logo}
        resizeMode="contain"
      />
      <Text style={styles.subtitle}>{t("auth.subtitle")}</Text>

      <View style={styles.buttonContainer}>
        <Button
          mode="contained"
          icon="google"
          onPress={handleGoogleSignIn}
          style={styles.button}
          labelStyle={styles.buttonText}
          disabled={!request}
        >
          {t("auth.googleSignIn")}
        </Button>

        <AppleAuthentication.AppleAuthenticationButton
          buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN}
          buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.BLACK}
          cornerRadius={5}
          style={styles.appleButton}
          onPress={handleAppleSignIn}
        />
      </View>

      <Text style={styles.footerText}>{t("auth.terms")}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1a73e8",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    marginBottom: 40,
  },
  buttonContainer: {
    width: "100%",
    maxWidth: 400,
  },
  button: {
    backgroundColor: "#1a73e8",
    borderRadius: 5,
    paddingVertical: 8,
    height: 60,
    marginBottom: 16,
    paddingLeft: 8,
  },
  buttonText: {
    color: "#fff",
    fontSize: 24,
    lineHeight: 24,
    letterSpacing: -0.5,
  },
  appleButton: {
    width: "100%",
    height: 60,
  },
  footerText: {
    position: "absolute",
    bottom: 40,
    textAlign: "center",
    color: "#666",
    fontSize: 12,
    paddingHorizontal: 20,
  },
});
