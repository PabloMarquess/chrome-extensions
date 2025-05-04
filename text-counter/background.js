// Atualiza o tooltip a cada 1 segundo
setInterval(() => {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      if (!tabs[0]) return;
      
      chrome.scripting.executeScript({
        target: {tabId: tabs[0].id},
        function: () => {
          const selectedText = window.getSelection().toString();
          const lines = selectedText ? selectedText.split('\n').length : 0;
          const chars = selectedText ? selectedText.length : 0;
          return `Linhas: ${lines} | Caracteres: ${chars}`;
        }
      }, (results) => {
        if (results && results[0]) {
          chrome.action.setTitle({
            title: results[0].result
          });
        }
      });
    });
  }, 3000);