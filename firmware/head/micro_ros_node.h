#ifndef MICRO_ROS_NODE_H
#define MICRO_ROS_NODE_H

#include <micro_ros_arduino.h>
#include <rcl/rcl.h>
#include <rclc/rclc.h>
#include <rclc/executor.h>
#include <std_msgs/msg/int32.h>
#include <std_msgs/msg/string.h>

class MicroROSNode {
public:
    void init(const char* ssid, const char* password, const char* agent_ip);
    void spin();
    void publish(int value);

private:
    static void sub_callback(const void * msgin);
    static void timer_callback(rcl_timer_t * timer, int64_t last_call_time);

    static MicroROSNode* instance;

    rcl_node_t node;
    rclc_support_t support;
    rcl_allocator_t allocator;

    rcl_publisher_t publisher;
    std_msgs__msg__Int32 msgPub;

    rcl_subscription_t subscriber;
    std_msgs__msg__String msgSub;

    rcl_timer_t timer;
    rclc_executor_t executorPub;
    rclc_executor_t executorSub;
};

#endif