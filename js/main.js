var nameInput = document.getElementById("productName");
var categoryInput = document.getElementById("productCategory");
var priceInput = document.getElementById("productPrice");
var descInput = document.getElementById("productDescription");
var temp;


if(localStorage.getItem("allProducts") == null){
  var productList =[];
}else{
  var productList = JSON.parse(localStorage.getItem("allProducts"));
  displayProduct();
}


function addProduct() {
  if(document.getElementById('supmit').innerHTML=='Add Product'){
    var oneProduct ={
        pname: nameInput.value,
        category: categoryInput.value,
        price: priceInput.value,
        desc: descInput.value
    };
    productList.push(oneProduct);
    displayProduct();
    var x = JSON.stringify(productList);
    localStorage.setItem("allProducts",x);
    
    console.log(oneProduct);
    console.log(productList);
    
    // console.log(x);
    // console.log(x.length)
    
  }
  else if(document.getElementById('supmit').innerHTML=='Update Product')
  {
    setUpdate(temp);
  }   
  clearForm();
}


function clearForm(){
    nameInput.value="";
    categoryInput.value="";
    priceInput.value="";
    descInput.value="";
}

function displayProduct() {
    var trs='';
    
    for(var i=0; i<productList.length; i++){
        trs +=`
        <tr>
        <td>${i}</td>
        <td>${productList[i].pname}</td>
        <td>${productList[i].category}</td>
        <td>${productList[i].price}</td>
        <td>${productList[i].desc}</td>
      
      <td>
        <button class="btn btn-outline-success" onclick="updateProduct(${i})">  <i class="fa-solid fa-pen-to-square"></i> </button>
      </td>
      <td>
        <button class="btn btn-outline-danger" onclick="deleteProduct(${i})">  <i class="fa-solid fa-trash"></i> </button>
      </td>
    </tr>
        `;
    }
    document.getElementById('productData').innerHTML= trs;
    
    /*var lastIndex=productList.length-1;
    trs= `
    <tr>
        <td>${lastIndex}</td>
        <td>${productList[lastIndex].pname}</td>
        <td>${productList[lastIndex].category}</td>
        <td>${productList[lastIndex].price}</td>
        <td>${productList[lastIndex].desc}</td>
      
      <td>
        <button class="btn btn-outline-success">  <i class="fa-solid fa-pen-to-square"></i> </button>
      </td>
      <td>
        <button class="btn btn-outline-danger">  <i class="fa-solid fa-trash"></i> </button>
      </td>
    </tr>
    `*/
}

function searchProduct() {
    var searchInput = document.getElementById('search');
    var trs = "";
    // var x=" ";
    for(var i =0;i<productList.length;i++ ){
        if(productList[i].pname.toLowerCase().includes(searchInput.value.toLowerCase())){
          trs += `
            <tr>
        <td>${i}</td>
        <td>${productList[i].pname.replace(searchInput.value,`<span style="background-color: yellow;">${searchInput.value}</span>`)}</td>
        <td>${productList[i].category}</td>
        <td>${productList[i].price}</td>
        <td>${productList[i].desc}</td>
      
      <td>
        <button class="btn btn-outline-success" onclick="updateProduct(${i})">  <i class="fa-solid fa-pen-to-square"></i> </button>
      </td>
      <td>
        <button class="btn btn-outline-danger" onclick="deleteProduct(${i})">  <i class="fa-solid fa-trash"></i> </button>
      </td>
    </tr>
            `;
        }
        document.getElementById('productData').innerHTML= trs;

    }
}
function deleteProduct(index) {
  productList.splice(index, 1);
  displayProduct();
  var x = JSON.stringify(productList);
  localStorage.setItem("allProducts",x);
}
function updateProduct(index) {
  nameInput.value=productList[index].pname;
  categoryInput.value=productList[index].category;
  priceInput.value=productList[index].price;
  descInput.value=productList[index].desc;
  document.getElementById("supmit").innerHTML="Update Product";
  temp=index;
}
function setUpdate(temp) {
  productList[temp].pname = nameInput.value;
  productList[temp].category = categoryInput.value;
  productList[temp].price = priceInput.value;
  productList[temp].desc = descInput.value;
  document.getElementById("supmit").innerHTML="Add Product";
  displayProduct();
  var x = JSON.stringify(productList);
  localStorage.setItem("allProducts",x);
}
