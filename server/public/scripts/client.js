$(document).ready(onReady);

function onReady() {
  console.log('Ready');
  $('#button-add').on('click', addTask);
  $('.allTasks').on('click', '.taskBox', completedTasks)
}

function getList() {
  console.log('Getting list from DB');
  $.ajax({
    method: 'GET',
    url: '/list'
  })
  .then((response) => {
    console.log('Got To Do List', response);
    renderList(response);
  })
}

function renderList(arrayList) {
  console.log('Posting list');
  $('#notCompletedToDoList').empty();
  $('#CompletedToDoList').empty();
  $('#notCompletedToDoList').append('<li>Not Completed:</li>');
  $('#CompletedToDoList').append('<li>Completed:</li>');
  for(const task of arrayList) {
    let newTask = $(`<li class="toDoTask">${task.task}</li>`);
    newTask.data('id', task.id);
    newTask.append(`<button class="removeBtn">Remove</button>`);
    if(task.completed === false) {
      newTask.prepend('<input type="checkbox" class="taskBox">');
      $('#notCompletedToDoList').append(newTask);
    } else if (task.completed === true) {
      newTask.prepend(`<input type"checkbox" checked="checked" class="taskBox">`);
      $('#completedToDoList').append(newTask);
    }
  }
}

function addTask() {
  let newTask = {
    task: $('#taskIn').val()
  };
  console.log('Adding new task to list', newTask);
  $.ajax({
    method: 'POST',
    url: '/list',
    data: newTask
  })
  .then((response) => {
    console.log('Task added', response);
    $('#taskIn').val('');
    getList();
  })
  .catch((error) => {
    console.log(error);
    alert('We cannot find your tasks, please try again later.');
  })
}

function completedTasks() {
  let completedID = $(this).closest('li').data('id');
  console.log('Completed Tasks', completedID);
  $.ajax({
    method: 'PUT',
    url: `/list/${completedID}`
  })
  .then((response) => {
    console.log('Task updated', response);
    res.sendStatus(200);
    getList();
  })
  .catch((error) => {
    console.log(error);
    res.sendStatus(500);
    alert('We cannot update your tasks, please try again later.');
  })
}