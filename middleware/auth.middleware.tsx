import useAuth from "@/hooks/auth";
import React, { useEffect } from "react";
import { router } from "expo-router";

export type Props = {
  children?: React.ReactNode;
};

const AuthMiddleware: React.FC<Props> = ({ children }) => {
  const { isLoggedIn } = useAuth();

  // useEffect(() => {
  //   if (!isLoggedIn) {
  //     router.replace("/auth/login");
  //   }
  // }, [isLoggedIn]);
  return children;
};

export default AuthMiddleware;
