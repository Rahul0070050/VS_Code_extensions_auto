// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const fs = require('fs');
// const _ = require('');

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
let language = null;
let path = null;
let fileName = null;
let ext = null;
let newPath = null;


async function activate(context) {
	// console.log(25);
		fs.access(`${__dirname}/.idea`,(err) => {
			if(err) return
			fs.rmdirSync(`${__dirname}/.idea`)
		})

		language = await vscode.window.showInformationMessage('working language ;)', 'Python', 'JS', 'React-JS', 'TS', 'React-TS', 'HTML');
		vscode.workspace.onDidCreateFiles(async (e) => {

			path = e.files[0].path;
			fileName = path.split('/');
			fileName = fileName[fileName.length - 1];

			if (fs.lstatSync(path).isDirectory()) {
				return;
			}

			if (fileName.includes('.')) {
				return
			}

			vscode.commands.executeCommand('workbench.action.closeActiveEditor').then(async () => {
				ext = await extention(language);
				newPath = path + ext;
				await fs.rename(path, newPath, (err) => {
					if (err) throw err;
					vscode.workspace.openTextDocument(newPath).then(async (docu) => {
						await vscode.window.showTextDocument(docu, 1, false)
					})
				});

			});


			function extention(language) {
				switch (language) {
					case 'HTML':
						return '.html';
					case 'Python':
						return '.py';
					case 'JS':
						return '.js';
					case 'React-JS':
						return '.jsx';
					case 'TS':
						return '.ts';
					case 'React-TS':
						return '.tsx';
					default:
						return '.md';
				}
			}
		})


}

// this method is called when your extension is deactivated
function deactivate() {
	language = null;
	path = null;
	fileName = null;
	ext = null;
	newPath = null;

}
// 




module.exports = {
	activate,
	deactivate
}



