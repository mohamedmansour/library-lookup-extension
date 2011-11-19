/**
 * Manages a single instance of the entire application.
 *
 * @author Mohamed Mansour 2011 (http://mohamedmansour.com)
 * @constructor
 */
BackgroundController = function() {
  this.onExtensionLoaded();
  this.LIBRARY_SERVICE_URL = '/mock_response.json';
};

/**
 * Triggered when the extension just loaded. Should be the first thing
 * that happens when chrome loads the extension.
 */
BackgroundController.prototype.onExtensionLoaded = function() {
  var currVersion = chrome.app.getDetails().version;
  var prevVersion = settings.version;
  if (currVersion != prevVersion) {
    // Check if we just installed this extension.
    if (typeof prevVersion == 'undefined') {
      this.onInstall();
    } else {
      this.onUpdate(prevVersion, currVersion);
    }
    settings.version = currVersion;
  }
};

/**
 * Triggered when the extension just installed.
 */
BackgroundController.prototype.onInstall = function() {
  // chrome.tabs.create({url: 'options.html'});
};

/**
 * Triggered when the extension just uploaded to a new version. DB Migrations
 * notifications, etc should go here.
 *
 * @param {string} previous The previous version.
 * @param {string} current  The new version updating to.
 */
BackgroundController.prototype.onUpdate = function(previous, current) {
  // chrome.tabs.create({url: 'updates.html'});
};

/**
 * Initialize the main Background Controller
 */
BackgroundController.prototype.init = function() {
  chrome.extension.onRequest.addListener(this.onMessage.bind(this));
};

/**
 * Message Passing Listener.
 */
BackgroundController.prototype.onMessage = function(request, sender, response) {
  if (request.method == 'GetLibraryData') {
    this.getLibraryData(request.data, response);
  }
  else {
    response({});
  }
};

BackgroundController.prototype.getLibraryData = function(isbn, callback) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', this.LIBRARY_SERVICE_URL/* + isbn*/, true);
  xhr.onload = function(e) {
    if (xhr.status == 200) {
      var response = JSON.parse(xhr.responseText);
      callback(response);
    }
    else {
      console.error('hackathon-extension: Cannot load ' + url);
    }
  };
  xhr.send(null);
};
