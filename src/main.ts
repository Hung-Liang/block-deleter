import { Plugin } from 'obsidian';
import { EditorView, WidgetType, Decoration, DecorationSet, ViewPlugin, ViewUpdate } from '@codemirror/view';
import { BlockDeleterSettings, DEFAULT_SETTINGS, BlockDeleterSettingTab } from './settings';

export default class BlockDeleterPlugin extends Plugin {
    settings: BlockDeleterSettings;

    async onload() {
        await this.loadSettings();
        this.addSettingTab(new BlockDeleterSettingTab(this.app, this));

        const pluginInstance = this;

        class DeleteButtonWidget extends WidgetType {
            constructor(
                public readonly view: EditorView,
                public readonly fromPos: number,
                public readonly toPos: number
            ) {
                super();
            }

            toDOM() {
                const btn = document.createElement("span");
                btn.className = "block-delete-btn";
                btn.textContent = "✕";
                
                btn.addEventListener("click", (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    
                    this.view.focus();
                    
                    this.view.dispatch({
                        changes: { from: this.fromPos, to: this.toPos, insert: "" },
                        selection: { anchor: this.fromPos },
                        userEvent: "input.delete"
                    });
                });
                
                return btn;
            }
        }

        const blockDeletePlugin = ViewPlugin.fromClass(class {
            decorations: DecorationSet;

            constructor(view: EditorView) {
                this.decorations = this.buildDecorations(view);
            }

            update(update: ViewUpdate) {
                if (update.docChanged || update.viewportChanged) {
                    this.decorations = this.buildDecorations(update.view);
                }
            }

            buildDecorations(view: EditorView) {
                const widgets: any[] = [];
                const doc = view.state.doc;
                const divider = pluginInstance.settings.dividerString;
                
                const dividerLines: number[] = [];
                for (let i = 1; i <= doc.lines; i++) {
                    if (doc.line(i).text.startsWith(divider)) {
                        dividerLines.push(i);
                    }
                }

                for (let i = 0; i < dividerLines.length; i++) {
                    if (i + 1 >= dividerLines.length) {
                        continue;
                    }

                    const currentDividerLineNum = dividerLines[i] as number;
                    
                    if (currentDividerLineNum >= doc.lines) continue;

                    const contentStartLineNum = currentDividerLineNum + 1;
                    const contentStartLineObj = doc.line(contentStartLineNum);
                    
                    const deleteFromPos = contentStartLineObj.from;
                    let deleteToPos = doc.length; 
                    
                    const nextDividerLineNum = dividerLines[i + 1] as number;
                    if (nextDividerLineNum < doc.lines) {
                        deleteToPos = doc.line(nextDividerLineNum + 1).from;
                    } else {
                        deleteToPos = doc.length;
                    }

                    widgets.push(Decoration.widget({
                        widget: new DeleteButtonWidget(view, deleteFromPos, deleteToPos),
                        side: 1
                    }).range(contentStartLineObj.to));
                }
                
                return Decoration.set(widgets, true);
            }
        }, {
            decorations: v => v.decorations
        });

        this.registerEditorExtension([blockDeletePlugin]);
    }

    async loadSettings() {
        this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
    }

    async saveSettings() {
        await this.saveData(this.settings);
    }
}