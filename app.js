import { items } from './items.js';
const resetBtn = document.getElementById('resetBtn');
const searchCategories = document.getElementsByClassName('search-category');
const producsContainer = document.getElementById('producsContainer')
const orderListContainer = document.getElementById('orderListContainer')
const deleteBtns = document.getElementsByClassName('deleteBtn');
let producsContainerObserver = new MutationObserver( mutationRecords => getCurrentProductsItem())
// let deleteIteObserver = new MutationObserver( mutationRecords => delete())
let buyItemSet = new Set()

//Confrim Btn & Payment Shows
const confirmBtn = document.getElementById('confirmBtn');
const orderPayment = document.getElementById('orderPayment');

producsContainerObserver.observe(producsContainer, {
    childList: true,
})


function getCurrentProductsItem(){
    let buyBtns = Array.from(document.getElementsByClassName('buyBtn'))
    for( let i = 0 ; i < buyBtns.length ; i++ ){
        const buyBtn = buyBtns[i];
        buyBtn.addEventListener('click', e =>{
            const buyBtnId = buyBtn.id.replace("item", " ") 
            if(!buyItemSet.has(buyBtnId)){
                orderItemBuild(buyBtnId);
                buyItemSet.add(buyBtnId);
            }
        })
    }
}


//Eventlistener--------------------------------------------------------------------
    // resetBtn.addEventListener('click', reset)
    // ----------------- searchCategories-------------------------------- 
    for( let i = 0 ; i < searchCategories.length ; i++ ){
        const searchCategory = searchCategories[i];
        searchCategory.addEventListener('click', e => 
            e.stopPropagation(
            categoryMatchItem(searchCategory)))
    }

    // ----------------- CORFIRM Btn-------------------------------- 
    confirmBtn.addEventListener('click', ()=> {
        calculateTotalPrice()
        orderPayment.classList.remove('displayNone')
    })


    for( let i = 0 ; i < deleteBtns.length ; i++ ){
        const deleteBtn = deleteBtns[i];
        deleteBtn.addEventListener('click',  ()=>{
            deleteBtn.parentNode.parentNode.remove()
        })
    }

// --------------------- Item Match, Build &  Append  ---------------------
function categoryMatchItem (searchCategory){
    producsContainer.innerHTML = '';  
    let newItemsList;
    for(let i = 0; i < items.length; i++){
        if(searchCategory.id !== 'all'){
            let newSearchCategory = searchCategory.id;
            newItemsList = items.filter(item =>  item.category == newSearchCategory);
        }else{
            newItemsList = items   
        }
    }
    productBuild(newItemsList)
}

function productBuild (newItemsList){
    for( let i = 0; i < newItemsList.length; i++){
        const id = newItemsList[i].id;
        const name = newItemsList[i].name;
        const price = newItemsList[i].price;
        const productClass = 'product-item'
        const itemContent = `
            <div class="item-name">
                <h1>${name}</h1>
            </div>
            <div class="item-img">
                <img src="/img/item${id}.png" alt="">
            </div>
            <div class="item-info">
                <span>Price: $${price}</span>
            </div>
            <button class="buyBtn" id="item${id}">
                <i class="fas fa-shopping-basket"></i>
            </button>
        `
        appendItem(itemContent, productClass, producsContainer)   
    }
}
function orderItemBuild(buyItemId){
    const buyItemIdIndex = buyItemId - 1
    const name =  items[buyItemIdIndex].name;
    const price = items[buyItemIdIndex].price;
    const orderItemClass = 'order-item'
    const orderContent = `
        <div class="order-item-info">
            <span class="item-name">${name}</span>
            <span class="item-price">$ ${price}</span>
        </div>
        <div>
            <input type="number" min="1" max="10" value="1" class="item-amount" id="amount ${buyItemId}" required>
            <button class="deleteBtn"><i class="far fa-trash-alt"></i></button>    
        </div>
        `
    appendItem(orderContent, orderItemClass, orderListContainer)
}

function appendItem (itemContent, itemClass, container){
    const itemBox = document.createElement('div');
    itemBox.setAttribute("class", itemClass);
    itemBox.innerHTML = itemContent;
    container.appendChild(itemBox)
}


function calculateTotalPrice (){
    for (let v of buyItemSet.values()){
        let itemAmount = document.getElementById('amount17').value;

        console.log(itemAmount)
        console.log(typeof(itemAmount))

    }
}






// --------------------- Order Calculator  ---------------------
// const priceCount = ()=>{
//     let totalOrderPrice = 0
//     for (let i = 0; i < itemPrices.length; i++){
//         const itemPrice = parseInt(itemPrices[i].innerHTML.replace('$', ''));
//         const itemAmount = parseInt(itemAmounts[i].value);
//          totalOrderPrice =  totalOrderPrice + (itemPrice * itemAmount);
//     }
//     totalPriceAppend(totalOrderPrice)
// }
// ---------------------Order List Calculate & Append---------------------
// const totalPriceAppend = (totalOrderPrice)=>{
//     const paymentPrice = document.getElementById('paymentPrice');
//     paymentPrice.innerHTML = '';
//     const totalPrice = document.createElement('span');
//     totalPrice.classList.add('span');
//     totalPrice.innerHTML = `
//         <button class="countBtn" id="countBtn">COUNT</button>
//         <span class="totalPrice" id="totalPrice">Total $ ${totalOrderPrice}</span>
//     `;
//     paymentPrice.appendChild(totalPrice)
// }

