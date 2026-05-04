#include "micro_ros_node.h"
#include <Arduino.h>

#define RCSOFTCHECK(fn) { rcl_ret_t rc = fn; if(rc != RCL_RET_OK){} }

MicroROSNode* MicroROSNode::instance = NULL;

void MicroROSNode::sub_callback(const void * msgin) {
    const std_msgs__msg__String * msg =
        (const std_msgs__msg__String *)msgin;

    Serial.print("Received: ");
    Serial.println(msg->data.data);
}

void MicroROSNode::timer_callback(rcl_timer_t * timer, int64_t last_call_time) {
    (void) last_call_time;

    if (timer != NULL && Serial.available()) {
        int val = Serial.parseInt();
        instance->publish(val);
    }
}

void MicroROSNode::publish(int value) {
    msgPub.data = value;
    rcl_publish(&publisher, &msgPub, NULL);
}

void MicroROSNode::init( char* ssid,  char* password, char* agent_ip) {
    set_microros_wifi_transports(ssid, password, agent_ip, 8888);

    delay(2000);

    allocator = rcl_get_default_allocator();
    rclc_support_init(&support, 0, NULL, &allocator);

    rclc_node_init_default(&node, "esp32_node", "", &support);

    rclc_publisher_init_default(
        &publisher,
        &node,
        ROSIDL_GET_MSG_TYPE_SUPPORT(std_msgs, msg, Int32),
        "collisions"
    );

    msgSub.data.data = (char*) malloc(200);
    msgSub.data.capacity = 200;

    rclc_subscription_init_default(
        &subscriber,
        &node,
        ROSIDL_GET_MSG_TYPE_SUPPORT(std_msgs, msg, String),
        "controller"
    );

    rclc_timer_init_default(
        &timer,
        &support,
        RCL_MS_TO_NS(300),
        timer_callback
    );

    rclc_executor_init(&executorPub, &support.context, 1, &allocator);
    rclc_executor_add_timer(&executorPub, &timer);

    rclc_executor_init(&executorSub, &support.context, 1, &allocator);
    rclc_executor_add_subscription(
        &executorSub,
        &subscriber,
        &msgSub,
        &sub_callback,
        ON_NEW_DATA
    );

    instance = this;
}

void MicroROSNode::spin() {
    rclc_executor_spin_some(&executorSub, RCL_MS_TO_NS(100));
    rclc_executor_spin_some(&executorPub, RCL_MS_TO_NS(100));
}