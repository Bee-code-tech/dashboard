const cryptosDom = document.querySelector('.crypto-list');
const tokenForm = document.querySelector('.token-form');
const Loading = document.querySelector('.loading');
const inputName = document.querySelector('#name');
const inputAlias = document.querySelector('#alias');
const inputRate = document.querySelector('#rate');
const inputWalletAddress = document.querySelector('#walletAddress');
const inputImgUri = document.querySelector('#imgUri');
const alertBOx = document.querySelector('.alert-box');
const alertDomDelete = document.querySelector('.alert-box-delete');

// Api endpoint
const url = "https://stackfundz.onrender.com/crypto";

   const showCryptos = async ()=>{
    Loading.style.visibility = 'visible';
    try{
        
        const {data} = await axios.get(url);
        const cryptos = data.cryptos
        if(data.length < 1){
            cryptosDom.innerHTML= `
            <h2> No tokens to display </h2> 
            `
          return  Loading.style.visibility = 'hidden'
           
        }
        const allCryptos = cryptos.map(crypto => {
            const { _id ,name,imgUri,alias,rate,walletAddress}= crypto
            console.log(_id, name, imgUri, alias, rate, walletAddress);
            return `
                     <div class="single-crypto">
                    <div class="badge">
                        <p>Created</p>
                    </div>
                    <div class="single-crypto-info">
                        <div class="img-box">
                            <img src=${imgUri} alt=${name}>
                        </div>
                        <div class="info">
                            <h1>${name}</h1>
                            <p>${alias}</p>
                            <p>Rate: ${rate}$</p>
                        </div>
                    </div>
                    <div class="additional-info">
                        <h2>Your Wallet Address:</h2>
                        <p>${walletAddress} </p>
                    </div>
                    <div class="btn-list">
                        <a href="edit-crypto.html?id=${_id}" class="btn edit">Edit</a>
                        <div class="btn delete" data-id="${_id}">Delete</div>
                    </div>
                </div>           
            `;
        }).join(' ');
        cryptosDom.innerHTML = allCryptos

    }catch (err){
        console.log(err);
      cryptosDom.innerHTML = `
      <h1 >No Cryptos To Display </h1>
      `
    }
    Loading.style.visibility = 'hidden'
}
showCryptos();


// Delete a single Token 
cryptosDom.addEventListener('click', async (e) => {
    const el = e.target
    if(el.classList.value === 'btn delete'){
        const id = el.dataset.id 
        try {
             Loading.style.visibility = "visible";
            await axios.delete(`https://stackfundz.onrender.com/crypto/${id}`);
            alertDomDelete.classList.add('active')
        } catch (error) {
            console.log(error);
        }
        setTimeout(() => {
             alertDomDelete.classList.add("active");
        }, 2000);
    }else{
        el.pointerEvent ='none'
    }
    window.location.reload(true)
    Loading.style.visibility= 'hidden'
})

// Form Submit
tokenForm.addEventListener('submit', async (e)=> {
e.preventDefault();

const name = inputName.value 
const alias = inputAlias.value 
const rate = inputRate.value 
const walletAddress= inputWalletAddress.value
const imgUri = inputImgUri.value

try {
   await axios.post(url, {name, alias, rate, walletAddress, imgUri})
//    display tokens 
   showCryptos()
//    Set back to default 
   inputName.value = ''
   inputAlias.value  = ''
   inputRate.value = ""
   inputWalletAddress.value = "";
   inputImgUri.value = ''
   alertBOx.classList.add('active')
   console.log(alertBOx);
   window.location.reload(true);
} catch (error) {
    console.log(error);
    Loading.style.visibility ='visible'
    Loading.textContent='Error Creating Token, Please Try Again '
}

setTimeout(() => {
    alertBOx.classList.remove('active')
}, 2000);

})
