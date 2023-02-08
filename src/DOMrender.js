import './style.css';
import {toDoItem} from './index.js';

export const noteRenderer = function(note) {
  const noteDIV = document.createElement('div');
  noteDIV.classList.add('note');

  const titleDIV = document.createElement('div');
  titleDIV.classList.add('note-title');
  titleDIV.textContent = note.title();
  noteDIV.appendChild(titleDIV);

  const dueDateDIV = document.createElement('div');
  dueDateDIV.classList.add('due-date');
  dueDateDIV.textContent = note.dueDate();
  noteDIV.appendChild(dueDateDIV);

  const descriptionDIV = document.createElement('div');
  descriptionDIV.classList.add('description');
  descriptionDIV.textContent = note.description();
  noteDIV.appendChild(descriptionDIV);

  return noteDIV;
};

export const navBar = function() {
  const bar = document.createElement('nav');
  bar.classList.add('navbar');
  return bar;
};

const formElement = function(elementID, elementLabel) {
  const _element = document.createElement('div');
  _element.classList.add('form-line');

  const _label = document.createElement('label');
  _label.setAttribute('for', elementID);
  _label.textContent = elementLabel;
  _element.appendChild(_label);

  const _input = document.createElement('input');
  _input.setAttribute('type', 'text');
  _input.setAttribute('id', elementID);
  _input.setAttribute('name', elementLabel);
  _element.appendChild(_input);

  return _element;
};


export const inputForm = function() {
  const _form = document.createElement('div');
  _form.classList.add('input-form');
  _form.appendChild(formElement('title', 'Title'));
  _form.appendChild(formElement('description', 'Description'));
  _form.appendChild(formElement('duedate', 'Due Date'));
  _form.appendChild(formElement('priority', 'Priority'));
  const button = document.createElement('button');
  button.classList.add('submit-button');
  const sendNote = function(e) {
    const ids = ['title', 'description', 'duedate', 'priority'];
    const message = {};
    ids.forEach((id) => message[id] = _form.querySelector('#' + id).nodeValue);
    document.currProject.addNote(toDoItem(message.title, message.description, message.duedate, message.priority));
  };
  button.addEventListener('click', sendNote);
  _form.appendChild(button);
  return {_form};
};

export const noteFieldConstructor = function() {
  const _field = document.createElement('div');
  _field.classList.add('note-field');
  _field.setAttribute('id', 'note-field');
  return _field;
};


export const headline = function() {
  const headlineElement = document.createElement('div');
  headlineElement.classList.add('headline');
  const inputElement = inputForm();
  headlineElement.appendChild(inputElement._form);
  return {headlineElement, inputElement};
};

export const refreshProjectButtons = function(projectAggregator, target) {
  const projects = projectAggregator.getAllProjects();
  console.log(projects);
  projects.forEach((iproject) => {
    const button = document.createElement('button');
    button.classList.add('project-button');
    button.addEventListener('click', (_e) => {
      refreshNotes(iproject);
      document.currProject = iproject;
    });
    button.textContent = iproject.getProjectTitle();
    target.appendChild(button);
  });
};


export const refreshNotes = function(project) {
  const _notes = project.getNotes().forEach(noteRenderer);
  const noteField = document.getElementById('note-field');
  noteField.textContent = '';
  if (_notes !== undefined) {
    _notes.forEach((inote) => noteField.appendChild(noteRenderer(inote)));
  }
};

