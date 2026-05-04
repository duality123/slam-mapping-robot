#include "app.h"

App app;
void setup() {
    app.wifi_setup("YOUR SSID", "YOUR wifi password");
    app.ros_setup("YOUR SSID", "YOUR wifi password", "your ROS server IP");;
}

void loop() {
    app.loop();
}
