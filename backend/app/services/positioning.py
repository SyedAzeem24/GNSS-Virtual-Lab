import random

def simulate_position(lat, lon, height):

    estimated_lat = lat + random.uniform(-0.00002, 0.00002)
    estimated_lon = lon + random.uniform(-0.00002, 0.00002)
    estimated_height = height + random.uniform(-3, 3)

    # Simulated positioning error (meters)
    position_error = random.uniform(0.5, 2.5)

    # Simulated receiver clock bias (nanoseconds)
    clock_bias_ns = random.uniform(-500, 500)

    return {

        "actual": {
            "latitude": round(lat, 6),
            "longitude": round(lon, 6),
            "height": round(height, 2)
        },

        "estimated": {
            "latitude": round(estimated_lat, 6),
            "longitude": round(estimated_lon, 6),
            "height": round(estimated_height, 2)
        },

        "positionError": round(position_error, 2),

        "clockBias": round(clock_bias_ns, 2),
        "clockBiasUnit": "ns"
    }
    