
function insertAfter(newNode, existingNode) {
  if (existingNode.nextSibling) {
    existingNode.parentNode.insertBefore(newNode, existingNode.nextSibling);
  } else {
    existingNode.parentNode.appendChild(newNode);
  }
}

var spacerDOM = document.querySelector('.tbl_spacer');

var resumeDOM = document.querySelector('.lblResume_adv2');
resumeDOM = resumeDOM.parentNode;

var librariesDOM = document.createElement('span');
librariesDOM.innerText = 'foobar';
var librariesWrapperDOM = document.createElement('div');
librariesWrapperDOM.appendChild(librariesDOM);
resumeDOM.parentNode.insertBefore(librariesWrapperDOM, resumeDOM);


