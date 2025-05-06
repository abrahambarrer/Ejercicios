const { app, BrowserWindow, ipcMain, dialog } = require('electron')
const path = require('node:path')
const fs = require('node:fs')

function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  win.loadFile('index.html')
}

app.whenReady().then(() => {
  createWindow()
})

// 📩 IPC listener para abrir archivo
ipcMain.handle('dialog:openFile', async () => {
  const { canceled, filePaths } = await dialog.showOpenDialog({
    properties: ['openFile'],
    filters: [{ name: 'Text Files', extensions: ['txt'] }]
  })

  if (canceled || filePaths.length === 0) return { canceled: true }

  const content = fs.readFileSync(filePaths[0], 'utf-8')
  return { canceled: false, content }
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})
