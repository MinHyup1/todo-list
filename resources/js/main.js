let renderCurrentTime = () => {
	let now = new Date();
	let hour = now.getHours();
	let minutes = now.getMinutes();
	let seconds = now.getSeconds();
	
	hour = hour < 10 ? "0"+hour:hour;
	minutes = minutes < 10 ? "0" + minutes:minutes;
	seconds = seconds < 10 ? "0" + seconds:seconds;
	document.querySelector('.clock_text').innerHTML = `${hour} : ${minutes} : ${seconds}`;
}

let renderUser = e => {
	e.preventDefault();
	console.dir(e.target.className);
	let inpName = document.querySelector('.inp_name');
	let username = inpName.value;
	localStorage.setItem('username',username);
	convertMainDiv(username);
}

let convertMainDiv = username => {
	let inpName = document.querySelector('.inp_name');
	
	document.querySelector('.frm_name').className = 'frm_todo';
	document.querySelector('.username').innerHTML = username;
	inpName.value = '';
	inpName.placeholder = 'Enter your schedule';
	inpName.className = 'inp_todo';
	
	document.querySelector('.todo-list').style.display ='flex';
	document.querySelector('.main').style.justifyContent ='space-between';
	document.querySelector('.wrap_user').className = 'wrap_todo';
	
	document.querySelector('.frm_todo').addEventListener('submit',registSchedule);
	document.querySelector('#leftArrow').addEventListener('click',renderPrevPage);
	document.querySelector('#rightArrow').addEventListener('click',renderNextPage);
}

let registSchedule = (e) => {
	e.preventDefault();
	let todoList = localStorage.getItem('todo'); //
	let input = document.querySelector('.inp_todo').value;
	document.querySelector('.inp_todo').value = '';
	
	if(todoList){
		todoList = JSON.parse(todoList);		
		let lastIdx = localStorage.getItem('lastIdx');
		
		lastIdx = Number(lastIdx) + 1;
		localStorage.setItem('lastIdx',lastIdx);
		
		todoList.unshift({work:input, idx:lastIdx});//여기
		localStorage.setItem('todo',JSON.stringify(todoList));
	}else{
		
		localStorage.setItem('lastIdx',0);
		todoList = [{work:input, idx:0}];
		localStorage.setItem('todo',JSON.stringify(todoList));
	}
	
	renderSchedule(todoList.slice(0,7));
}

let renderSchedule = (todoList) => {
	document.querySelectorAll('.todo-list>div').forEach(e => {e.remove()});
	
	todoList.forEach(e => {
		let workDiv = document.createElement('div');
		workDiv.innerHTML = '<i class="far fa-trash-alt" data-idx="'+e.idx+'" ></i>  ' + e.work;
		document.querySelector('.todo-list').appendChild(workDiv);
	})
	
	document.querySelectorAll('.todo-list>div>i').forEach(e => {
		e.addEventListener('click', removeWork)
	})
	
	document.querySelector('.current-page').textContent = 1;
}

let removeWork = (event) => {
	let todoList = JSON.parse(localStorage.getItem('todo'));
	
	let curPage = document.querySelector('.current-page').textContent;
	let renderPage = curPage;
	let end = renderPage * 8;
	let begin = end - 8;
	
	let res = todoList.filter(e => {
		let removeIdx = event.target.dataset.idx;
		return removeIdx != e.idx;
	})
	
	localStorage.setItem('todo',JSON.stringify(res));
	renderSchedule(res.slice(begin,end));
}

let renderPrevPage = () => {
	//현재 페이지
	let curPage = document.querySelector('.current-page').textContent;
	let todoList = JSON.parse(localStorage.getItem('todo'));

	if(curPage < 2){
		alert("첫 페이지 입니다.");
		return;
	}
	
	let renderPage = curPage - 1;
	let end = renderPage * 8;
	let begin = end - 8;
	
	renderSchedule(todoList.slice(begin,end));
	document.querySelector('.current-page').textContent = renderPage;
}

let renderNextPage = () => {
	
	//현재 페이지
	let curPage = document.querySelector('.current-page').textContent;
	let todoList = JSON.parse(localStorage.getItem('todo'));
	let lastPage = Math.ceil(todoList.length/8);
	
	
	if(curPage >= lastPage){
		alert("마지막 페이지 입니다.");
		return;
	}
	
	let renderPage = Number(curPage) + 1;
	let end = renderPage * 8;
	let begin = end - 8;
	
	renderSchedule(todoList.slice(begin,end));
	document.querySelector('.current-page').textContent = renderPage;
	
}

(()=> {
	let username = localStorage.getItem('username');	
	let todoList = localStorage.getItem('todo');//수정	
	
	if(username){
		convertMainDiv(username);
	}else{
		document.querySelector('.frm_name').addEventListener('submit',renderUser);
	}
	
	if(todoList){
		renderSchedule(JSON.parse(todoList).slice(0,7));
	}
	setInterval(renderCurrentTime,1000);
})()

