//Array contains all currency short name
const CURRENCY = [
	'AED',
	'AFN',
	'ALL',
	'AMD',
	'ANG',
	'AOA',
	'ARS',
	'AUD',
	'AWG',
	'AZN',
	'BAM',
	'BBD',
	'BDT',
	'BGN',
	'BHD',
	'BIF',
	'BMD',
	'BND',
	'BOB',
	'BRL',
	'BSD',
	'BTN',
	'BWP',
	'BYN',
	'BZD',
	'CAD',
	'CDF',
	'CHF',
	'CLP',
	'CNY',
	'COP',
	'CRC',
	'CUP',
	'CVE',
	'CZK',
	'DJF',
	'DKK',
	'DOP',
	'DZD',
	'EGP',
	'ERN',
	'ETB',
	'EUR',
	'FJD',
	'FKP',
	'FOK',
	'GBP',
	'GEL',
	'GGP',
	'GHS',
	'GIP',
	'GMD',
	'GNF',
	'GTQ',
	'GYD',
	'HKD',
	'HNL',
	'HRK',
	'HTG',
	'HUF',
	'IDR',
	'ILS',
	'IMP',
	'INR',
	'IQD',
	'IRR',
	'ISK',
	'JEP',
	'JMD',
	'JOD',
	'JPY',
	'KES',
	'KGS',
	'KHR',
	'KID',
	'KMF',
	'KRW',
	'KWD',
	'KYD',
	'KZT',
	'LAK',
	'LBP',
	'LKR',
	'LRD',
	'LSL',
	'LYD',
	'MAD',
	'MDL',
	'MGA',
	'MKD',
	'MMK',
	'MNT',
	'MOP',
	'MRU',
	'MUR',
	'MVR',
	'MWK',
	'MXN',
	'MYR',
	'MZN',
	'NAD',
	'NGN',
	'NIO',
	'NOK',
	'NPR',
	'NZD',
	'OMR',
	'PAB',
	'PEN',
	'PGK',
	'PHP',
	'PKR',
	'PLN',
	'PYG',
	'QAR',
	'RON',
	'RSD',
	'RUB',
	'RWF',
	'SAR',
	'SBD',
	'SCR',
	'SDG',
	'SEK',
	'SGD',
	'SHP',
	'SLL',
	'SOS',
	'SRD',
	'SSP',
	'STN',
	'SYP',
	'SZL',
	'THB',
	'TJS',
	'TMT',
	'TND',
	'TOP',
	'TRY',
	'TTD',
	'TVD',
	'TWD',
	'TZS',
	'UAH',
	'UGX',
	'USD',
	'UYU',
	'UZS',
	'VES',
	'VND',
	'VUV',
	'WST',
	'XAF',
	'XCD',
	'XDR',
	'XOF',
	'XPF',
	'YER',
	'ZAR',
	'ZMW',
	'ZWL',
]

let currencyName
let currencyAmount1
let currencyName1
let currencyAmount2
let currencyName2
let currencyNameHolder
let currencyRate
let swapBtn
let currentCurrency
let currencyShortName1
let currencyShortName2


const main = () => {
	prepareDOMElements()
	prepareDOMEvents()
}

const prepareDOMElements = () => {
	currencyAmount1 = document.querySelector('.currency__amount--1')
	currencyName1 = document.querySelector('.currency__name--1')
	currencyAmount2 = document.querySelector('.currency__amount--2')
	currencyName2 = document.querySelector('.currency__name--2')
	currencyRate = document.querySelector('.currency__rate')
	swapBtn = document.querySelector('.currency__swap')

	addShortNamesBox(1)
	addShortNamesBox(2)

	currencyShortName1 = document.querySelectorAll('.currency__name-item--1')
	currencyShortName2 = document.querySelectorAll('.currency__name-item--2')
}

const prepareDOMEvents = () => {
	currencyName1.addEventListener('input', startConvert)

	currencyName1.addEventListener('focusin', () => {
		currentCurrency = currencyName1.value
		currencyName1.value = ''
	})

	currencyName1.addEventListener('focusout', () => {
		focusOutNameDefaults(currencyName1, currentCurrency)
		displayDefaults(currencyShortName1)
		startConvert()
	})

	currencyName1.addEventListener('keyup', () => {
		checkInputValue(currencyName1, currencyShortName1)
	})

	currencyAmount1.addEventListener('input', startConvert)

	currencyAmount1.addEventListener('focusout', () => {
		if (currencyAmount1.value === '') {
			currencyAmount1.value = 1
			startConvert()
		}
	})

	currencyName2.addEventListener('input', startConvert)

	currencyName2.addEventListener('focusin', () => {
		currentCurrency = currencyName2.value
		currencyName2.value = ''
	})

	currencyName2.addEventListener('focusout', () => {
		focusOutNameDefaults(currencyName2, currentCurrency)
		displayDefaults(currencyShortName2)
		startConvert()
	})

	currencyName2.addEventListener('keyup', () => {
		checkInputValue(currencyName2, currencyShortName2)
	})

	swapBtn.addEventListener('click', swap)
}

const startConvert = () => {
	if (currencyName1.value.length === 3 && currencyName2.value.length === 3) {
		if (CURRENCY.includes(currencyName1.value.toUpperCase()) && CURRENCY.includes(currencyName2.value.toUpperCase())) {
			calculate(currencyName1.value)
		}
	}
}

const calculate = (currency = 'PLN') => {
	fetch(`https://v6.exchangerate-api.com/v6/{API_KEY_HERE}/latest/${currency}`)
		.then(res => res.json())
		.then(data => {
			const rate = data.conversion_rates[currencyName2.value]
			console.log('rate: ' + rate)
			currencyRate.textContent = `1 ${currencyName1.value.toUpperCase()} = ${rate.toFixed(4)} ${currencyName2.value}`
			currencyAmount2.value = (currencyAmount1.value * rate).toFixed(2)
		})
}

const displayDefaults = box => {
	const loop = () => {
		box.forEach(item => {
			item.style.display = 'block'
		})
	}

	//Prevent visual bug
	setTimeout(loop, 500)
}

const focusOutNameDefaults = (input, name) => {
	if (!CURRENCY.includes(input.value)) {
		input.value = name
	}
}

const checkInputValue = (input, box) => {
	for (let i = 0; i < box.length; i++) {
		const match = new RegExp(input.value, 'i').test(box[i].textContent)

		if (!match) {
			box[i].style.display = 'none'
		} else {
			box[i].style.display = 'block'
		}
	}
}

const addShortNamesBox = x => {
	const currencyHolder = document.querySelector(`.currency__name-holder--${x}`)
	const currencyName = document.querySelector(`.currency__name--${x}`)

	CURRENCY.forEach(name => {
		const nameDiv = document.createElement('div')
		nameDiv.classList.add('currency__name-item')
		nameDiv.classList.add(`currency__name-item--${x}`)
		nameDiv.textContent = `${name}`

		nameDiv.addEventListener('click', () => {
			currencyName.value = nameDiv.textContent
			startConvert(currencyName1.value)
		})

		currencyHolder.appendChild(nameDiv)
	})
}

const swap = () => {
	const oldValue = currencyName1.value
	currencyName1.value = currencyName2.value
	currencyName2.value = oldValue
	calculate(currencyName1.value)
}

document.addEventListener('DOMContentLoaded', main)