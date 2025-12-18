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
    <div class="card">
        <h2>🏆 Best Mandi to Sell</h2>
        <h3>${data.recommended_mandi}</h3>
        <p>${data.explanation}</p>
        <p><strong>MSP:</strong> ₹${data.msp}</p>
    </div>

    <div class="card">
        <h3>Market Comparison</h3>
        <ul>
`;
output += '<div class="card">';
data.details.forEach(item => {
    output += `
        <li>
            ${item.mandi} → Price: ₹${item.price},
            Distance: ${item.distance} km,
            Transport Cost: ₹${item.transport_cost},
            Net Profit: ₹${item.net_profit}
        </li>
    `;
});

output += '</div>';
output += `
        </ul>
    </div>
`;

const resultSection = document.getElementById("result-section");
resultSection.innerHTML = output;

// Smooth scroll to results
resultSection.scrollIntoView({ behavior: "smooth" });

}

function showForm() {
    document.getElementById("title").style.display = "none";
    document.getElementById("description").style.display = "none";
    document.getElementById("start-section").style.display = "none";

    const form = document.getElementById("form-section");
    form.classList.remove("hidden");
}
