async function findBestMandi() {
    const crop = document.getElementById("crop").value;
    const quantity = document.getElementById("quantity").value;

    const response = await fetch("http://localhost:5000/recommend", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            crop: crop,
            location: "dummy",
            quantity: quantity
        })
    });

    const data = await response.json();

let output = `
<div class="card highlight-card">
    <div class="highlight-header">
        <span class="trophy">🏆</span>
        <h2>Best Mandi to Sell From</h2>
    </div>

    <h3 class="mandi-name">${data.recommended_mandi}</h3>

    <p class="reason">
        ${data.explanation}
    </p>

    <div class="info-row">
        <span><strong>MSP:</strong> ₹${data.msp}</span>
    </div>
</div>
`;

output += `
<div class="card">
    <h3>Market Comparison</h3>
    <div class="comparison-grid">
`;

data.details.forEach(item => {
    output += `
    <div class="comparison-card ${item.mandi === data.recommended_mandi ? 'best-option' : ''}">
    ${item.mandi === data.recommended_mandi ? '<span class="badge">Recommended</span>' : ''}
        <h4>${item.mandi}</h4>
        <p>- Price: ₹${item.price}</p>
        <p>- Distance: ${item.distance} km</p>
        <p>- Transport: ₹${item.transport_cost}</p>
        <p class="profit">- Net Profit: ₹${item.net_profit}</p>
    </div>
    `;
});

output += `
    </div>
</div>
`;


const resultSection = document.getElementById("result-section");
resultSection.innerHTML = output;

// Smooth scroll to results
resultSection.scrollIntoView({ behavior: "smooth" });

}

function showForm() {
    const hero = document.getElementById("hero");
    const startSection = document.getElementById("start-section");
    const formSection = document.getElementById("form-section");

    if (hero) hero.style.display = "none";
    if (startSection) startSection.style.display = "none";
    if (formSection) formSection.classList.remove("hidden");
}


function goBack() {
    const hero = document.getElementById("hero");
    const startSection = document.getElementById("start-section");
    const formSection = document.getElementById("form-section");
    const resultSection = document.getElementById("result-section");

    if (formSection) formSection.classList.add("hidden");
    if (resultSection) resultSection.innerHTML = "";
    if (hero) hero.style.display = "block";
    if (startSection) startSection.style.display = "flex";
}


