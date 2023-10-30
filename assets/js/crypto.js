const cryptosDom = document.querySelector('.crypto-list');
const tokenForm = document.querySelector('.token-form');
const Loading = document.querySelector('.loading');
const inputName = document.querySelector('#name');
const inputAlias = document.querySelector('#alias');
const inputBuyRate = document.querySelector('#buyRate');
const inputSellRate = document.querySelector('#sellRate');
const inputWalletAddress = document.querySelector('#walletAddress');
const inputImgUri = document.querySelector('#imgUri');
const alertBOx = document.querySelector('.alert-box');
const alertDomDelete = document.querySelector('.alert-box-delete');
const cryptoNumber = document.querySelector('.crypto-number')
const userNumber = document.querySelector('.user-number')

// Api endpoint
const url = "https://stackfundz.onrender.com/crypto";

window.addEventListener('DOMContentLoaded', async () => {
    const users = await axios.get('http://localhost:3006/users')
    userNumber.innerText = users.data.users.length;
     
    const usersList = users.data.users

    usersList.map((user) =>  {
        const {name, email, createdAt} = user
        return `
            <div class="data names">
                        <span class="data-title">Username</span>
                        <span class="data-list">John Doe</span>
                        <span class="data-list">Pablo Richie</span>
                        <span class="data-list">Jide Money</span>
                    </div>
                    <div class="data email">
                        <span class="data-title">Email</span>
                        <span class="data-list">johndoe@gmail.com</span>
                        <span class="data-list">pablorichie@gmail.com</span>
                        <span class="data-list">jidemoney@gmail.com</span>
                    </div>
                    <div class="data joined">
                        <span class="data-title">Date</span>
                        <span class="data-list">2022-02-12</span>
                        <span class="data-list">2022-02-12</span>
                        <span class="data-list">2022-02-13</span>
                    </div>
                    <div class="data type">
                        <span class="data-title">Status</span>
                        <span class="data-list">New</span>
                        <span class="data-list">Member</span>
                        <span class="data-list">Member</span>
                    </div>
                    <div class="data status">
                        <span class="data-title">Payment</span>
                        <span class="data-list">Verified</span>
                        <span class="data-list">Non verified</span>
                        <span class="data-list">Verified</span>
                    </div>
        `;
    })
   const {data} = await axios.get(url)
   cryptoNumber.innerText = data.cryptos.length
})

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
            const { _id ,name,imgUri,alias,buyRate,sellRate,walletAddress}= crypto
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
                            <p> Buy Rate: ${buyRate}$</p>
                            <p>Sell Rate: ${sellRate}$</p>
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
const buyRate = inputBuyRate.value 
const sellRate = inputSellRate.value 
const walletAddress= inputWalletAddress.value
const imgUri = inputImgUri.value

try {
   await axios.post(url, {name, alias, buyRate,sellRate, walletAddress, imgUri})
//    display tokens 
   showCryptos()
//    Set back to default 
   inputName.value = ''
   inputAlias.value  = ''
   inputBuyRate.value = ""
   inputSellRate.value = ""
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
