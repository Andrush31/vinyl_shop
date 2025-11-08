window.addEventListener('DOMContentLoaded', renderTable);

const URL = 'https://68e3eec68e116898997a7bae.mockapi.io/products';

const tableBody = document.querySelector('#products-table tbody');
const addOrEditBtn = document.querySelector('#add-btn');
let isEditMode = false;

let currentProductId = null;

const nameInput = document.getElementById('name');
const priceInput = document.getElementById('price');
const imageURLInput = document.getElementById('imageURL');
const descriptionInput = document.getElementById('description');



function renderTable() {
	fetch(URL)
		.then((response) => response.json())
		.then((products) => {
			tableBody.innerHTML = products
				.map(
					(product, index) =>
						`
            <tr data-id=${product.id}>
               <td>${index + 1}</td>
               <td class="cell-img">
                  <img src=${product.imageURL} />
               </td>
               <td class="cell-name">
                  ${product.name}
               </td>
               <td class="cell-price">
                  ${product.price}  Lei
               </td>
               <td>
                  <div class="actions">
                     <button class="btn edit" data-action="edit">
                        <i class="fa-solid fa-pen-to-square"></i>
                     </button>
                     <button class="btn delete" data-action="delete">
                        <i class="fa-solid fa-trash"></i>
                     </button>
                  </div>
               </td>
            </tr>
            `
				)
				.join('');
		});
}

addOrEditBtn.addEventListener('click', addOrEditProduct);

function addOrEditProduct(e) {
	e.preventDefault();
	const name = nameInput.value;
	const price = priceInput.value;
	const imageURL = imageURLInput.value;
	const description = descriptionInput.value;

	const newProduct = {
		name: name,
		price: price,
		imageURL: imageURL,
		details: description,
	};

    const method = isEditMode ? 'PUT' : 'POST';
    const newURL = isEditMode ? `${URL}/${currentProductId}` : URL;
     
	fetch(newURL, {
		method: method,
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(newProduct),
	}).then((response) => {
        renderTable(),
        resetForm();
    });
}


function resetForm(){
    nameInput.value = "";
    priceInput.value = "";
    imageURLInput.value = "";
    descriptionInput.value = "";
    currentProductId = null;

    if(isEditMode){
        isEditMode = false;
        addOrEditBtn.innerHTML = "Add Product"
    }
}


tableBody.addEventListener('click',handleActions);

function handleActions(e){
    const clickedElement = e.target;
    if(clickedElement.parentElement.classList.contains('edit')){
        const productId = getTableRow(clickedElement).dataset.id;
        console.log(productId);
        fetch(`${URL}/${productId}`).then((response) => response.json()).then((product) => {
            console.log(product);
            nameInput.value = product.name;
            priceInput.value = product.price;
            imageURLInput.value = product.imageURL;
            descriptionInput.value = product.details;
        });
        isEditMode=true;
        currentProductId = productId;
        addOrEditBtn.innerHTML = 'Save';
    }else if(clickedElement.parentElement.classList.contains('delete')){
        currentProductId = getTableRow(clickedElement).dataset.id;
        fetch(`${URL}/${productId}`).then((response) =>
    }
}

function getTableRow(editIcon){
    return editIcon.parentElement.parentElement.parentElement.parentElement;
}

//cream o variabila de mod edit, in care stockam true daca editam sau false daca adaugam(default)
//in momentul in care pun datele dintr un produs care urmeaza sa fie editat, atunci variabila de edit mode se duce la true si i se schimba continutul din add product in save
//metodele si numele de variabile pentru addNewProduct se transforma in ceva care sa ne duca cu gandul ca si editam: addOrEditBtn
//la metoda care facea POST trebuie sa adaugam o variabila method care va fi POST sau PUT in functio de valuarea lui isEditMode, foloseind ternary operator
