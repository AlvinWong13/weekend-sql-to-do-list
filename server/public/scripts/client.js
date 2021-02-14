$(document).ready(onReady);

function onReady() {
  console.log('jQuery is ready');
  getList();
  $('#button-addon2').on('click', addTask)
  $('.taskList').on('click', '.checkBox', completedTasks)
  $('.taskList').on('click', '.removeBtn', removeTaskQuestion)
} // end onReady

function getList() {
  console.log('getting list from server');
  $.ajax({
    method: 'GET',
    url: '/todo'
  }).then((response) => {
    console.log('List received', response);
    renderToDoList(response);
  })
} // end getList

function renderToDoList(taskArray) {
  console.log('rendering list');
  $('#finishedTasks').empty();
  $('#notFinishedTasks').empty();
  $('#notFinishedTasks').append(`<li>Not Completed:</li>`);
  $('#finishedTasks').append(`<li>Completed:</li>`);
  for (const task of taskArray) {
    let newTask = $(`<li class="toDoTask">${task.task}</li>`);
    newTask.data('id', task.id);
    newTask.append(`<button class="removeBtn btn btn-danger">Remove</button>`);
    if (task.completed === false) {
      newTask.prepend('<input type="checkbox" class="checkBox">');
      $('#notFinishedTasks').append(newTask);
    } else if (task.completed === true) {
      newTask.prepend(`<input type="checkbox" checked="checked" class="checkBox">`);
      $('#finishedTasks').append(newTask);
    }
  }
} // end renderToDoList

function addTask() {
  let newTask = {
    task: $('#taskIn').val()
  };
  console.log('Adding new task to list', newTask);
  $.ajax({
    method: 'POST',
    url: '/todo',
    data: newTask
  })
  .then((response) => {
    console.log('Item added', response);
    $('#taskIn').val('');
    getList();
  })
  .catch((error) => {
    console.log(error);
    swal('We cannot add your task, please try again later');
  })
} // end addTask

function completedTasks() {
  let updateID = $(this).closest('li').data('id');
  console.log('ID of task:', updateID);
  $.ajax({
    method: 'PUT',
    url: `/todo/${updateID}`
  })
  .then((response) => {
    console.log('task updated', response);
    getList();
  })
  .catch((error) => {
    console.log(error);
    swal('We cannot process your completed task, please try again later.');
  })
} // end completedTasks

function removeTaskQuestion() {
  let idToRemove = $(this).closest('li').data('id');
  let initTask = $(this).closest('li').text();
  let taskToRemove = initTask.replace('Remove', '');
  console.log('Task is being removed', idToRemove);
  swal({
    title: "Do you want to remove this task?",
    text: `${taskToRemove}`,
    icon: "warning",
    buttons: true,
    dangerMode: true,
  })
    .then((willDelete) => {
      if (willDelete) {
        removeTask(idToRemove);
        swal("Good job completing a task!", {
          icon: "success",
        });
      } else {
        swal("Keep going!");
      }
    });
} // end removeTaskQuestion

function removeTask(deleteID) {
  $.ajax({
    method: 'DELETE',
    url: `/todo/${deleteID}`,
  })
  .then((response) => {
    console.log('Task removed', response);
    getList();
  })
  .catch((error) => {
    console.log(error);
    swal('We cannot remove your task, please try again later');
  })
} // end removeTask