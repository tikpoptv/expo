def resetServo():
    basic.show_string("SV.R")
    iBIT.servo(ibitServo.SV1, 0)
    iBIT.servo(ibitServo.SV2, 0)
def Movement_test():
    iBIT.motor(ibitMotor.FORWARD, 15)
    basic.pause(1000)
    iBIT.turn(ibitTurn.LEFT, 50)
    basic.pause(1000)
    iBIT.turn(ibitTurn.RIGHT, 50)
    basic.pause(2000)
    iBIT.turn(ibitTurn.LEFT, 50)
    basic.pause(1000)
    iBIT.motor_stop()
def nameset():
    if True:
        pass
    huskylens.init_i2c()
    basic.show_icon(IconNames.HEART)
    huskylens.init_mode(protocolAlgorithm.ALGORITHM_FACE_RECOGNITION)
    huskylens.write_name(1, "tik")
nameset()

def on_forever():
    huskylens.request()
    if huskylens.is_appear(1, HUSKYLENSResultType_t.HUSKYLENS_RESULT_BLOCK):
        basic.show_icon(IconNames.YES)
    else:
        basic.show_icon(IconNames.NO)
        basic.pause(1000)
        basic.show_leds("""
            . . . . .
            . . . . .
            . . . . .
            . . . . .
            . . . . .
            """)
basic.forever(on_forever)
