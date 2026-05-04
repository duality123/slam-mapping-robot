#include "app.h"
#include <WiFi.h>

void App::wifi_setup(const char* ssid, const char* password) {
    Serial.begin(115200);

    camera.init();

    WiFi.begin(ssid, password);
    while (WiFi.status() != WL_CONNECTED) {
        delay(500);
    }

}

void App::ros_setup(const char* ssid, const char* password, const char* serverIP){
    ros.init(ssid,  password, serverIP);
}

void App::loop() {
    ros.spin();
}

