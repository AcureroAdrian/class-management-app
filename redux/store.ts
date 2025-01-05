import { applyMiddleware, createStore } from 'redux'
import { TypedUseSelectorHook, useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { persistStore } from 'redux-persist'
import { thunk } from 'redux-thunk'
import rootReducer from './reducers'

export const store = createStore(rootReducer, applyMiddleware(thunk))
export type AppStore = typeof store

export const persistor = persistStore(store)

// export type RootState = ReturnType<typeof rootReducer>
export type RootState = ReturnType<AppStore['getState']>

export type AppDispatch = AppStore['dispatch']

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
