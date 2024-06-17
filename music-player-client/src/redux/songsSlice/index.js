import { createSlice } from "@reduxjs/toolkit";

export const songsSlice = createSlice({
	name: "songs",
	initialState: {
		songs: [],
		getSongsProgress: false,
		error: false,
	},
	reducers: {
		getSongsProgress: (state) => {
			state.state.error = true;
		},
        getPlayListSuccess: (state, action) => {
			state.songs.push(action.payload);
			state.getSongsProgress = false;
		},
        getPlayListFailure: (state) => {
            state.error = true;
			state.getSongsProgress = false;
		},
	},
});

export const {
	getSongsProgress
} = songsSlice.actions;

export default songsSlice.reducer;
