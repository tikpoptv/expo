function ball404 () {
    iBIT.Servo(ibitServo.SV2, 35)
    if (huskylens.isAppear(color, HUSKYLENSResultType_t.HUSKYLENSResultBlock) && width < 30) {
        objectfollowing()
    } else {
        if (pins.analogReadPin(AnalogPin.P1) >= 100) {
            iBIT.Spin(ibitSpin.Right, 50)
            basic.pause(500)
            iBIT.Motor(ibitMotor.Forward, 40)
            basic.pause(300)
        }
        basic.showIcon(IconNames.No)
        iBIT.Spin(ibitSpin.Left, 60)
        basic.pause(300)
        iBIT.MotorStop()
        basic.pause(300)
    }
}
function resetServo () {
    basic.showString("S")
    iBIT.Servo(ibitServo.SV1, 90)
    basic.pause(500)
    iBIT.Servo(ibitServo.SV2, 5)
    basic.pause(500)
    iBIT.Servo(ibitServo.SV2, 35)
    basic.pause(500)
    iBIT.Servo(ibitServo.SV2, 60)
    basic.pause(500)
    iBIT.Servo(ibitServo.SV1, 0)
    basic.pause(500)
    basic.showIcon(IconNames.Yes)
}
function maintenance_reset () {
    maintenance = 0
    testservo = 0
    testcam = 0
}
function BL_RedayShoot () {
    basic.showIcon(IconNames.Meh)
    if (y < 150 && (x >= 50 && x <= 200)) {
        iBIT.Motor(ibitMotor.Forward, 30)
    } else if (x < 50) {
        iBIT.Spin(ibitSpin.Right, 50)
        basic.pause(150)
        iBIT.MotorStop()
    } else if (x > 200) {
        iBIT.Spin(ibitSpin.Left, 50)
        basic.pause(150)
        iBIT.MotorStop()
    } else if (y >= 150 && (x >= 50 && x <= 200)) {
        iBIT.MotorStop()
        iBIT.Motor(ibitMotor.Forward, 50)
        basic.pause(1000)
        iBIT.MotorStop()
        basic.pause(600)
        iBIT.Servo(ibitServo.SV1, 90)
        basic.pause(500)
        iBIT.Motor(ibitMotor.Backward, 50)
        basic.pause(2000)
        iBIT.Spin(ibitSpin.Left, 50)
        basic.pause(500)
        iBIT.Servo(ibitServo.SV1, 0)
        basic.pause(200)
        iBIT.MotorStop()
        huskylens.initMode(protocolAlgorithm.ALGORITHM_COLOR_RECOGNITION)
        basic.pause(300)
        step = 0
    }
}
function fc_maintenance_test () {
    if (maintenance == 1) {
        basic.showString("" + (testcam))
        if (input.buttonIsPressed(Button.B)) {
            testcam = testcam + 1
            if (testcam == 1) {
                iBIT.Servo(ibitServo.SV2, 25)
            } else if (testcam == 2) {
                iBIT.Servo(ibitServo.SV2, 35)
            } else if (testcam == 3) {
                iBIT.Servo(ibitServo.SV2, 60)
                testcam = 0
            }
        }
    } else if (maintenance == 2) {
        basic.showString("" + (testservo))
        if (input.buttonIsPressed(Button.B)) {
            testservo = testservo + 1
            if (testservo == 1) {
                iBIT.Servo(ibitServo.SV1, 0)
            } else if (testservo == 2) {
                iBIT.Servo(ibitServo.SV1, 60)
            } else if (testservo == 3) {
                iBIT.Servo(ibitServo.SV1, 90)
                testservo = 0
            }
        }
    }
}
function objectfollowing () {
    if (y > 150 && (x >= 120 && (x <= 200 && width < 160))) {
        iBIT.MotorStop()
        basic.showLeds(`
            # # # # #
            # . . . #
            # . . . #
            # . . . #
            # # # # #
            `)
        y = -1
        step = 1
    } else if (y < 150 && (x >= 120 && (x <= 200 && width < 160))) {
        basic.showLeds(`
            . . # . .
            . # . # .
            # # # # #
            . . # . .
            . . # . .
            `)
        iBIT.Motor(ibitMotor.Forward, 20)
    } else if (x < 120 && width < 160) {
        iBIT.Spin(ibitSpin.Right, 50)
        basic.pause(200)
        iBIT.MotorStop()
    } else if (x > 200 && width < 160) {
        iBIT.Spin(ibitSpin.Left, 50)
        basic.pause(200)
        iBIT.MotorStop()
    }
}
function fc_maintenance () {
    if (input.buttonIsPressed(Button.A)) {
        maintenance = maintenance + 1
        iBIT.MotorStop()
        if (maintenance == 1) {
            basic.showString("CT")
        } else if (maintenance == 2) {
            basic.showString("ST")
        } else if (maintenance >= 3) {
            maintenance = 0
            basic.clearScreen()
        }
    }
}
function data () {
    huskylens.request()
    y = huskylens.readeBox(color, Content1.yCenter)
    x = huskylens.readeBox(color, Content1.xCenter)
}
function runtest () {
    if (input.buttonIsPressed(Button.B)) {
        iBIT.Servo(ibitServo.SV1, 0)
        iBIT.Servo(ibitServo.SV1, 70)
        basic.pause(300)
        iBIT.Motor(ibitMotor.Backward, 100)
        basic.pause(500)
        iBIT.MotorStop()
        basic.pause(200)
        iBIT.Motor(ibitMotor.Forward, 100)
        basic.pause(500)
        iBIT.MotorStop()
        basic.pause(300)
        iBIT.Servo(ibitServo.SV1, 0)
    } else if (input.buttonIsPressed(Button.A)) {
    	
    }
}
function ready_crashOBJ () {
    iBIT.Servo(ibitServo.SV1, 50)
    basic.pause(500)
    fw_ball()
}
function ir () {
    if (ir1 >= 468 && ir2 >= 612) {
        iBIT.Motor(ibitMotor.Forward, 30)
    } else if (ir1 < 468 && ir2 >= 612) {
        iBIT.Turn(ibitTurn.Left, 30)
    } else if (ir1 >= 468 && ir2 < 612) {
        iBIT.Turn(ibitTurn.Right, 30)
    } else {
    	
    }
}
function Movement_test () {
    basic.showString("M")
    iBIT.Motor(ibitMotor.Forward, 15)
    basic.pause(1000)
    iBIT.Turn(ibitTurn.Left, 50)
    basic.pause(1000)
    iBIT.Turn(ibitTurn.Right, 50)
    basic.pause(2000)
    iBIT.Turn(ibitTurn.Left, 50)
    basic.pause(1000)
    iBIT.MotorStop()
    basic.showIcon(IconNames.Happy)
}
function nameset () {
    basic.showIcon(IconNames.SmallHeart)
    count = 0
    color = 1
    huskylens.clearOSD()
    huskylens.initI2c()
    huskylens.initMode(protocolAlgorithm.ALGORITHM_COLOR_RECOGNITION)
}
function fw_ball () {
    if (y > 160 && (x >= 145 && x <= 185)) {
        iBIT.MotorStop()
        iBIT.Motor(ibitMotor.Backward, 35)
        basic.pause(400)
        iBIT.MotorStop()
        basic.pause(200)
        iBIT.Servo(ibitServo.SV1, 80)
        basic.pause(200)
        iBIT.Motor(ibitMotor.Forward, 50)
        basic.pause(500)
        iBIT.Servo(ibitServo.SV1, 0)
        iBIT.MotorStop()
        basic.pause(200)
        count = count + 1
        countall = countall + 1
        if (count == 6) {
            n = 1
        } else if (count == 7) {
            color = 1
            count = 0
            countall = 0
            n = 3
        } else {
            n = 3
        }
        if (count == n) {
            step = 2
        } else {
            step = 0
        }
    } else if (y < 160 && (x > 135 && x < 195)) {
        iBIT.Motor(ibitMotor.Forward, 35)
        iBIT.Servo(ibitServo.SV1, 0)
    } else if (x < 135) {
        iBIT.Spin(ibitSpin.Right, 50)
        basic.pause(100)
        iBIT.MotorStop()
        iBIT.Servo(ibitServo.SV1, 0)
    } else if (x > 195) {
        iBIT.Spin(ibitSpin.Left, 50)
        basic.pause(100)
        iBIT.MotorStop()
        iBIT.Servo(ibitServo.SV1, 0)
    }
}
function crashOBJ () {
    basic.showIcon(IconNames.Skull)
    iBIT.Motor(ibitMotor.Backward, 50)
    basic.pause(500)
    iBIT.Servo(ibitServo.SV1, 90)
    basic.pause(500)
    iBIT.Motor(ibitMotor.Forward, 100)
    basic.pause(500)
    iBIT.MotorStop()
    iBIT.Servo(ibitServo.SV1, 0)
    basic.pause(500)
    ball = 1
}
function Huskylens () {
    iBIT.Servo(ibitServo.SV2, 35)
    if (huskylens.isAppear(1, HUSKYLENSResultType_t.HUSKYLENSResultBlock)) {
        color = 1
        x = huskylens.readeBox(1, Content1.xCenter)
        y = huskylens.readeBox(1, Content1.yCenter)
        width = huskylens.readeBox(1, Content1.width)
        objectfollowing()
    } else if (huskylens.isAppear(2, HUSKYLENSResultType_t.HUSKYLENSResultBlock)) {
        color = 2
        x = huskylens.readeBox(2, Content1.xCenter)
        y = huskylens.readeBox(2, Content1.yCenter)
        objectfollowing()
    } else {
        iBIT.MotorStop()
        ir1 = pins.analogReadPin(AnalogPin.P1)
        ir2 = pins.analogReadPin(AnalogPin.P2)
        basic.showIcon(IconNames.No)
    }
}
let delay_one = 0
let tag_one = 0
let detect_color_mode_one = 0
let high = 0
let ball = 0
let countall = 0
let ir2 = 0
let ir1 = 0
let step = 0
let x = 0
let y = 0
let testcam = 0
let testservo = 0
let maintenance = 0
let width = 0
let n = 0
let color = 0
let count = 0
resetServo()
nameset()
huskylens.clearOSD()
count = 0
count = 0
color = 2
n = 3
let spinw = 0
basic.forever(function () {
    fc_maintenance()
    serial.writeValue("x", x)
    serial.writeValue("y", y)
    serial.writeValue("w", width)
    serial.writeValue("h", high)
    serial.writeValue("ir1", pins.analogReadPin(AnalogPin.P1))
    serial.writeValue("ir2", pins.analogReadPin(AnalogPin.P2))
    if (maintenance > 0) {
        fc_maintenance_test()
        huskylens.request()
        x = huskylens.readeBox(1, Content1.xCenter)
        y = huskylens.readeBox(1, Content1.yCenter)
        width = huskylens.readeBox(1, Content1.width)
        high = huskylens.readeBox(1, Content1.height)
    } else {
        huskylens.request()
        x = huskylens.readeBox(color, Content1.xCenter)
        y = huskylens.readeBox(color, Content1.yCenter)
        width = huskylens.readeBox(color, Content1.width)
        if (step == 0) {
            if (detect_color_mode_one > 1) {
                huskylens.initMode(protocolAlgorithm.ALGORITHM_COLOR_RECOGNITION)
                detect_color_mode_one = 0
            }
            ball404()
            tag_one = 1
            delay_one = 1
        } else if (step == 1) {
            while (step == 1) {
                huskylens.request()
                x = huskylens.readeBox(color, Content1.xCenter)
                y = huskylens.readeBox(color, Content1.yCenter)
                width = huskylens.readeBox(color, Content1.width)
                serial.writeValue("x", x)
                serial.writeValue("y", y)
                iBIT.Servo(ibitServo.SV2, 25)
                if (delay_one == huskylens.readeBox(color, Content1.yCenter)) {
                    y = 0
                    delay_one = 0
                    y = -1
                }
                if (huskylens.isAppear(color, HUSKYLENSResultType_t.HUSKYLENSResultBlock) && width < 30) {
                    fw_ball()
                }
            }
        } else if (step == 2) {
            while (step == 2) {
                if (tag_one == 1) {
                    huskylens.initMode(protocolAlgorithm.ALGORITHM_TAG_RECOGNITION)
                    huskylens.writeName(1, "red")
                    huskylens.writeName(2, "bule")
                    tag_one = 0
                    x = -1
                    y = -1
                }
                iBIT.Servo(ibitServo.SV2, 60)
                huskylens.request()
                x = huskylens.readeBox(color, Content1.xCenter)
                y = huskylens.readeBox(color, Content1.yCenter)
                width = huskylens.readeBox(color, Content1.width)
                high = huskylens.readeBox(color, Content1.height)
                if (huskylens.isAppear(color, HUSKYLENSResultType_t.HUSKYLENSResultBlock)) {
                    BL_RedayShoot()
                } else {
                    if (pins.analogReadPin(AnalogPin.P1) >= 100) {
                        iBIT.Spin(ibitSpin.Right, 50)
                        basic.pause(500)
                        iBIT.Motor(ibitMotor.Forward, 40)
                        basic.pause(300)
                    }
                    basic.showIcon(IconNames.No)
                    iBIT.Spin(ibitSpin.Left, 55)
                    basic.pause(300)
                    iBIT.MotorStop()
                    basic.pause(300)
                }
            }
        }
    }
})
