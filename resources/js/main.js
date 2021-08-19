let renderCurrentTime = () => {
	
	let now = new Date();
	let hour = now.getHours();
	let minutes = now.getMinutes();
	let seconds = now.getSeconds();
	
	hour = hour < 10 ? "0" + hour:hour;
	minutes = minutes < 10 ? "0" + minutes:minutes;
	seconds = seconds < 10 ? "0" + seconds:seconds;
	
	document.querySelector('.clock_text').innerHTML = `${hour}: ${minutes}: ${seconds}`;
	
}



let renderUser = e => {
		e.preventDefault();
		
		let inpName = document.querySelector('.inp_name')
		let username = inpName.value;
		localStorage.setItem('username',username);
		
		convertMainDiv(username);
	
}

let convertMainDiv = username => {
	let inpName = document.querySelector('.inp_name');
		document.querySelector('.frm_name').className = 'frm_todo';
		document.querySelector('.username').innerHTML = username;
		inpName.value = '';
		inpName.placeholder = '할 일을 입력하세요.';
		inpName.className = 'inp_todo';
		
		document.querySelector('.todo-list').style.display = 'flex';
		doucment.querySelector('.main').style.justifyContent = 'space-between';
		doucment.querySelector('.wrap_user').className = 'wrap_todo';
}

let registSchedule = () => {
	let todoList = JSON.parse(localStorage.getItem('todo'));
	let input = document.querySelector('.inp_todo').value;
	
	if(todoList) {
		prevWork.push({work:input});
		localStorage.setItem('todo',JSON.stringify(todoList));
	}
	else{
		let todoList = [{work:input}];
		localStorage.setItem('todo',JSON.stringify(todoList));
	}
	
	
	renderSchedule(todoList);
}

let renderSchedule = (todoList) => {
	document.querySelectorALL('.todo-list>div').forEach(e =>{e.remove()});
	todoList.forEach(e =>{
		let workDiv = document.createElement('div');
		workDiv.innerHTML = e.work;
		document.querySelector('.todo-list').appendChild(workDiv);
	})
}

(()=>{
	let username = localStorage.getItem('username');
	
	if(username){
		convertMainDiv(username);
		document.querySelector('.frm_todo').addEventListener('submit',registSchedule);
	}else{
		document.querySelector('.frm_name').addEventListener('submit',renderUser);
	}
	
	setInterval(renderCurrentTime,1000);
	
})();



