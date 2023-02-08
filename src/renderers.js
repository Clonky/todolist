import {toDoItem, project} from './index.js';

export const navRenderer = function(pageCoordinator) {
  const pageCoord = pageCoordinator;
  const element = document.createElement('nav');
  element.classList.add('navbar');

  const addProjectButton = function() {
    const newProjectDIV = document.createElement('div');
    newProjectDIV.classList.add('new-project-form');
    const nameField = document.createElement('input');
    nameField.setAttribute('id', 'newProjectName');
    const button = document.createElement('button');
    button.addEventListener('click', (_e) => {
      const projectTitle = document.querySelector('#newProjectName').value;
      if (projectTitle !== '') {
        pageCoord.projects.push(project(projectTitle));
        pageCoord.refresh(pageCoord.getCurrProject());
      }
    });
    button.textContent = '+';
    newProjectDIV.appendChild(nameField);
    newProjectDIV.appendChild(button);
    return newProjectDIV;
  };


  const render = function() {
    const projects = pageCoord.projects;
    element.textContent = '';
    projects.forEach((iproj) => {
      const button = document.createElement('button');
      button.classList.add('project-button');
      button.addEventListener('click', (_e) => {
        pageCoord.refresh(iproj);
      });
      button.textContent = iproj.getProjectTitle();
      element.appendChild(button);
    });
    element.appendChild(addProjectButton());
  };
  return {render, element};
};

export const newNoteRenderer = function(pageCoordinator) {
  const pageCoord = pageCoordinator;
  const element = document.createElement('div');
  element.classList.add('input-form');

  const formFieldConstructor = function(id, text) {
    const field = document.createElement('div');
    const label = document.createElement('label');
    label.setAttribute('for', id);
    label.textContent = text;
    const input = document.createElement('input');
    input.setAttribute('type', 'text');
    input.setAttribute('id', id);
    field.appendChild(label);
    field.appendChild(input);
    return field;
  };

  const render = function() {
    const title = formFieldConstructor('title', 'Title');
    const desc = formFieldConstructor('desc', 'Description');
    const due = formFieldConstructor('due', 'Due Date');
    const priority = formFieldConstructor('priority', 'Priority');
    element.textContent = '';
    element.appendChild(title);
    element.appendChild(desc);
    element.appendChild(due);
    element.appendChild(priority);
    const button = document.createElement('button');
    button.classList.add('button-submit');
    button.addEventListener('click', (_e) => {
      const title = document.querySelector('#title');
      const desc = document.querySelector('#desc');
      const due = document.querySelector('#due');
      const priority = document.querySelector('#priority');
      const note = toDoItem(title.value, desc.value, due.value, priority.value);
      pageCoord.getCurrProject().addNote(note);
      pageCoord.refresh(pageCoord.getCurrProject());
    });
    button.textContent = 'Submit to active project';
    element.appendChild(button);
  };
  return {render, element};
};

export const noteViewRenderer = function(pageCoordinator) {
  const pageCoord = pageCoordinator;
  const element = document.createElement('div');
  element.classList.add('note-view');

  const renderNote = function(note) {
    const makeHeadline = function(headline) {
      const entry = document.createElement('h2');
      entry.textContent = headline;
      return entry;
    };
    const noteElement = document.createElement('div');
    noteElement.classList.add('note');

    const headlineTitle = makeHeadline('Title');
    noteElement.appendChild(headlineTitle);
    const noteElementTitle = document.createElement('div');
    noteElementTitle.classList.add('note-title');
    noteElementTitle.textContent = note.title();
    noteElement.appendChild(noteElementTitle);

    const headlineDesc = makeHeadline('Description');
    noteElement.appendChild(headlineDesc);
    const noteElementDesc = document.createElement('div');
    noteElementDesc.classList.add('note-desc');
    noteElementDesc.textContent = note.description();
    noteElement.appendChild(noteElementDesc);

    const headlineDue = makeHeadline('Due-Date');
    noteElement.appendChild(headlineDue);
    const noteElementDueDate = document.createElement('div');
    noteElementDueDate.classList.add('note-due-date');
    noteElementDueDate.textContent = note.dueDate();
    noteElement.appendChild(noteElementDueDate);

    const headlinePriority = makeHeadline('Priority');
    noteElement.appendChild(headlinePriority);
    const noteElementPriority = document.createElement('div');
    noteElementPriority.classList.add('note-priority');
    noteElementPriority.textContent = note.priority();
    noteElement.appendChild(noteElementPriority);

    const button = document.createElement('button');
    button.addEventListener('click', (_e) => {
      console.log(pageCoord.getCurrProject().getNotes());
      pageCoord.getCurrProject().removeNote(note.title());
      console.log(pageCoord.getCurrProject().getNotes());
      pageCoord.refresh(pageCoord.getCurrProject());
    });
    button.textContent = 'Remove note';
    noteElement.appendChild(button);

    return noteElement;
  };

  const render = function() {
    element.textContent = '';
    if (pageCoord.getCurrProject() !== undefined) {
      if (pageCoord.getCurrProject().getNotes() !== undefined) {
        pageCoord.getCurrProject().getNotes().forEach((inote) => {
          if (inote !== undefined) {
            const note = renderNote(inote);
            element.appendChild(note);
          }
        });
      }
    }
  };
  return {render, element};
};


