#include "esp_camera.h"
#include <micro_ros_arduino.h>

#include <stdio.h>
#include <rcl/rcl.h>
#include <rcl/error_handling.h>
#include <rclc/rclc.h>
#include <rclc/executor.h>
#include <std_msgs/msg/int32.h>
#include <std_msgs/msg/string.h>

#if !defined(ESP32) && !defined(TARGET_PORTENTA_H7_M7) && !defined(ARDUINO_GIGA) && !defined(ARDUINO_NANO_RP2040_CONNECT) && !defined(ARDUINO_WIO_TERMINAL) && !defined(ARDUINO_UNOR4_WIFI) && !defined(ARDUINO_OPTA)
#error This example is only available for Arduino Portenta, Arduino Giga R1, Arduino Nano RP2040 Connect, ESP32 Dev module, Wio Terminal, Arduino Uno R4 WiFi and Arduino OPTA WiFi 
#endif

//publisher
rcl_publisher_t publisher;
std_msgs__msg__Int32 msgPub;
rclc_executor_t executorPub;
rcl_timer_t timer;

//general
rclc_support_t support;
rcl_allocator_t allocator;
rcl_node_t node;

//subscriber
std_msgs__msg__String msg;
rcl_subscription_t subscriber;
rclc_executor_t executorSub;


//
// WARNING!!! PSRAM IC required for UXGA resolution and high JPEG quality
//            Ensure ESP32 Wrover Module or other board with PSRAM is selected
//            Partial images will be transmitted if image exceeds buffer size
//
//            You must select partition scheme from the board menu that has at least 3MB APP space.
//            Face Recognition is DISABLED for ESP32 and ESP32-S2, because it takes up from 15 
//            seconds to process single frame. Face Detection is ENABLED if PSRAM is enabled as well

// ===================
// Select camera model
// ===================
//#define CAMERA_MODEL_WROVER_KIT // Has PSRAM
//#define CAMERA_MODEL_ESP_EYE // Has PSRAM
//#define CAMERA_MODEL_ESP32S3_EYE // Has PSRAM
//#define CAMERA_MODEL_M5STACK_PSRAM // Has PSRAM
//#define CAMERA_MODEL_M5STACK_V2_PSRAM // M5Camera version B Has PSRAM
//#define CAMERA_MODEL_M5STACK_WIDE // Has PSRAM
//#define CAMERA_MODEL_M5STACK_ESP32CAM // No PSRAM
//#define CAMERA_MODEL_M5STACK_UNITCAM // No PSRAM
#define CAMERA_MODEL_AI_THINKER // Has PSRAM
//#define CAMERA_MODEL_TTGO_T_JOURNAL // No PSRAM
//#define CAMERA_MODEL_XIAO_ESP32S3 // Has PSRAM
// ** Espressif Internal Boards **
//#define CAMERA_MODEL_ESP32_CAM_BOARD
//#define CAMERA_MODEL_ESP32S2_CAM_BOARD
//#define CAMERA_MODEL_ESP32S3_CAM_LCD
#include "camera_pins.h"
// Define TX and RX pins for UART (change if needed)
#define TXD1 1
#define RXD1 3
#define RCCHECK(fn) { rcl_ret_t temp_rc = fn; if((temp_rc != RCL_RET_OK)){error_loop();}}
#define RCSOFTCHECK(fn) { rcl_ret_t temp_rc = fn; if((temp_rc != RCL_RET_OK)){}}

// Use Serial1 for UART communication
HardwareSerial uartSerial(1);
// ===========================
// Enter your WiFi credentials
// ===========================
const char* ssid = "Sambamelodiii";
const char* password = "Melodi12345";

void startCameraServer();
void setupLedFlash(int pin);
void error_loop(){
  while(1){
    //digitalWrite(LED_PIN, !digitalRead(LED_PIN));
    Serial.println("AAAAAA");
    delay(100);
  }
}


void subscription_callback(const void * msgin)
{  
  //Serial.println("wawaw");
  const std_msgs__msg__String * msg = (const std_msgs__msg__String *)msgin;
  Serial.print(msg->data.data);
  
  //uartSerial.println(msg->data.data);
}
void ros_setup(){
  set_microros_wifi_transports("Sambamelodiii", "Melodi12345", "192.168.1.7", 8888);

  delay(2000);

  allocator = rcl_get_default_allocator();

  //create init_options
  rclc_support_init(&support, 0, NULL, &allocator);

  // create node
  rclc_node_init_default(&node, "micro_ros_arduino_node", "", &support);
  init_sub();
  init_pub();
}
void timer_callback(rcl_timer_t * timer, int64_t last_call_time)
{
  RCLC_UNUSED(last_call_time);
  if (timer != NULL) {
  if (Serial.available()) {
    int buffer = Serial.parseInt();

    msgPub.data = buffer;
    RCSOFTCHECK(rcl_publish(&publisher, &msgPub, NULL));

    //Serial.print("Published: ");
    //Serial.print(msgPub.data);
  }
  }
}

