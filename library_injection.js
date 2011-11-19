
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

resumeDOM.parentNode.insertBefore(librariesWrapperDOM, resumeDOM);
resumeDOM.parentNode.insertBefore(librariesContent, resumeDOM);

var isbnSpan = document.querySelector('span[id$="ISBNInfo"]');
if( isbnSpan ) {
    isbn = isbnSpan.innerText.match(/\((\d+)\)/);
    if( isbn ) {
        librariesContent.innerText = isbn[1];
    }
}

