
// DOES NOT MAKE SENSE... RENAME THIS ACTION AND REUSE IT
export const DEBUG_SETTINGS_UPDATED = 'DEBUG_SETTINGS_UPDATED'

import { forEach } from 'lodash'

const updateLocalStorage = (formModel) => {
    forEach(formModel, (v, k) => {
        localStorage.setItem(k, v);
    });
}

export const updateDebugSettings = (formModel) => dispatch => {
    updateLocalStorage(formModel);
    window.location.href = window.location.href;
    dispatch({
        type: DEBUG_SETTINGS_UPDATED,
        payload: formModel
    })

}
