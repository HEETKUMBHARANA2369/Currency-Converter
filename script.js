const fromCurrency = document.getElementById("fromCurrency");
const toCurrency = document.getElementById("toCurrency");
const amountInput = document.querySelector(".amount");

const apiKey = "1dba385ee3e619a47064fab5d27b1ef4";
const apiUrl = "https://api.exchangeratesapi.io/v1/convert";

// ✅ Full names of currencies
const currencies = {
  "USD": "United States Dollar",
  "INR": "Indian Rupee",
  "EUR": "Euro",
  "GBP": "British Pound Sterling",
  "JPY": "Japanese Yen",
  "CAD": "Canadian Dollar",
  "AUD": "Australian Dollar",
  "CHF": "Swiss Franc",
  "CNY": "Chinese Yuan Renminbi",
  "AED": "UAE Dirham"
};

// ✅ Loop through currencies object instead of undefined variable
for (let code in currencies) {
  const option1 = document.createElement("option");
  option1.value = code;
  option1.textContent = `${code} - ${currencies[code]}`;
  fromCurrency.appendChild(option1);

  const option2 = document.createElement("option");
  option2.value = code;
  option2.textContent = `${code} - ${currencies[code]}`;
  toCurrency.appendChild(option2);
}

fromCurrency.value = "USD";
toCurrency.value = "INR";

// ✅ Main convert function
async function convert() {
  const amount = parseFloat(amountInput.value);
  const from = fromCurrency.value;
  const to = toCurrency.value;

  if (isNaN(amount) || amount <= 0) {
    alert("Please enter a valid amount.");
    return;
  }

  const url = `${apiUrl}?from=${from}&to=${to}&amount=${amount}&access_key=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.result) {
      alert(`💸 ${amount} ${from} = ${data.result.toFixed(2)} ${to}`);
    } else {
      alert("Conversion failed: " + (data.error?.info || "Unknown error"));
    }
  } catch (error) {
    alert("Failed to fetch. Check API key or internet.");
    console.error("Fetch error:", error);
  }
}
const resultBox = document.getElementById("result");

async function convert() {
  const amount = parseFloat(amountInput.value);
  const from = fromCurrency.value;
  const to = toCurrency.value;

  resultBox.textContent = ""; // Clear previous result

  if (isNaN(amount) || amount <= 0) {
    resultBox.textContent = "⚠️ Please enter a valid amount.";
    return;
  }

  const url = `${apiUrl}?from=${from}&to=${to}&amount=${amount}&access_key=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.result) {
      resultBox.textContent = `💸 ${amount} ${from} = ${data.result.toFixed(2)} ${to}`;
    } else {
      resultBox.textContent = "❌ Conversion failed: " + (data.error?.info || "Unknown error");
    }
  } catch (error) {
    resultBox.textContent = "🚫 Failed to fetch. Check your internet or API key.";
    console.error("Fetch error:", error);
  }
}
