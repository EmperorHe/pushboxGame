window.onload = function () {
    //创建游戏dom,用以添加游戏元素
    let gameDom = document.getElementById('game');
    /*定义二维数组存放游戏元素
    *   0表示空白
    *   1表示玩家
    *   2表示墙
    *   3表示箱子
    */
    //设置关卡
    let map = [
        [
            [0, 0, 2, 2, 2, 2, 2, 0, 0],
            [0, 0, 2, 0, 1, 0, 2, 0, 0],
            [0, 0, 2, 0, 3, 0, 2, 0, 0],
            [2, 2, 2, 0, 0, 0, 2, 2, 2],
            [2, 0, 0, 0, 3, 0, 0, 0, 2],
            [2, 0, 3, 3, 3, 3, 3, 0, 2],
            [2, 0, 0, 0, 3, 0, 0, 0, 2],
            [2, 2, 0, 3, 3, 3, 0, 2, 2],
            [0, 2, 0, 0, 0, 0, 0, 2, 0],
            [0, 2, 0, 0, 3, 0, 0, 2, 0],
            [0, 2, 0, 0, 0, 0, 0, 2, 0],
            [0, 2, 2, 2, 2, 2, 2, 2, 0]
        ],
        [
            [0,0,2,2,2,0,0,0],
            [0,0,2,0,2,0,0,0],
            [0,0,2,0,2,2,2,2],
            [2,2,2,3,0,3,0,2],
            [2,0,0,3,1,2,2,2],
            [2,2,2,2,3,2,0,0],
            [0,0,0,2,0,2,0,0],
            [0,0,0,2,2,2,0,0]
        ],
        [
            [2,2,2,2,2,0,0,0,0],
            [2,0,0,1,2,0,0,0,0],
            [2,0,3,3,2,0,2,2,2],
            [2,0,3,0,2,0,2,0,2],
            [2,2,2,0,2,2,2,0,2],
            [0,2,2,0,0,0,0,0,2],
            [0,2,0,0,0,2,0,0,2],
            [0,2,0,0,0,2,2,2,2],
            [0,2,2,2,2,2,0,0,0]
        ],
        [
            [0, 2, 2, 2, 2, 2, 2, 2, 0, 0],
            [0, 2, 0, 0, 0, 0, 0, 2, 2, 2],
            [2, 2, 3, 2, 2, 2, 0, 0, 0, 2],
            [2, 0, 1, 0, 3, 0, 0, 3, 0, 2],
            [2, 0, 0, 0, 2, 0, 3, 0, 2, 2],
            [2, 2, 0, 0, 2, 0, 0, 0, 2, 0],
            [0, 2, 2, 2, 2, 2, 2, 2, 2, 0]
        ],
    ];
    // console.log(map[0].length);
    //定义正确位置的坐标
    let correct = [
        [
            {row: 3, col: 4},
            {row: 4, col: 4},
            {row: 5, col: 2},
            {row: 5, col: 3},
            {row: 5, col: 4},
            {row: 5, col: 5},
            {row: 5, col: 6},
            {row: 6, col: 4},
            {row: 7, col: 4},
            {row: 8, col: 4},
            {row: 9, col: 4},
            {row: 10, col: 4}
        ],
        [
            {row: 1,col: 3},
            {row: 3,col: 6},
            {row: 4,col: 1},
            {row: 6,col: 4}
        ],
        [
            {row: 3,col: 7},
            {row: 4,col: 7},
            {row: 5,col: 7},
        ],
        [
            {row: 4, col: 2},
            {row: 4, col: 3},
            {row: 5, col: 2},
            {row: 5, col: 3},
        ]

    ];

    //定义渲染函数，用以渲染页面
    let l = 0;
    function render(map, correct) {
        let width = 45, height = 45;
        gameDom.innerHTML = '';
        //遍历二维数组,i表示行，j表示列
        for (let i = 0; i < map.length; i++) {
            let row = map[i];
            for (let j = 0; j < row.length; j++) {
                //创建div元素，用来表示每一个坐标的数据
                let div = document.createElement('div');
                div.className = 'item';    //这两句代码相当于创建了一个标签： <div class="item"></div>

                if (row[j] === 0 && !atCorrect(i, j, correct)) {
                    continue;
                }
                if (row[j] === 2) {
                    div.classList.add('wall');
                } else if (row[j] === 1) {
                    div.classList.add('player');
                } else if (row[j] === 3) {
                    /*
                    * 箱子分为在正确位置上的箱子和不在正确位置上的箱子
                    *    在正确位置上的箱子类名为    correct-box
                    *    不在正确位置上的箱子类名为  box
                    */
                    if (atCorrect(i, j, correct)) {
                        div.classList.add('correct-box');
                    } else {
                        div.classList.add('box');
                    }
                } else {
                    div.classList.add("correct");
                }
                //设置div的位置，根据坐标计算，然后添加到dom中去
                div.style.left = width * j + "px";
                div.style.top = height * i + "px";
                gameDom.appendChild(div);
            }
        }
        //给游戏div添加宽高,使其样式中的--margin: 0 auto--生效居中对齐
        gameDom.style.width = map[0].length * width + "px";
        gameDom.style.height = map.length * height + "px";
    }

    //定义函数atCorrect，用来判断箱子在不在正确位置上
    //两个参数row和col表示行和列
    function atCorrect(row, col, correct) {
        //遍历数组correct
        for (let i = 0; i < correct.length; i++) {
            let point = correct[i];
            if (point.row === row && point.col === col) {
                return true;
            }
        }
        return false;
    }

    //声明移动函数,用来控制玩家移动方向
    function move(map, correct, direction) {
        //首先要获取玩家当前位置
        let playerPoint = getPlayerPoint(map);
        /*什么样的情况下可以移动
         *     1.玩家要移动的方向目标位置是空白位置
         *     2.玩家要移动的方向上有箱子并且箱子的目标方向是空白
         */
        //获取即将移动到的目标位置
        let newPoint = getNewPoint(playerPoint.row, playerPoint.col, direction);
        let target = map[newPoint.row][newPoint.col];
        //1.玩家要移动的方向目标位置是空白位置
        if (target === 0) {
            //交换当前玩家和目标点的内容
            exchange(playerPoint, newPoint, map);
            //更新玩家坐标
            playerPoint.row = newPoint.row;
            playerPoint.col = newPoint.col;
            render(map, correct);//重新渲染
        }
        //玩家要移动的方向目标位置是箱子
        else if (target === 3) {
            //箱子前面的坐标
            let boxForwardPoint = getNewPoint(newPoint.row, newPoint.col, direction);
            //箱子前面的东西
            let boxForward = map[boxForwardPoint.row][boxForwardPoint.col];
            if (boxForward === 0) {
                //只有箱子前面是空白才能移动
                exchange(newPoint, boxForwardPoint, map);
                exchange(playerPoint, newPoint, map);
                playerPoint.row = newPoint.row;
                playerPoint.col = newPoint.col;
                render(map, correct);
            }
        }
    }

    /**
     * 交换两个坐标的数据
     * @param {*} point1
     * @param {*} point2
     */
    function exchange(point1, point2, map) {
        let temp = map[point1.row][point1.col];
        map[point1.row][point1.col] = map[point2.row][point2.col];
        map[point2.row][point2.col] = temp;
    }

    /**
     * 根据指定坐标、方向、得到新的坐标
     * @param {*} row
     * @param {*} col
     * @param {*} direction
     */
    function getNewPoint(row, col, direction) {
        let point;
        if (direction === "left") {
            point = {
                row: row,
                col: col - 1
            };
        } else if (direction === "right") {
            point = {
                row: row,
                col: col + 1
            };
        } else if (direction === "up") {
            point = {
                row: row - 1,
                col: col
            };
        } else if (direction === "down") {
            point = {
                row: row + 1,
                col: col
            };
        }
        return point;
    }

    //声明一个函数用来获取玩家当前位置
    function getPlayerPoint(map) {
        let playerPoint = {};
        for (let i = 0; i < map.length; i++) {
            for (let j = 0; j < map[i].length; j++) {
                if (map[i][j] === 1) {
                    playerPoint.row = i;
                    playerPoint.col = j;
                }
            }
        }
        return playerPoint;
    }

    //
    render(map[l], correct[l]);

    function isWin(map, correct) {
        //判断是否所有正确位置上都有箱子
        for (let i = 0; i < correct.length; i++) {
            let cr = correct[i];
            if (map[cr.row][cr.col] !== 3) {
                //这个正确位置上没有箱子
                return false;
            }
        }
        return true;
    }

    //页面渲染完成后，给键盘绑定事件
    window.onkeydown = function (e) {
        if (e.key === 'ArrowUp') {
            //玩家向上移动
            move(map[l], correct[l], 'up');
        } else if (e.key === "ArrowDown") {
            //玩家向下移动
            move(map[l], correct[l], 'down');
        } else if (e.key === "ArrowLeft") {
            //玩家向左移动
            move(map[l], correct[l], 'left');
        } else if (e.key === "ArrowRight") {
            //玩家向右移动
            move(map[l], correct[l], 'right');
        }
        if (isWin(map[l], correct[l])) {
            //setTimeout设置定时器，在两秒后自动跳关。
            setTimeout(function () {
                l = l + 1;
                if(l>=map.length){
                    window.onkeydown = null;
                    alert("恭喜玩家通过所有关卡!");
                }else{
                    //alert("恭喜进入下一关!");
                    render(map[l],correct[l]);
                    info.innerHTML = '本游戏总共有'+map.length+'关，'+'&#160 &#160'+'当前是第'+(l+1)+'关';
                    window.onkeydown;
                }
            },2000)
        }
    };
    let info = document.getElementById("info");
    info.style.width = gameDom.style.width;
    info.innerHTML = '本游戏总共有'+map.length+'关，'+'&#160 &#160'+'当前是第'+(l+1)+'关';    //(l+1)表示变量和1求和然后拼串
};