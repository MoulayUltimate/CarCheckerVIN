import urllib.request
import json
import sys

API_KEY = "sk_ad_XgIfuyJmWXlOfLwX5qJD-os4"
VINS = [
    "WAUDG74F25N111998", "55SWF4JB3GU099875", "2C3CDZBT3FH700097", 
    "1GC1KWEY3JF116856", "2C4RDGCG7CR359109", "JTEES41AX82061852", 
    "1C4RJEAG0JC168184", "YV4902DZ5C2251209", "WDCGG8HB0BF559833", 
    "WBAFR7C57CC811956", "5UXKR0C54F0K64366", "2C3CDXBG3JH232310", 
    "3C6UR5FJ0JG298185", "4T1FZ1FB1LU051174", "1N6AD0EV1GN759974"
]

for vin in VINS:
    url = f"https://api.auto.dev/photos/{vin}"
    req = urllib.request.Request(url, headers={"Authorization": f"Bearer {API_KEY}"})
    try:
        with urllib.request.urlopen(req, timeout=10) as response:
            data = json.loads(response.read().decode())
            retail = data.get('data', {}).get('retail', [])
            wholesale = data.get('data', {}).get('wholesale', [])
            total = len(retail) + len(wholesale)
            print(f"VIN: {vin} - Photos: {total}")
            if total > 0:
                sample = retail[0] if retail else wholesale[0]
                print(f"  -> Sample URL: {sample if isinstance(sample, str) else sample.get('url', 'Unknown object type')}")
    except Exception as e:
        print(f"VIN: {vin} - Error: {e}")
