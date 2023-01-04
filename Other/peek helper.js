var SetDropdownValue = function(value, index, enable) {
    var mask = 1 << index;
    return enable ? (value | mask) : (value &~ mask)
}
var cache_as = UI.GetValue(["Rage", "Accuracy", "SSG08", "Auto stop modifiers"])
var cache_at = UI.GetValue(["Rage", "Anti Aim", "Directions", "Auto direction"])
var cache_hc = UI.GetValue(["Rage", "Accuracy", "SSG08", "Hitchance"])
var cache_ps = UI.GetValue(["Rage", "Accuracy", "SSG08", "Prefer safe point"])

function idealPeek() {
    if(UI.GetValue(["Misc.", "Keys", "Keys", "Key assignment", "Auto peek"])) {
        UI.SetValue(["Rage", "Anti Aim", "Directions", "Auto direction"], 1)
        UI.SetValue(["Rage", "Accuracy", "SSG08", "Auto stop modifiers"], SetDropdownValue(2, 7, true))
        UI.SetValue(["Rage", "Accuracy", "SSG08", "Hitchance"], 60)
        UI.SetValue(["Rage", "Accuracy", "SSG08", "Prefer safe point"], 1)
    } else {
        UI.SetValue(["Rage", "Accuracy", "SSG08", "Hitchance"], cache_hc)
        UI.SetValue(["Rage", "Anti Aim", "Directions", "Auto direction"], cache_at)
        UI.SetValue(["Rage", "Accuracy", "SSG08", "Auto stop modifiers"], cache_as)
        UI.SetValue(["Rage", "Accuracy", "SSG08", "Prefer safe point"], cache_ps)
    }
}

Cheat.RegisterCallback("Draw", "idealPeek")