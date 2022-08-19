let country_list = {
  "AED": "AE",
  "AFN": "AF",
  "XCD": "AG",
  "ALL": "AL",
  "AMD": "AM",
  "ANG": "AN",
  "AOA": "AO",
  "AQD": "AQ",
  "ARS": "AR",
  "AUD": "AU",
  "AZN": "AZ",
  "BAM": "BA",
  "BBD": "BB",
  "BDT": "BD",
  "XOF": "BE",
  "BGN": "BG",
  "BHD": "BH",
  "BIF": "BI",
  "BMD": "BM",
  "BND": "BN",
  "BOB": "BO",
  "BRL": "BR",
  "BSD": "BS",
  "NOK": "BV",
  "BWP": "BW",
  "BYR": "BY",
  "BZD": "BZ",
  "CAD": "CA",
  "CDF": "CD",
  "XAF": "CF",
  "CHF": "CH",
  "CLP": "CL",
  "CNY": "CN",
  "COP": "CO",
  "CRC": "CR",
  "CUP": "CU",
  "CVE": "CV",
  "CYP": "CY",
  "CZK": "CZ",
  "DJF": "DJ",
  "DKK": "DK",
  "DOP": "DO",
  "DZD": "DZ",
  "ECS": "EC",
  "EEK": "EE",
  "EGP": "EG",
  "ETB": "ET",
  "EUR": "FR",
  "FJD": "FJ",
  "FKP": "FK",
  "GBP": "GB",
  "GEL": "GE",
  "GGP": "GG",
  "GHS": "GH",
  "GIP": "GI",
  "GMD": "GM",
  "GNF": "GN",
  "GTQ": "GT",
  "GYD": "GY",
  "HKD": "HK",
  "HNL": "HN",
  "HRK": "HR",
  "HTG": "HT",
  "HUF": "HU",
  "IDR": "ID",
  "ILS": "IL",
  "INR": "IN",
  "IQD": "IQ",
  "IRR": "IR",
  "ISK": "IS",
  "JMD": "JM",
  "JOD": "JO",
  "JPY": "JP",
  "KES": "KE",
  "KGS": "KG",
  "KHR": "KH",
  "KMF": "KM",
  "KPW": "KP",
  "KRW": "KR",
  "KWD": "KW",
  "KYD": "KY",
  "KZT": "KZ",
  "LAK": "LA",
  "LBP": "LB",
  "LKR": "LK",
  "LRD": "LR",
  "LSL": "LS",
  "LTL": "LT",
  "LVL": "LV",
  "LYD": "LY",
  "MAD": "MA",
  "MDL": "MD",
  "MGA": "MG",
  "MKD": "MK",
  "MMK": "MM",
  "MNT": "MN",
  "MOP": "MO",
  "MRO": "MR",
  "MTL": "MT",
  "MUR": "MU",
  "MVR": "MV",
  "MWK": "MW",
  "MXN": "MX",
  "MYR": "MY",
  "MZN": "MZ",
  "NAD": "NA",
  "XPF": "NC",
  "NGN": "NG",
  "NIO": "NI",
  "NPR": "NP",
  "NZD": "NZ",
  "OMR": "OM",
  "PAB": "PA",
  "PEN": "PE",
  "PGK": "PG",
  "PHP": "PH",
  "PKR": "PK",
  "PLN": "PL",
  "PYG": "PY",
  "QAR": "QA",
  "RON": "RO",
  "RSD": "RS",
  "RUB": "RU",
  "RWF": "RW",
  "SAR": "SA",
  "SBD": "SB",
  "SCR": "SC",
  "SDG": "SD",
  "SEK": "SE",
  "SGD": "SG",
  "SKK": "SK",
  "SLL": "SL",
  "SOS": "SO",
  "SRD": "SR",
  "STD": "ST",
  "SVC": "SV",
  "SYP": "SY",
  "SZL": "SZ",
  "THB": "TH",
  "TJS": "TJ",
  "TMT": "TM",
  "TND": "TN",
  "TOP": "TO",
  "TRY": "TR",
  "TTD": "TT",
  "TWD": "TW",
  "TZS": "TZ",
  "UAH": "UA",
  "UGX": "UG",
  "USD": "US",
  "UYU": "UY",
  "UZS": "UZ",
  "VEF": "VE",
  "VND": "VN",
  "VUV": "VU",
  "YER": "YE",
  "ZAR": "ZA",
  "ZMK": "ZM",
  "ZWD": "ZW"
}

const select = document.querySelectorAll('select'),
  exchangeBtn = document.querySelector('button'),
  exchangeCurr = document.querySelector('.icon')

let error = document.querySelector('.error'),
  resultCurr = document.querySelector('.exchange-rate')

for (let i = 0; i < select.length; i++) {
  const settingCounties = (list) => {
    for (const country in list) {
      let option = document.createElement('option')
      i == 0 ? country === "USD" ? option.setAttribute('selected', true) : false : country === "DZD" ? option.setAttribute('selected', true) : false
      option.value = country
      option.innerHTML = country
      select[i].append(option)
    }
  }
  settingCounties(country_list)
  select[i].addEventListener('change', (e) => {
    loadImg(e.target, e.target.value);
  })
}

function loadImg(parentEl, value) {
  for (const country in country_list) {
    let countryLowerCase = country_list[value].toLowerCase()
    let img = parentEl.parentElement.querySelector('img')
    img.src = `https://flagcdn.com/48x36/${countryLowerCase}.png`
  }
}

exchangeBtn.addEventListener('click', (e) => {
  e.preventDefault()
  fetchApi()
})

function fetchApi() {
  let to = document.querySelector('.to select').value
  let from = document.querySelector('.from select').value
  let inputNum = document.getElementById('num').value
  if (inputNum != "" && inputNum != null && +inputNum > 0) {
    error.style.display = 'none'
    resultCurr.innerHTML = 'Getting Exchange Rate'
    fetch(`https://v6.exchangerate-api.com/v6/31de38b351c65bddb507c14f/latest/${from}`)
      .then(res => res.json()).then(res => setData(res.conversion_rates[`${to}`], res.result, inputNum, to, from))
  } else {
    resultCurr.innerHTML = '!!!!!!'
    error.style.display = 'block'
    error.innerHTML = 'Please Enter A valid Number'
  }
}

function setData(data, result, number, to, from) {
  if (result == 'error') {
    resultCurr.innerHTML = "Something Went Wrong"
  } else {
    if (data === undefined) {
      resultCurr.innerHTML = "Sorry This Currency is Not Supported"
    } else {
      resultCurr.innerHTML = `${number} ${from} = ${(data * number).toFixed(2)} ${to}`
    }
  }
}

exchangeCurr.addEventListener('click', () => {
  let select_1 = document.getElementsByTagName('select')[0],
    select_2 = document.getElementsByTagName('select')[1],
    stash
  stash = select_1.value
  select_1.value = select_2.value
  loadImg(select_1, select_1.value)
  select_2.value = stash
  loadImg(select_2, select_2.value)

  fetchApi()
})
