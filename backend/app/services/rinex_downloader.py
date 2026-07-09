from pathlib import Path
import requests
from datetime import datetime


BASE_DIR = Path(__file__).resolve().parents[3]

NAV_DIR = BASE_DIR / "datasets" / "navigation"


def download_latest_rinex():

    NAV_DIR.mkdir(
        parents=True,
        exist_ok=True
    )

    today = datetime.utcnow()

    year = today.year
    doy = today.timetuple().tm_yday


    filename = (
        f"BRDC00WRD_R_"
        f"{year}{doy:03d}0000_01D_GN.rnx"
    )


    url = (
        "https://igs.bkg.bund.de/root_ftp/"
        f"IGS/BRDC/{year}/{doy:03d}/{filename}"
    )


    save_path = NAV_DIR / filename


    print("Downloading:", url)


    response = requests.get(url)


    if response.status_code != 200:
        raise Exception(
            "Failed to download RINEX file"
        )


    with open(save_path, "wb") as file:
        file.write(response.content)


    print("Saved:", save_path)


    return save_path