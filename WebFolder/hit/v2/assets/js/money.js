/*!
 * money.js / fx() v0.1.3
 * Copyright 2011, Joss Crowcroft
 *
 * JavaScript library for realtime currency conversion and exchange rate calculation.
 *
 * Freely distributable under the MIT license.
 * Portions of money.js are inspired by or borrowed from underscore.js
 *
 * For details, examples and documentation:
 * http://josscrowcroft.github.com/money.js/
 */
(function(root, undefined) {

	// Create a safe reference to the money.js object for use below.
	var fx = function(obj) {
		return new fxWrapper(obj);
	};

	// Current version.
	fx.version = '0.1.3';


	/* --- Setup --- */

	// fxSetup can be defined before loading money.js, to set the exchange rates and the base
	// (and default from/to) currencies - or the rates can be loaded in later if needed.
	var fxSetup = root.fxSetup || {
		rates : {
    "AED": 3.67285,
    "AFN": 56.984225,
    "ALL": 102.433999,
    "AMD": 415.587998,
    "ANG": 1.78898,
    "AOA": 97.651001,
    "ARS": 8.059882,
    "AUD": 1.07937,
    "AWG": 1.7825,
    "AZN": 0.784033,
    "BAM": 1.431031,
    "BBD": 2,
    "BDT": 77.493999,
    "BGN": 1.430268,
    "BHD": 0.376998,
    "BIF": 1540.166667,
    "BMD": 1,
    "BND": 1.2517,
    "BOB": 6.91233,
    "BRL": 2.207978,
    "BSD": 1,
    "BTC": 0.002043548,
    "BTN": 58.599375,
    "BWP": 8.712693,
    "BYR": 10077.166667,
    "BZD": 2.01568,
    "CAD": 1.091324,
    "CDF": 923.01,
    "CHF": 0.893839,
    "CLF": 0.02311,
    "CLP": 552.057997,
    "CNY": 6.221018,
    "COP": 1912.406659,
    "CRC": 552.685002,
    "CUP": 1.000113,
    "CVE": 80.3044,
    "CZK": 20.08918,
    "DJF": 178.580999,
    "DKK": 5.459827,
    "DOP": 43.16358,
    "DZD": 79.147849,
    "EEK": 11.660775,
    "EGP": 7.125402,
    "ERN": 14.952575,
    "ETB": 19.53488,
    "EUR": 0.731514,
    "FJD": 1.836765,
    "FKP": 0.592161,
    "GBP": 0.592161,
    "GEL": 1.76124,
    "GHS": 2.95338,
    "GIP": 0.592161,
    "GMD": 39.68,
    "GNF": 6963.333333,
    "GTQ": 7.73276,
    "GYD": 204.638749,
    "HKD": 7.753256,
    "HNL": 19.103689,
    "HRK": 5.568146,
    "HTG": 44.99956,
    "HUF": 222.049499,
    "IDR": 11516.033333,
    "ILS": 3.487808,
    "INR": 58.57703,
    "IQD": 1177.825025,
    "IRR": 25510.333333,
    "ISK": 112.698,
    "JEP": 0.592161,
    "JMD": 110.846,
    "JOD": 0.708408,
    "JPY": 101.6146,
    "KES": 87.8472,
    "KGS": 51.864075,
    "KHR": 4008.316667,
    "KMF": 359.866404,
    "KPW": 900,
    "KRW": 1025.534984,
    "KWD": 0.281906,
    "KYD": 0.826925,
    "KZT": 182.466,
    "LAK": 8044.816667,
    "LBP": 1512.383333,
    "LKR": 130.357899,
    "LRD": 82.418575,
    "LSL": 10.41145,
    "LTL": 2.525302,
    "LVL": 0.515063,
    "LYD": 1.23251,
    "MAD": 8.210114,
    "MDL": 13.72702,
    "MGA": 2378.25,
    "MKD": 45.03806,
    "MMK": 963.62798,
    "MNT": 1811,
    "MOP": 7.98806,
    "MRO": 291.64602,
    "MTL": 0.683738,
    "MUR": 30.31092,
    "MVR": 15.43792,
    "MWK": 393.565,
    "MXN": 12.91345,
    "MYR": 3.210013,
    "MZN": 31.520475,
    "NAD": 10.40967,
    "NGN": 162.785001,
    "NIO": 25.78838,
    "NOK": 5.952612,
    "NPR": 94.3366,
    "NZD": 1.165356,
    "OMR": 0.384994,
    "PAB": 1,
    "PEN": 2.78979,
    "PGK": 2.842199,
    "PHP": 43.70675,
    "PKR": 98.82502,
    "PLN": 3.055887,
    "PYG": 4416.623275,
    "QAR": 3.640875,
    "RON": 3.238364,
    "RSD": 84.59244,
    "RUB": 34.3374,
    "RWF": 680.411,
    "SAR": 3.750453,
    "SBD": 7.285625,
    "SCR": 12.328725,
    "SDG": 5.699133,
    "SEK": 6.575738,
    "SGD": 1.251325,
    "SHP": 0.592161,
    "SLL": 4293.390633,
    "SOS": 971.15304,
    "SRD": 3.3127,
    "STD": 17990.776033,
    "SVC": 8.7517,
    "SYP": 149.358333,
    "SZL": 10.41247,
    "THB": 32.43335,
    "TJS": 4.90945,
    "TMT": 2.8501,
    "TND": 1.626752,
    "TOP": 1.854405,
    "TRY": 2.096484,
    "TTD": 6.45965,
    "TWD": 30.14897,
    "TZS": 1657.9,
    "UAH": 11.86158,
    "UGX": 2529.616667,
    "USD": 1,
    "UYU": 23.09216,
    "UZS": 2291.853343,
    "VEF": 6.292975,
    "VND": 21125.833333,
    "VUV": 94.675,
    "WST": 2.299554,
    "XAF": 477.910773,
    "XAG": 0.0516051,
    "XAU": 0.00077324,
    "XCD": 2.7016,
    "XDR": 0.647099,
    "XOF": 479.85278,
    "XPF": 87.31808,
    "YER": 215.037,
    "ZAR": 10.39398,
    "ZMK": 5252.024745,
    "ZMW": 6.667813,
    "ZWL": 322.355006
  },
		base : "USD"
	};

	// Object containing exchange rates relative to the fx.base currency, eg { "GBP" : "0.64" }
	fx.rates = fxSetup.rates;

	// Default exchange rate base currency (eg "USD"), which all the exchange rates are relative to
	fx.base = fxSetup.base;

	// Default from / to currencies for conversion via fx.convert():
	fx.settings = {
		from : fxSetup.from || fx.base,
		to : fxSetup.to || fx.base
	};


	/* --- Conversion --- */

	// The base function of the library: converts a value from one currency to another
	var convert = fx.convert = function(val, opts) {
		// Convert arrays recursively
		if (typeof val === 'object' && val.length) {
			for (var i = 0; i< val.length; i++ ) {
				val[i] = convert(val[i], opts);
			}
			return val;
		}

		// Make sure we gots some opts
		opts = opts || {};

		// We need to know the `from` and `to` currencies
		if( !opts.from ) opts.from = fx.settings.from;
		if( !opts.to ) opts.to = fx.settings.to;

		// Multiple the value by the exchange rate
		return val * getRate( opts.to, opts.from );
	};

	// Returns the exchange rate to `target` currency from `base` currency
	var getRate = function(to, from) {
		// Save bytes in minified version
		var rates = fx.rates;

		// Make sure the base rate is in the rates object:
		rates[fx.base] = 1;

		// Throw an error if either rate isn't in the rates array
		if ( !rates[to] || !rates[from] ) throw "fx error";

		// If `from` currency === fx.base, return the basic exchange rate for the `to` currency
		if ( from === fx.base ) {
			return rates[to];
		}

		// If `to` currency === fx.base, return the basic inverse rate of the `from` currency
		if ( to === fx.base ) {
			return 1 / rates[from];
		}

		// Otherwise, return the `to` rate multipled by the inverse of the `from` rate to get the
		// relative exchange rate between the two currencies
		return rates[to] * (1 / rates[from]);
	};


	/* --- OOP wrapper and chaining --- */

	// If fx(val) is called as a function, it returns a wrapped object that can be used OO-style
	var fxWrapper = function(val) {
		// Experimental: parse strings to pull out currency code and value:
		if ( typeof	val === "string" ) {
			this._v = parseFloat(val.replace(/[^0-9-.]/g, ""));
			this._fx = val.replace(/([^A-Za-z])/g, "");
		} else {
			this._v = val;
		}
	};

	// Expose `wrapper.prototype` as `fx.prototype`
	var fxProto = fx.prototype = fxWrapper.prototype;

	// fx(val).convert(opts) does the same thing as fx.convert(val, opts)
	fxProto.convert = function() {
		var args = Array.prototype.slice.call(arguments);
		args.unshift(this._v);
		return convert.apply(fx, args);
	};

	// fx(val).from(currency) returns a wrapped `fx` where the value has been converted from
	// `currency` to the `fx.base` currency. Should be followed by `.to(otherCurrency)`
	fxProto.from = function(currency) {
		var wrapped = fx(convert(this._v, {from: currency, to: fx.base}));
		wrapped._fx = fx.base;
		return wrapped;
	};

	// fx(val).to(currency) returns the value, converted from `fx.base` to `currency`
	fxProto.to = function(currency) {
		return convert(this._v, {from: this._fx ? this._fx : fx.settings.from, to: currency});
	};


	/* --- Module Definition --- */

	// Export the fx object for CommonJS. If being loaded as an AMD module, define it as such.
	// Otherwise, just add `fx` to the global object
	if (typeof exports !== 'undefined') {
		if (typeof module !== 'undefined' && module.exports) {
			exports = module.exports = fx;
		}
		exports.fx = fx;
	} else if (typeof define === 'function' && define.amd) {
		// Return the library as an AMD module:
		define([], function() {
			return fx;
		});
	} else {
		// Use fx.noConflict to restore `fx` back to its original value before money.js loaded.
		// Returns a reference to the library's `fx` object; e.g. `var money = fx.noConflict();`
		fx.noConflict = (function(previousFx) {
			return function() {
				// Reset the value of the root's `fx` variable:
				root.fx = previousFx;
				// Delete the noConflict function:
				fx.noConflict = undefined;
				// Return reference to the library to re-assign it:
				return fx;
			};
		})(root.fx);

		// Declare `fx` on the root (global/window) object:
		root['fx'] = fx;
	}

	// Root will be `window` in browser or `global` on the server:
}(this));
