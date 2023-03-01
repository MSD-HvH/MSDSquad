function Clamp(val, min, max) {
	if (val > max) return max
	if (min > val) return min
	return val
}

function InBounds(mouse_pos, x, y, x2, y2) {
	return (mouse_pos[0] > x) && (mouse_pos[1] > y) && (mouse_pos[0] < x2) && (mouse_pos[1] < y2)
}

function Lerp(a, b, c) {
	return a + (b - a) * c; 
}

function SetDropdownValue(value, index, enable) {
	var mask = 1 << index;
	return enable ? (value | mask) : (value &~ mask)
}

/*ui.add_combo("Test", "test", ["Hello world", "Welcome", "How are", "You", "Yep", "That", "Test"])
register_callback("render", function() {
	vars.set_uint("js.test", SetDropdownValue(6, 6, false))
})*/
