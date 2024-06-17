import axiosInstance from "../axiosInstance";
import * as actions from "./index";

const apiUrl = process.env.REACT_APP_API_URL + "/songs";

export const getTop10Songs = async (dispatch) => {
	dispatch(actions.getSongsProgress());
	try {
		const { data } = await axiosInstance.get(apiUrl + "/top");
		dispatch(actions.getPlayListSuccess(data.data));
		return true;
	} catch (error) {
		dispatch(actions.getPlayListFailure());
		return false;
	}
};