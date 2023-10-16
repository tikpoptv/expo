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
function check_shoot () {
    if (tag_one == 1) {
        huskylens.initMode(protocolAlgorithm.ALGORITHM_TAG_RECOGNITION)
        huskylens.writeName(1, "red")
        huskylens.writeName(2, "bule")
        tag_one = 0
    }
    if (color == 1) {
        if (huskylens.isAppear(1, HUSKYLENSResultType_t.HUSKYLENSResultBlock)) {
            basic.showString("1")
            BL_RedayShoot()
        }
    } else if (color == 2) {
        if (huskylens.isAppear(2, HUSKYLENSResultType_t.HUSKYLENSResultBlock)) {
            basic.showString("2")
            BL_RedayShoot()
        }
    } else {
        iBIT.Spin(ibitSpin.Left, 20)
    }
}
function maintenance_reset () {
    maintenance = 0
    testservo = 0
    testcam = 0
}
function BL_RedayShoot () {
    basic.showIcon(IconNames.Meh)
    S_x = huskylens.readeBox(1, Content1.xCenter)
    S_y = huskylens.readeBox(1, Content1.yCenter)
    if (S_x >= 120 && S_y <= 200) {
        crashOBJ()
    } else if (S_x > 120) {
        iBIT.Turn(ibitTurn.Right, 50)
    } else if (S_y < 200) {
        iBIT.Turn(ibitTurn.Left, 50)
    }
}
function fc_maintenance_test () {
    if (maintenance == 1) {
        basic.showString("" + (testcam))
        if (input.buttonIsPressed(Button.B)) {
            testcam = testcam + 1
            if (testcam == 1) {
                iBIT.Servo(ibitServo.SV2, 15)
            } else if (testcam == 2) {
                iBIT.Servo(ibitServo.SV2, 35)
            } else if (testcam == 3) {
                iBIT.Servo(ibitServo.SV2, 50)
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
                iBIT.Servo(ibitServo.SV1, 50)
            } else if (testservo == 3) {
                iBIT.Servo(ibitServo.SV1, 90)
                testservo = 0
            }
        }
    }
}
function objectfollowing () {
    if (y > 160 && (x >= 120 && x <= 200)) {
        iBIT.MotorStop()
        basic.showLeds(`
            # # # # #
            # . . . #
            # . . . #
            # . . . #
            # # # # #
            `)
        iBIT.Servo(ibitServo.SV1, 50)
        y = -1
        step = 1
    } else if (y < 160 && (x >= 120 && x <= 200)) {
        basic.showLeds(`
            . . # . .
            . # . # .
            # # # # #
            . . # . .
            . . # . .
            `)
        iBIT.Motor(ibitMotor.Forward, 30)
    } else if (x < 120) {
        iBIT.Turn(ibitTurn.Right, 30)
    } else if (x > 200) {
        iBIT.Turn(ibitTurn.Left, 30)
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
        iBIT.Servo(ibitServo.SV1, 0)
        iBIT.Motor(ibitMotor.Backward, 100)
        basic.pause(700)
        iBIT.MotorStop()
        iBIT.Servo(ibitServo.SV1, 40)
        basic.pause(500)
        iBIT.Motor(ibitMotor.Forward, 100)
        basic.pause(700)
        iBIT.MotorStop()
        basic.pause(300)
        iBIT.Servo(ibitServo.SV1, 0)
    }
}
function ready_crashOBJ () {
    iBIT.Servo(ibitServo.SV1, 50)
    basic.pause(500)
    fw_ball()
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
    huskylens.clearOSD()
    huskylens.initI2c()
    huskylens.initMode(protocolAlgorithm.ALGORITHM_COLOR_RECOGNITION)
    huskylens.writeName(1, "test")
}
function fw_ball () {
    if (y > 130 && (x >= 120 && x <= 200)) {
        iBIT.MotorStop()
        iBIT.Servo(ibitServo.SV1, 0)
    } else if (y < 130 && (x >= 120 && x <= 200)) {
        iBIT.Motor(ibitMotor.Forward, 20)
    } else if (x < 120) {
        iBIT.Turn(ibitTurn.Right, 20)
    } else if (x > 200) {
        iBIT.Turn(ibitTurn.Left, 20)
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
        objectfollowing()
    } else if (huskylens.isAppear(2, HUSKYLENSResultType_t.HUSKYLENSResultBlock)) {
        color = 2
        x = huskylens.readeBox(2, Content1.xCenter)
        y = huskylens.readeBox(2, Content1.yCenter)
        objectfollowing()
    } else {
        basic.showIcon(IconNames.No)
        iBIT.MotorStop()
    }
}
let delay_one = 0
let ball = 0
let step = 0
let x = 0
let y = 0
let S_y = 0
let S_x = 0
let testcam = 0
let testservo = 0
let maintenance = 0
let color = 0
let tag_one = 0
nameset()
huskylens.clearOSD()
huskylens.writeOSD("tikxd", 160, 200)
basic.forever(function () {
    fc_maintenance()
    serial.writeValue("x", x)
    serial.writeValue("y", y)
    if (maintenance > 0) {
        fc_maintenance_test()
        huskylens.request()
        x = huskylens.readeBox(1, Content1.xCenter)
        y = huskylens.readeBox(1, Content1.yCenter)
    } else {
        huskylens.request()
        x = huskylens.readeBox(color, Content1.xCenter)
        y = huskylens.readeBox(color, Content1.yCenter)
        if (step == 0) {
            Huskylens()
            tag_one = 1
            delay_one = 1
        } else if (step == 1) {
            if (delay_one == 1) {
                iBIT.Servo(ibitServo.SV2, 5)
                basic.pause(1000)
                y = huskylens.readeBox(color, Content1.yCenter)
                delay_one = 0
                y = -1
            }
            fw_ball()
        } else if (step == 2) {
            check_shoot()
        } else {
        	
        }
    }
})
