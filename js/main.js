// 购物车本地存储工具
const Cart = {
    getCart() {
        let cart = localStorage.getItem("baixingCart");
        return cart ? JSON.parse(cart) : [];
    },
    saveCart(cartList) {
        localStorage.setItem("baixingCart", JSON.stringify(cartList));
        this.renderCartCount();
    },
    addGoods(item) {
        let list = this.getCart();
        let exist = list.find(v => v.id === item.id);
        if(exist){
            exist.num += 1;
        }else{
            list.push({...item, num:1});
        }
        this.saveCart(list);
        alert("已加入购物车！");
    },
    delGoods(id) {
        let list = this.getCart().filter(v=>v.id !== id);
        this.saveCart(list);
        window.location.reload();
    },
    changeNum(id, type) {
        let list = this.getCart();
        let target = list.find(v=>v.id === id);
        if(type == "plus") target.num++;
        if(type == "minus" && target.num>1) target.num--;
        this.saveCart(list);
        window.location.reload();
    },
    clearAll() {
        this.saveCart([]);
        window.location.reload();
    },
    renderCartCount() {
        const cartList = this.getCart();
        let total = cartList.reduce((sum,item)=>sum+item.num,0);
        const badge = document.querySelector(".cart-count");
        if(badge) badge.innerText = total;
    },
    getTotalPrice() {
        const list = this.getCart();
        return list.reduce((sum,item)=>sum + item.price * item.num, 0).toFixed(2);
    }
}

// 页面加载完成执行
window.onload = function(){
    Cart.renderCartCount();
}

// 门店筛选函数
function filterStore(area) {
    const allStore = document.querySelectorAll(".store-card");
    allStore.forEach(box=>{
        if(area == "all" || box.dataset.area == area){
            box.style.display = "block";
        }else{
            box.style.display = "none";
        }
    })
}
