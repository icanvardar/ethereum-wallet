const convertToNum = (expNum) => {
    let n = expNum.indexOf("e");
    let expLeftovers = expNum.substring(n + 1, expNum.length);
    expLeftovers = parseInt(expLeftovers);
    let mainNum = expNum.substring(0, n);
    mainNum = parseFloat(mainNum);
    return mainNum * Math.pow(10, (expLeftovers - 18));
}

convertToNum("2.75e+21");