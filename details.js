const url = "https://striveschool-api.herokuapp.com/api/product/";
const apiKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTcxYzc1MjBkOGEyMDAwMThhNDhhMzQiLCJpYXQiOjE3MDE5NTU0MTAsImV4cCI6MTcwMzE2NTAxMH0.M82PhenHeSTT56TnZ_WPaWfbwtuVE8LMloUt58_o0U4";

const productId = new URLSearchParams(window.location.search).get("resourceId");
console.log(productId);

const fetcher = function () {
  fetch(url + productId, {
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
  })
    .then((r) => r.json())
    .then((productObj) => {
      const spinner = document.getElementById("spinner");
      spinner.classList.add("d-none");
      document.title = "Dettagli " + productObj.name;

      const imgContainer = document.getElementById("imgContainer");
      const img = document.createElement("img");
      img.classList.add("img-fluid", "rounded", "h-100", "object-fit-cover", "shadow");
      img.src = productObj.imageUrl;
      imgContainer.appendChild(img);

      const textContainer = document.getElementById("textContainer");
      const h2 = document.createElement("h2");
      h2.classList.add("display-3");
      h2.innerText = productObj.name;
      const descr = document.createElement("p");
      descr.classList.add("display-6", "mt-3");
      descr.innerText = productObj.description;
      const price = document.createElement("p");
      price.classList.add("fs-3", "text-success", "mt-4");
      price.innerText = "Prezzo: " + productObj.price + "€";
      const btn = document.createElement("a");
      btn.href = "./backoffice.html?resourceId=" + productObj._id; /* da modificare */
      btn.className = "btn btn-warning mt-auto px-5 align-self-start fs-4";
      btn.innerText = "Modifica";

      textContainer.appendChild(h2);
      textContainer.appendChild(descr);
      textContainer.appendChild(price);
      textContainer.appendChild(btn);
    })
    .catch((error) => new Error(error));
};

window.addEventListener("DOMContentLoaded", () => {
  fetcher();
});
