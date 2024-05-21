import { User } from "@/models/user";
import { UseAppDispatch, useAppDispatch, useAppSelector } from "@/store/hooks";
import { setUser } from "@/store/reducer/app-reducer";
import { useCallback } from "react";

const useAuth = ({
  dispatch = useAppDispatch(),
}: {
  dispatch?: UseAppDispatch;
} = {}) => {
  const { user } = useAppSelector((state) => state.app);

  const setUserCallback = useCallback((user: User | null) => {
    dispatch(setUser(user));
  }, []);

  return {
    isLoggedIn: !!user,
    setUser: setUserCallback,
  };
};

export default useAuth;
