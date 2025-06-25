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
        driver.get("http://localhost:5174/demos/ActivitySynqGlobal")
        
        # Wait for page to load
        WebDriverWait(driver, 10).wait(
            EC.presence_of_element_located((By.TAG_NAME, "h1"))
        )
        time.sleep(2)  # Additional wait for full rendering
        
        # Create screenshots directory
        os.makedirs("/mnt/c/git/multisynq/react-together/screenshots", exist_ok=True)
        
        # Screenshot 1: Initial page load (before any activities)
        print("Taking initial screenshot...")
        driver.save_screenshot("/mnt/c/git/multisynq/react-together/screenshots/activitysynq-global-before.png")
        
        # Screenshot 2: Feature sections
        print("Taking feature sections screenshot...")
        driver.execute_script("window.scrollTo(0, 200)")
        time.sleep(1)
        driver.save_screenshot("/mnt/c/git/multisynq/react-together/screenshots/activitysynq-global-customization.png")
        
        # Click some buttons to generate activities
        print("Clicking feature buttons...")
        try:
            # Click Search button
            search_btn = driver.find_element(By.XPATH, "//button[contains(text(), 'Search')]")
            search_btn.click()
            time.sleep(0.5)
            
            # Click Filter button  
            filter_btn = driver.find_element(By.XPATH, "//button[contains(text(), 'Filter')]")
            filter_btn.click()
            time.sleep(0.5)
            
            # Click Export button
            export_btn = driver.find_element(By.XPATH, "//button[contains(text(), 'Export')]")
            export_btn.click()
            time.sleep(0.5)
            
            # Click Random Activity button
            random_btn = driver.find_element(By.XPATH, "//button[contains(text(), 'Generate Random Activity')]")
            random_btn.click()
            time.sleep(0.5)
            random_btn.click()
            time.sleep(1)
            
        except Exception as e:
            print(f"Could not click buttons: {e}")
        
        # Screenshot 3: Activities generated (after user activities)
        print("Taking activities screenshot...")
        driver.execute_script("window.scrollTo(0, 800)")
        time.sleep(1)
        driver.save_screenshot("/mnt/c/git/multisynq/react-together/screenshots/activitysynq-global-after.png")
        
        # Screenshot 4: Feed with customization controls
        print("Taking feed customization screenshot...")
        driver.execute_script("window.scrollTo(0, 400)")
        time.sleep(1)
        driver.save_screenshot("/mnt/c/git/multisynq/react-together/screenshots/activitysynq-global-feed-controls.png")
        
        # Screenshot 5: Integration explanation
        print("Taking integration explanation screenshot...")
        driver.execute_script("window.scrollTo(0, 1200)")
        time.sleep(1)
        driver.save_screenshot("/mnt/c/git/multisynq/react-together/screenshots/activitysynq-global-integration.png")
        
        # Screenshot 6: Full page
        print("Taking full page screenshot...")
        driver.execute_script("window.scrollTo(0, 0)")
        time.sleep(1)
        # Set larger window for full page
        driver.set_window_size(1920, 2400)
        time.sleep(1)
        driver.save_screenshot("/mnt/c/git/multisynq/react-together/screenshots/activitysynq-global-fullpage.png")
        
        print("Screenshots saved successfully!")
        
    except Exception as e:
        print(f"Error taking screenshots: {e}")
    finally:
        driver.quit()

if __name__ == "__main__":
    take_screenshots()