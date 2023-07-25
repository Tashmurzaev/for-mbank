import axios from "axios";

export const getContributionsApi = () => {
  return axios.get(`https://dpg.gg/test/calendar.json`);
};
