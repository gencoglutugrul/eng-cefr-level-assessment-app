import React from "react";
import {
  Dimensions,
  ImageBackground,
  StyleSheet,
  Text,
  View,
} from "react-native";

interface CertificateProps {
  displayName: string;
  cefrScore: string;
  issueDate: string;
}

const EnglishProficiencyCertificate: React.FC<CertificateProps> = ({
  displayName,
  cefrScore,
  issueDate,
}) => {
  const certificateWidth = Dimensions.get("window").width - 40;
  const certificateHeight = certificateWidth * 1.41;

  return (
    <ImageBackground
      source={require("../../assets/cert-bg.png")}
      style={[
        styles.background,
        { width: certificateWidth, height: certificateHeight },
      ]}
      resizeMode="contain"
    >
      <View style={styles.contentContainer}>
        <Text style={styles.title}>Certificate of Completion</Text>
        <View style={styles.cefrContainer}>
          <Text style={styles.cefrLabel}>CEFR Level Achieved</Text>
          <Text style={styles.cefrScore}>{cefrScore}</Text>
        </View>

        <View style={styles.recipientContainer}>
          <Text style={styles.awardedText}>Awarded to</Text>
          <Text style={styles.displayName}>{displayName}</Text>
        </View>

        <View style={styles.detailsContainer}>
          <Text style={styles.detailsText}>
            This certifies that {displayName} has demonstrated English language
            proficiency equivalent to level {cefrScore} according to the Common
            European Framework of Reference for Languages (CEFR).
          </Text>
        </View>

        <View style={styles.footerContainer}>
          <Text style={styles.issueDate}>Issued on: {issueDate}</Text>
          <Text style={styles.issueDate}>
            Issued by: English Proficiency {"\n"} Assessment App
          </Text>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    alignSelf: "center",
  },
  contentContainer: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1a365d",
    textAlign: "center",
    marginTop: 30,
    marginBottom: 20,
  },
  recipientContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  awardedText: {
    fontSize: 14,
    color: "#666",
  },
  displayName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#2a5298",
    textTransform: "uppercase",
    textAlign: "center",
  },
  cefrContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  cefrLabel: {
    fontSize: 14,
    color: "#666",
  },
  cefrScore: {
    fontSize: 42,
    fontWeight: "bold",
    color: "#2a5298",
  },
  detailsContainer: {
    marginHorizontal: 20,
    alignSelf: "center",
  },
  detailsText: {
    fontSize: 12,
    lineHeight: 20,
    color: "#999",
    textAlign: "center",
  },
  footerContainer: {
    marginTop: 40,
    alignItems: "center",
  },
  issueDate: {
    fontSize: 12,
    color: "#666",
    marginBottom: 4,
    textAlign: "center",
  },
  referenceNumber: {
    fontSize: 10,
    color: "#888",
    textAlign: "center",
  },
});

export default EnglishProficiencyCertificate;
