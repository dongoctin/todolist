
// localStorage.setItem('todoList', 'Tèo em');
const formTag = document.querySelector('form');
var total = 0;
const strTodoList = localStorage.getItem('todoList');
const todoListStorage = JSON.parse(strTodoList);

var todoList = todoListStorage || [];
// hiển thị danh sách lần đầu tiên tải web
loadingTodoList(todoList);

formTag.onsubmit = function(event) {
	event.preventDefault();
	const inputTag = document.querySelector('input#todo');
	const olTag = document.querySelector('#todolist');
	const todo = inputTag.value;
	createLiElement(todo,olTag);
	this.reset();
	total++;
	updateTotalElement(total);
 // Thêm 1 phần tử vào cuối danh sách
 todoList.push(todo);
 
	// lưu danh sách vào LocalStorage (trình duyêt)
	storeToLocalStorage(todoList);
}

function storeToLocalStorage(todoList) {
	// setItem chỉ lấy kiểu dữ liệu chuỗi nên mình phải chuyển từ array sang chuỗi
	const strTodoList = JSON.stringify(todoList);
	localStorage.setItem('todoList', strTodoList);


}

function removeTodoItem(event) {
	//event.target là button được click (nói tổng quá là phần tử được click)
	const btnClicked = event.target;
	//.parentElement là lấy cha của nó
	const liEl = btnClicked.parentElement;
	
	const index = indexElement(liEl);

	// xóa 1 phần tử có chỉ là index
	// tham số thứ 2 là số phần tử cần xóa
	todoList.splice(index,1);
	// lưu danh sách vào LocalStorage (trình duyêt)
	storeToLocalStorage(todoList);

	// lúc đầu dòng này ở sau dòng const liEl = btn...
	// tuy nhiên do có dòng const index =...
	// không thể xóa liền được nên phải di chuyển xuống dưới này vì xóa sẽ sai liEl
	liEl.remove(); //xóa phần tử li

	const total = todoList.length;
	updateTotalElement(total );
}



// Trả về phần tử thứ i (tính từ 0)
function indexElement(el) {
	if (!el) return -1;
	var i = 0;
	do {
		i++;
	} while (el = el.previousElementSibling);
	return i - 1;
}

function updateTotalElement(total) {
	const totalEl = document.querySelector('.total');
	totalEl.innerHTML = total;

}

const checkAllBtn = document.querySelector('.chk-all');
checkAllBtn.onclick = function() {
	const olTag = document.querySelector('#todolist');
	const unCheckEls = olTag.querySelectorAll('input[type=checkbox]:not(:checked)');
	for(unCheckEl of unCheckEls) {

		unCheckEl.checked = true;
	}


}

const deletekAllBtn = document.querySelector('.check-delete');
deletekAllBtn.onclick = function() {
	const olTag = document.querySelector('#todolist');
	const checkedEls = olTag.querySelectorAll('input[type=checkbox]:checked');
	for(checkedEl of checkedEls) {
		
		const liEl = checkedEl.parentElement;
		const index = indexElement(liEl);

	// xóa 1 phần tử có chỉ là index
	// tham số thứ 2 là số phần tử cần xóa
	todoList.splice(index,1);
	// lưu danh sách vào LocalStorage (trình duyêt)
	storeToLocalStorage(todoList);

	liEl.remove();
	total--;
	updateTotalElement(total);
}

}

function loadingTodoList(todoList) {
	const olTag = document.querySelector('#todolist');
	for(const todo of todoList) {
		
		createLiElement(todo,olTag);

		total++;

	}
	updateTotalElement(total);

}

function createLiElement(todo,olTag) {
	const liTag = document.createElement('li');
	liTag.textContent = todo;
	var btnEl = document.createElement('button');
	btnEl.setAttribute('type','button');
	btnEl.setAttribute('class', 'btn btn-danger btn-sm')
	btnEl.textContent = 'Xóa';
	liTag.appendChild(btnEl);
	btnEl.addEventListener('click',removeTodoItem);
	// Tạo input checkbox
	const chkEl = document.createElement('input');
	chkEl.setAttribute('type', 'checkbox');
	//để cho name = todolist sẽ chỉ lưu 1 cái sau cùng dù có chọn nhìu checkbox, lý do là do cùng name
	// nên quy định cùng name mà muốn đưa lên toàn bộ thì phải thêm []
	chkEl.setAttribute('name', 'todolist[]');
	chkEl.setAttribute('value', todo);
	// dòng này để khi enter sự kiện sẽ tự tích checkbox
	chkEl.checked = true;
	liTag.prepend(chkEl);
	olTag.appendChild(liTag);

}



