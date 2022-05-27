var value = 0
var pow = Math.pow
var sin = Math.sin
var cos = Math.cos
var pi = Math.PI
var sqrt = Math.sqrt
var abs = Math.abs
var asin = Math.asin

function ClampedSpeed(speed, debug) {
    value = value + Globals.Frametime() * speed * 0.01
    var value_clamped = Math.max(0, Math.min(1, (value % 2) - 0.5))

	if(!debug) { 
        return value_clamped 
    } else {
        return (value_clamped), (Cheat.Print(value_clamped + "\n"))
    }
}

function linear(t, b, c, d) {
	return c * t / d + b
}

function inQuad(t, b, c, d) {
	t = t / d
	return c * pow(t, 2) + b
}

function outQuad(t, b, c, d) {
	t = t / d
	return -c * t * (t - 2) + b
}

function inOutQuad(t, b, c, d) {
	t = t / d * 2
	if (t < 1) {
		return c / 2 * pow(t, 2) + b
    } else {
		return -c / 2 * ((t - 1) * (t - 3) - 1) + b
	}
}

function outInQuad(t, b, c, d) {
	if (t < d / 2) {
		return outQuad (t * 2, b, c / 2, d)
    } else {
		return inQuad((t * 2) - d, b + c / 2, c / 2, d)
	}
}

function inCubic (t, b, c, d) {
	t = t / d
	return c * pow(t, 3) + b
}

function outCubic(t, b, c, d) {
	t = t / d - 1
	return c * (pow(t, 3) + 1) + b
}

function inOutCubic(t, b, c, d) {
	t = t / d * 2
	if (t < 1) {
		return c / 2 * t * t * t + b
    } else {
		t = t - 2
		return c / 2 * (t * t * t + 2) + b
	}
}

function outInCubic(t, b, c, d) {
	if (t < d / 2) {
		return outCubic(t * 2, b, c / 2, d)
    } else {
		return inCubic((t * 2) - d, b + c / 2, c / 2, d)
	}
}

function inQuart(t, b, c, d) {
	t = t / d
	return c * pow(t, 4) + b
}

function outQuart(t, b, c, d) {
	t = t / d - 1
	return -c * (pow(t, 4) - 1) + b
}

function inOutQuart(t, b, c, d) {
	t = t / d * 2
	if (t < 1) {
		return c / 2 * pow(t, 4) + b
    } else {
		t = t - 2
		return -c / 2 * (pow(t, 4) - 2) + b
	}
}

function outInQuart(t, b, c, d) {
	if (t < d / 2) {
		return outQuart(t * 2, b, c / 2, d)
    } else {
		return inQuart((t * 2) - d, b + c / 2, c / 2, d)
	}
}

function inQuint(t, b, c, d) {
	t = t / d
	return c * pow(t, 5) + b
}

function outQuint(t, b, c, d) {
	t = t / d - 1
	return c * (pow(t, 5) + 1) + b
}

function inOutQuint(t, b, c, d) {
	t = t / d * 2
	if (t < 1) {
		return c / 2 * pow(t, 5) + b
    } else {
		t = t - 2
		return c / 2 * (pow(t, 5) + 2) + b
	}
}

function outInQuint(t, b, c, d) {
	if (t < d / 2)  {
		return outQuint(t * 2, b, c / 2, d)
    } else {
		return inQuint((t * 2) - d, b + c / 2, c / 2, d)
    }
}

function inSine(t, b, c, d) {
	return -c * cos(t / d * (pi / 2)) + c + b
}

function outSine(t, b, c, d) {
	return c * sin(t / d * (pi / 2)) + b
}

function inOutSine(t, b, c, d) {
	return -c / 2 * (cos(pi * t / d) - 1) + b
}

function outInSine(t, b, c, d) {
	if (t < d / 2) {
		return outSine(t * 2, b, c / 2, d)
    } else {
		return inSine((t * 2) -d, b + c / 2, c / 2, d)
	}
}

function inExpo(t, b, c, d) {
	if (t == 0) { 
		return b
	} else {
		return c * pow(2, 10 * (t / d - 1)) + b - c * 0.001
	}
}

function outExpo(t, b, c, d) {
	if (t == d) {
		return b + c
	} else {
		return c * 1.001 * (-pow(2, -10 * t / d) + 1) + b
	}
}

function inOutExpo(t, b, c, d) {
	if (t == 0) { return b }
	if (t == d) { return b + c }
	t = t / d * 2
	if (t < 1) {
		return c / 2 * pow(2, 10 * (t - 1)) + b - c * 0.0005
	} else {
		t = t - 1
		return c / 2 * 1.0005 * (-pow(2, -10 * t) + 2) + b
	}
}

function outInExpo(t, b, c, d) {
	if (t < d / 2) {
		return outExpo(t * 2, b, c / 2, d)
	} else {
		return inExpo((t * 2) - d, b + c / 2, c / 2, d)
	}
}

