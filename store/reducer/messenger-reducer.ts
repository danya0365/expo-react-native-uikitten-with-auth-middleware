import { MessengerConversation } from "@/models/messenger-conversation";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface State {
  telephone: string | null;
  channelId: number | null;
  localCodeId: string | null;
  lastConversationSeen: MessengerConversation | null;
  isNewMessenger: boolean;
}

const initialState: State = {
  telephone: null,
  channelId: null,
  localCodeId: null,
  lastConversationSeen: null,
  isNewMessenger: false,
};

const appSlice = createSlice({
  name: "messenger",
  initialState,
  reducers: {
    setTelephone(state, action: PayloadAction<string | null>) {
      state.telephone = action.payload;
    },
    setIsNewMessenger(state, action: PayloadAction<boolean>) {
      state.isNewMessenger = action.payload;
    },
    setLastConversationSeen(
      state,
      action: PayloadAction<MessengerConversation | null>
    ) {
      state.lastConversationSeen = action.payload;
    },
    setChannelId(state, action: PayloadAction<number | null>) {
      state.channelId = action.payload;
    },
    setLocalCodeId(state, action: PayloadAction<string | null>) {
      state.localCodeId = action.payload;
    },
  },
});

export const {
  setTelephone,
  setChannelId,
  setLocalCodeId,
  setLastConversationSeen,
  setIsNewMessenger,
} = appSlice.actions;
export default appSlice.reducer;
