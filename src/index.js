export const toDoItem = function(
    itemTitle, itemDescription, itemDueDate, itemPriority) {
  const _title = itemTitle;
  const _description = itemDescription;
  const _dueDate = itemDueDate;
  const _priority = itemPriority;

  const title = function() {
    return _title;
  };
  const description = function() {
    return _description;
  };
  const dueDate = function() {
    return _dueDate;
  };
  const priority = function() {
    return _priority;
  };

  const toString = function() {
    const out = {stitle: title(),
      sdescription: description(),
      sdueDate: dueDate(),
      spriority: priority()};
    const result = JSON.stringify(out);
    console.log(result);
    return result;
  };

  const fromString = function(input) {
    const parsed = JSON.parse(input);
    return toDoItem(parsed.stitle, parsed.sdescription, parsed.sdueDate, parsed.spriority);
  };

  const summary = function() {
    return title() + ' : ' + description();
  };
  return {title, description, dueDate, priority, summary, toString, fromString};
};

export const project = function(projectTitle) {
  const _projectTitle = projectTitle;
  let _attachedNotes = [];

  const getProjectTitle = function() {
    return _projectTitle;
  };
  const getNotes = function() {
    return _attachedNotes;
  };
  const addNote = function(note) {
    _attachedNotes.push(note);
  };

  const toString = function() {
    const out = {title: getProjectTitle(),
      notes: _attachedNotes.map((inote) => inote.toString())};
    const result = JSON.stringify(out);
    return result;
  };

  const fromString = function(input) {
    const parsed = JSON.parse(input);
    const iproj = project(parsed.title);
    parsed.notes.forEach((inote) => iproj.addNote(toDoItem(inote)));
    return iproj;
  };

  const removeNote = function(title) {
    _attachedNotes = _attachedNotes.filter(
        (inote) => inote.title() !== title);
  };


  return {getProjectTitle, getNotes, addNote, removeNote, toString, fromString};
};

export const projectAggregator = function() {
  const _projectList = [];

  const getProject = function(projectID) {
    return _projectList[projectID];
  };

  const getAllProjects = function() {
    return _projectList;
  };

  const addProject = function(project, projectID) {
    _projectList.push(project);
  };
  return {getProject, addProject, getAllProjects};
};
