// ==UserScript==
// @name         boss直聘批量投递工具
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  boss直聘批量投递
// @author       solenya jesslynwong
// @copyright       2015-2020, AC
// @require      http://code.jquery.com/jquery-2.1.1.min.js
// @match        https://www.zhipin.com/*
// @grant        GM_xmlhttpRequest
// ==/UserScript==

// js跨浏览器标签页通信 storage
// iframe
// 获取页面一的a标签，发送请求获取a标签对应的链接的数据，再从中得到立即沟通对应的请求，发送请求
// 写一个浏览器脚本，把以上三行代码放进去就行


// 定时器5s轮询一次，一旦有了跳出轮询，没有继续，10次后结束提示错误

(function () {
    'use strict';

    async function monitorElementGeneration(selector) {
        return new Promise(resolve => {
            let el;
            let timer = setInterval(() => {
                el = document.querySelector(selector);
                if(el) {
                    resolve(el);
                    clearInterval(timer);
                }
            }, 100);
        })
    }

    async function monitorElementsGeneration(selector) {
        return new Promise(resolve => {
            let el;
            let timer = setInterval(() => {
                el = document.querySelectorAll(selector);
                if(el.length) {
                    resolve(el);
                    clearInterval(timer);
                }
            }, 100);
        })
    }





    // 添加按钮
    var btn = document.createElement("button");
    btn.innerHTML = '批量投递'
    btn.style.position = 'fixed'
    btn.style.top = '45%'
    btn.style.left = '2%'
    btn.style.border = '1px solid white'
    btn.style.background = 'red'
    btn.style.font = '16px'
    btn.style.color = 'white'
    btn.style.padding = '5px'
    btn.style.borderRadius = '5%'
    document.body.append(btn)

    btn.onclick = () => {
        // 工作list主面板
        const ulList = document.getElementsByClassName('job-list-box')[0]
        // 工作集合
        const lilists = ulList.getElementsByTagName('li');

        const autoClick = (url) => {
            window.open(url)
        }
        const waitAutoClickArr = [];
        [...lilists].forEach(ele => {
            // 获取聊天窗口url
            const a = ele.getElementsByTagName('a')[0]
            if (a) {
                waitAutoClickArr.push(a.href)
            }
        })

        waitAutoClickArr.forEach((ele, index) => {
            // 测试
            if(index>=18 && index<21) {
             autoClick(ele);
            }

        })
    }

    function fetch() {
        // 立即沟通按钮
        const btn = document.getElementsByClassName('btn-container')[0]
        if (btn) {
        // 立即沟通按钮
            const aLink = btn.getElementsByClassName('btn-startchat')[0]
            if (aLink) {
                aLink.click()
            } else {
                console.log('aLink挂了', aLink)
            }
        } else {
            console.log('btn挂了', btn)
        }

    }
    fetch()


     const timer = setInterval(() => {
        console.log('重新轮询')
        fetch()
        // 工作详情页的聊天有这个class
        const textBtn = document.getElementsByClassName('btn-startchat')[0]
        const leftTitle = document.getElementsByClassName('left-title')[0]
        // 发送简历的div
        const dialogContainer = document.getElementsByClassName('dialog-container')[0]

        var contextValue = '您好 本人java12年一线研发经验 带领团队有多次从零到一落地的实践经验 希望能得到您的垂青';

        // https://www.zhipin.com/web/geek/chat  聊天界面
        // /web/geek/job  工作主页
        if (!textBtn && location.pathname === '/web/geek/job') {
            clearInterval(timer)
            console.log('是主页，不管他')
            return;
        }
        if (leftTitle) {
                        console.log('进leftTitle了')
            document.getElementById('chat-input').innerHTML=contextValue;
            // 模拟点击后才能发送
            document.getElementById('chat-input').click();
// class 会变要先赋值才能获取到这个对象
            const sendButton2 = document.getElementsByClassName('btn-v2 btn-sure-v2 btn-send');

            sendButton2[0].click();

            clearInterval(timer)
            // window.close()
            return;
        }
        if (dialogContainer) {
            console.log('进附件了 chat-input')


            _sayHello();


            console.log('进附件了2')
            clearInterval(timer)
            // window.close();
            return;
        }



        if (textBtn.innerText === '继续沟通') {
            console.log('完事了')
            clearInterval(timer)
            window.close()
        }
    }, 5000);





    function _sayHello() {
        const el =  monitorElementGeneration('.chat-conversation>.message-controls');
            setTimeout('', 2000);
        let controls = document.querySelector('.chat-conversation>.message-controls');

            const input =  controls.querySelector('.chat-editor #chat-input');
            const send = controls.querySelector('.chat-editor .btn-send');
            const inputEv = new Event('input', { bubbles: true });
            inputEv.simulated = true;
        var contextValue2 = '您好 本人java12年一线研发经验 带领团队有多次从零到一落地的实践经验 希望能得到您的垂青';
            input.innerText = contextValue2;
            input.dispatchEvent(inputEv);


            setTimeout(() => {
                send.click();

                setTimeout('', 5000);
            }, 1000);

    }



})();







