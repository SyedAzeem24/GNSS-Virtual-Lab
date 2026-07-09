from pathlib import Path
import georinex as gr

from app.services.rinex_downloader import download_latest_rinex



def load_navigation():

    dataset = download_latest_rinex()


    print("Dataset path:", dataset)
    print("Exists:", dataset.exists())


    nav = gr.load(dataset)

    return nav