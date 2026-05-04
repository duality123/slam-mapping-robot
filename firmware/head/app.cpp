#include "app.h"
#include <WiFi.h>

void App::wifi_setup(const char* SSID, const char* password) {
    Serial.begin(115200);

    camera.init();

    WiFi.begin(SSID, password);
    while (WiFi.status() != WL_CONNECTED) {
        delay(500);
    }

}

void App::ros_setup(const char* SSID, const char* password, const char* serverIP){
    ros.init(SSID,  password, serverIP);
}

void App::loop() {
    ros.spin();
}

