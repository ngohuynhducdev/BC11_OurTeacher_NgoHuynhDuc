import UserService from "../services/UserService.js";
import User from "../models/User.js";
import Validation from "../models/Validation.js";

const userService = new UserService();
const validation = new Validation();

const getEle = (id) => document.getElementById(id);

const renderTable = (arr) => {
  const html = arr.reduce((contentHTML, item) => {
    return (contentHTML += `
            <tr>
                <td>${item.id}</td>
                <td>${item.taiKhoan}</td>
                <td>${item.matKhau}</td>
                <td>${item.hoTen}</td>
                <td>${item.email}</td>
                <td>${item.ngonNgu}</td>
                <td>${item.loaiND}</td>
                <td>
                    <img src="../../assets/images/${item.hinhAnh}" style="width: 50px" />
                </td>
                <td>${item.moTa}</td>
                <td>
                    <button class="btn btn-warning mb-2" onclick="editUser(${item.id})" data-toggle="modal"
                    data-target="#myModal">Sửa</button>
                    <button class="btn btn-danger" onclick="deleteUser(${item.id})">Xoá</button>
                </td>
            </tr>
      `);
  }, "");
  getEle("tblDanhSachNguoiDung").innerHTML = html;
};
const resetVali = () => {
  // Reset Validation
  getEle("tbTKNV").style.display = "none";
  getEle("tbTen").style.display = "none";
  getEle("tbMatKhau").style.display = "none";
  getEle("tbEmail").style.display = "none";
  getEle("tbHinhAnh").style.display = "none";
  getEle("tbLoaiND").style.display = "none";
  getEle("tbLoaiNgonNgu").style.display = "none";
  getEle("tbMoTa").style.display = "none";
};
getEle("btnThemNguoiDung").addEventListener("click", () => {
  // Reset input
  getEle("TaiKhoan").value = "";
  getEle("HoTen").value = "";
  getEle("MatKhau").value = "";
  getEle("Email").value = "";
  getEle("loaiNguoiDung").value = "";
  getEle("loaiNgonNgu").value = "";
  getEle("MoTa").value = "";
  getEle("HinhAnh").value = "";
  // Reset Validation
  resetVali();

  document.getElementsByClassName("modal-title")[0].innerHTML =
    "Thêm Người Dùng";
  document.getElementsByClassName("modal-title")[0].style.color = "green";

  const footer =
    "<button class='btn btn-success' onclick='addUser()''>Thêm</button>";
  document.getElementsByClassName("modal-footer")[0].innerHTML = footer;
});

