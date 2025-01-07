import {configureStore} from "@reduxjs/toolkit";
import userReducer from "./reducers/user/userReducer";
import {userApi} from "./reducers/user/userThunk";
import placeReducer from "./reducers/places/placeReducer";
import {placeApi} from "./reducers/places/placeThunk";
import hikingReducer from "./reducers/hiking/hikingReducer";
import {hikingApi} from "./reducers/hiking/hikingThunk";
import campingReducer from "./reducers/camping/campingReducer";
import {campingApi} from "./reducers/camping/campingThunk";
import gadgetReducer from "./reducers/gadget/gadgetReducer";
import {gadgetApi} from "./reducers/gadget/gadgetThunk";
import safetyReducer from "./reducers/safety/safetyReducer";
import {safetyApi} from "./reducers/safety/safetyThunk";
import Review from "../screens/Dashboard/K2/review";
import reviewsReducer from "./reducers/reviews/reviewsReducer";
import {reviewApi} from "./reducers/reviews/reviewsThunk";
import bookingReducer from "./reducers/booking/bookingReducer";
import {bookingApi} from "./reducers/booking/bookingThunk";
import carbookingReducer from "./reducers/carbooking /carbookingReducer";
import {carbookingApi} from "./reducers/carbooking /carbookingThunk";
import messageReducer from "./reducers/messages/messageReducer";
import { messageApi } from "./reducers/messages/messageThunk";
// import messageReducer, { MessageSlice } from "./reducers/messages/messageReducer";

const store = configureStore({
  reducer: {
    user: userReducer,
    place: placeReducer,
    hiking: hikingReducer,
    camp: campingReducer,
    gadget: gadgetReducer,
    safety: safetyReducer,
    booking: bookingReducer,
    carCooking: carbookingReducer,
    Review: reviewsReducer,
    Message: messageReducer,


    [userApi.reducerPath]: userApi.reducer,
    [placeApi.reducerPath]: placeApi.reducer,
    [hikingApi.reducerPath]: hikingApi.reducer,
    [campingApi.reducerPath]: campingApi.reducer,
    [gadgetApi.reducerPath]: gadgetApi.reducer,
    [safetyApi.reducerPath]: safetyApi.reducer,
    [reviewApi.reducerPath]: reviewApi.reducer,
    [bookingApi.reducerPath]: bookingApi.reducer,
    [carbookingApi.reducerPath]: carbookingApi.reducer,
    [messageApi.reducerPath]: messageApi.reducer,

  },
  middleware: getdefaultMiddleware =>
    getdefaultMiddleware({
      serializableCheck: false,
    }).concat([
      userApi.middleware,
      carbookingApi.middleware,
      bookingApi.middleware,
      placeApi.middleware,
      hikingApi.middleware,
      campingApi.middleware,
      gadgetApi.middleware,
      safetyApi.middleware,
      reviewApi.middleware,
      messageApi.middleware,
    ]),
});

export default store;
