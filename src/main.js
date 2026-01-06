const path = require("path");
const { app, BrowserWindow } = require("electron");

const HTML_FILE = 'Calculadora.html';

function createMainWindow() {
    const mainWindow = new BrowserWindow({
        title: "Calculadora Multibase",
        width: 600,
        height: 850,
        resizable: false,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        }
    });
    mainWindow.loadFile(path.join(__dirname, HTML_FILE));
}

app.whenReady().then(createMainWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createMainWindow();
});
