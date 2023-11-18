//Redux
import { resetMessage } from "../slices/clientSlice";

export const useResetComponentMessage = (dispatch) => {
    return () => {
        setTimeout(() => {
            dispatch(resetMessage())
        }, 2000)
    }
}