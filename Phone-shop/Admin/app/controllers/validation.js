function getId(id) {
  return document.getElementById(id);
}

export default class Validation {
  checkEmpty(value, divId, mess) {
    if (value.toString().trim() === "") {
      getId(divId).innerHTML = mess;
      getId(divId).style.display = "block";
      return false;
    }
    getId(divId).innerHTML = "";
    getId(divId).style.display = "none";
    return true;
  }

  checkOption(idSelect, divId, mess) {
    const element = getId(idSelect);
    if (element.selectedIndex !== 0) {
      getId(divId).innerHTML = "";
      getId(divId).style.display = "none";
      return true;
    }
    getId(divId).innerHTML = mess;
    getId(divId).style.display = "block";
    return false;
  }

  checkCharacter(value, divId, mess) {
    const letter = /^[A-Za-z\s]+$/;
    if (letter.test(value)) {
      getId(divId).innerHTML = "";
      getId(divId).style.display = "none";
      return true;
    }
    getId(divId).innerHTML = mess;
    getId(divId).style.display = "block";
    return false;
  }

  checkNumber(value, divId, mess) {
    const letter = /^[0-9]+$/;
    if (letter.test(value)) {
      getId(divId).innerHTML = "";
      getId(divId).style.display = "none";
      return true;
    }
    getId(divId).innerHTML = mess;
    getId(divId).style.display = "block";
    return false;
  }

  checkExistedId(value, divId, mess, listFood) {
    let exist = listFood.some(food => food.id === value);
    if (exist) {
      getId(divId).innerHTML = mess;
      getId(divId).style.display = "block";
      return false;
    }
    getId(divId).innerHTML = "";
    getId(divId).style.display = "none";
    return true;
  }

  checkLength(value, divId, mess, min, max) {
    if (value.length < min || value.length > max) {
      getId(divId).innerHTML = mess;
      getId(divId).style.display = "block";
      return false;
    }
    getId(divId).innerHTML = "";
    getId(divId).style.display = "none";
    return true;
  }

  checkEmail(value, divId, mess) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailPattern.test(value)) {
      getId(divId).innerHTML = "";
      getId(divId).style.display = "none";
      return true;
    }
    getId(divId).innerHTML = mess;
    getId(divId).style.display = "block";
    return false;
  }

  checkPassword(value, divId, mess) {
    // ít nhất 1 số, 1 chữ hoa, 1 ký tự đặc biệt
    const pwPattern = /^(?=.*[0-9])(?=.*[A-Z])(?=.*\W).{6,}$/;
    if (pwPattern.test(value)) {
      getId(divId).innerHTML = "";
      getId(divId).style.display = "none";
      return true;
    }
    getId(divId).innerHTML = mess;
    getId(divId).style.display = "block";
    return false;
  }

  checkDate(value, divId, mess) {
    // Định dạng mm/dd/yyyy
    const datePattern = /^(0[1-9]|1[0-2])\/(0[1-9]|[12]\d|3[01])\/\d{4}$/;
    if (datePattern.test(value)) {
      getId(divId).innerHTML = "";
      getId(divId).style.display = "none";
      return true;
    }
    getId(divId).innerHTML = mess;
    getId(divId).style.display = "block";
    return false;
  }

  checkRange(value, divId, mess, min, max) {
    if (value < min || value > max) {
      getId(divId).innerHTML = mess;
      getId(divId).style.display = "block";
      return false;
    }
    getId(divId).innerHTML = "";
    getId(divId).style.display = "none";
    return true;
  }
}
