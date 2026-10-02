import time
import datetime
import os
from dotenv import load_env
import requests

load_dotenv()
DC_WEBHOOK_URL = os.getenv("discord_bot")

def notification_discord(judul_notif, pesan):
    """ngirim notif lewat discord"""
    if not DC_WEBHOOK_URL:
        print("ERROR: DC_WEBHOOK_URL TIDAK DI TEMUKAN DI ENV")
        return

    payload = {
        "username":"Alarm Bot",
        "avatar_url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4whOBKg3khP5cqAV90Y-N77-sdxyarrKCwJMdzLZkZA&s=10",
        "embeds": [
            {
                "title": f"{judul_notif}",
                "description": pesan,
                "color": 15158332,
                "timestamp": datetime.datetime.now(datetime.timezone.utc).isoformat(),
            }
        ],
    }

    try:
        response = requests.post(DC_WEBHOOK_URL, json=payload, timeout=5)
        if response.status_code in [200, 204]:
            print("Notifikasi berhasil terkirim")
        else:
            print("Notifikasi gagal terkirim")
    except Exception as e:
        print(f"Error Discord : {e}")

    #isi payload ini gunanya biar notif biar jelas dari mana dan gimana
 
def input_waktu():
    print("PENGATURAN WAKTU")
    while True:
        try:
            jam = int(input("Masukan jam (0-23) : "))
            menit = int(input("Masukan menit (0-59) : "))
            if 0 <= jam <= 23 and 0 <= menit <= 59:
                sekarang = datetime.datetime.now() 
                """
                ngambil waktu sekarang sekaligus sama tanggal, setelah sudah di set
                """
                target_alarm = sekarang.replace(hour = jam, minute = menit, second = 0, microsecond = 0)

                if (target_alarm <= sekarang):
                    target_alarm += datetime.timedelta(days=1)
                
                """
                kalau target yang di set itu waktunya ternyata udah lewat, maka dia
                akan auto set untuk ke esokan hari nya. 
                """
                print(f"Waktu alarm di set pada {jam}:{menit} WIB")

                format_waktu = target_alarm.strftime("%H:%M")
                judul_notif = f"ALARM DI SET PADA PUKUL {format_waktu} WIB"
                pesan = f"anda akan di bangunkan pukul {format_waktu} WIB"
                notification_discord(judul_notif, pesan)

                return target_alarm
            else:
                print("Jam harus 0-23 dan menit harus 0-59! Coba lagi.\n")

        except ValueError:
            print("Input harus berupa angka! coba lagi.\n")

if __name__ == "__main__" :
    target = input_waktu()



