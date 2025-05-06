const setButton = document.getElementById('btn')
const messageInput = document.getElementById('messageInput')
const paragraph = document.getElementById('message')
setButton.addEventListener('click', () => {
  const message = messageInput.value
  paragraph.textContent = `Mensaje: ${message}`
  window.electronAPI.sendMessage(message)
})