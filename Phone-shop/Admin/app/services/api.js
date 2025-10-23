class Servive {
  fetchListData() {

    const promise = axios({
      url: "https://68c0fac20b196b9ce1c57c5c.mockapi.io/infoPhone",
      method: "GET",
    });

    return promise;
  }

  deleteProductApi(id) {
    const promise = axios({
      url: `https://68c0fac20b196b9ce1c57c5c.mockapi.io/infoPhone/${id}`,
      method: "DELETE",
    });

    return promise;
  }

  addProductApi(product) {
    const promise = axios({
      url: `https://68c0fac20b196b9ce1c57c5c.mockapi.io/infoPhone`,
      method: "POST",
      data: product,
    });

    return promise;
  }

  getProductByIdApi(id) {
    const promise = axios({
      url: `https://68c0fac20b196b9ce1c57c5c.mockapi.io/infoPhone/${id}`,
      method: "GET",
    });

    return promise;
  }

  updateProductApi(product) {
    const promise = axios({
      url: `https://68c0fac20b196b9ce1c57c5c.mockapi.io/infoPhone/${product.id}`,
      method: "PUT",
      data: product,
    });

    return promise;
  }
}

export default new Servive();
