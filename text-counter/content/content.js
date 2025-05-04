// Cria o elemento de notificação
const notification = document.createElement('div');
notification.className = 'text-counter-notification';
document.body.appendChild(notification);

let hideTimeout;

// Função para mostrar a notificação
function showNotification(text) {
  notification.textContent = text;
  notification.classList.add('show');
  
  // Limpa o timeout anterior se existir
  if (hideTimeout) {
    clearTimeout(hideTimeout);
  }
  
  // Esconde a notificação após 3 segundo
  hideTimeout = setTimeout(() => {
    notification.classList.remove('show');
  }, 3000);
}

// Monitora mudanças na seleção de texto
document.addEventListener('selectionchange', () => {
  const selectedText = window.getSelection().toString();
  if (selectedText) {
    const lines = selectedText.split('\n').length;
    const chars = selectedText.length;
    showNotification(`Linhas: ${lines} | Caracteres: ${chars}`);
  }
});