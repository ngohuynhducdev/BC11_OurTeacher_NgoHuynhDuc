const getEle = (id) => document.getElementById(id);

export default class Validation {
  kiemTraRong(input, divId, mess) {
    if (input === "") {
      // show thông báo
      getEle(divId).innerHTML = mess;
      getEle(divId).style.display = "block";
      return false;
    }
    getEle(divId).innerHTML = "";
    return true;
  }

  kiemTraDoDaiKyTu(input, divId, mess, min, max) {
    if (input.trim().length >= min && input.trim().length <= max) {
      getEle(divId).innerHTML = "";
      return true;
    }
    getEle(divId).innerHTML = mess;
    getEle(divId).style.display = "block";
    return false;
  }

  kiemTraKyTu(input, divId, mess) {
    var letter =
      "^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" +
      "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" +
      "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]+$";
    if (input.match(letter)) {
      getEle(divId).innerHTML = "";
      return true;
    }
    getEle(divId).innerHTML = mess;
    getEle(divId).style.display = "block";
    return false;
  }

  kiemTraEmail(input, divId, mess) {
    var email = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (input.match(email)) {
      getEle(divId).innerHTML = "";
      return true;
    }
    getEle(divId).innerHTML = mess;
    getEle(divId).style.display = "block";
    return false;
  }

  kiemTraMatKhau(input, divId, mess) {
    var password =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{0,}$/;
    if (input.match(password)) {
      getEle(divId).innerHTML = "";
      return true;
    }
    getEle(divId).innerHTML = mess;
    getEle(divId).style.display = "block";
    return false;
  }

  kiemTraSelect(idSelect, divId, mess) {
    if (getEle(idSelect).selectedIndex !== 0) {
      getEle(divId).innerHTML = "";
      return true;
    }
    getEle(divId).innerHTML = mess;
    getEle(divId).style.display = "block";
    return false;
  }

  kiemTraTaiKhoanTrung(input, divId, mess, list) {
    var status = true;
    for (var i = 0; i < list.length; i++) {
      if (list[i].taiKhoan === input) {
        status = false;
        break;
      }
    }
    if (status) {
      getEle(divId).innerHTML = "";
      return true;
    }
    getEle(divId).innerHTML = mess;
    getEle(divId).style.display = "block";
    return false;
  }
}
