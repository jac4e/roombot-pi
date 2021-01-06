# I2C Communication protocol

The following outlines proper communication between a master and slave device through I2C.
The master shall send a two byte array to the slave in the form 0x[Command][Data] as outlined in the table below.

| Command      | Byte 1 | Data (Byte 2) |
|--------------|--------|---------------|
| moveForward  | 0x01   | distance      |
| moveBackward | 0x02   | distance      |
| turnRight    | 0x03   | degrees       |
| turnLeft     | 0x04   | degrees       |
| stop         | 0x05   | nill          |

The slave device shall, upon completing the requested command, send one byte with the value 0x01 for command completion verification.
If the data byte is 0x00 then the slave shall run the command until the stop command is received.
