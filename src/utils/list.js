import methods from './ajax';

(function(win, http) {
    let arr = JSON.parse(win.localStorage.getItem('Inwe_OrderList')) || [];
    function OrderList (){

    };
   
    OrderList.prototype = {
        addItem(o) {
            const { name } = o;
            const flag = arr.find(item => item.name === name);
            if(flag) {
                arr.map(item => {
                    if(item.name === name) {
                        item = {...o};
                    }
                    return item;
                })
            } else {
                arr.push(o);
            }
            win.localStorage.setItem('Inwe_OrderList', JSON.stringify(arr));
        },
        updateStatus() {
            let i = 0;
            arr.length && arr.map((item) => {
                const tx = item.name;
                if( i === arr.length) {
                    return;
                } else {
                    http.get({ url: "trade/" + tx })
                        .then(res => {
                            if(res.Data) {
                                i++;
                                const { OutTx, InTx, CreateTime } = res.Data;
                                item.status = InTx && OutTx ? '完成' : '进行中';
                                item.time = CreateTime;
                            }
                            return item;
		            });
                }
            });
            win.localStorage.setItem('Inwe_OrderList', JSON.stringify(arr));
            return i;
        }
    }
    win.orderList = new OrderList();
})(window, methods);

