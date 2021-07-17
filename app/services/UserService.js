export default class UserService {
  getListUserApi() {
    return axios({
      url: "https://60db09fc801dcb0017290db9.mockapi.io/api/UserManager",
      method: "GET",
    });
  }
  addUserApi(user) {
    return axios({
      url: "https://60db09fc801dcb0017290db9.mockapi.io/api/UserManager",
      method: "POST",
      data: user,
    });
  }
  deleteUserApi(id) {
    return axios({
      url: `https://60db09fc801dcb0017290db9.mockapi.io/api/UserManager/${id}`,
      method: "DELETE",
    });
  }
  getUserApi(id) {
    return axios({
      url: `https://60db09fc801dcb0017290db9.mockapi.io/api/UserManager/${id}`,
      method: "GET",
    });
  }
  // thang user nay no bi mat cai ID ne ban
  updateUserApi(user) {
    return axios({
      url: `https://60db09fc801dcb0017290db9.mockapi.io/api/UserManager/${user.id}`,
      method: "PUT",
      data: user,
    });
  }
}
