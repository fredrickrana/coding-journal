var $image = document.querySelector('img');
var $photourl = document.querySelector('input[name="photourl"]');
var $form = document.querySelector('form');

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
