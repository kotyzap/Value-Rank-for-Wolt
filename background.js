/* Service worker: enable (light up) the toolbar icon only on Wolt domains,
 * and grey it out (disabled) everywhere else.
 *
 * We disable the action by default, then use declarativeContent's
 * ShowAction rule to re-enable it whenever the active tab's URL is on
 * wolt.com or wolt.cz. */

function installRules() {
  // Off everywhere by default -> the icon appears greyed out.
  chrome.action.disable();

  chrome.declarativeContent.onPageChanged.removeRules(undefined, () => {
    chrome.declarativeContent.onPageChanged.addRules([
      {
        conditions: [
          new chrome.declarativeContent.PageStateMatcher({
            pageUrl: { hostSuffix: "wolt.com" }
          }),
          new chrome.declarativeContent.PageStateMatcher({
            pageUrl: { hostSuffix: "wolt.cz" }
          })
        ],
        // ShowAction enables/lights up the action on matching tabs.
        actions: [new chrome.declarativeContent.ShowAction()]
      }
    ]);
  });
}

chrome.runtime.onInstalled.addListener(installRules);
// Re-assert rules when the browser restarts the service worker.
chrome.runtime.onStartup.addListener(installRules);
