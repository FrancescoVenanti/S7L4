const url = "https://striveschool-api.herokuapp.com/api/product/";
const apiKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTcxYzc1MjBkOGEyMDAwMThhNDhhMzQiLCJpYXQiOjE3MDE5NTU0MTAsImV4cCI6MTcwMzE2NTAxMH0.M82PhenHeSTT56TnZ_WPaWfbwtuVE8LMloUt58_o0U4";

const fetcher = () => {
  fetch(url, {
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      console.log(response);

      if (!response.ok) throw new Error("Errore");
      return response.json();
    })
    .then((products) => {
      const spinner = document.getElementById("spinner");
      spinner.classList.add("d-none");
      console.log(products);
      const div = document.getElementById("product-list");
      products.forEach((product) => {
        const container = document.createElement("div");
        container.classList.add("col-12", "col-md-6");
        const productContainer = document.createElement("div");
        productContainer.className = "row shadow p-3 h-100";
        const smallImgContainer = document.createElement("div");
        smallImgContainer.classList.add("col-6");
        const phoneImg = document.createElement("img");
        phoneImg.classList.add("img-fluid", "rounded", "h-100", "object-fit-cover");
        phoneImg.src = product.imageUrl;
        const textContainer = document.createElement("div");
        textContainer.className = "col-6 d-flex flex-column py-3";
        const name = document.createElement("h5");
        name.innerText = product.name;
        const descr = document.createElement("p");
        descr.innerText = product.description;
        descr.classList.add("fs-6", "mb-5");
        const price = document.createElement("p");
        price.innerText = "Prezzo: " + product.price + "€";
        price.className = "fs-6 text-success fw-bolder";
        const btnDiv = document.createElement("div");
        btnDiv.className = "mt-auto row justify-content-between";
        const btnDetails = document.createElement("a");
        btnDetails.href = "./details.html?resourceId=" + product._id; /* da modificare */
        btnDetails.id = "details";
        btnDetails.className = "btn btn-success col-5 col-md-12 col-lg-5 col-xl-4 ";
        btnDetails.innerText = "Dettagli";
        const btnMod = document.createElement("a");
        btnMod.id = "modify";
        btnMod.className = "btn btn-warning col-5 col-md-12 col-lg-5 col-xl-4 ";
        btnMod.innerText = "modifica";
        btnMod.href = "./backoffice.html?resourceId=" + product._id; /* da modificare */

        container.appendChild(productContainer);
        productContainer.appendChild(smallImgContainer);

        smallImgContainer.appendChild(phoneImg);
        div.appendChild(container);

        productContainer.appendChild(textContainer);
        textContainer.appendChild(name);
        textContainer.appendChild(descr);
        textContainer.appendChild(price);
        btnDiv.appendChild(btnDetails);
        btnDiv.appendChild(btnMod);
        textContainer.appendChild(btnDiv);
      });
    })
    .catch((error) => new Error(error));
};

window.addEventListener("DOMContentLoaded", () => {
  fetcher();
});
