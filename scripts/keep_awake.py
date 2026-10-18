"""Open each Streamlit app in a headless browser and wake it if it is asleep."""
import sys
from playwright.sync_api import sync_playwright

APPS = [
    "https://usedcarchecker.streamlit.app/",
    "https://crop-yield-prediction-wpnuufdz2fc9tmbm4k8t3y.streamlit.app/",
]

failed = []
with sync_playwright() as p:
    browser = p.chromium.launch()
    for url in APPS:
        page = browser.new_page()
        page.goto(url, timeout=90_000)
        page.wait_for_timeout(8_000)
        wake = page.get_by_role("button", name="Yes, get this app back up!")
        if wake.count():
            print(f"asleep, waking: {url}")
            wake.click()
            page.wait_for_timeout(60_000)
        else:
            print(f"already awake: {url}")
        page.goto(url, timeout=90_000)
        page.wait_for_timeout(10_000)
        if page.get_by_role("button", name="Yes, get this app back up!").count():
            print(f"still asleep: {url}")
            failed.append(url)
        page.close()
    browser.close()

sys.exit(1 if failed else 0)
