import {getByProps} from "enmity/modules"
import {Text} from "enmity/components"
import {Constants, React, StyleSheet} from "enmity/metro/common"

const ReactNative = getByProps("View")
const {NativeModules} = ReactNative
const FileManager = NativeModules.DCDFileManager ?? NativeModules.RTNFileManager

export function formatBytes(bytes, decimals = 2) {
    if (!+bytes) return '0 Bytes'

    const k = 1024
    const dm = decimals < 0 ? 0 : decimals
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']

    const i = Math.floor(Math.log(bytes) / Math.log(k))

    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`
}

export default ({filePath}) => {
    const styles = StyleSheet.createThemedStyleSheet({
        sizeText: {
            includeFontPadding: false,
            fontSize: 12,
            color: Constants.ThemeColorMap.TEXT_NORMAL,
            fontFamily: Constants.Fonts.PRIMARY_BOLD,
        }
    })
    const [size, setSize] = React.useState("")
    React.useEffect(() => {
        FileManager.getSize(filePath).then(size => {
            setSize(formatBytes(size))
        })
    }, [])
    return (
        <Text style={styles.sizeText}>{size}</Text>
    )
}

