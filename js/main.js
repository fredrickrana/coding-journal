var $image = document.querySelector('img');
var $photourl = document.querySelector('input[name="photourl"]');
var $form = document.querySelector('form');
// var $ul = document.querySelector('ul');

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
    entryId: data.nextEntry
  };
  data.nextEntryId++;
  data.entries.unshift(entryValues);
  $image.setAttribute('src', 'images/placeholder-image-square.jpg');
  $form.reset();
}
$form.addEventListener('submit', submitEntries);

// function uploadNewEntry(event) {
//   $ul.appendChild(entry);
// }
// window.addEventListener('DOMContentLoaded', uploadNewEntry);

// function newEntry(entry) {
//   var liElement = document.createElement('li');
//   var divOne = document.createElement('div');
//   divOne.setAttribute('class', 'row');
//   liElement.appendChild(divOne);
//   var divTwo = document.createElement('div');
//   divTwo.setAttribute('class', 'column-half');
//   divOne.appendChild(divTwo);
//   var imgElement = document.createElement('img');
//   imgElement.setAttribute('src', $photourl);
//   imgElement.setAttribute('class', 'image-size');
//   divTwo.appendChild(imgElement);
//   var divThree = document.createElement('div');
//   divThree.setAttribute('class', 'column-half');
//   divOne.appendChild(divThree);
//   var headerTwo = document.createElement('h2');
//   headerTwo.setAttribute('class', 'journal-title');
//   headerTwo.textContent = entry.title;
//   divThree.appendChild(headerTwo);
//   var paragraphElement = document.createElement('p');
//   paragraphElement.setAttribute('class', 'journal-notes');
//   paragraphElement.textContent = entry.notes;
//   divThree.appendChild(paragraphElement);
//   return liElement;
// }
