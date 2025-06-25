#!/usr/bin/env python3
"""Quick test to check if the website is responding"""

import time
import requests

def test_page():
    try:
        print("Testing ActivitySynq Global demo page...")
        response = requests.get("http://localhost:3000/demos/ActivitySynqGlobal", timeout=10)
        print(f"Status code: {response.status_code}")
        if response.status_code == 200:
            print("✅ Page is accessible!")
            return True
        else:
            print("❌ Page returned error status")
            return False
    except Exception as e:
        print(f"❌ Error accessing page: {e}")
        return False

if __name__ == "__main__":
    test_page()