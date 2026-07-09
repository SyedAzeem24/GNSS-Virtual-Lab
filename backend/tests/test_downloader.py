
from backend.app.services.rinex_downloader import download_latest_rinex



file = download_latest_rinex()

print("Downloaded file:")
print(file)