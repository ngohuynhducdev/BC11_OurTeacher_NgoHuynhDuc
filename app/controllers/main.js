import UserService from "../services/UserService.js";
const userService = new UserService();
const getEle = (id) => document.getElementById(id);

const renderListTeacher = (arr) => {
  const html = arr.reduce((contentHTML, item) => {
    return (contentHTML += `
    <div class="teacher__content--item">
            <div class="card">
              <div class="img-wrapper">
              <img
                class="card-img-top"
                src="../../assets/images/${item.hinhAnh}"
                alt="Card image cap"
              />
            </div>
              <div class="card-body text-center">
                <p class="card-text">
                  <small class="" style="color: #b21980">${item.ngonNgu}</small>
                </p>
                <h5 class="card-title font-weight-bold">${item.hoTen}</h5>
                <p class="card-text">
                    ${item.moTa}
                </p>
              </div>
            </div>
        </div>
      `);
  }, "");
  document.getElementsByClassName("teacher__content")[0].innerHTML = html;
};
// tạo 1 hàm filter lọc GV vs HV ra là được
const fetchData = () => {
  userService
    .getListUserApi()
    .then((result) => {
      console.log(result.data);
      let arrGV = result.data.filter((item) => item.loaiND == "GV");
      renderListTeacher(arrGV);
    })
    .catch((error) => {
      console.log(error);
    });
};

fetchData();
