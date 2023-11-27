import Axios from "axios";

export const getContainers = () => {
  Axios({
    url: "https://d6b8bdc5-aa40-4681-b8af-c005666d6734.mock.pstmn.io/architecture",
  })
    .then((response) => {
      return response.data.dist;
    })
    .catch((err) => {
      console.error(err);
      throw new Error();
    });
};