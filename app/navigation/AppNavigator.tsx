import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AssessmentInfoScreen } from "../screens/AssessmentInfoScreen";
import { AssessmentScreen } from "../screens/AssessmentScreen";
import { AuthGateScreen } from "../screens/AuthGateScreen";
import { CertificateScreen } from "../screens/CertificateScreen";
import { EditProfileScreen } from "../screens/EditProfileScreen";
import { ErrorAnalysisScreen } from "../screens/ErrorAnalysisScreen";
import { OnboardingScreen } from "../screens/OnboardingScreen";
import { PerformanceScreen } from "../screens/PerformanceScreen";
import { ResultsScreen } from "../screens/ResultsScreen";
import { QuestionWithSelection } from "../types/assessment";

export type RootStackParamList = {
  Onboarding: undefined;
  AuthGate: undefined;
  EditProfile: undefined;
  AssessmentInfo: undefined;
  Assessment: undefined;
  Results: {
    score: number;
    cefrLevel: string;
    questions: QuestionWithSelection[];
  };
  Certificate: { cefrLevel: string };
  ErrorAnalysis: { questions: QuestionWithSelection[] };
  Performance: { questions: QuestionWithSelection[] };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

interface AppNavigatorProps {
  initialRouteName?: keyof RootStackParamList;
}

export const AppNavigator = ({ initialRouteName }: AppNavigatorProps) => (
  <Stack.Navigator
    initialRouteName={initialRouteName}
    screenOptions={{
      headerShown: false,
      animation: "slide_from_right",
    }}
  >
    <Stack.Screen name="Onboarding" component={OnboardingScreen} />
    <Stack.Screen name="AuthGate" component={AuthGateScreen} />
    <Stack.Screen name="EditProfile" component={EditProfileScreen} />
    <Stack.Screen name="AssessmentInfo" component={AssessmentInfoScreen} />
    <Stack.Screen name="Assessment" component={AssessmentScreen} />
    <Stack.Screen name="Results" component={ResultsScreen} />
    <Stack.Screen name="Certificate" component={CertificateScreen} />
    <Stack.Screen name="ErrorAnalysis" component={ErrorAnalysisScreen} />
    <Stack.Screen name="Performance" component={PerformanceScreen} />
  </Stack.Navigator>
);
