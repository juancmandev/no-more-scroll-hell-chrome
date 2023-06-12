if (document.querySelector('.popup')) {
  async function getCurrentTabId() {
    const queryOptions = { active: true, lastFocusedWindow: true };
    const [tab] = await chrome.tabs.query(queryOptions);

    return tab.id;
  }

  const toggleScrollCheckbox = document.getElementById('toggleScrollCheckbox');

  toggleScrollCheckbox.addEventListener('change', async (val) => {
    const isChecked = val.target.checked;
    const tabId = await getCurrentTabId();

    if (isChecked) {
      chrome.scripting.executeScript({
        target: { tabId: tabId },
        files: ['scrollOn.js'],
      });
    } else {
      chrome.scripting.executeScript({
        target: { tabId: tabId },
        files: ['scrollOff.js'],
      });
    }
  });
}
