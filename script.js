let products = [
	{"name":"", "brand":"","amount":"1", "value":"1"},
];

// total exibido na navbar
function valorTotal(products){
	var total = 0;
	for(var key in products){
		total += products[key].value * products[key].amount;
	}
	document.getElementById("totalValue").innerHTML = formatValue(total);
}

// tabela com os produtos adicionados
function setList(products){
	var table = '<thead><tr><td>Nome do produto</td><td>Quantidade</td><td>Valor</td><td>Remover</td></tr></thead><tbody>';
	for(var key in products){
		table += '<tr><td>'+ formatName(products[key].name) +'</td><td>'+ formatAmount(products[key].amount) +'</td><td>'+ formatValue(products[key].value) +'</td><td><button class="btn btn-danger" onclick="deleteData('+key+');">Remover </button> </td></tr>';
	}
	table += '</tbody>';

	document.getElementById('addedProducts').innerHTML = table;
	valorTotal(products);
	saveListStorage(products);
}

//formatando os itens da tabela

function formatName(name){
	let str = name.toLowerCase();
	str = str.charAt(0).toUpperCase() + str.slice(1);
	return str;
}

function formatbrand(brand){
	let str = brand.toLowerCase();
	str = str.charAt(0).toUpperCase() + str.slice(1);
	return str;
}

function formatAmount(amount){
	return parseInt(amount);
}

function formatValue(value){
	let str = parseFloat(value).toFixed(2) + "";
	str = str.replace(".",",");
	str = "R$ " + str;
	return str;
}


//adicionar novo produto
function addData(){
	if(!validation()){
		return;
	}
	let name = document.getElementById("name").value;
    let brand = document.getElementById("brand").value;
	let amount = document.getElementById("amount").value;
	let value = document.getElementById("value").value;

	products.unshift({"name":name , "brand":brand, "amount":amount , "value":value });
	setList(products);
}



//atualizando os dados
function updateData(){
	if(!validation()){
		return;
	}

	let name = document.getElementById("name").value;
    let brand = document.getElementById("brand").value;
	var amount = document.getElementById("amount").value;
	var value = document.getElementById("value").value;

	products[id] = {"name":name, "brand":brand, "amount":amount, "value":value};
	resetForm();
	setList(products);
}

//apaga itens da lista
function deleteData(id){
	if(confirm("Deseja apagar esse produto?")){
		if(id === products.length - 1){
			products.pop();
		}else if(id === 0){
			products.shift();
		}else{
			let arrAuxIni = products.slice(0,id);
			let arrAuxEnd = products.slice(id + 1);
			products = arrAuxIni.concat(arrAuxEnd);
		}
		setList(products);
	}
}

//validando e printando erros caso os inputs venham sem valores
function validation(){
	let name = document.getElementById("name").value;
    let brand = document.getElementById("brand").value;
	let amount = document.getElementById("amount").value;
	let value = document.getElementById("value").value;
	var errors = "";
	document.getElementById("errors").style.display = "none";

	if(name === ""){
		errors += '<p>Nome</p>';
	}
    if(brand === ""){
		errors += '<p>Marca</p>';
	}
	if(amount === ""){
		errors += '<p>Quantidade</p>';
	}else if(amount != parseInt(amount)){
		errors += '<p>Quantidade</p>';
	}
	if(value === ""){
		errors += '<p>Valor</p>';
	}else if(value != parseInt(value)){
		errors += '<p>Valor</p>';
	}

	if(errors != ""){
		document.getElementById("errors").style.display = "block";
		document.getElementById("errors").innerHTML = "<h3 class>Por favor, preencha os campos corretamente.</h3>" + errors;
		return 0;
	}else{
		return 1;
	}
}

//deletando lista
function deleteList(){
	if (confirm("Apagar carrinho?")){
		products = [];
		setList(products);
	}
}

//salvando em storage
function saveListStorage(products){
	var jsonStr = JSON.stringify(products);
	localStorage.setItem("products",jsonStr);
}

//verifica se já tem algo salvo
function initListStorage(){
	var testList = localStorage.getItem("products");
	if(testList){
		products = JSON.parse(testList);
	}
	setList(products);
}

initListStorage();