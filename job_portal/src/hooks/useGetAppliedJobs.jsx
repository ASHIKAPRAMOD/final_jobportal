import axios from "axios";
import { useEffect } from "react";

// redux features import
import { useDispatch } from "react-redux";
import { setAllAppliedJobs } from "../redux/jobSlice.js";
import { APPLICATION_API_END_POINT } from "../utils/constants.js";

const useGetAppliedJobs = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    (async function FetchAllAppliedJobs() {
      try {
        const response = await axios.get(`${APPLICATION_API_END_POINT}/get`, {
          withCredentials: true
        });
        if (response.data.success) {
          dispatch(setAllAppliedJobs(response.data.application));
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);
};

export default useGetAppliedJobs;