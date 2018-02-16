var res = API.getScreenResolutionMaintainRatio();

var topBarWidth = 400;
var topBarHeight = 25;
var myTopBar = null;

var centerVerticalBarWidth = 25;
var centerVerticalBarHeight = 250;
var myCenterBar = null;

API.onResourceStart.connect(function() {
    myTopBar = resource.ProgressBar.createProgressBar(
        (res.Width / 2) - (topBarWidth / 2), // X position of the bar on screen
        50, // Y position of the bar on screen
        topBarWidth, // width of the bar
        topBarHeight, // height of the bar
        255, 0, 0, // color of the bar (red, green, blue)
        255, // alpha of the bar (transparency)
        false // is bar vertical?
    );

    myCenterBar = resource.ProgressBar.createProgressBar(
        (res.Width / 2) - (centerVerticalBarWidth / 2),
        (res.Height / 2) - (centerVerticalBarHeight / 2),
        centerVerticalBarWidth,
        centerVerticalBarHeight,
        0, 255, 0,
        255,
        true
    );
});

API.onKeyDown.connect(function(e, key) {
    if (key.KeyCode == Keys.NumPad6)
    {
        // Pressing/holding NumPad6 will increase progress of both bars by 1%.
        if (myTopBar != null) myTopBar.progress++;
        if (myCenterBar != null) myCenterBar.progress++;
    }

    if (key.KeyCode == Keys.NumPad4)
    {
        // Pressing/holding NumPad4 will decrease progress of both bars by 1%.
        if (myTopBar != null) myTopBar.progress--;
        if (myCenterBar != null) myCenterBar.progress--;
    }

    if (key.KeyCode == Keys.Y)
    {
        // Pressing/holding Y will set progress of both bars to 50%.
        if (myTopBar != null) myTopBar.progress = 50;
        if (myCenterBar != null) myCenterBar.progress = 50;
    }

    if (key.KeyCode == Keys.N)
    {
        // Pressing/holding N will set progress of both bars to 0%.
        if (myTopBar != null) myTopBar.progress = 0;
        if (myCenterBar != null) myCenterBar.progress = 0;
    }

    if (key.KeyCode == Keys.Delete)
    {
        // Pressing/holding DEL will delete the center progress bar.
        if (myCenterBar != null) myCenterBar.delete();
        myCenterBar = null;
    }
});