import {project, toDoItem} from './index.js';
import {navRenderer, newNoteRenderer, noteViewRenderer} from './renderers.js';

const pageCoordinator = function() {
  const renderers = [];
  const projects = [];
  let currProject = undefined;

  const save = function() {
    const saveState = projects.map((iproj) => iproj.toString());
    console.log(saveState);
    localStorage.setItem('projects', JSON.stringify(saveState));
  };

  const refresh = function(project) {
    currProject = project;
    renderers.forEach((irenderer) => irenderer.render(currProject));
    save();
  };
  const addRenderer = function(renderer) {
    document.body.appendChild(renderer.element);
    renderers.push(renderer);
  };

  const getCurrProject = function() {
    return currProject;
  };
  return {refresh, addRenderer, projects, getCurrProject};
};

const pageCoord = pageCoordinator();
if (localStorage.getItem('projects')) {
  const input = JSON.parse(localStorage.getItem('projects'));
  const projects = input.map((iproj) => project().fromString(iproj));
  pageCoord.projects = projects;
} else {
  const sampleProj = project('Sample1');
  sampleProj.addNote(toDoItem('testTitle', 'testDesc', 'testDue', 'testPrio'));
  pageCoord.projects.push(sampleProj);
}

const nav = navRenderer(pageCoord);
pageCoord.addRenderer(nav);

const inputField = newNoteRenderer(pageCoord);
pageCoord.addRenderer(inputField);

const noteView = noteViewRenderer(pageCoord);
pageCoord.addRenderer(noteView);

pageCoord.refresh(pageCoord.projects[0]);
