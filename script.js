const input=document.getElementById("todo-input")
const add=document.getElementById("add-btn")
const list=document.getElementById("todo-list")

//try to load saved todos frm localStorage
const saved=localStorage.getItem("todos");
const todos=saved? JSON.parse(saved) : [];

function saveTodos(){
	//save current todos array to localStorage
	localStorage.setItem("todos",JSON.stringify(todos));
}

//create a dom for a todo object and append it to the list
function createTodoNode(todo, index){
	const li = document.createElement("li");

	//checkbox to toggle completion
	const checkbox=document.createElement("input");
	checkbox.type="checkbox";
	checkbox.checked=!!todo.completed;
	checkbox.addEventListener("change",()=>{
	   todo.completed=checkbox.checked;

textSpan.style.textDecoration =
        checkbox.checked ? "line-through" : "none";

	//TODO:visual feedback: strike-through when completed
	saveTodos();
})

	//text of the todo
	const textSpan=document.createElement("span");
	textSpan.textContent=todo.text;
	textSpan.style.margin="0.8px";
	if(todo.completed){
		textSpan.style.textDecoration="line-through";
}
		//add double-click event listener to edit todo
		textSpan.addEventListener("dblclick",()=>{
		const newText=prompt("Edit todo",todo.text);
		if(newText!==null){
		   todo.text=newText.trim();
		   textSpan.textContent=todo.text;
		   saveTodos();
		}
})

		//delete todo button
		const delBtn=document.createElement("button");
		delBtn.textContent="Delete";
		delBtn.classList.add("delete-btn");
		delBtn.addEventListener("click",()=>{
		   todos.splice(index, 1);
		   render();
		   saveTodos();
})
		li.appendChild(checkbox);
		li.appendChild(textSpan);				
		li.appendChild(delBtn);
		return li

	}



//render the whole todo list from todos array
function render(){
	list.innerHTML="";

	//recreate each item
	todos.forEach((todo, index)=>{
		const node=createTodoNode(todo, index);
		console.log(node, todo)
		list.appendChild(node)
});
}

function addTodo(){
	const text=input.value.trim();
	if(!text){
	  return
	}
	//push a new todo object
	todos.push({text,completed:false});
	input.value="";
	render()
	saveTodos()
}
add.addEventListener("click",addTodo);
render();

document.getElementById("clear-completed")
.addEventListener("click", () => {

    const activeTodos = todos.filter(todo => !todo.completed);

    todos.length = 0;
    todos.push(...activeTodos);

    render();
    saveTodos();
});



console.log(typeof $);