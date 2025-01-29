import React, { useEffect, useState } from "react";
import { Dimensions, ScrollView, StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-paper";

const { width } = Dimensions.get("window");

import { NativeStackScreenProps } from "@react-navigation/native-stack";
import LottieView from "lottie-react-native";
import { useAuth } from "../context/AuthContext";
import { useTranslation } from "../hooks/useTranslation";
import { RootStackParamList } from "../navigation/AppNavigator";

type Props = NativeStackScreenProps<RootStackParamList, "Onboarding">;

export const OnboardingScreen = ({ navigation }: Props) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [animationProgress, setAnimationProgress] = useState(0);
  const scrollView = React.createRef<ScrollView>();
  const { user } = useAuth();
  const { t } = useTranslation();

  const slides = [
    {
      title: t("onboarding.slide.1.title"),
      description: t("onboarding.slide.1.description"),
    },
    {
      title: t("onboarding.slide.2.title"),
      description: t("onboarding.slide.2.description"),
    },
    {
      title: t("onboarding.slide.3.title"),
      description: t("onboarding.slide.3.description"),
    },
  ];

  useEffect(() => {
    if (user) {
      navigation.replace("AssessmentInfo");
    }
  }, [user]);

  const nextAnimationProgress = (iterate: number) => {
    setAnimationProgress((prev) => {
      const next = prev + iterate;
      if (next > 1) {
        return 1;
      }
      if (next < 0) {
        return 0;
      }
      return next;
    });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextAnimationProgress(0.01);
    }, 25);

    return () => clearInterval(interval);
  }, []);

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      scrollView.current?.scrollTo({
        x: width * (currentSlide + 1),
        animated: true,
      });
    } else {
      navigation.replace("AuthGate");
    }
  };

  return (
    <View style={styles.container}>
      <LottieView
        source={require("../../assets/animations/welcome.json")}
        progress={animationProgress}
        style={styles.animation}
      />
      <ScrollView
        ref={scrollView}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={(e) => {
          const index = Math.round(e.nativeEvent.contentOffset.x / width);
          setCurrentSlide(index);
        }}
        style={styles.slideContainer}
      >
        {slides.map((slide, index) => (
          <View key={index} style={styles.slide}>
            <Text style={styles.title}>{slide.title}</Text>
            <Text style={styles.description}>{slide.description}</Text>
          </View>
        ))}
      </ScrollView>

      <View style={styles.footer}>
        <View style={styles.progressContainer}>
          {slides.map((_, index) => (
            <View
              key={index}
              style={[
                styles.progressDot,
                currentSlide === index && styles.activeDot,
              ]}
            />
          ))}
        </View>

        <Button
          mode="contained"
          onPress={handleNext}
          style={styles.button}
          labelStyle={styles.buttonText}
        >
          {currentSlide === slides.length - 1
            ? t("onboarding.getStarted")
            : t("onboarding.next")}
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  slideContainer: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  slide: {
    width,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  animation: {
    width,
    height: "50%",
    marginTop: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 20,
    color: "#1a73e8",
    textAlign: "center",
  },
  description: {
    fontSize: 16,
    color: "#666",
    marginTop: 10,
    textAlign: "center",
    paddingHorizontal: 40,
  },
  footer: {
    padding: 20,
    paddingBottom: 40,
    backgroundColor: "#fff",
  },
  progressContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
  },
  progressDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#ccc",
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: "#1a73e8",
  },
  button: {
    backgroundColor: "#1a73e8",
    borderRadius: 25,
    paddingVertical: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
});
