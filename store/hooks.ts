import { AppDispatch } from './configure-store';
import { RootState } from './root-reducer';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export type UseAppDispatch = ReturnType<typeof useAppDispatch>;
