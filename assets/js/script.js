// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks"));
let nextId = JSON.parse(localStorage.getItem("nextId"));

const addButton = $('#taskButton');

// Todo: create a function to generate a unique task id
function generateTaskId() {
    let id = crypto.randomUUID(); //gives a random id
    return id; 
}

// Todo: create a function to create a task card
function createTaskCard(task) {
    //if things looks a little wonky, I had the task object creater up here originally

    //this will create the card and store it to memory
    
    //still needs to create the card
    const taskCard = document.createElement('div');
    const taskHead = document.createElement('header');
    const taskDate = document.createElement('h2');
    const taskDescription = document.createElement('p');
    const taskDelete = document.createElement('button');

    //text contents
    taskHead.textContent = task.name;
    taskDate.textContent = task.dueDate;
    taskDescription.textContent = task.description;

    //the delete button might not need this
    taskDelete.setAttribute('data-project-id', task.id);

    //add parts to the card
    taskCard.appendChild(taskHead);
    taskCard.appendChild(taskDate);
    taskCard.appendChild(taskDescription);
    taskCard.appendChild(taskDelete);

    //add card to the body
    //default to todo
    $('#to-do').appendChild(taskCard);
}

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {

}

// Todo: create a function to handle adding a new task
function handleAddTask(event){
    //the prompt shown had 3 inputs
    //i'm going to do this on a later date because christ is it a mess.
    //for now it will be 3 prompts
    let taskName = prompt("Please enter a task name");
    while(!taskName){
        taskName = prompt("Please enter a task name");
    }
    //got to find the date picker code
    let date = prompt("Please enter a due date");
    while(!taskName){
        taskName = prompt("Please enter a task name");
    }
    let description = prompt("Please enter a task Description");
    while(!description){
        description = prompt("Please enter a task name");
    }

    //returns [name, date, description]
    let newId = generateTaskId(); // make the id here b/c i don't know if putting it in the definition would work
    const newTask = {
        name : taskName,
        dueDate : date,
        description : description,
        id : newId
    };
    //manage local memory
    let taskString = JSON.stringify(newTask);
    let taskList;
    if (localStorage.getItem("tasks")){ //check if an item exists
        //if yes
        taskList = JSON.parse(localStorage.getItem("tasks"));
        taskList.push(taskString);
        taskList = JSON.stringify(taskList);
        localStorage.setItem("tasks", taskList);
    }
    else{
        //if no
        taskList = []; //empty list
        taskList.push(newTask); //add object
        taskList = JSON.stringify(taskList); //string it
        localStorage.setItem("tasks", taskList); //save to memory
    }
    //renderTaskList()
    createTaskCard(newTask); //make the new task a card

}

// Todo: create a function to handle deleting a task
function handleDeleteTask(event){
    //each button has the id of the card it is attatched to 
    //can't get the card itself from the button
    const deleteId = this.getAttribute('data-project-id');
    //go through the stored data for this is
    const taskList = JSON.parse(localStorage.getItem("tasks"));
    for (let i = 0; i < taskList.length, i++;){
        if (taskList[i] == deleteId){
            //need a delete index, so a for loop w/ index
            taskList.splice(i, 1);
        }
    }
    //leave the for loop and save the change
    localStorage.setItem("tasks", JSON.stringify(taskList));


    window.location.reload(); //this will remove the card
}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {
    //this manages color
}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {

});


//somehwere there needs to be an event listener on the delete buttons