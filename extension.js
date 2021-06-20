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

async function activate(context) {
	let disposable = vscode.commands.registerCommand('ext.helloWorld', async function () {
		let language = await vscode.window.showInformationMessage('Your favorite language ;)', 'Python', 'JS', 'React-JS', 'TS', 'React-TS', 'HTML');
		vscode.workspace.onDidCreateFiles(async (e) => {
			
			let path = e.files[0].path;
			let fileName = path.split('/');
			fileName = fileName[fileName.length - 1];

			if (fs.lstatSync(path).isDirectory()) {
				return;
			}

			if (fileName.includes('.')) {
				return
			}
			
			vscode.commands.executeCommand('workbench.action.closeActiveEditor').then(async() => {
				let newPath = await path+extention(language);
				console.log(newPath);
				await fs.rename(path,newPath,(err) => {
					if(err) throw err;
				});

				vscode.workspace.openTextDocument(newPath).then((docu) => {
					vscode.window.showTextDocument(docu,1,false).then(() => {
						return;
					});
				})
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

	});

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
function deactivate() { }



module.exports = {
	activate,
	deactivate
}



