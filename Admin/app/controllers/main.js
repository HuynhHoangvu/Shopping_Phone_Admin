import service from "./../services/api.js";
import Product from "./../models/product.js";
import Validation from "./validation.js";
const val = new Validation();
let allProduct = [];

function getId(id) {
  return document.getElementById(id);
}

function getListProduct() {
  const promise = service.fetchListData();
  getId("loader").style.display = "block";

  promise
    .then(function (result) {
      allProduct = result.data; // ✅ lưu sản phẩm
      renderHTML(allProduct);
      getId("loader").style.display = "none";
    })
    .catch(function (error) {
      console.log(error);
      getId("loader").style.display = "none";
    });
}


function renderHTML(data) {
  let contentHTML = "";

  for (let i = 0; i < data.length; i++) {
    const product = data[i];
    contentHTML += `
        <tr>
            <td>${product.name}</td>
            <td>${product.price}</td>
            <td>${product.screen}</td>
            <td>${product.backCamera}</td>
            <td>${product.fontCamera}</td>
            <td>
            <img src="../../../img/${product.image}.jpg" width="100"/>
            </td>
            <td>${product.desc}</td>
            <td>${product.type}</td>

            <td>
              <button class="btn btn-info" data-toggle="modal" data-target="#myModal" onclick="onEditProduct(${product.id
      })">Edit</button>
              <button class="btn btn-danger" onclick="onDelete(${product.id
      })">Delete</button>
            </td>
        </tr>
    `;
    console.log(product)
  }

  getId("tblDanhSachSP").innerHTML = contentHTML;
}

getListProduct();

/**
 * Delete
 */
function onDelete(id) {
  const promise = service.deleteProductApi(id);

  //pending => loader show
  getId("loader").style.display = "block";

  promise
    .then(function (result) {
      // re-render list product
      getListProduct();

      // loader hide
      getId("loader").style.display = "none";
    })
    .catch(function (error) {
      console.log(error);
      // loader hide
      getId("loader").style.display = "none";
    });
}
window.onDelete = onDelete;

/**
 * btnThemSP => Open Modal
 */
getId("btnThemSP").addEventListener("click", function () {
  // Update title Modal
  document.getElementsByClassName("modal-title")[0].innerHTML = "Add Product";

  // Create button "Add Product" => innerHTML ModalFooter
  const btnAddProduct = `<button class="btn btn-primary" onclick="onAddProduct()">Add Product</button>`;
  document.getElementsByClassName("modal-footer")[0].innerHTML = btnAddProduct;
});

/**
 * Add Product
 */
function onAddProduct() {
  // Lấy thông tin từ user nhập liệu
  const name = getId("TenSP").value;
  const price = getId("GiaSP").value;
  const screen = getId("ManHinhSP").value;
  const backCamera = getId("CamSauSP").value;
  const fontCamera = getId("CamTruocSP").value;
  const image = getId("HinhSP").value;
  const desc = getId("MoTa").value;
  const type = getId("LoaiSP").value;

  // ✅ Validation
  let isValid = true;
  isValid &= val.checkEmpty(name, "tbTenSP", "Tên sản phẩm không được để trống")
          && val.checkCharacter(name, "tbTenSP", "Tên sản phẩm chỉ chứa ký tự chữ");

  isValid &= val.checkEmpty(price, "tbGiaSP", "Giá không được để trống")
          && val.checkNumber(price, "tbGiaSP", "Giá chỉ được nhập số");

  isValid &= val.checkEmpty(screen, "tbManHinhSP", "Màn hình không được để trống");

  isValid &= val.checkEmpty(backCamera, "tbCamSauSP", "Camera sau không được để trống");

  isValid &= val.checkEmpty(fontCamera, "tbCamTruocSP", "Camera trước không được để trống");

  isValid &= val.checkEmpty(image, "tbHinhSP", "Hình ảnh không được để trống");

  isValid &= val.checkEmpty(desc, "tbMoTa", "Mô tả không được để trống")
          && val.checkLength(desc, "tbMoTa", "Mô tả phải từ 5 - 50 ký tự", 5, 50);

  isValid &= val.checkOption("LoaiSP", "tbLoaiSP", "Vui lòng chọn loại sản phẩm");

  // Nếu có lỗi => return
  if (!isValid) return;

  // ✅ Nếu hợp lệ thì tạo object
  const product = new Product("", name, price, screen, backCamera, fontCamera, image, desc, type);

  // Loader
  getId("loader").style.display = "block";
  service
    .addProductApi(product)
    .then(function (result) {
      getId("loader").style.display = "none";
      alert(`Add product ${result.data.name} success!`);
      document.getElementsByClassName("close")[0].click();
      getListProduct();
    })
    .catch(function (error) {
      getId("loader").style.display = "none";
      console.log(error);
    });
}

