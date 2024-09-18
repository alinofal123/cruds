let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let submit = document.getElementById("submit");
let category = document.getElementById("category");
let mood = 'creat';
let tmp;


    // get total

    function gettotal(){
        if(price.value !== ''){
            let result = (+price.value + +taxes.value + +ads.value)+-discount.value
            total.innerHTML = result;
        }else{
            total.innerHTML = '';
        }
    };

    // craet product
    let datapro;
    if(localStorage.product != null){
        datapro = JSON.parse(localStorage.product);
    }else{
        datapro = [];
    };



    submit.onclick = () => {

        gettotal()
        let newpro = {
            title: title.value.toLowerCase(),
            price: price.value,
            taxes: taxes.value,
            ads: ads.value,
            discount: discount.value,
            total: total.innerHTML,
            count: count.value,
            category: category.value.toLowerCase(),
        }
            // count
            if(title.value != ''&& price.value != ''&& category.value != ''
        && newpro.count <= 100 
        ){
                if(mood === 'creat'){
                if(newpro.count >1){
            for(let i=0; i<newpro.count; i++){
            datapro.push(newpro);
            
            }
        }else{
            datapro.push(newpro);
        }
            }else{
                datapro[tmp] = newpro;
                mood = 'creat';
                submit.innerHTML = 'creat';
                count.style = 'display:block;';
            }
            clearinputs()
            }
        


        
        localStorage.setItem("product", JSON.stringify(datapro));
        
        showdata()
    };


    // save in local storage
    // DONE


    // clear inputs

    function clearinputs(){
        title.value = '';
        price.value = '';
        taxes.value = '';
        ads.value = '';
        discount.value = '';
        total.innerHTML = '';
        count.value = '';
        category.value = '';
    };
    

    // read

    function showdata(){
        let table = '';

        for(let i=0; i<datapro.length; i++){
            table += `
            <tr>
            <td>${i+1}</td>
            <td>${datapro[i].title}</td>
            <td>${datapro[i].price}</td>
            <td>${datapro[i].taxes}</td>
            <td>${datapro[i].ads}</td>
            <td>${datapro[i].discount}</td>
            <td>${datapro[i].total}</td>
            <td>${datapro[i].category}</td>
            <td><button onclick="updatedata(${i})" class="rounded-pill text-white border-0 p-2" id="update">update</button></td>
            <td><button onclick="deletdata( ${i} )" class="rounded-pill text-white border-0 p-2" id="delet">delet</button></td>
        </tr>
            `
        }
        document.getElementById("tbody").innerHTML = table;

        let deletallbtn = document.getElementById('deletAll');
        if(datapro.length > 0){
            deletAll.innerHTML = `
            <button onclick="delAll()" class="w-75 rounded-pill border-0 text-white mt-2 py-2">delet All (${datapro.length})</button>
            `
        }else{
            deletallbtn.innerHTML = '';
        }

    }
    showdata()


    // delet
    function deletdata(i){
        datapro.splice(i,1);
        localStorage.product = JSON.stringify(datapro);
    showdata()
    }

    function delAll(){
        localStorage.clear()
        datapro.splice(0);
    showdata()
    }


    // update
    function updatedata(i){
        title.value = datapro[i].title;
        price.value = datapro[i].price;
        taxes.value = datapro[i].taxes;
        ads.value = datapro[i].ads;
        discount.value = datapro[i].discount;
        category.value = datapro[i].category;
        gettotal()
        count.style = 'display: none;'
        submit.innerHTML = 'update';
        mood = 'update';
        tmp = i;
        scroll({
            top: 0,
            behavior: 'smooth',
        })
    }
    

    // search
    let searchmood = 'title';
    function searchdata(id){
        let search = document.getElementById("search");
        if(id == 'searchtitle'){
        searchmood = 'title';
        search.placeholder = 'search by title';
        }else{
        searchmood = 'category';
        search.placeholder = 'search by category';
        
        }
        search.focus()
        search.value = '';
        showdata()
    }



    function searchinput(value){
        let table = '';
        if(searchmood === 'title'){
            for(let i=0; i < datapro.length; i++){
                if(datapro[i].title.includes(value.toLowerCase())){
                    table += `
                    <tr>
                    <td>${i}</td>
                    <td>${datapro[i].title}</td>
                    <td>${datapro[i].price}</td>
                    <td>${datapro[i].taxes}</td>
                    <td>${datapro[i].ads}</td>
                    <td>${datapro[i].discount}</td>
                    <td>${datapro[i].total}</td>
                    <td>${datapro[i].category}</td>
                    <td><button onclick="updatedata(${i})" class="rounded-pill text-white border-0 p-2" id="update">update</button></td>
                    <td><button onclick="deletdata( ${i} )" class="rounded-pill text-white border-0 p-2" id="delet">delet</button></td>
                </tr>
                    `
                }
            }
        }else{
            for(let i=0; i < datapro.length; i++){
                if(datapro[i].category.includes(value.toLowerCase())){
                    table += `
                    <tr>
                    <td>${i}</td>
                    <td>${datapro[i].title}</td>
                    <td>${datapro[i].price}</td>
                    <td>${datapro[i].taxes}</td>
                    <td>${datapro[i].ads}</td>
                    <td>${datapro[i].discount}</td>
                    <td>${datapro[i].total}</td>
                    <td>${datapro[i].category}</td>
                    <td><button onclick="updatedata(${i})" class="rounded-pill text-white border-0 p-2" id="update">update</button></td>
                    <td><button onclick="deletdata( ${i} )" class="rounded-pill text-white border-0 p-2" id="delet">delet</button></td>
                </tr>
                    `
                }
            }
        }
        document.getElementById("tbody").innerHTML = table;
    }






    // clean data
