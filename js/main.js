var $image = document.querySelector('.image-size');
var $photourl = document.querySelector('input[name="photourl"]');
var $form = document.querySelector('form');
var $ul = document.querySelector('.list-of-entries');
var $noEntries = document.querySelector('.no-entries');
var $entriesNav = document.querySelector('.entries-header');
var $newButton = document.querySelector('.button-new');
var $entryForm = document.querySelector('.entry-form');
var $entries = document.querySelector('.entries');
var $deleteButton = document.querySelector('.button-delete');
var $modal = document.querySelector('.modal-layout');
var $cancelButton = document.querySelector('.button-cancel');
var $confirmButton = document.querySelector('.button-confirm');
var $searchBar = document.querySelector('.searchbar');

function updateImageSource(event) {
  $image.setAttribute('src', $photourl.value);
  if ($photourl.value === '') {
    $image.setAttribute('src', 'images/placeholder-image-square.jpg');
  }
}
$photourl.addEventListener('input', updateImageSource);

function invalidImageURL(event) {
  if (data.view === 'entry-form') {
    event.target.src = 'images/placeholder-image-square.jpg';
  }
}
$image.addEventListener('error', invalidImageURL);

function submitEntries(event) {
  event.preventDefault();
  if (data.editing === null) {
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
  } else {
    data.editing.title = $form.title.value;
    data.editing.photourl = $form.photourl.value;
    data.editing.notes = $form.notes.value;
    var $li = document.querySelectorAll('.journal-entry');
    for (var i = 0; i < $li.length; i++) {
      if (data.editing.entryId === parseInt($li[i].getAttribute('data-entry-id'))) {
        $li[i].replaceWith(newEntry(data.editing));
      }
    }
  }
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
  liElement.setAttribute('class', 'journal-entry');
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
  $form.reset();
  updateImageSource();
  data.editing = null;
  $deleteButton.className = 'hidden';
}
$newButton.addEventListener('click', goToForm);

function stayOnPage(event) {
  viewSwap();
  $modal.className = 'hidden';
}
window.addEventListener('load', stayOnPage);

function editAnEntry(event) {
  data.view = 'entry-form';
  viewSwap();
  var closestLi = event.target.closest('li');
  var attributeOfLi = closestLi.getAttribute('data-entry-id');
  var entryIdNumber = parseInt(attributeOfLi);
  for (var i = 0; i < data.entries.length; i++) {
    if (entryIdNumber === data.entries[i].entryId) {
      data.editing = data.entries[i];
    }
  }
  $form.title.value = data.editing.title;
  $form.photourl.value = data.editing.photourl;
  $form.notes.value = data.editing.notes;
  updateImageSource();
  $deleteButton.className = 'button-delete';
}

function deleteModal(event) {
  $modal.className = 'modal-layout';
}
$deleteButton.addEventListener('click', deleteModal);

function cancelDelete(event) {
  $modal.className = 'hidden';
}
$cancelButton.addEventListener('click', cancelDelete);

function confirmDelete(event) {
  $modal.className = 'hidden';
  var $li = document.querySelectorAll('.journal-entry');
  for (var i = 0; i < $li.length; i++) {
    if (data.editing.entryId === parseInt($li[i].getAttribute('data-entry-id'))) {
      $li[i].remove();
      data.view = 'entries';
      viewSwap();
      deleteInDataEntries();
      data.editing = null;
    }
  }
}
$confirmButton.addEventListener('click', confirmDelete);

function deleteInDataEntries() {
  for (var x = 0; x < data.entries.length; x++) {
    if (data.editing.entryId === data.entries[x].entryId) {
      data.entries.splice(x, 1);
    }
  }
}

function searchForEntry(event) {
  var $searchInput = document.querySelector('.searchbar').value;
  for (var i = 0; i < data.entries.length; i++) {
    if (data.entries[i].title.toLowerCase().includes($searchInput.toLowerCase())) {
      var $li = document.querySelectorAll('.journal-entry');
      for (var x = 0; x < $li.length; x++) {
        if (data.entries[i].entryId === parseInt($li[x].getAttribute('data-entry-id'))) {
          $li[x].className = 'entries';
        } else {
          $li[x].className = 'hidden';
        }
      }
    }
  }
}
$searchBar.addEventListener('keyup', searchForEntry);

function unclickSearchBar(event) {
  var $searchInput = document.querySelector('.searchbar').value;
  if ($searchInput === '') {
    window.location.reload();
  }
}
$searchBar.addEventListener('blur', unclickSearchBar);