// Thêm
const addUser = () => {
  // Lấy thông tin từ User nhập vào
  const taiKhoan = getEle("TaiKhoan").value;
  const hoTen = getEle("HoTen").value;
  const matKhau = getEle("MatKhau").value;
  const email = getEle("Email").value;
  const loaiNguoiDung = getEle("loaiNguoiDung").value;
  const loaiNgonNgu = getEle("loaiNgonNgu").value;
  const moTa = getEle("MoTa").value;
  const hinhAnh = getEle("HinhAnh").value;

  // Tạo đối tượng User từ lớp đối tượng Users
  const user = new User(
    "",
    taiKhoan,
    hoTen,
    matKhau,
    email,
    loaiNguoiDung,
    loaiNgonNgu,
    moTa,
    hinhAnh
  );

  // Validation

  let isValid = true;
  isValid &=
    validation.kiemTraRong(
      taiKhoan,
      "tbTKNV",
      "(*) Vui lòng nhập vào tài khoản"
    ) &&
    validation.kiemTraDoDaiKyTu(
      taiKhoan,
      "tbTKNV",
      "(*) Vui lòng nhập vào từ 4 đến 6 ký tự",
      4,
      6
    ) &&
    validation.kiemTraTaiKhoanTrung(
      taiKhoan,
      "tbTKNV",
      "(*) Tài khoản bị trùng, xin vui lòng nhập tài khoản khác",
      listUser
    );
  isValid &=
    validation.kiemTraRong(
      matKhau,
      "tbMatKhau",
      "(*) Vui lòng nhập vào mật khẩu"
    ) &&
    validation.kiemTraDoDaiKyTu(
      matKhau,
      "tbMatKhau",
      "(*) Vui lòng nhập vào từ 6 đến 8 ký tự",
      6,
      8
    ) &&
    validation.kiemTraMatKhau(
      matKhau,
      "tbMatKhau",
      "(*) Mật khẩu chưa đủ mạnh"
    );
  isValid &=
    validation.kiemTraRong(hoTen, "tbTen", "(*) Vui lòng nhập vào họ và tên") &&
    validation.kiemTraKyTu(hoTen, "tbTen", "(*) Vui lòng nhập vào chữ");
  isValid &=
    validation.kiemTraRong(email, "tbEmail", "(*) Vui lòng nhập vào email") &&
    validation.kiemTraEmail(email, "tbEmail", "(*) Email không đúng định dạng");

  isValid &= validation.kiemTraRong(
    hinhAnh,
    "tbHinhAnh",
    "(*) Vui lòng nhập vào tên hình ảnh"
  );

  isValid &=
    validation.kiemTraRong(
      loaiNguoiDung,
      "tbLoaiND",
      "(*) Vui lòng chọn loại người dùng"
    ) &&
    validation.kiemTraSelect(
      "loaiNguoiDung",
      "tbLoaiND",
      "(*) Vui lòng chọn loại người dùng"
    );

  isValid &=
    validation.kiemTraRong(
      loaiNgonNgu,
      "tbLoaiNgonNgu",
      "(*) Vui lòng chọn loại ngôn ngữ"
    ) &&
    validation.kiemTraSelect(
      "loaiNgonNgu",
      "tbLoaiNgonNgu",
      "(*) Vui lòng chọn loại ngôn ngữ"
    );

  isValid &=
    validation.kiemTraRong(moTa, "tbMoTa", "(*) Vui lòng nhập vào mô tả") &&
    validation.kiemTraDoDaiKyTu(
      moTa,
      "tbMoTa",
      "(*) Vui lòng nhập không vượt quá 60 ký tự",
      1,
      60
    );

  if (!isValid) return;

  userService
    .addUserApi(user)
    .then(() => {
      fetchData();

      // Tắt modal
      document.getElementsByClassName("close")[0].click();
    })
    .catch((error) => {
      console.log(error);
    });
};
window.addUser = addUser;

// Xoá
const deleteUser = (id) => {
  userService
    .deleteUserApi(id)
    .then(() => {
      fetchData();
    })
    .catch((error) => {
      console.log(error);
    });
};
window.deleteUser = deleteUser;

// Sửa
const editUser = (id) => {
  document.getElementsByClassName("modal-title")[0].innerHTML =
    "Sửa Người Dùng";
  document.getElementsByClassName("modal-title")[0].style.color = "orange";
  const footer = `<button class='btn btn-warning' onclick='updateUser(${id})'>Cập nhật</button>`;
  document.getElementsByClassName("modal-footer")[0].innerHTML = footer;
  // Reset Validation
  resetVali();
  getEle("TaiKhoan").disabled = "true";
  userService.getUserApi(id).then((result) => {
    console.log(result.data);
    // Lấy thông tin từ User nhập vào
    getEle("TaiKhoan").value = result.data.taiKhoan;
    getEle("HoTen").value = result.data.hoTen;
    getEle("MatKhau").value = result.data.matKhau;
    getEle("Email").value = result.data.email;
    getEle("loaiNguoiDung").value = result.data.loaiND;
    getEle("loaiNgonNgu").value = result.data.ngonNgu;
    getEle("MoTa").value = result.data.moTa;
    getEle("HinhAnh").value = result.data.hinhAnh;
  });
};
window.editUser = editUser;

