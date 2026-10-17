# الأمير نت - إلغاء الحظر العام لنطاقات Google Play
/ip dns static remove [find where comment="AMIR-GPLAY"]
/ip firewall address-list remove [find where comment="AMIR-GPLAY"]
/ip firewall filter remove [find where comment~"AMIR-GPLAY-"]
/ip dns cache flush
