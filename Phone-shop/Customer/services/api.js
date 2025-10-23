export default class Api {
  fetchListData() {
    return axios({
      url: "https://68c0fac20b196b9ce1c57c5c.mockapi.io/infoPhone",
      method: "GET",
    });
  }
}
