import { App, PluginSettingTab, Setting } from "obsidian";
import BlockDeleterPlugin from "./main";

export interface BlockDeleterSettings {
    dividerString: string;
}

export const DEFAULT_SETTINGS: BlockDeleterSettings = {
    dividerString: '-----'
}

export class BlockDeleterSettingTab extends PluginSettingTab {
    plugin: BlockDeleterPlugin;

    constructor(app: App, plugin: BlockDeleterPlugin) {
        super(app, plugin);
        this.plugin = plugin;
    }

    display(): void {
        const { containerEl } = this;

        containerEl.empty();

        new Setting(containerEl)
            .setName('Divider string')
            .setDesc('Define the string used to separate blocks for deletion.')
            .addText(text => text
                .setPlaceholder('e.g., -----')
                .setValue(this.plugin.settings.dividerString)
                .onChange(async (value) => {
                    this.plugin.settings.dividerString = value;
                    await this.plugin.saveSettings();
                }));
    }
}