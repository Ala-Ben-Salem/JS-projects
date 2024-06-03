let title= document.getElementById('title');
let price= document.getElementById('price');
let taxes= document.getElementById('taxes');
let ads= document.getElementById('ads');
let discount= document.getElementById('discount');
let total= document.getElementById('total');
let count= document.getElementById('count');
let category= document.getElementById('category');
let submit= document.getElementById('submit');
let mood ='create';
let tmp;

//function get totale
function getTotal(){
    if(price.value!=''){
       let result= (+price.value + +taxes.value + +ads.value ) - +discount.value; 
       total.innerHTML=result;
       total.style.background= '#040'
    }
    else{
        total.style.background= 'red'
        total.innerHTML='';
    }
}

// function create product
let dataPro;
if(localStorage.product !=null){
   dataPro= JSON.parse(localStorage.product) //for return all data from local storage
}
else{dataPro=[];}

submit.onclick= function(){
    let newPro= {
        title: title.value.toLowerCase(),
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        total: total.innerHTML,
        count: count.value,
        category: category.value.toLowerCase(),
    }
    if(title.value != '' && price.value!= '' && category.value!= '' && newPro.count<=100){
     if(mood=== 'create')
        {
            if(newPro.count > 1){
                for (let index = 0; index < newPro.count; index++) {
                    dataPro.push(newPro);
                }}
            else{ dataPro.push(newPro);}
        }else{
            dataPro[tmp ]= newPro;
            count.style.display='block';
            submit.innerHTML='Create';
            mood='create';
        }
        cleardata();
    }
    
    //save local storage
    localStorage.setItem('product',JSON.stringify(dataPro));
    showdata();
}

//clear inputs after create a new product
function cleardata(){
 title.value='';
 price.value='';
 taxes.value='';
 ads.value='';
 discount.value='';
 total.innerHTML='';
 count.value='';
 category.value='';
}
//function read (table)
function showdata(){
    getTotal();
  let table = '';
  for(let i=0 ; i < dataPro.length; i++)
    {
        table += `
            <tr>
                <td>${i+1}</td>
                <td>${dataPro[i].title}</td>
                <td>${dataPro[i].price}</td>
                <td>${dataPro[i].taxes}</td>
                <td>${dataPro[i].ads}</td>
                <td>${dataPro[i].discount}</td>
                <td>${dataPro[i].total}</td>
                <td>${dataPro[i].category}</td>
                <td><button id="update" onclick="updatedata(${i})">Update</button></td>
                <td><button onclick="deletedata(${i})" id="Delete">Delete</button></td>
            </tr>
        `;
    }
  
    document.getElementById('tbody').innerHTML= table;
    // create button delete all if exist data
    let btndeleteall=document.getElementById('deleteall');
    if(dataPro.length > 0){
      btndeleteall.innerHTML= `<button onclick="deletedataall()">Delete All (${dataPro.length})</button> `
    }
    else{
        btndeleteall.innerHTML='';
    }
}
showdata();//all time we show the data in the table

//function delete
function deletedata(i){
    dataPro.splice(i,1);
    localStorage.product= JSON.stringify(dataPro); //refresh the data
    showdata(); 
}
function deletedataall(){
    localStorage.clear();
    dataPro.splice(0);
    showdata();
}
//function update
function updatedata(i){
  title.value=dataPro[i].title;
  price.value=dataPro[i].price;
  taxes.value=dataPro[i].taxes;
  ads.value=dataPro[i].ads;
  discount.value=dataPro[i].discount;
  category.value=dataPro[i].category;
 getTotal();
 count.style.display='none';
 submit.innerHTML='Update';
 mood= 'update';
 tmp=i;
 scroll({
    top:0,
    behavior: 'smooth',
 })
}
//function search
let searchmood='title';

function getsearchmood(id){
    let search=document.getElementById('search');
  if(id=='searchTitle'){
    searchmood='title';
    search.placeholder= 'Search By Title';//
  }else{
    searchmood='category';
    search.placeholder= 'Search By Gategory';//
  }//search.placeholder= 'Search By + searchmood';
        search.focus();
        search.value='';
        showdata();
}

function searchdata(value){
    let table= '';
  if(searchmood=='title'){
    for(let i=0;i<dataPro.length;i++ ){
        if (dataPro[i].title.includes(value.toLowerCase())){
            table += `
             <tr>
                <td>${i+1}</td>
                <td>${dataPro[i].title}</td>
                <td>${dataPro[i].price}</td>
                <td>${dataPro[i].taxes}</td>
                <td>${dataPro[i].ads}</td>
                <td>${dataPro[i].discount}</td>
                <td>${dataPro[i].total}</td>
                <td>${dataPro[i].category}</td>
                <td><button id="update" onclick="updatedata(${i})">Update</button></td>
                <td><button onclick="deletedata(${i})" id="Delete">Delete</button></td>
             </tr>
            `;

        }
    }  

   }else{
    for(let i=0;i<dataPro.length;i++ ){
        if (dataPro[i].category.includes(value.toLowerCase())){
            table += `
             <tr>
                <td>${i+1}</td>
                <td>${dataPro[i].title}</td>
                <td>${dataPro[i].price}</td>
                <td>${dataPro[i].taxes}</td>
                <td>${dataPro[i].ads}</td>
                <td>${dataPro[i].discount}</td>
                <td>${dataPro[i].total}</td>
                <td>${dataPro[i].category}</td>
                <td><button id="update" onclick="updatedata(${i})">Update</button></td>
                <td><button onclick="deletedata(${i})" id="Delete">Delete</button></td>
             </tr>
            `;

        }
     } 

   }
   document.getElementById('tbody').innerHTML= table;

}

//******************** top  *******************************************************
let btntop =document.getElementById('btntop');
window.onscroll = function(){
    if(scrollY >= 400)
        {
            btntop.style.display='block';
        }
        else
            {
                btntop.style.display='none';
            }
}
btntop.onclick = function(){
       scroll({
        left:0,
        top:0,
        behavior:"smooth"
    })
}