// Cập nhật
const updateUser = (id) => {
  // Lấy thông tin từ User nhập vào
  const taiKhoan = getEle("TaiKhoan").value;
  const hoTen = getEle("HoTen").value;
  const matKhau = getEle("MatKhau").value;
  const email = getEle("Email").value;
  const loaiNguoiDung = getEle("loaiNguoiDung").value;
  const loaiNgonNgu = getEle("loaiNgonNgu").value;
  const moTa = getEle("MoTa").value;
  const hinhAnh = getEle("HinhAnh").value;

  // Tạo đối tượng User từ lớp đối tượng Users
  // thieu cai id r ne ban
  // ban de v id no bang = ''

  const user = new User(
    id,
    taiKhoan,
    hoTen,
    matKhau,
    email,
    loaiNguoiDung,
    loaiNgonNgu,
    moTa,
    hinhAnh
  );
  let isValid = true;
  isValid &=
    validation.kiemTraRong(
      taiKhoan,
      "tbTKNV",
      "(*) Vui lòng nhập vào tài khoản"
    ) &&
    validation.kiemTraDoDaiKyTu(
      taiKhoan,
      "tbTKNV",
      "(*) Vui lòng nhập vào từ 4 đến 6 ký tự",
      4,
      6
    );

  isValid &=
    validation.kiemTraRong(
      matKhau,
      "tbMatKhau",
      "(*) Vui lòng nhập vào mật khẩu"
    ) &&
    validation.kiemTraDoDaiKyTu(
      matKhau,
      "tbMatKhau",
      "(*) Vui lòng nhập vào từ 6 đến 8 ký tự",
      6,
      8
    ) &&
    validation.kiemTraMatKhau(
      matKhau,
      "tbMatKhau",
      "(*) Mật khẩu chưa đủ mạnh"
    );
  isValid &=
    validation.kiemTraRong(hoTen, "tbTen", "(*) Vui lòng nhập vào họ và tên") &&
    validation.kiemTraKyTu(hoTen, "tbTen", "(*) Vui lòng nhập vào chữ");
  isValid &=
    validation.kiemTraRong(email, "tbEmail", "(*) Vui lòng nhập vào email") &&
    validation.kiemTraEmail(email, "tbEmail", "(*) Email không đúng định dạng");

  isValid &= validation.kiemTraRong(
    hinhAnh,
    "tbHinhAnh",
    "(*) Vui lòng nhập vào tên hình ảnh"
  );

  isValid &=
    validation.kiemTraRong(
      loaiNguoiDung,
      "tbLoaiND",
      "(*) Vui lòng chọn loại người dùng"
    ) &&
    validation.kiemTraSelect(
      "loaiNguoiDung",
      "tbLoaiND",
      "(*) Vui lòng chọn loại người dùng"
    );

  isValid &=
    validation.kiemTraRong(
      loaiNgonNgu,
      "tbLoaiNgonNgu",
      "(*) Vui lòng chọn loại ngôn ngữ"
    ) &&
    validation.kiemTraSelect(
      "loaiNgonNgu",
      "tbLoaiNgonNgu",
      "(*) Vui lòng chọn loại ngôn ngữ"
    );

  isValid &=
    validation.kiemTraRong(moTa, "tbMoTa", "(*) Vui lòng nhập vào mô tả") &&
    validation.kiemTraDoDaiKyTu(
      moTa,
      "tbMoTa",
      "(*) Vui lòng nhập không vượt quá 60 ký tự",
      1,
      60
    );

  if (!isValid) return;
  userService
    .updateUserApi(user)
    .then(() => {
      fetchData();
      alert("Update success!!!");
      document.getElementsByClassName("close")[0].click();
    })
    .catch((error) => {
      console.log(error);
    });
};
window.updateUser = updateUser;
let listUser = "";
const fetchData = () => {
  userService
    .getListUserApi()
    .then((result) => {
      console.log(result.data);
      renderTable(result.data);
      listUser = result.data;
      return listUser;
    })
    .catch((error) => {
      console.log(error);
    });
};

fetchData();
