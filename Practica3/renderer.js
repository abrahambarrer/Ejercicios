const openButton = document.getElementById('openButton')
const fileContent = document.getElementById('fileContent')

openButton.addEventListener('click', async () => {
  const result = await window.electronAPI.openFile()
  if (!result.canceled) {
    fileContent.value = result.content
    console.log('Contenido cargado correctamente.')
  } else {
    console.log('Selección cancelada.')
  }
})
