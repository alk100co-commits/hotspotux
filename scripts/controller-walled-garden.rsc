# الأمير نت - السماح لصفحة HotSpot بالوصول إلى وحدة التحكم قبل تسجيل الدخول
# عدّل 192.168.88.2 إلى عنوان خادم PHP.
/ip hotspot walled-garden ip add dst-address=192.168.88.2 protocol=tcp dst-port=8080 comment="AMIR-NET Controller"
