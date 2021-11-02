import { Action, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { STATUSES } from "../../constants/redux";
import { getData } from "./actions";
import { ClassInfo, DashboardState, StudentDictionary } from "./types";

interface FormattedData {
  classInfo: ClassInfo[];
  studentDictionary: StudentDictionary;
}

const initialState: DashboardState = {
  status: STATUSES.INITIAL,
  classInfos: [],
  studentDictionary: {},
};

const isDashboardPendingAction = (action: Action) =>
  action.type.startsWith("getData") && action.type.endsWith("pending");
const isDashboardRejectAction = (action: Action) =>
  action.type.startsWith(`getData`) && action.type.endsWith("rejected");

export const dashboardSlice = createSlice({
  name: "dashboard",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getData.fulfilled.type, (state: DashboardState, action: PayloadAction<Array<FormattedData>>) => {
          let payload = action.payload[0];
          state.status = STATUSES.FULFILLED;
          state.classInfos = payload.classInfo;
          state.studentDictionary = payload.studentDictionary;
      })
      .addMatcher(isDashboardPendingAction, (state: DashboardState) => {
        state.status = STATUSES.PENDING;
      })
      .addMatcher(isDashboardRejectAction, (state: DashboardState) => {
        state.status = STATUSES.REJECTED;
      })
  }
});

export default dashboardSlice.reducer;