var $image = document.querySelector('img');
var $photourl = document.querySelector('input[name="photourl"]');
var $form = document.querySelector('form');
var $ul = document.querySelector('ul');
var $noEntries = document.querySelector('.no-entries');
var $entriesNav = document.querySelector('.entries-header');
var $newButton = document.querySelector('.button-new');
var $entryForm = document.querySelector('.entry-form');
var $entries = document.querySelector('.entries');
// var $pencil = document.querySelectorAll('.fa-pencil');
// var $li = document.querySelectorAll('li');

function updateImageSource(event) {
  $image.setAttribute('src', $photourl.value);
  if ($photourl.value === '') {
    $image.setAttribute('src', 'images/placeholder-image-square.jpg');
  }
}
$photourl.addEventListener('input', updateImageSource);

function invalidImageURL(event) {
  event.target.src = 'images/placeholder-image-square.jpg';
}
$image.addEventListener('error', invalidImageURL);

function submitEntries(event) {
  event.preventDefault();
  var entryValues = {
    title: $form.title.value,
    photourl: $form.photourl.value,
    notes: $form.notes.value,
    entryId: data.nextEntryId
  };
  data.nextEntryId++;
  data.entries.unshift(entryValues);
  $image.setAttribute('src', 'images/placeholder-image-square.jpg');
  loadNewEntry(entryValues);
  $form.reset();
  data.view = 'entries';
  viewSwap();
}
$form.addEventListener('submit', submitEntries);

function uploadNewEntry(event) {
  for (var i = 0; i < data.entries.length; i++) {
    var allEntries = newEntry(data.entries[i]);
    $ul.appendChild(allEntries);
    $noEntries.className = 'hidden';
  }
}
window.addEventListener('DOMContentLoaded', uploadNewEntry);

function loadNewEntry(entry) {
  var load = newEntry(entry);
  $ul.prepend(load);
  $noEntries.className = 'hidden';
}

function newEntry(entry) {
  var liElement = document.createElement('li');
  liElement.setAttribute('data-entry-id', entry.entryId);
  var divOne = document.createElement('div');
  divOne.setAttribute('class', 'row marginbottom-50');
  liElement.appendChild(divOne);

  var divTwo = document.createElement('div');
  divTwo.setAttribute('class', 'column-half');
  divOne.appendChild(divTwo);

  var imgElement = document.createElement('img');
  imgElement.setAttribute('src', entry.photourl);
  imgElement.setAttribute('class', 'image-size');
  divTwo.appendChild(imgElement);

  var divThree = document.createElement('div');
  divThree.setAttribute('class', 'column-half');
  divOne.appendChild(divThree);

  var divFour = document.createElement('div');
  divFour.setAttribute('class', 'row align-center');
  divThree.appendChild(divFour);

  var divFive = document.createElement('div');
  divFive.setAttribute('class', 'flex-50');
  divFour.appendChild(divFive);

  var headerTwo = document.createElement('h2');
  headerTwo.setAttribute('class', 'journal-title');
  headerTwo.textContent = entry.title;
  divFive.appendChild(headerTwo);

  var divSix = document.createElement('div');
  divSix.setAttribute('class', 'flex-50 align-right');
  divFour.appendChild(divSix);

  var iElement = document.createElement('i');
  iElement.setAttribute('class', 'fa-solid fa-pencil');
  divSix.appendChild(iElement);

  var paragraphElement = document.createElement('p');
  paragraphElement.setAttribute('class', 'journal-notes');
  paragraphElement.textContent = entry.notes;
  divThree.appendChild(paragraphElement);

  iElement.addEventListener('click', editAnEntry);

  return liElement;
}

function viewSwap() {
  if (data.view === 'entries') {
    $entries.className = 'entries';
    $entryForm.className = 'hidden';
  } else if (data.view === 'entry-form') {
    $entries.className = 'hidden';
    $entryForm.className = 'entry-form';
  }
}

function goToEntries(event) {
  data.view = 'entries';
  viewSwap();
}
$entriesNav.addEventListener('click', goToEntries);

function goToForm(event) {
  data.view = 'entry-form';
  viewSwap();
}
$newButton.addEventListener('click', goToForm);

function stayOnPage(event) {
  viewSwap();
}
window.addEventListener('load', stayOnPage);

function editAnEntry(event) {
  data.view = 'entry-form';
  viewSwap();
  for (var i = 0; i < data.entries; i++) {
    if (event.target.closest('li').getAttribute('data-entry-id').matches(data.entries[i].entryId)) {
      data.editing = data.entries[i];
    }
  }
}

// __________________________________________________

// parent element of all rendered entries is the li element

// click on the pencil (which is the event.target)
// go to the pencil's closest li element (ancestor)
// get the attribute (data-entry-id) value of that li element

// have the value match the entryId of an entry in the data model

// ________________

// look through each event.target
// change editing to not null (?)
// matches property

// find the matching entry object in the data model and assign it to the data model's editing property if an edit icon was clicked
// parent (ancestor) div of pencil is the li element
// li element has a data-entry-id
// use closest method ('li')

// if the attribute of the event.target (which is the pencil) of the li element (which is a data-entry-id)... is equal / matches ... entryId in the multiple data.entries

// change editing property
// then pull the values of that editing property
// append it to the form...
