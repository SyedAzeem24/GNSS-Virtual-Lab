import numpy as np


def compute_dop(receiver, satellites):
    """
    Compute GDOP, PDOP, HDOP, VDOP, TDOP
    using only visible satellites.
    """

    visible = [sat for sat in satellites if sat["visible"]]

    if len(visible) < 4:
        return {
            "error": "At least 4 visible satellites are required.",
            "visibleSatellites": len(visible),
        }

    G = []

    for sat in visible:

        dx = sat["x"] - receiver["x"]
        dy = sat["y"] - receiver["y"]
        dz = sat["z"] - receiver["z"]

        distance = np.sqrt(dx**2 + dy**2 + dz**2)

        ux = dx / distance
        uy = dy / distance
        uz = dz / distance

        G.append([-ux, -uy, -uz, 1])

    G = np.array(G)

    try:
        Q = np.linalg.inv(G.T @ G)

        gdop = np.sqrt(
            Q[0, 0] +
            Q[1, 1] +
            Q[2, 2] +
            Q[3, 3]
        )

        pdop = np.sqrt(
            Q[0, 0] +
            Q[1, 1] +
            Q[2, 2]
        )

        hdop = np.sqrt(
            Q[0, 0] +
            Q[1, 1]
        )

        vdop = np.sqrt(Q[2, 2])

        tdop = np.sqrt(Q[3, 3])

        return {
            "visibleSatellites": len(visible),
            "GDOP": round(float(gdop), 2),
            "PDOP": round(float(pdop), 2),
            "HDOP": round(float(hdop), 2),
            "VDOP": round(float(vdop), 2),
            "TDOP": round(float(tdop), 2),
        }

    except np.linalg.LinAlgError:
        return {
            "error": "Unable to compute DOP (singular matrix)."
        }