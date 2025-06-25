#!/usr/bin/env python3
"""
Simple screenshot utility using Selenium WebDriver
This is a fallback since Playwright requires GUI libraries on this system
"""

import time
import sys
import os
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

def setup_driver():
    """Setup headless Chrome driver"""
    chrome_options = Options()
    chrome_options.add_argument("--headless")
    chrome_options.add_argument("--no-sandbox")
    chrome_options.add_argument("--disable-dev-shm-usage")
    chrome_options.add_argument("--window-size=1920,1080")
    
    try:
        driver = webdriver.Chrome(options=chrome_options)
        return driver
    except Exception as e:
        print(f"Failed to setup Chrome driver: {e}")
        return None

def take_screenshots():
    """Take screenshots of the ActivitySynq Global demo"""
    driver = setup_driver()
    if not driver:
        print("Could not setup WebDriver. Install ChromeDriver or use manual testing.")
        return
    
    try:
        # Navigate to demo
        print("Loading demo page...")
        driver.get("http://localhost:3002")
        
        # Wait for page to load
        WebDriverWait(driver, 10).wait(
            EC.presence_of_element_located((By.TAG_NAME, "h1"))
        )
        time.sleep(2)  # Additional wait for full rendering
        
        # Create screenshots directory
        os.makedirs("/mnt/c/git/multisynq/react-together/screenshots", exist_ok=True)
        
        # Screenshot 1: Initial page load
        print("Taking initial screenshot...")
        driver.save_screenshot("/mnt/c/git/multisynq/react-together/screenshots/global-demo-initial.png")
        
        # Screenshot 2: Feature sections
        print("Taking feature sections screenshot...")
        driver.execute_script("window.scrollTo(0, 200)")
        time.sleep(1)
        driver.save_screenshot("/mnt/c/git/multisynq/react-together/screenshots/global-demo-features.png")
        
        # Click some buttons to generate activities
        print("Clicking feature buttons...")
        try:
            search_btn = driver.find_element(By.XPATH, "//button[contains(text(), '🔍 Search')]")
            search_btn.click()
            time.sleep(0.5)
            
            filter_btn = driver.find_element(By.XPATH, "//button[contains(text(), '🔽 Filter')]")
            filter_btn.click()
            time.sleep(0.5)
            
            export_btn = driver.find_element(By.XPATH, "//button[contains(text(), '📁 Export')]")
            export_btn.click()
            time.sleep(0.5)
            
            # Add some user activities
            add_btn = driver.find_element(By.XPATH, "//button[contains(text(), '+ Add Activity')]")
            add_btn.click()
            time.sleep(0.5)
            add_btn.click()
            time.sleep(1)
            
        except Exception as e:
            print(f"Could not click buttons: {e}")
        
        # Screenshot 3: Activities generated
        print("Taking activities screenshot...")
        driver.execute_script("window.scrollTo(0, 600)")
        time.sleep(1)
        driver.save_screenshot("/mnt/c/git/multisynq/react-together/screenshots/global-demo-activities.png")
        
        # Screenshot 4: Integration explanation
        print("Taking integration explanation screenshot...")
        driver.execute_script("window.scrollTo(0, 1200)")
        time.sleep(1)
        driver.save_screenshot("/mnt/c/git/multisynq/react-together/screenshots/global-demo-integration.png")
        
        # Screenshot 5: Full page
        print("Taking full page screenshot...")
        driver.execute_script("window.scrollTo(0, 0)")
        time.sleep(1)
        # Set larger window for full page
        driver.set_window_size(1920, 2400)
        time.sleep(1)
        driver.save_screenshot("/mnt/c/git/multisynq/react-together/screenshots/global-demo-fullpage.png")
        
        print("Screenshots saved successfully!")
        
    except Exception as e:
        print(f"Error taking screenshots: {e}")
    finally:
        driver.quit()

if __name__ == "__main__":
    take_screenshots()