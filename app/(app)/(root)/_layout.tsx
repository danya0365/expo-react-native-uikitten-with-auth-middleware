import useAuth from "@/hooks/auth";
import { Redirect, Stack } from "expo-router";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  initialRouteName: "(bottom-tabs)",
};

export default function RootLayout() {
  const { isLoggedIn } = useAuth();
  if (!isLoggedIn) {
    return <Redirect href="/(app)/auth/register-login" />;
  }
  return (
    <>
      <Stack>
        <Stack.Screen name="(bottom-tab)" options={{ headerShown: false }} />
        <Stack.Screen
          name="notification/[id]"
          options={{ headerShown: false }}
        />
      </Stack>
    </>
  );
}
