--Generate the debug signing certificate
keytool -genkey -v -keystore debug.keystore -storepass android -alias androiddebugkey -keypass android -keyalg RSA -keysize 2048 -validity 10000 -dname "CN=Android Debug,O=Android,C=US"


--xtract the SHA-1 fingerprint from the debug keystore:
keytool -list -v -keystore debug.keystore -alias androiddebugkey -storepass android -keypass android


-- to generate sha-1,sha-256
keytool -list -v -keystore /Users/sandeepkolli/latest/moneysaverapp/android/app/debug.keystore -alias androiddebugkey -storepass android -keypass android

