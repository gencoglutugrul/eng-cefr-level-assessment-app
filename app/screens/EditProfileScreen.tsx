import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useEffect } from "react";
import { Keyboard, StyleSheet, Text, View } from "react-native";
import { Button, TextInput } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "../hooks/useAuth";
import { useTranslation } from "../hooks/useTranslation";
import { RootStackParamList } from "../navigation/AppNavigator";

type EditProfileScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "EditProfile"
>;

export const EditProfileScreen = () => {
  const navigation = useNavigation<EditProfileScreenNavigationProp>();
  const { loading, user, displayName, setDisplayName } = useAuth();
  const { t } = useTranslation();

  useEffect(() => {
    if (!user && !loading) {
      navigation.popTo("AuthGate");
    }
  }, [user]);

  if (loading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <Text>Loading...</Text>
        </View>
      </SafeAreaView>
    );
  }

  const handleKeyboardDismiss = () => {
    Keyboard.dismiss();
  };

  return (
    <SafeAreaView style={styles.safeArea} onTouchStart={handleKeyboardDismiss}>
      <View style={styles.container}>
        <View style={styles.section}>
          <Text style={styles.title}>{t("edit_profile.title")}</Text>
          <Text style={styles.subtitle}>{t("edit_profile.subtitle")}</Text>

          <TextInput
            label={t("edit_profile.input_name_label")}
            value={displayName}
            onChangeText={setDisplayName}
            style={{ marginBottom: 20 }}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            {t("edit_profile.section.title")}
          </Text>
          <Text style={styles.text}>{t("edit_profile.section.text")}</Text>
        </View>

        <Button
          mode="contained"
          onPress={() => navigation.replace("AssessmentInfo")}
          style={styles.button}
        >
          {t("edit_profile.button")}
        </Button>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  container: {
    padding: 20,
    paddingBottom: 40,
    width: "100%",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 30,
    color: "#1a73e8",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    marginBottom: 10,
  },
  section: {
    marginBottom: 30,
    width: "100%",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10,
    color: "#333",
  },
  text: {
    fontSize: 16,
    lineHeight: 24,
    color: "#555",
    width: "100%",
  },
  button: {
    marginTop: 20,
    backgroundColor: "#1a73e8",
  },
});
