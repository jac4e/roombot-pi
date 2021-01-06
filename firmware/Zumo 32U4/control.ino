#include <Wire.h>
#include <Zumo32U4.h>

Zumo32U4Motors motors;
Zumo32U4Encoders encoders;

#define moveForward 0x01
#define moveBackward 0x02
#define turnRight 0x03
#define turnLeft 0x04
#define stop 0x05

byte buff[2];

void moveRobot(int16_t v, int16_t dist)
{
    int16_t cMax = dist * 41;
    if (cMax > 0)
    {
        while (abs(encoders.getCountsLeft()) <= cMax)
        {
            motors.setSpeeds(v, v);
        }
    }
    motors.setSpeeds(0, 0);

    encoders.getCountsAndResetLeft();
}

void turnRobot(String dir, int16_t deg)
{
    int16_t cMax = deg; // Will need to add conversion factor for degrees to count
    while (abs(encoders.getCountsLeft()) <= cMax)
    {
        if (dir == "right")
        {
            motors.setSpeeds(-100, 100);
        }
        if (dir == "left")
        {
            motors.setSpeeds(100, -100);
        }
    }
    motors.setSpeeds(0, 0);
    encoders.getCountsAndResetLeft();
}
void receiveData(int byteCount)
{
    // Writes incoming data to a two byte array
    for (int i = 0; i < byteCount; i++)
    {
        buff[i] = Wire.read();
    }

    // check the byte array for command execute correct function
    switch (buff[0])
    {
    case moveForward:
        Serial.print("moveForward: ");
        Serial.print(buff[1]);
        Serial.print("\n");
        if (buff[1]){
            moveRobot(100, buff[1]);
        } else {
            motors.setSpeeds(100, 100);
        }
        break;
    case moveBackward:
        Serial.print("moveBackward: ");
        Serial.print(buff[1]);
        Serial.print("\n");
        if (buff[1]){
            moveRobot(-100, buff[1]);
        } else {
            motors.setSpeeds(-100, -100);
        }
        break;
    case turnRight:
        Serial.print("turnRight: ");
        Serial.print(buff[1]);
        Serial.print("\n");
        if (buff[1]){
            turnRobot("right", buff[1]);
        } else {
            motors.setSpeeds(-100, 100);
        }
        break;
    case turnLeft:
        Serial.print("turnLeft: ");
        Serial.print(buff[1]);
        Serial.print("\n");
        if (buff[1]){
            turnRobot("left", buff[1]);
        } else {
            motors.setSpeeds(100, -100);
        }
        break;
    case stop:
        Serial.print("moveBackward: ");
        Serial.print(buff[1]);
        Serial.print("\n");
        motors.setSpeeds(0,0);
        break;
    }
    Serial.print("Done\n");
    // Need to implement return byte to notify PI when move and turn states are finished
}

void setup()
{
    Serial.begin(9600);
    Serial.print('Begin');
    //initialize i2c
    Wire.begin(0x2A);

    //define callbacks
    Wire.onReceive(receiveData);
}

void loop()
{
}