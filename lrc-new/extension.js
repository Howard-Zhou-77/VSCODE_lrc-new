const vscode = require('vscode');
var time = "00:00.00";
/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
    let disposable = vscode.commands.registerTextEditorCommand('lrc-new.newTimeTag', (textEditor, edit) => {
        vscode.commands.executeCommand("cursorHome");
        let sec = textEditor.selection;
        textEditor.edit(builder => {
            builder.insert(sec.anchor.translate(0, -sec.anchor.character), "[".concat(time).concat("]"));
        })
        vscode.commands.executeCommand("cursorDown");
    });
    let disposable_2 = vscode.commands.registerTextEditorCommand('lrc-new.timeTagDelete', (textEditor, edit) => {
        let sec = textEditor.selection;
        let rg = new vscode.Range(sec.anchor.translate(0, -sec.anchor.character), sec.anchor)
        let text = textEditor.document.getText(rg)
        let reg = /(\[\d\d:\d\d.\d{1,4}\]|\[\w*:\w*\])(.*)/
        if (text.match(reg)!=null) {
            textEditor.edit(builder => {
                builder.replace(rg, text.replace(reg, "$2"));
            })
        }
    })
    context.subscriptions.push(disposable);
    context.subscriptions.push(disposable_2);
}
exports.activate = activate;
function deactivate() {
    //
}
module.exports = {
    activate,
    deactivate
}