function resetServo () {
    basic.showString("SR.")
    iBIT.Servo(ibitServo.SV1, 0)
    iBIT.Servo(ibitServo.SV2, 0)
    basic.showIcon(IconNames.Yes)
}
function objectfollowing () {
    if (x >= 120 && x <= 200 && (h >= 60 && h <= 100)) {
        iBIT.MotorStop()
    } else if (h < 60) {
        iBIT.Motor(ibitMotor.Forward, 50)
    } else if (h > 100) {
        iBIT.Motor(ibitMotor.Backward, 50)
    } else if (x < 120) {
        iBIT.Turn(ibitTurn.Right, 50)
    } else if (x > 200) {
        iBIT.Turn(ibitTurn.Left, 50)
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
    huskylens.clearOSD()
    huskylens.initI2c()
    huskylens.initMode(protocolAlgorithm.ALGORITHM_COLOR_RECOGNITION)
    huskylens.writeName(1, "tik")
    huskylens.writeOSD("TIK", 280, 30)
    basic.showIcon(IconNames.Yes)
}
let h = 0
let x = 0
nameset()
basic.forever(function () {
    huskylens.request()
    if (huskylens.isLearned(1)) {
        if (huskylens.isAppear(1, HUSKYLENSResultType_t.HUSKYLENSResultBlock)) {
            x = huskylens.readeBox(1, Content1.xCenter)
            h = huskylens.readeBox(1, Content1.height)
            objectfollowing()
        } else {
            iBIT.MotorStop()
            basic.showIcon(IconNames.House)
        }
    } else {
        basic.showIcon(IconNames.No)
        iBIT.MotorStop()
    }
})