void init_pub(){
  RCCHECK(rclc_publisher_init_default(
      &publisher,
      &node,
      ROSIDL_GET_MSG_TYPE_SUPPORT(std_msgs, msg, Int32),
      "collisions"));

  RCCHECK(rclc_timer_init_default(
      &timer,
      &support,
      RCL_MS_TO_NS(300),
      timer_callback));

  // create executor
  RCCHECK(rclc_executor_init(&executorPub, &support.context, 1, &allocator));
  RCCHECK(rclc_executor_add_timer(&executorPub, &timer));
  msgPub.data = 0;
}
void init_sub(){
  msg.data.data = (char*) malloc(200);
  msg.data.size = 0;
  msg.data.capacity = 200;
  // create subscriber
  rclc_subscription_init_default(
    &subscriber,
    &node,
    ROSIDL_GET_MSG_TYPE_SUPPORT(std_msgs, msg, String),
    "controller");

  // create executor
  rclc_executor_init(&executorSub, &support.context, 1, &allocator);
  rclc_executor_add_subscription(&executorSub, &subscriber, &msg, &subscription_callback, ON_NEW_DATA);
}
  
void startCameraServer();
void setupLedFlash(int pin);

void setup() {
  Serial.begin(9600, SERIAL_8N1, RXD1, TXD1);
  Serial.setDebugOutput(true);
  Serial.println();

  camera_config_t config;
  config.ledc_channel = LEDC_CHANNEL_0;
  config.ledc_timer = LEDC_TIMER_0;
  config.pin_d0 = Y2_GPIO_NUM;
  config.pin_d1 = Y3_GPIO_NUM;
  config.pin_d2 = Y4_GPIO_NUM;
  config.pin_d3 = Y5_GPIO_NUM;
  config.pin_d4 = Y6_GPIO_NUM;
  config.pin_d5 = Y7_GPIO_NUM;
  config.pin_d6 = Y8_GPIO_NUM;
  config.pin_d7 = Y9_GPIO_NUM;
  config.pin_xclk = XCLK_GPIO_NUM;
  config.pin_pclk = PCLK_GPIO_NUM;
  config.pin_vsync = VSYNC_GPIO_NUM;
  config.pin_href = HREF_GPIO_NUM;
  config.pin_sccb_sda = SIOD_GPIO_NUM;
  config.pin_sccb_scl = SIOC_GPIO_NUM;
  config.pin_pwdn = PWDN_GPIO_NUM;
  config.pin_reset = RESET_GPIO_NUM;
  config.xclk_freq_hz = 20000000;
  config.frame_size = FRAMESIZE_UXGA;
  config.pixel_format = PIXFORMAT_JPEG; // for streaming
  //config.pixel_format = PIXFORMAT_RGB565; // for face detection/recognition
  config.grab_mode = CAMERA_GRAB_WHEN_EMPTY;
  config.fb_location = CAMERA_FB_IN_PSRAM;
  config.jpeg_quality = 12;
  config.fb_count = 1;
  
  // if PSRAM IC present, init with UXGA resolution and higher JPEG quality
  //                      for larger pre-allocated frame buffer.
  if(config.pixel_format == PIXFORMAT_JPEG){
    if(psramFound()){
      config.jpeg_quality = 10;
      config.fb_count = 2;
      config.grab_mode = CAMERA_GRAB_LATEST;
    } else {
      // Limit the frame size when PSRAM is not available
      config.frame_size = FRAMESIZE_SVGA;
      config.fb_location = CAMERA_FB_IN_DRAM;
    }
  } else {
    // Best option for face detection/recognition
    config.frame_size = FRAMESIZE_240X240;
#if CONFIG_IDF_TARGET_ESP32S3
    config.fb_count = 2;
#endif
  }

#if defined(CAMERA_MODEL_ESP_EYE)
  pinMode(13, INPUT_PULLUP);
  pinMode(14, INPUT_PULLUP);
#endif

  // camera init
  esp_err_t err = esp_camera_init(&config);
  if (err != ESP_OK) {
    //Serial.printf("Camera init failed with error 0x%x", err);
    return;
  }

  sensor_t * s = esp_camera_sensor_get();
  // initial sensors are flipped vertically and colors are a bit saturated
  if (s->id.PID == OV3660_PID) {
    s->set_vflip(s, 1); // flip it back
    s->set_brightness(s, 1); // up the brightness just a bit
    s->set_saturation(s, -2); // lower the saturation
  }
  // drop down frame size for higher initial frame rate
  if(config.pixel_format == PIXFORMAT_JPEG){
    s->set_framesize(s, FRAMESIZE_QVGA);
  }

#if defined(CAMERA_MODEL_M5STACK_WIDE) || defined(CAMERA_MODEL_M5STACK_ESP32CAM)
  s->set_vflip(s, 1);
  s->set_hmirror(s, 1);
#endif

#if defined(CAMERA_MODEL_ESP32S3_EYE)
  s->set_vflip(s, 1);
#endif

// Setup LED FLash if LED pin is defined in camera_pins.h
#if defined(LED_GPIO_NUM)
  setupLedFlash(LED_GPIO_NUM);
#endif

  WiFi.begin(ssid, password);
  WiFi.setSleep(false);

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    //Serial.print(".");
  }
  //Serial.println("");
  //Serial.println("WiFi connected");

  startCameraServer();

  //Serial.print("Camera Ready! Use 'http://");
  //Serial.print(WiFi.localIP());
  //Serial.println("' to connect");
  //uartSerial.begin(115200, SERIAL_8N1, RXD1, TXD1);
// Set your Static IP address

  ros_setup();
}

void loop() {
  // Do nothing. Everything is done in another task by the web server
  delay(100);
  RCCHECK(rclc_executor_spin_some(&executorSub, RCL_MS_TO_NS(100)));
  RCCHECK(rclc_executor_spin_some(&executorPub, RCL_MS_TO_NS(100)));
}
