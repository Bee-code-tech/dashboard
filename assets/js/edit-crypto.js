const inputName = document.querySelector("#name");
const inputAlias = document.querySelector("#alias");
const inputBuyRate = document.querySelector("#buyRate");
const inputSellRate = document.querySelector("#sellRate");
const inputImgUri = document.querySelector("#imgUri");
const inputQrCodeUri = document.querySelector("#qrCode");
const inputWalletAddress = document.querySelector("#walletAddress");
const token = document.querySelector("#token");
const submitBtn = document.querySelector("#submit");
const form = document.querySelector(".edit-content");
const alertBox = document.querySelector(".alert-box");
const alertBoxDanger = document.querySelector(".alert-box-delete");

const params = window.location.search;
const id = new URLSearchParams(params).get("id");
const url = "https://stackfundz.onrender.com/crypto";
let tempName;

const showCryptos = async () => {
  try {
    const { data } = await axios.get(
      `https://stackfundz.onrender.com/crypto/${id}`
    );
    const {
      _id: cryptoId,
      name,
      imgUri,
      alias,
      buyRate,
      sellRate,
      walletAddress,
      qrCodeUri,
    } = data.singleCrypto;
    token.innerText = cryptoId;

    inputName.value = name;
    inputAlias.value = alias;
    inputBuyRate.value = buyRate;
    inputSellRate.value = sellRate;
    inputImgUri.value = imgUri;
    inputQrCodeUri.value = qrCodeUri;
    inputWalletAddress.value = walletAddress;
  } catch (error) {
    console.log(error);
  }
};
showCryptos();

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  submitBtn.textContent = "Updating Crypto...";
  try {
    // Form data
    const newName = inputName.value;
    const newAlias = inputAlias.value;
    const newBuyRate = inputBuyRate.value;
    const newSellRate = inputSellRate.value;
    const newImgUri = inputImgUri.value;
    const newQrCodeUri = inputQrCodeUri.value;
    const newWalletAddress = inputWalletAddress.value;

    const { data } = await axios.patch(
      `https://stackfundz.onrender.com/crypto/${id}`,
      {
        name: newName,
        alias: newAlias,
        buyRate: newBuyRate,
        sellRate: newSellRate,
        imgUri: newImgUri,
        qrCodeUri: newQrCodeUri,
        walletAddress: newWalletAddress,
      }
    );

    const updated = data.crypto;
    const { name, imgUri, alias, sellRate, buyRate, qrCodeUri, walletAddress } = updated;
    // reassign new data

    inputName.value = name;
    inputAlias.value = alias;
    inputBuyRate.value = buyRate;
    inputSellRate.value = sellRate;
    inputImgUri.value = imgUri;
    inputQrCodeUri.value = qrCodeUri;
    inputWalletAddress.value = walletAddress;
    alertBox.classList.add("active");
  } catch (error) {
    alertBoxDanger.classList.add("active");
    console.log(error);
  }
  setTimeout(() => {
    alertBox.classList.remove("active");
  }, 2500);
});
