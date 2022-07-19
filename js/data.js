/* exported data */

var data = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1
};

var dataEntryValues = localStorage.getItem('code-journal-entries');
if (dataEntryValues !== null) {
  data = JSON.parse(dataEntryValues);
}

function addToLocalStorage(event) {
  var dataValues = JSON.stringify(data);
  localStorage.setItem('code-journal-entries', dataValues);
}
window.addEventListener('beforeunload', addToLocalStorage);
