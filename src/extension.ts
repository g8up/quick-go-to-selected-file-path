'use strict'
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode'
import * as util from './util';

function getSelection(editor) {
  // current editor
  // check if there is no selection
  if (editor.selection.isEmpty) {
    // select word under cursor
    const detectFileName = /(?<=\/|^)(?!(?=\/|\$|\@))[\w\d\-\./]+(?=\/|$)*/
    const fileNameSelected = editor.document.getWordRangeAtPosition(
      editor.selection.active,
      detectFileName,
    )

    if (!fileNameSelected) return ''

    return editor.document.getText(fileNameSelected)
  }
  return util.pathSimplify(editor.document.getText(editor.selection));

}

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  // The command has been defined in the package.json file
  // Now provide the implementation of the command with  registerCommand
  // The commandId parameter must match the command field in package.json
  let disposable = vscode.commands.registerCommand(
    'extension.quickGoToSelectedFilePath',
    () => {
      // The code you place here will be executed every time your command is executed
      const editor = vscode.window.activeTextEditor;
      if (editor) {
        // Display a message box to the user
        vscode.commands.executeCommand(
          'workbench.action.quickOpen',
          getSelection(editor).trim(),
        )
        // vscode.window.showInformationMessage(getSelection());
      } else {
        vscode.window.showInformationMessage('Please execute the command in editors.');
      }
    },
  )

  context.subscriptions.push(disposable)
}

// this method is called when your extension is deactivated
export function deactivate() { }
