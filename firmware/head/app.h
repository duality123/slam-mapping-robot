#ifndef APP_H
#define APP_H

#include "camera_handler.h"
#include "micro_ros_node.h"

class App {
public:
    void wifi_setup(const char* SSID, const char* password);
    void ros_setup(const char* SSID, const char* password, const char* serverIP);
    void loop();

private:
    CameraHandler camera;
    MicroROSNode ros;
};

#endif