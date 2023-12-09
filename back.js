const showImg = function () {
  const imgCont = document.getElementById("imgCont");
  if (imgCont.innerHTML == "") {
    imgCont.classList.add("d-none");
  } else {
    imgCont.classList.remove("d-none");
  }
};

const isValidImageUrl = function (url) {
  return url.match(/\.(jpeg|jpg|gif|png|webp)$/) != null;
};

const previewImg = function () {
  const imgCont = document.getElementById("imgCont");
  const imgPrev = document.createElement("img");

  if (isValidImageUrl(document.getElementById("prodImg").value)) {
    imgCont.innerHTML = "";
    imgPrev.src = document.getElementById("prodImg").value;
    imgPrev.className = "object-fit-cover shadow rounded mw-100";
    imgCont.appendChild(imgPrev);
    showImg();
  } else {
    imgCont.innerHTML = "";
    showImg();
    alert("inserisci un link valido"); /* da modificare */
  }
};

const createProduct = function () {
  const method = "POST";
  fetcher(method);
};

const modifyProduct = function () {
  const method = "PUT";
  fetcher(method);
};

const deleteProduct = function () {
  const method = "DELETE";
  const hasConfirmed = confirm("sei sicuro di voler eliminare questo prodotto?");

  if (hasConfirmed) {
    fetcher(method);
    setTimeout(() => {
      window.location.assign("./index.html");
    }, 2000);
  }
};

const apiKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTcxYzc1MjBkOGEyMDAwMThhNDhhMzQiLCJpYXQiOjE3MDE5NTU0MTAsImV4cCI6MTcwMzE2NTAxMH0.M82PhenHeSTT56TnZ_WPaWfbwtuVE8LMloUt58_o0U4";
const resourceId = new URLSearchParams(window.location.search).get("resourceId");
console.log("RESOURCE ID: ", resourceId);
const url = resourceId
  ? "https://striveschool-api.herokuapp.com/api/product/" + resourceId
  : "https://striveschool-api.herokuapp.com/api/product/";
console.log("URL: ", url);

const fetcher = function (method) {
  const productNew = {
    brand: document.getElementById("prodBrand").value,
    description: document.getElementById("prodDescription").value,
    imageUrl: document.getElementById("prodImg").value,
    name: document.getElementById("prodName").value,
    price: document.getElementById("prodPrice").value,
  };

  fetch(url, {
    method: method,
    body: JSON.stringify(productNew),
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
  })
    .then((resp) => resp.json())
    .then((productObj) => {
      const spinner = document.getElementById("spinner");
      spinner.classList.add("d-none");
      const message = document.getElementById("message");
      if (method == "POST") {
        console.log("creata");
        message.innerHTML = `<div class="alert alert-primary" role="alert">
        PRODOTTO CREATO!
      </div>`;
        var form = document.getElementById("form");
        form.reset();
      } else {
        if (method == "PUT") {
          console.log("modificata");
          message.innerHTML = `<div class="alert alert-warning" role="alert">
        PRODOTTO MODIFICATO!
      </div>`;
        } else {
          console.log("eliminata");
          message.innerHTML = `<div class="alert alert-danger" role="alert">
        PRODOTTO ELIMINATO!
      </div>`;
        }
      }
    })
    .catch((error) => new Error(error));
};

window.onload = () => {
  const preview = document.getElementById("preview");
  preview.addEventListener("click", previewImg);

  const create = document.getElementById("create");
  create.addEventListener("click", createProduct);
  const modify = document.getElementById("modify");
  modify.addEventListener("click", modifyProduct);
  const deleteProd = document.getElementById("delete");
  deleteProd.addEventListener("click", deleteProduct);
  if (resourceId) {
    create.classList.add("d-none");
    fillForm();
  } else {
    const spinner = document.getElementById("spinner");
    spinner.classList.add("d-none");
    modify.classList.add("d-none");
    deleteProd.classList.add("d-none");
    create.classList.add("mx-auto");
  }
};

const fillForm = function () {
  fetch(url, {
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
  })
    .then((r) => r.json())
    .then((productObj) => {
      const spinner = document.getElementById("spinner");
      spinner.classList.add("d-none");
      document.getElementById("prodBrand").value = productObj.brand;
      document.getElementById("prodDescription").value = productObj.description;
      document.getElementById("prodImg").value = productObj.imageUrl;
      document.getElementById("prodName").value = productObj.name;
      document.getElementById("prodPrice").value = productObj.price;
      const imgCont = document.getElementById("imgCont");
      let img = document.createElement("img");
      img.className = "object-fit-cover shadow rounded mw-100";
      img.src = productObj.imageUrl;
      imgCont.appendChild(img);
    })
    .catch((error) => new Error(error));
};
