import {Plugin, registerPlugin} from 'enmity/managers/plugins'
import {React, StyleSheet, Constants} from 'enmity/metro/common'
import {create} from 'enmity/patcher'
// @ts-ignore
import manifest, {name as plugin_name} from '../manifest.json'
import Settings from "./components/Settings"
import {Pressable, View} from "enmity/components"
import SizeTag from "./components/SizeTag"

const Patcher = create('FileSizeOnPicker')

const FileSizeOnPicker: Plugin = {
    ...manifest,
    onStart() {
        const styles = StyleSheet.createThemedStyleSheet({
            sizeTagWrapper: {
                position: 'relative'
            },
            sizeTag: {
                backgroundColor: Constants.ThemeColorMap.BACKGROUND_MOBILE_SECONDARY,
                borderRadius: 4,
                paddingHorizontal: 8,
                paddingVertical: 4,
                position: 'absolute',
                top: 6,
                left: 6
            }
        })
        Patcher.before(Pressable.type, 'render', (self, args, res) => {
            if (args[0].accessibilityRole !== "imagebutton") return
            const children_ = args[0].children
            const filePath = args[0].children[0]?.props?.source?.uri
            if (filePath) {
                args[0].children =
                    <View style={styles.sizeTagWrapper}>
                        {children_}
                        <View style={styles.sizeTag}>
                            <SizeTag filePath={filePath}/>
                        </View>
                    </View>
            }
        })
    },
    onStop() {
        Patcher.unpatchAll()
    },
    getSettingsPanel({settings}) {
        return <Settings settings={settings}/>
    }
}

registerPlugin(FileSizeOnPicker)
