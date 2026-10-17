# الأمير نت - RouterOS v6 - ملفات سرعات HotSpot
# rate-limit = rx/tx من منظور الراوتر: rx رفع العميل، tx تنزيل العميل.
:if ([:len [/ip hotspot user profile find where name="AMIR-P-HOTSPOT"]]=0) do={/ip hotspot user profile add name="AMIR-P-HOTSPOT" rate-limit="1M/2M" shared-users=1 comment="الأمير نت - كرت هوتسبوت"}
:if ([:len [/ip hotspot user profile find where name="AMIR-P-ECO"]]=0) do={/ip hotspot user profile add name="AMIR-P-ECO" rate-limit="256k/512k" shared-users=1 comment="الأمير نت - سرعة اقتصادية"}
:if ([:len [/ip hotspot user profile find where name="AMIR-P-DEFAULT"]]=0) do={/ip hotspot user profile add name="AMIR-P-DEFAULT" rate-limit="512k/1M" shared-users=1 comment="الأمير نت - سرعة عادية"}
:if ([:len [/ip hotspot user profile find where name="AMIR-P-MEDIUM"]]=0) do={/ip hotspot user profile add name="AMIR-P-MEDIUM" rate-limit="1M/2M" shared-users=1 comment="الأمير نت - سرعة متوسطة"}
:if ([:len [/ip hotspot user profile find where name="AMIR-P-HIGH"]]=0) do={/ip hotspot user profile add name="AMIR-P-HIGH" rate-limit="2M/4M" shared-users=1 comment="الأمير نت - سرعة عالية"}
:if ([:len [/ip hotspot user profile find where name="AMIR-P-VERYHIGH"]]=0) do={/ip hotspot user profile add name="AMIR-P-VERYHIGH" rate-limit="2M/6M" shared-users=1 comment="الأمير نت - سرعة عالية جداً"}
/ip hotspot user profile print where comment~"الأمير نت"
