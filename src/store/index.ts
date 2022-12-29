import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";

import counterSliceReducer from "@features/counter/counterSlice";
import { deviceReducer } from "@features/device/deviceSlice";
import { panelsReducer } from "@features/panels/panelsSlice";
import rootSaga from "@store/saga";

const sagaMiddleware = createSagaMiddleware();
const middleware = [sagaMiddleware];

export const store = configureStore({
  reducer: {
    counter: counterSliceReducer,
    devices: deviceReducer,
    panels: panelsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false }).concat(middleware),
  devTools: true,
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
