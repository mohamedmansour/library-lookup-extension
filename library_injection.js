
var spacerDOM = document.querySelector('.tbl_spacer');

var resumeDOM = document.querySelector('.lblResume_adv2');
resumeDOM = resumeDOM.parentNode;

var librariesDOM = document.createElement('span');
librariesDOM.innerText = 'En Bibliotheque';
librariesDOM.className = 'lblLibraries_adv2';
var librariesWrapperDOM = document.createElement('div');
librariesWrapperDOM.className = 'lblMoreContainer';
librariesWrapperDOM.appendChild(librariesDOM);
resumeDOM.parentNode.insertBefore(librariesWrapperDOM, resumeDOM);


