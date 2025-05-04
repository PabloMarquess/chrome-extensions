function updateCount() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.scripting.executeScript({
        target: {tabId: tabs[0].id},
        function: () => {
          const selectedText = window.getSelection().toString();
          return {
            lines: selectedText ? selectedText.split('\n').length : 0,
            chars: selectedText ? selectedText.length : 0,
            hasSelection: selectedText.length > 0
          };
        }
      }, (results) => {
        if (results && results[0]) {
          const result = results[0].result;
          document.getElementById('lines').textContent = result.lines;
          document.getElementById('chars').textContent = result.chars;
          document.getElementById('no-selection').style.display = 
            result.hasSelection ? 'none' : 'block';
        }
      });
    });
  }
  
  // Atualiza assim que o popup abre
  document.addEventListener('DOMContentLoaded', updateCount);