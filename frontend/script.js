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
        <h2>Recommended Mandi: ${data.recommended_mandi}</h2>
        <p>${data.explanation}</p>
        <p><strong>MSP:</strong> ${data.msp}</p>
        <h3>Comparison:</h3>
        <ul>
    `;

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

    output += "</ul>";

    document.getElementById("result").innerHTML = output;
}
