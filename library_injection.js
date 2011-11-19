
var render = function() {
  var spacerDOM = document.querySelector('.tbl_spacer');

  var resumeDOM = document.querySelector('.lblResume_adv2');
  resumeDOM = resumeDOM.parentNode;

  var librariesDOM = document.createElement('span');
  librariesDOM.innerText = chrome.i18n.getMessage('libraryHeader');
  librariesDOM.className = 'lblLibraries_adv2 lblMore';
  var librariesWrapperDOM = document.createElement('div');
  librariesWrapperDOM.className = 'lblMoreContainer';
  librariesWrapperDOM.appendChild(librariesDOM);

  var librariesContent = document.createElement('div');
  librariesContent.innerText = 'A determiner';
  librariesContent.className = 'library_lookup_body';
  librariesContent.innerHTML = '<ul id="result_list"></ul>';

  var parentResume = resumeDOM.parentNode;
  parentResume.insertBefore(librariesWrapperDOM, resumeDOM);
  parentResume.insertBefore(librariesContent, resumeDOM);
  parentResume.insertBefore(spacerDOM.cloneNode(true), resumeDOM);

  return librariesContent;
}

var renderLibraries = function(data) {
  var resultList = document.querySelector('#result_list');
  data.forEach(function(element, index) {
    var item = document.createElement('li');
    var status = document.createElement('span');
    status.innerText = element.status;
    item.appendChild(status);
    item.appendChild(document.createTextNode(element.district));
    resultList.appendChild(item);
  });
}

var isbnSpan = document.querySelector('span[id$="ISBNInfo"]');
if( isbnSpan ) {
    var isbnMatch = isbnSpan.innerText.match(/\((\d+)\)/);
    if( isbnMatch ) {
        var ui = render();
        var isbn = isbnMatch[1];
        chrome.extension.sendRequest({method: 'GetLibraryData', data: isbn}, function(res) {
          renderLibraries(res);
        });
    }
}

