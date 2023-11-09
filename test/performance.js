if (!require.main) // The current module was required by another module. Skip this file from testing.
    return;

const iconv = require('iconv');
const iconv_lite = require("../");

const encoding = "windows-1251";
const convertTimes = 10000;

const encodingStrings = {
    'windows-1251': 'This is a test string 32 chars..',
    'gbk':          '这是中文字符测试。。！@￥%12',
    'utf8': '这是中文字符测试。。！@￥%12This is a test string 48 chars..',
};
// Test encoding.
let str = encodingStrings[encoding];
if (!str) {
    throw new Error('Don\'t support ' + encoding + ' performance test.');
}
for (let i = 0; i < 13; i++) {
    str = str + str;
}

{
    console.log('\n' + encoding + ' charset performance test:');
    console.log("\nEncoding "+str.length+" chars "+convertTimes+" times:");

    const start = Date.now();
    const converter = new iconv.Iconv("utf8", encoding);
    let b;
    for (let i = 0; i < convertTimes; i++) {
        b = converter.convert(str);
    }
    const duration = Date.now() - start;
    const mbs = convertTimes*b.length/duration/1024;

    console.log("iconv: "+duration+"ms, "+mbs.toFixed(2)+" Mb/s.");
}
{
    const start = Date.now();
    let b;
    for (let i = 0; i < convertTimes; i++) {
        b = iconv_lite.encode(str, encoding);
    }
    const duration = Date.now() - start;
    const mbs = convertTimes*b.length/duration/1024;

    console.log("iconv-lite: "+duration+"ms, "+mbs.toFixed(2)+" Mb/s.");
}


{
    const buf = new iconv.Iconv("utf8", encoding).convert(str);
    // Test decoding.
    console.log("\nDecoding "+buf.length+" bytes "+convertTimes+" times:");

    const start = Date.now();
    const converter = new iconv.Iconv(encoding, "utf8");
    for (let i = 0; i < convertTimes; i++) {
        converter.convert(buf).toString();
    }
    const duration = Date.now() - start;
    const mbs = convertTimes*buf.length/duration/1024;

    console.log("iconv: "+duration+"ms, "+mbs.toFixed(2)+" Mb/s.");
}
{
    const lite_buf = iconv_lite.encode(str, encoding);
    const start = Date.now();
    for (let i = 0; i < convertTimes; i++) {
        iconv_lite.decode(lite_buf, encoding);
    }
    const duration = Date.now() - start;
    const mbs = convertTimes*lite_buf.length/duration/1024;

    console.log("iconv-lite: "+duration+"ms, "+mbs.toFixed(2)+" Mb/s.");
}
