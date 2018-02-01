
import xhookImport from 'xhook';

// Just in-case, should update when this is resolved https://github.com/jpillora/xhook/issues/85
var xhook;
if (xhookImport.enable === undefined) {
    if (xhookImport.xhook === undefined || xhookImport.xhook.enable === undefined) {
        throw new Error('Unrecognized xhook exports');
    } else {
        xhook = xhookImport.xhook;
    }
} else {
    xhook = xhookImport;
}

export default {
}
