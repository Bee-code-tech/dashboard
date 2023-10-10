const inputName = document.querySelector('#name');
const inputAlias = document.querySelector('#alias');
const inputRate = document.querySelector('#rate');
const inputImgUri = document.querySelector('#imgUri');
const inputWalletAddress = document.querySelector('#walletAddress');
const token = document.querySelector('#token');
const submitBtn = document.querySelector('#submit');
const form = document.querySelector('.edit-content')
const alertBox= document.querySelector('.alert-box')
const alertBoxDanger= document.querySelector('.alert-box-delete')

const params = window.location.search
const id = new URLSearchParams(params).get('id')
const url = 'https://stackfundz.onrender.com/crypto'
let tempName

const showCryptos = async ()=>{
    try {
        const {data} = await axios.get(`https://stackfundz.onrender.com/crypto/${id}`)
        const {
          _id: cryptoId,
          name,
          imgUri,
          alias,
          rate,
          walletAddress,
        } = data.singleCrypto;
        token.innerText = cryptoId

        
        inputName.value = name;
         inputAlias.value = alias;
         inputRate.value = rate
         inputImgUri.value = imgUri
         inputWalletAddress.value = walletAddress

    } catch (error) {
        console.log(error);
    }
}
showCryptos()

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    submitBtn.textContent = 'Updating Crypto...'
    try {
        // Form data 
            const newName = inputName.value
            const newAlias = inputAlias.value
            const newRate = inputRate.value
            const newImgUri = inputImgUri.value
            const newWalletAddress = inputWalletAddress.value

            const {data} = await axios.patch(`https://stackfundz.onrender.com/crypto/${id}`, {name: newName, alias: newAlias, rate: newRate, imgUri: newImgUri, walletAddress: newWalletAddress})

            const updated = data.crypto 
            const {
              name,
              imgUri,
              alias,
              rate,
              walletAddress,
            } = updated;
            // reassign new data 

             
        inputName.value = name;
        inputAlias.value = alias;
        inputRate.value = rate;
        inputImgUri.value = imgUri;
        inputWalletAddress.value = walletAddress;
        alertBox.classList.add('active')
        
    } catch (error) {
        alertBoxDanger.classList.add('active')
        console.log(error);
    }
    setTimeout(() => {
         alertBox.classList.remove("active");
    }, 2500);
})
