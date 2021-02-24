import { items } from './items.js';
const searchCategories = document.getElementsByClassName('search-category');
const producsContainer = document.getElementById('producsContainer');
const orderListContainer = document.getElementById('orderListContainer');
const orderTitle = document.getElementById('orderTitle');
const deleteBtns = document.getElementsByClassName('deleteBtn');
let producsContainerObserver = new MutationObserver( mutationRecords => getCurrentProductsItem())
let orderItemObserver = new MutationObserver( mutationRecords => getCurrentOrder())
let buyItemSet = new Set()
const confirmBtn = document.getElementById('confirmBtn');
const orderPayment = document.getElementById('orderPayment');

//Eventlistener--------------------------------------------------------------------
    // ----------------- searchCategories-------------------------------- 
for( let i = 0 ; i < searchCategories.length ; i++ ){
    const searchCategory = searchCategories[i];
    searchCategory.addEventListener('click', e => 
        e.stopPropagation(
        categoryMatchItem(searchCategory)))
}
producsContainerObserver.observe(producsContainer, {
    childList: true,
})
orderItemObserver.observe(orderListContainer, {
    childList: true,
})

function getCurrentOrder (){
    confirmBtn.addEventListener('click', ()=> {
        let orderItems = orderListContainer.getElementsByClassName('order-item');
        priceCalculator(orderItems)
        orderPayment.classList.remove('displayNone')
        confirmBtn.classList.add('displayNone')
    })
    for( let i = 0 ; i < deleteBtns.length ; i++ ){
        const deleteBtn = deleteBtns[i];
        deleteBtn.addEventListener('click',  ()=>{
            deleteBtn.parentNode.parentNode.remove()
        })
    }
}
function priceCalculator(orderItems){
    let totalPrice = 0;
    for( let i = 0 ; i < orderItems.length ; i++ ){ 
        const orderItem = orderItems[i];
        const orderItemQuantity = parseInt(orderItem.querySelector('.item-quantity').value);
        const orderItemPrice = Number(orderItem.querySelector('.item-price').innerHTML.replace('$', ''));
        const orderPrice = (orderItemQuantity * ( orderItemPrice * 10 )) /10
        totalPrice += orderPrice;
    }
    const itemContent = `<span >Thank you very much for your purchase.</span><br><span >The total amount is $ ${totalPrice}</span>`;
    const itemClass = 'order-item alignCenter';
    orderListContainer.innerHTML = '';
    orderTitle.innerHTML = '';
    producsContainer.remove();
    appendItem(itemContent ,itemClass ,orderListContainer)
}

function getCurrentProductsItem(){
    let buyBtns = Array.from(document.getElementsByClassName('buyBtn'))
    for( let i = 0 ; i < buyBtns.length ; i++ ){
        const buyBtn = buyBtns[i];
        buyBtn.addEventListener('click', e =>{
            const buyBtnId = buyBtn.id.replace("item", " ") 
            if(!buyItemSet.has(buyBtnId)){
                orderItemBuild(buyBtnId);
                buyItemSet.add(buyBtnId);
                alert('Added!! ^_^')
            }
        })
    }
}
function categoryMatchItem (searchCategory){
    producsContainer.innerHTML = '';  
    let newItemsList;
    for(let i = 0; i < items.length; i++){
        if(searchCategory.id !== 'all'){
            let newSearchCategory = searchCategory.id;
            newItemsList = items.filter(item =>  item.category == newSearchCategory);
        }else{
            newItemsList = items;
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
                <h2>${name}</h2>
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
            <input type="number" min="1" max="10" value="1" class="item-quantity" id="quantity${buyItemId}" required>
            <button class="deleteBtn"><i class="far fa-trash-alt"></i></button>    
        </div>`
    appendItem(orderContent, orderItemClass, orderListContainer)
}
function appendItem (itemContent, itemClass, container){
    const itemBox = document.createElement('div');
    itemBox.setAttribute("class", itemClass);
    itemBox.innerHTML = itemContent;
    container.appendChild(itemBox)
}