window.onAddProduct = onAddProduct;

/**
 * Edit Product
 */
function onEditProduct(id) {
  // Update title Modal
  document.getElementsByClassName("modal-title")[0].innerHTML =
    "Update Product";

  // Create button "Add Product" => innerHTML ModalFooter
  const btnUpdateProduct = `<button class="btn btn-warning" onclick="onUpdateProduct(${id})">Update Product</button>`;
  document.getElementsByClassName("modal-footer")[0].innerHTML =
    btnUpdateProduct;

  //pending => loader show
  getId("loader").style.display = "block";

  service
    .getProductByIdApi(id)
    .then(function (result) {
      getId("loader").style.display = "none";
      // popuplate product => inputs
      const data = result.data;
      getId("TenSP").value = data.name;
      getId("GiaSP").value = data.price;
      getId("ManHinhSP").value = data.screen;
      getId("CamSauSP").value = data.backCamera;
      getId("CamTruocSP").value = data.fontCamera;
      getId("HinhSP").value = data.image;
      getId("MoTa").value = data.desc;
      getId("LoaiSP").value = data.type;

    })
    .catch(function (error) {
      console.log(error);
      getId("loader").style.display = "none";
    });
}
window.onEditProduct = onEditProduct;

/**
 * Update Product
 */
function onUpdateProduct(id) {
  const name = getId("TenSP").value;
  const price = getId("GiaSP").value;
  const screen = getId("ManHinhSP").value;
  const backCamera = getId("CamSauSP").value;
  const fontCamera = getId("CamTruocSP").value;
  const image = getId("HinhSP").value;
  const desc = getId("MoTa").value;
  const type = getId("LoaiSP").value;

  let isValid = true;
  isValid &= val.checkEmpty(name, "tbTenSP", "Tên sản phẩm không được để trống")
          && val.checkCharacter(name, "tbTenSP", "Tên sản phẩm chỉ chứa ký tự chữ");

  isValid &= val.checkEmpty(price, "tbGiaSP", "Giá không được để trống")
          && val.checkNumber(price, "tbGiaSP", "Giá chỉ được nhập số");

  isValid &= val.checkEmpty(screen, "tbManHinhSP", "Màn hình không được để trống");

  isValid &= val.checkEmpty(backCamera, "tbCamSauSP", "Camera sau không được để trống");

  isValid &= val.checkEmpty(fontCamera, "tbCamTruocSP", "Camera trước không được để trống");

  isValid &= val.checkEmpty(image, "tbHinhSP", "Hình ảnh không được để trống");

  isValid &= val.checkEmpty(desc, "tbMoTa", "Mô tả không được để trống")
          && val.checkLength(desc, "tbMoTa", "Mô tả phải từ 5 - 50 ký tự", 5, 50);

  isValid &= val.checkOption("LoaiSP", "tbLoaiSP", "Vui lòng chọn loại sản phẩm");

  if (!isValid) return;

  const product = new Product(id, name, price, screen, backCamera, fontCamera, image, desc, type);

  getId("loader").style.display = "block";
  service
    .updateProductApi(product)
    .then(function (result) {
      getId("loader").style.display = "none";
      alert(`Update ${result.data.name} success!`);
      document.getElementsByClassName("close")[0].click();
      getListProduct();
    })
    .catch(function (error) {
      getId("loader").style.display = "none";
      console.log(error);
    });
}

window.onUpdateProduct = onUpdateProduct;
// Tìm kiếm sản phẩm 
getId("txtSearch").addEventListener("keyup",function () {
  const keyword = this.value.toLowerCase();

  const filteredProducts = allProduct.filter(product => product.name.toLowerCase().includes(keyword));
  renderHTML(filteredProducts)
})
// Sắp xếp giá tiền
getId("sapXep").addEventListener("change",function(){
  const value = this.value;

  let sorted = [...allProduct];

  if (value === "0") {
    sorted.sort((a,b) => b.price - a.price)
  } else if(value === "1"){
    sorted.sort((a,b)=> a.price - b.price)
  }

  renderHTML(sorted);
})