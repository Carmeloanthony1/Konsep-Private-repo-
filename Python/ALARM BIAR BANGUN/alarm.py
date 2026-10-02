import time
import datetime

def input_waktu():
    print("PENGATURAN WAKTU")
    while true:
        try:
            jam = int(input("Masukan jam (0-23) : "))
            menit = int(input("Masukan menit (0-59) : "))
            if 0 <= jam <= 59 and 0 <= menit <= 59:
                sekarang = datetime.datetime.now() 
                """
                ngambil waktu sekarang sekaligus sama tanggal, setelah sudah di set
                """
                target_alarm = sekarang.replace(hour = jam, minute = menit, second = 0, microsecond = 0)\
                if target_alarm <= sekarang:
                    target_alarm += datetime.timedelta(day=1)

                return target_alarm
                """
                kalau target yang di set itu waktunya ternyata udah lewat, maka dia
                akan auto set untuk ke esokan hari nya. 
                """
            else:
                print("Jam harus 0-23 dan menit harus 0-59! Coba lagi.\n")

        expect ValueError:
            print("Input harus berupa angka! coba lagi.\n")



