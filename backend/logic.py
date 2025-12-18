from data import MANDI_DATA, COST_PER_KM, MSP

def recommend_best_mandi(crop, location, quantity):
    if not crop:
        crop = "wheat"

    best_mandi = None
    highest_profit = float("-inf")
    details = []

    for mandi in MANDI_DATA:
        transport_cost = mandi["distance"] * COST_PER_KM
        net_profit = (mandi["price"] * quantity) - transport_cost

        details.append({
            "mandi": mandi["name"],
            "price": mandi["price"],
            "distance": mandi["distance"],
            "transport_cost": transport_cost,
            "net_profit": net_profit
        })

        if net_profit > highest_profit:
            highest_profit = net_profit
            best_mandi = mandi["name"]
            reason = (
            f"{best_mandi} gives the highest net profit after considering "
            "transportation cost and current mandi prices."
            )

        
        

    return {
        "recommended_mandi": best_mandi,
        "details": details,
        "explanation": reason,
        "msp": MSP.get(crop.lower(), "N/A")
    }
