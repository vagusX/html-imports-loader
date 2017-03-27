module.exports = function syncEvent(node, eventName, newEventHandler) {
  var eventNameLc = eventName[0].toLowerCase() + eventName.substring(1);
  var eventStore = node.__events || (node.__events = {});
  var oldEventHandler = eventStore[eventNameLc];

  // Remove old listener so they don't double up.
  if (oldEventHandler) {
    node.removeEventListener(eventNameLc, oldEventHandler);
  }

  // Bind new listener.
  if (newEventHandler) {
    node.addEventListener(eventNameLc, eventStore[eventNameLc] = function handler(e) {
      newEventHandler.call(this, e);
    });
  }
}
