function setBadge(...args) {
  if (navigator.setAppBadge) {
    navigator.setAppBadge(...args);
  } else if (navigator.setExperimentalAppBadge) {
    navigator.setExperimentalAppBadge(...args);
  } else if (window.ExperimentalBadge) {
    window.ExperimentalBadge.set(...args);
  }
}

function clearBadge() {
  if (navigator.clearAppBadge) {
    navigator.clearAppBadge();
  } else if (navigator.clearExperimentalAppBadge) {
    navigator.clearExperimentalAppBadge();
  } else if (window.ExperimentalBadge) {
    window.ExperimentalBadge.clear();
  }
}