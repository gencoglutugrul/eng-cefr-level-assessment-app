import { NativeStackScreenProps } from "@react-navigation/native-stack";
import {
  isAvailableAsync as isSharingAvailableAsync,
  shareAsync,
} from "expo-sharing";
import React, { useRef } from "react";
import { Alert, StyleSheet, View } from "react-native";
import { Button } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import ViewShot, { captureRef } from "react-native-view-shot";
import EnglishProficiencyCertificate from "../components/Certificate";
import { useAuth } from "../context/AuthContext";
import { RootStackParamList } from "../navigation/AppNavigator";

type CertificateScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "Certificate"
>;

export const CertificateScreen = ({ route }: CertificateScreenProps) => {
  const { cefrLevel } = route.params;
  const certificateRef = useRef(null);
  const { displayName } = useAuth();

  const handleExport = async () => {
    try {
      if (!(await isSharingAvailableAsync())) {
        Alert.alert("Error", "Sharing is not available on this device");
        return;
      }

      const uri = await captureRef(certificateRef, {
        format: "jpg",
        quality: 1,
      });

      await shareAsync("file://" + uri, {
        mimeType: "image/jpeg",
        dialogTitle: "Share your certificate",
      });
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Failed to save certificate");
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <ViewShot ref={certificateRef}>
          <EnglishProficiencyCertificate
            cefrScore={cefrLevel}
            displayName={displayName}
            issueDate={new Date().toDateString()}
          />
        </ViewShot>

        <View style={styles.actions}>
          <Button mode="contained" style={styles.button} onPress={handleExport}>
            Share Certificate
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
  },
  container: {
    flex: 1,
    padding: 20,
  },
  animation: {
    backgroundColor: "#333",
    width: 200,
    height: 200,
    alignSelf: "center",
  },
  actions: {
    paddingHorizontal: 20,
  },
  button: {
    marginTop: 40,
    marginVertical: 8,
    backgroundColor: "#1a73e8",
  },
});
