function resetServo () {
    basic.showString("S")
    iBIT.Servo(ibitServo.SV1, 90)
    basic.pause(500)
    iBIT.Servo(ibitServo.SV2, 90)
    basic.pause(500)
    iBIT.Servo(ibitServo.SV1, 0)
    iBIT.Servo(ibitServo.SV2, 0)
    basic.showIcon(IconNames.Yes)
}
function check_shoot () {
    iBIT.MotorStop()
    huskylens.initMode(protocolAlgorithm.ALGORITHM_TAG_RECOGNITION)
    huskylens.writeName(1, "red")
    huskylens.writeName(2, "bule")
    if (color == 1) {
        if (huskylens.isAppear(1, HUSKYLENSResultType_t.HUSKYLENSResultBlock)) {
            BL_RedayShoot()
        }
    } else if (color == 2) {
        if (huskylens.isAppear(2, HUSKYLENSResultType_t.HUSKYLENSResultBlock)) {
            BL_RedayShoot()
        }
    } else {
        iBIT.Spin(ibitSpin.Left, 20)
    }
}
function BL_RedayShoot () {
    if (x >= 120 && x <= 200) {
        crashOBJ()
    } else if (x > 120) {
        iBIT.Turn(ibitTurn.Right, 50)
    } else if (x < 200) {
        iBIT.Turn(ibitTurn.Left, 50)
    }
}
function objectfollowing () {
    if (y > 155 && (x >= 120 && x <= 200)) {
        iBIT.MotorStop()
        basic.showLeds(`
            # # # # #
            # . . . #
            # . . . #
            # . . . #
            # # # # #
            `)
        ready_crashOBJ()
    } else if (y < 155 && (x >= 120 && x <= 200)) {
        basic.showLeds(`
            . . # . .
            . # . # .
            # # # # #
            . . # . .
            . . # . .
            `)
        iBIT.Motor(ibitMotor.Forward, 35)
    } else if (x < 120) {
        iBIT.Turn(ibitTurn.Right, 30)
    } else if (x > 200) {
        iBIT.Turn(ibitTurn.Left, 30)
    }
}
function checkhy () {
	
}
function ready_crashOBJ () {
    iBIT.Servo(ibitServo.SV1, 90)
    basic.pause(500)
    iBIT.Motor(ibitMotor.Forward, 30)
    basic.pause(1000)
    iBIT.Servo(ibitServo.SV1, 0)
    basic.pause(500)
    iBIT.MotorStop()
    check_shoot()
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
    huskylens.writeOSD("tikxd", 160, 190)
    basic.showIcon(IconNames.Yes)
}
function nothing () {
    iBIT.Turn(ibitTurn.Right, 30)
    basic.pause(1000)
    checkhy()
    iBIT.Turn(ibitTurn.Left, 30)
    basic.pause(1000)
    checkhy()
    iBIT.Turn(ibitTurn.Left, 30)
    basic.pause(1000)
    checkhy()
    iBIT.Turn(ibitTurn.Right, 30)
    basic.pause(1000)
    iBIT.Motor(ibitMotor.Forward, 30)
    basic.pause(1000)
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
}
function Huskylens () {
    huskylens.request()
    if (huskylens.isLearned(1)) {
        if (huskylens.isAppear(1, HUSKYLENSResultType_t.HUSKYLENSResultBlock)) {
            color = 1
            x = huskylens.readeBox(1, Content1.xCenter)
            y = huskylens.readeBox(1, Content1.yCenter)
            objectfollowing()
        } else {
            iBIT.MotorStop()
            basic.showIcon(IconNames.Sad)
        }
    } else if (huskylens.isLearned(2)) {
        if (huskylens.isAppear(2, HUSKYLENSResultType_t.HUSKYLENSResultBlock)) {
            color = 2
            x = huskylens.readeBox(2, Content1.xCenter)
            y = huskylens.readeBox(2, Content1.yCenter)
            objectfollowing()
        } else {
            iBIT.MotorStop()
            basic.showIcon(IconNames.Sad)
        }
    } else {
        basic.showIcon(IconNames.No)
        iBIT.MotorStop()
    }
}
let y = 0
let x = 0
let color = 0
resetServo()
nameset()
basic.forever(function () {
    Huskylens()
})
