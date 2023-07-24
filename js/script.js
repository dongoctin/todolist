var FormTag = document.querySelector('form');
FormTag.onsubmit = function (event) {
	event.preventDefault();
	var InputTag = document.querySelector('input[name=todo]');
	var todo = InputTag.value;
	var liTag = document.createElement('li');
	liTag.textContent = todo;
	var olTag = document.querySelector('ol');
	olTag.appendChild(liTag);
	this.reset();


}