function inCirc(t, b, c, d) {
	t = t / d
	return(-c * (sqrt(1 - pow(t, 2)) - 1) + b)
}

function outCirc(t, b, c, d) {
	t = t / d - 1
	return(c * sqrt(1 - pow(t, 2)) + b)
}

function inOutCirc(t, b, c, d) {
	t = t / d * 2
	if (t < 1) {
		return -c / 2 * (sqrt(1 - t * t) - 1) + b
	} else {
		t = t - 2
		return c / 2 * (sqrt(1 - t * t) + 1) + b
	}
}

function outInCirc(t, b, c, d) {
	if(t < d / 2) {
		return outCirc(t * 2, b, c / 2, d)
	} else {
		return inCirc((t * 2) - d, b + c / 2, c / 2, d)
	}
}

function inElastic(t, b, c, d, a, p) {
	if(t == 0) { return b }

	t = t / d
	if(t == 1)	{ return b + c }
	if(!p) { p = d * 0.3 }

	var s

	if (!a || a < abs(c)) {
		a = c
		s = p / 4
	} else {
		s = p / (2 * pi) * asin(c/a)
	}

	t = t - 1

	return -(a * pow(2, 10 * t) * sin((t * d - s) * (2 * pi) / p)) + b
}

function outElastic(t, b, c, d, a, p) {
	if(t == 0) { return b }

	t = t / d

	if(t == 1) { return b + c }

	if(!p) { p = d * 0.3 }

	var s

	if (!a || a < abs(c)) {
		a = c
		s = p / 4
	} else {
		s = p / (2 * pi) * asin(c/a)
	}

	return a * pow(2, -10 * t) * sin((t * d - s) * (2 * pi) / p) + c + b
}

function inOutElastic(t, b, c, d, a, p) {
	if (t == 0) { return b }

	t = t / d * 2

	if (t == 2) { return b + c }

	if (!p) { p = d * (0.3 * 1.5) }
	if (!a) { a = 0 }

	var s

	if (!a || a < abs(c)) {
		a = c
		s = p / 4
	} else {
		s = p / (2 * pi) * asin(c / a)
	}

	if (t < 1) {
		t = t - 1
		return -0.5 * (a * pow(2, 10 * t) * sin((t * d - s) * (2 * pi) / p)) + b
	} else {
		t = t - 1
		return a * pow(2, -10 * t) * sin((t * d - s) * (2 * pi) / p ) * 0.5 + c + b
	}
}

function outInElastic(t, b, c, d, a, p) {
	if (t < d / 2) {
		return outElastic(t * 2, b, c / 2, d, a, p)
	} else {
		return inElastic((t * 2) - d, b + c / 2, c / 2, d, a, p)
	}
}

function inBack(t, b, c, d, s) {
	if (!s) { s = 1.70158 }
	t = t / d
	return c * t * t * ((s + 1) * t - s) + b
}

function outBack(t, b, c, d, s) {
	if (!s) { s = 1.70158 }
	t = t / d - 1
	return c * (t * t * ((s + 1) * t + s) + 1) + b
}

function inOutBack(t, b, c, d, s) {
	if (!s) { s = 1.70158 }
	s = s * 1.525
	t = t / d * 2
	if (t < 1) {
		return c / 2 * (t * t * ((s + 1) * t - s)) + b
	} else {
		t = t - 2
		return c / 2 * (t * t * ((s + 1) * t + s) + 2) + b
	}
}

function outInBack(t, b, c, d, s) {
	if (t < d / 2) {
		return outBack(t * 2, b, c / 2, d, s)
	} else {
		return inBack((t * 2) - d, b + c / 2, c / 2, d, s)
	}
}

function outBounce(t, b, c, d) {
	t = t / d
	if (t < 1 / 2.75) {
		return c * (7.5625 * t * t) + b
	} else if (t < 2 / 2.75) {
		t = t - (1.5 / 2.75)
		return c * (7.5625 * t * t + 0.75) + b
	} else if (t < 2.5 / 2.75) {
		t = t - (2.25 / 2.75)
		return c * (7.5625 * t * t + 0.9375) + b
	} else {
		t = t - (2.625 / 2.75)
		return c * (7.5625 * t * t + 0.984375) + b
	}
}

function inBounce(t, b, c, d) {
	return c - outBounce(d - t, 0, c, d) + b
}

function inOutBounce(t, b, c, d) {
	if (t < d / 2) {
		return inBounce(t * 2, 0, c, d) * 0.5 + b
	} else {
		return outBounce(t * 2 - d, 0, c, d) * 0.5 + c * .5 + b
	}
}

function outInBounce(t, b, c, d) {
	if (t < d / 2) {
		return outBounce(t * 2, b, c / 2, d)
	} else {
		return inBounce((t * 2) - d, b + c / 2, c / 2, d)
	}
}
