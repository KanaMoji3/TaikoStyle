//画面をクリックした時の書き方 document.onclick = function(){alert("Good Morning")}



document.addEventListener("DOMContentLoaded", function () {
    // 要素IDがtjaIDの要素をtjaFileに代入
    const tjaFile = document.getElementById("tjaID");
    // tjaFileを読み込んだ時
    tjaFile.addEventListener("change", () => {
        // FileReaderをfRに代入
        const fR = new FileReader();
        // tjaFileの1番目をshift-jisで読み込み
        fR.readAsText(tjaFile.files[0], "shift-jis");
        // ファイルがロードされた時
        fR.onload = function () {
            // console.log(fR.result);
            // 難易度：鬼の位置
            const oni = fR.result.indexOf("COURSE:oni");
            // console.log(fR.result.indexOf("COURSE:oni"));

            // BPMの位置
            const oniBPMindex = fR.result.indexOf("BPM:");
            // console.log(fR.result.indexOf("BPM:"));
            // BPMの値
            const oniBPM = fR.result.substr(oniBPMindex + 4, 3)
            // console.log(fR.result.substr(oniBPMindex + 4, 3));

            // #STARTの位置
            const oniSTART = (fR.result.indexOf("#START", oni));
            // console.log(fR.result.indexOf("#START", oni));

            // #ENDの位置
            const oniEND = (fR.result.indexOf("#END", oni));
            // console.log(fR.result.indexOf("#END", oni));

            // oniの譜面をoniSheetに代入 （+6している理由はCOURSEの6文字分を除外するため）
            const oniSheet = fR.result.substr(oniSTART + 6, oniEND - oniSTART);
            // console.log(fR.result.substr(oniSTART + 6, oniEND - oniSTART));

            // \nを削除する（理由は\r \nという順番で書かれているため重複しているから）
            const oniSheetN = oniSheet.replace(/\n/g, "");

            // \rをrに置き換える（理由は\rだと配列内に空白で表示されてしまうため）
            const oniSheetR = oniSheetN.replace(/\r/g, "r");

            // 配列に格納する
            const oniSheetArray = [...oniSheetR];
            // console.log(oniSheetArray);
            // for (let i = 0; i < oniSheetArray.length; i++) {
            //     console.log(oniSheetArray[i]);
            // }

            // ノーツの要素を格納
            const notes = document.getElementById("Notes");
            // 配列の番号
            var oniSheetArrayNum = 0;
            // bpm計算
            let bpm = oniBPM;
            // 4分音符
            let bpm4 = Math.round(60000 / bpm)
            // 2分音符
            let bpm2 = Math.round(bpm4 * 2)
            // 8分音符
            let bpm8 = Math.round(bpm4 / 2)
            // 付点8分音符
            let bpm8f = Math.round(bpm8 + (bpm4 - bpm8) / 2)
            // 16分音符
            let bpm16 = Math.round(bpm4 / 4)

            // console.log(bpm, bpm2, bpm4, bpm8, bpm8f, bpm16);



            let noteX = 0; // X座標  
            // 譜面を表示する
            setInterval(() => {
                // console.log("動いているか"); 
                if (oniSheetArray[oniSheetArrayNum] == "r") {

                }

                else if (oniSheetArray[oniSheetArrayNum] == ",") {

                }

                if (oniSheetArray[oniSheetArrayNum] == 0) {

                }



                // ドン（小音符）
                else if (oniSheetArray[oniSheetArrayNum] == 1) {
                    const imageDonSmall = document.createElement("img");
                    imageDonSmall.src = "./images/NotesDonSmall_Resize.png";
                    imageDonSmall.className = "notes";
                    imageDonSmall.id = "notesNumDonSmall";
                    // imageDonSmall.id = "notesNum" + [oniSheetArrayNum];
                    notes.appendChild(imageDonSmall);

                    const animation = imageDonSmall.animate(
                        // 状態
                        [
                            // 開始時の状態
                            { transform: 'translateX(100%)' },
                            // 終了時の状態
                            { transform: 'translateX(-30%)' }
                        ],
                        // タイミング
                        {
                            // 再生後の位置で停止
                            fill: 'forwards',
                            // 再生時間 (ミリ秒)
                            duration: 5000,
                        },
                    );

                    // 通り過ぎたノーツを削除する
                    animation.onfinish = function () {
                        const screenWidth = window.innerWidth;
                        const noteWidth = imageDonSmall.offsetWidth;
                        const notePosition = imageDonSmall.getBoundingClientRect().right;
                        const noteEndPosition = notePosition + noteWidth;

                        const maxPosition = (screenWidth * 17.7) / 100; // vwをpxに変換

                        if (noteEndPosition > maxPosition) {
                            imageDonSmall.remove();
                        }
                    };
                }



                // ドン（大音符）
                else if (oniSheetArray[oniSheetArrayNum] == 3) {
                    const imageDonBig = document.createElement("img");
                    imageDonBig.src = "./images/NotesDonBig_Resize.png";
                    imageDonBig.className = "notes";
                    imageDonBig.id = "notesNumDonBig";
                    // imageDonBig.id = "notesNum" + [oniSheetArrayNum];
                    notes.appendChild(imageDonBig);

                    const animation = imageDonBig.animate(
                        // 状態
                        [
                            // 開始時の状態
                            { transform: 'translateX(100%)' },
                            // 終了時の状態
                            { transform: 'translateX(-30%)' }
                        ],
                        // タイミング
                        {
                            // 再生後の位置で停止
                            fill: 'forwards',
                            // 再生時間 (ミリ秒)
                            duration: 5000,
                        },
                    );

                    // 通り過ぎたノーツを削除する
                    animation.onfinish = function () {
                        const screenWidth = window.innerWidth;
                        const noteWidth = imageDonBig.offsetWidth;
                        const notePosition = imageDonBig.getBoundingClientRect().right;
                        const noteEndPosition = notePosition + noteWidth;

                        const maxPosition = (screenWidth * 17.7) / 100; // vwをpxに変換

                        if (noteEndPosition > maxPosition) {
                            imageDonBig.remove();
                        }
                    };
                }



                // カ（小音符）
                else if (oniSheetArray[oniSheetArrayNum] == 2) {
                    const imageKaSmall = document.createElement("img");
                    imageKaSmall.src = "./images/NotesKaSmall_Resize.png";
                    imageKaSmall.className = "notes";
                    imageKaSmall.id = "notesNumKaSmall";
                    // imageKaSmall.id = "notesNum" + [oniSheetArrayNum];
                    notes.appendChild(imageKaSmall);

                    const animation = imageKaSmall.animate(
                        // 状態
                        [
                            // 開始時の状態
                            { transform: 'translateX(100%)' },
                            // 終了時の状態
                            { transform: 'translateX(-30%)' }
                        ],
                        // タイミング
                        {
                            // 再生後の位置で停止
                            fill: 'forwards',
                            // 再生時間 (ミリ秒)
                            duration: 5000,
                        },
                    );

                    // 通り過ぎたノーツを削除する
                    animation.onfinish = function () {
                        const screenWidth = window.innerWidth;
                        const noteWidth = imageKaSmall.offsetWidth;
                        const notePosition = imageKaSmall.getBoundingClientRect().right;
                        const noteEndPosition = notePosition + noteWidth;

                        const maxPosition = (screenWidth * 17.7) / 100; // vwをpxに変換

                        if (noteEndPosition > maxPosition) {
                            imageKaSmall.remove();
                        }
                    };
                }



                // カ（大音符）
                else if (oniSheetArray[oniSheetArrayNum] == 3) {
                    const imageKaBig = document.createElement("img");
                    imageKaBig.src = "./images/NotesKaBig_Resize.png";
                    imageKaBig.className = "notes";
                    imageKaBig.id = "notesNumKaBig";
                    // imageKaBig.id = "notesNum" + [oniSheetArrayNum];
                    notes.appendChild(imageKaBig);

                    const animation = imageKaBig.animate(
                        // 状態
                        [
                            // 開始時の状態
                            { transform: 'translateX(100%)' },
                            // 終了時の状態
                            { transform: 'translateX(-30%)' }
                        ],
                        // タイミング
                        {
                            // 再生後の位置で停止
                            fill: 'forwards',
                            // 再生時間 (ミリ秒)
                            duration: 5000,
                        },
                    );

                    // 通り過ぎたノーツを削除する
                    animation.onfinish = function () {
                        const screenWidth = window.innerWidth;
                        const noteWidth = imageKaBig.offsetWidth;
                        const notePosition = imageKaBig.getBoundingClientRect().right;
                        const noteEndPosition = notePosition + noteWidth;

                        const maxPosition = (screenWidth * 17.7) / 100; // vwをpxに変換

                        if (noteEndPosition > maxPosition) {
                            imageKaBig.remove();
                        }
                    };
                }

                // 譜面の中身
                // console.log(oniSheetArrayNum + ": " + oniSheetArray[oniSheetArrayNum]);
                // 配列の添え字インクリメント
                oniSheetArrayNum++;
            }, bpm8);



            // ヒットボックスを通り過ぎたとき
            setInterval(() => {
                // vwのpx換算
                const screenWidth = window.innerWidth;
                // Notes親要素
                const notesList = document.getElementById("Notes");
                // Notes親要素の中に子要素が存在するか（存在した場合true、存在しない場合false）
                //  console.log(notesList.hasChildNodes);
                // Notes親要素の子要素の一番最初を取得
                // console.log(list.firstElementChild);



                // ドン（小音符）がヒットボックスを通り過ぎたときIDを変更する
                const imageDonSmallById = document.getElementById("notesNumDonSmall");
                // 親要素NotesList内に子要素が存在した場合true
                if (notesList !== null && imageDonSmallById !== null && notesList.contains(imageDonSmallById)) {
                    //親要素と子要素が存在し、子要素が親要素の子である場合の処理
                    // rightから観測したノーツの位置
                    const notePositionDonSmall = imageDonSmallById.getBoundingClientRect().right;
                    // 右側最大
                    const maxRightPositionDonSmall = (screenWidth * 79) / 100; // vwをpxに変換

                    // imageDonSmallが指定位置に到達したらID変更
                    if (notePositionDonSmall <= maxRightPositionDonSmall) {

                        imageDonSmallById.id = "PassnotesNumDonSmall";
                    }
                } else {
                    // 親要素が存在しないか、子要素が存在しない、または子要素が親要素の子でない場合の処理
                }



                // // ドン（大音符）がヒットボックスを通り過ぎたときIDを変更する
                const imageDonBigById = document.getElementById("notesNumDonBig");
                // 親要素NotesList内に子要素が存在した場合true
                if (notesList !== null && imageDonBigById !== null && notesList.contains(imageDonBigById)) {
                    //親要素と子要素が存在し、子要素が親要素の子である場合の処理
                    // rightから観測したノーツの位置
                    const notePositionDonBig = imageDonBigById.getBoundingClientRect().right;
                    // 右側最大
                    const maxRightPositionDonBig = (screenWidth * 79) / 100; // vwをpxに変換

                    // imageDonSmallが指定位置に到達したらID変更
                    if (notePositionDonBig <= maxRightPositionDonBig) {

                        imageDonBigById.id = "PassnotesNumDonBig";
                    }
                } else {
                    // 親要素が存在しないか、子要素が存在しない、または子要素が親要素の子でない場合の処理
                }



                // // カ（小音符）がヒットボックスを通り過ぎたときIDを変更する
                const imageKaSmallById = document.getElementById("notesNumKaSmall");
                // 親要素NotesList内に子要素が存在した場合true
                if (notesList !== null && imageKaSmallById !== null && notesList.contains(imageKaSmallById)) {
                    //親要素と子要素が存在し、子要素が親要素の子である場合の処理
                    // rightから観測したノーツの位置
                    const notePositionKaSmall = imageKaSmallById.getBoundingClientRect().right;

                    // 右側最大
                    const maxRightPositionKaSmall = (screenWidth * 79) / 100; // vwをpxに変換

                    // imageDonSmallが指定位置に到達したらID変更
                    if (notePositionKaSmall <= maxRightPositionKaSmall) {

                        imageKaSmallById.id = "PassnotesNumKaSmall";
                    }
                } else {
                    // 親要素が存在しないか、子要素が存在しない、または子要素が親要素の子でない場合の処理
                }



                // // カ（大音符）がヒットボックスを通り過ぎたときIDを変更する
                const imageKaBigById = document.getElementById("notesNumKaBig");
                // 親要素NotesList内に子要素が存在した場合true
                if (notesList !== null && imageKaBigById !== null && notesList.contains(imageKaBigById)) {
                    //親要素と子要素が存在し、子要素が親要素の子である場合の処理
                    // rightから観測したノーツの位置
                    const notePositionKaBig = imageKaBigById.getBoundingClientRect().right;

                    // 右側最大
                    const maxRightPositionKaBig = (screenWidth * 79) / 100; // vwをpxに変換

                    // imageDonSmallが指定位置に到達したらID変更
                    if (notePositionKaBig <= maxRightPositionKaBig) {

                        imageKaBigById.id = "PassnotesNumKaBig";
                    }
                } else {
                    // 親要素が存在しないか、子要素が存在しない、または子要素が親要素の子でない場合の処理
                }
            }, 1)
        };
    });

    // キーが押されたらDrumDownを呼び出す
    document.addEventListener("keydown", DrumDown);
    // キーが離されたらDrumUpを呼び出す
    document.addEventListener("keyup", DrumUp);
}, false);


// keyを一回だけ反応させるため
let keyD = true;
let keyF = true;
let keyJ = true;
let keyK = true;
// キーが押された時
function DrumDown(e) {
    // Notes親要素
    const notesList = document.getElementById("Notes");




    // Dキー入力字は左のカ
    if (e.code === "KeyD") {
        if (keyD == true) {
            keyD = false;
            // 太鼓の色を変更
            document.getElementById("KaLeftID").src = "./images/Drum_Ka_Left.png";

            // 音をロード、または0秒から再生
            // document.getElementById("KaSound").load();
            document.getElementById("KaSound").currentTime = 0;
            // 太鼓の音を再生
            document.getElementById("KaSound").play();

            // imageKaSmallByIdの位置情報を取得
            const imageKaSmallById = document.getElementById("notesNumKaSmall");

            // 親要素NotesList内に子要素が存在した場合true
            if (notesList !== null && imageKaSmallById !== null && notesList.contains(imageKaSmallById)) {
                // rightから観測したノーツの位置
                const notePosition = imageKaSmallById.getBoundingClientRect().right;

                // vwのpx換算
                const screenWidth = window.innerWidth;
                // 左側最大
                const maxLeftPosition = (screenWidth * 80) / 100; // vwをpxに変換
                // 右側最大
                const maxRightPosition = (screenWidth * 85) / 100; // vwをpxに変換

                // imageKaSmallByIdが指定位置に到達したら削除
                if (notePosition >= maxLeftPosition && notePosition <= maxRightPosition) {
                    imageKaSmallById.remove();
                }

                // console.log(maxLeftPosition);
                // console.log(notePosition);
                // console.log(maxRightPosition);
            }

            // console.log("Dキー");
        }
    }



    // Fキー入力は左のドン
    if (e.code === "KeyF") {
        if (keyF == true) {
            keyF = false;
            // 太鼓の色を変更
            document.getElementById("DonLeftID").src = "./images/Drum_Don_Left.png";

            // 音をロード、または0秒から再生
            // document.getElementById("DonSound").load();
            document.getElementById("DonSound").currentTime = 0;
            // 太鼓の音を再生
            document.getElementById("DonSound").play();

            // imageDonSmallByIdの位置情報を取得
            const imageDonSmallById = document.getElementById("notesNumDonSmall");

            // 親要素NotesList内に子要素が存在した場合true
            if (notesList !== null && imageDonSmallById !== null && notesList.contains(imageDonSmallById)) {
                // rightから観測したノーツの位置
                const notePosition = imageDonSmallById.getBoundingClientRect().right;

                // vwのpx換算
                const screenWidth = window.innerWidth;
                // 左側最大
                const maxLeftPosition = (screenWidth * 80) / 100; // vwをpxに変換
                // 右側最大
                const maxRightPosition = (screenWidth * 85) / 100; // vwをpxに変換

                // imageDonSmallByIdが指定位置に到達したら削除
                if (notePosition >= maxLeftPosition && notePosition <= maxRightPosition) {
                    imageDonSmallById.remove();
                }

                // console.log(maxLeftPosition);
                // console.log(notePosition);
                // console.log(maxRightPosition);
            }

            // console.log("Fキー");
        }
    }



    // Jキー入力は右のドン
    if (e.code === "KeyJ") {
        if (keyJ == true) {
            keyJ = false;
            // 太鼓の色を変更
            document.getElementById("DonRightID").src = "./images/Drum_Don_Right.png";

            // 音をロード、または0秒から再生
            // document.getElementById("DonSound").load();
            document.getElementById("DonSound").currentTime = 0;
            // 太鼓の音を再生
            document.getElementById("DonSound").play();

            // imageDonSmallByIdの位置情報を取得
            const imageDonSmallById = document.getElementById("notesNumDonSmall");

            // 親要素NotesList内に子要素が存在した場合true
            if (notesList !== null && imageDonSmallById !== null && notesList.contains(imageDonSmallById)) {
                // rightから観測したノーツの位置
                const notePosition = imageDonSmallById.getBoundingClientRect().right;

                // vwのpx換算
                const screenWidth = window.innerWidth;
                // 左側最大
                const maxLeftPosition = (screenWidth * 80) / 100; // vwをpxに変換
                // 右側最大
                const maxRightPosition = (screenWidth * 85) / 100; // vwをpxに変換

                // imageDonSmallByIdが指定位置に到達したら削除
                if (notePosition >= maxLeftPosition && notePosition <= maxRightPosition) {
                    imageDonSmallById.remove();
                }

                // console.log(maxLeftPosition);
                // console.log(notePosition);
                // console.log(maxRightPosition);
            }
            // console.log("Jキー");
        }
    }



    // Kキー入力は右のカ
    if (e.code === "KeyK") {
        if (keyK == true) {
            keyK = false;
            // 太鼓の色を変更
            document.getElementById("KaRightID").src = "./images/Drum_Ka_Right.png";

            // 音をロード、または0秒から再生
            // document.getElementById("KaSound").load();
            document.getElementById("KaSound").currentTime = 0;
            // 太鼓の音を再生
            document.getElementById("KaSound").play();

            // imageKaSmallByIdの位置情報を取得
            const imageKaSmallById = document.getElementById("notesNumKaSmall");

            // 親要素NotesList内に子要素が存在した場合true
            if (notesList !== null && imageKaSmallById !== null && notesList.contains(imageKaSmallById)) {
                // rightから観測したノーツの位置
                const notePosition = imageKaSmallById.getBoundingClientRect().right;

                // vwのpx換算
                const screenWidth = window.innerWidth;
                // 左側最大
                const maxLeftPosition = (screenWidth * 80) / 100; // vwをpxに変換
                // 右側最大
                const maxRightPosition = (screenWidth * 85) / 100; // vwをpxに変換

                // imageKaSmallByIdが指定位置に到達したら削除
                if (notePosition >= maxLeftPosition && notePosition <= maxRightPosition) {
                    imageKaSmallById.remove();
                }

                // console.log(maxLeftPosition);
                // console.log(notePosition);
                // console.log(maxRightPosition);
            }

            // console.log("Kキー");
        }
    }


    // FキーとJキー入力同時はドン大音符
    if (keyF == false && keyJ == false) {
        // imageDonBigByIdの位置情報を取得
        const imageDonBigById = document.getElementById("notesNumDonBig");

        // 親要素NotesList内に子要素が存在した場合true
        if (notesList !== null && imageDonBigById !== null && notesList.contains(imageDonBigById)) {
            // rightから観測したノーツの位置
            const notePosition = imageDonBigById.getBoundingClientRect().right;

            // vwのpx換算
            const screenWidth = window.innerWidth;
            // 左側最大
            const maxLeftPosition = (screenWidth * 80) / 100; // vwをpxに変換
            // 右側最大
            const maxRightPosition = (screenWidth * 85) / 100; // vwをpxに変換

            // imageDonBigByIdが指定位置に到達したら削除
            if (notePosition >= maxLeftPosition && notePosition <= maxRightPosition) {
                imageDonBigById.remove();
            }

            // console.log(maxLeftPosition);
            // console.log(notePosition);
            // console.log(maxRightPosition);
        }

        // console.log("Fキー");
    }




    // DキーとKキー入力同時はカ大音符
    if (keyD == false && keyK == false) {
        // imageKaBigByIdの位置情報を取得
        const imageKaBigById = document.getElementById("notesNumKaBig");

        // 親要素NotesList内に子要素が存在した場合true
        if (notesList !== null && imageKaBigById !== null && notesList.contains(imageKaBigById)) {
            // rightから観測したノーツの位置
            const notePosition = imageKaBigById.getBoundingClientRect().right;

            // vwのpx換算
            const screenWidth = window.innerWidth;
            // 左側最大
            const maxLeftPosition = (screenWidth * 80) / 100; // vwをpxに変換
            // 右側最大
            const maxRightPosition = (screenWidth * 85) / 100; // vwをpxに変換

            // imageKaBigByIdが指定位置に到達したら削除
            if (notePosition >= maxLeftPosition && notePosition <= maxRightPosition) {
                imageKaBigById.remove();
            }

            // console.log(maxLeftPosition);
            // console.log(notePosition);
            // console.log(maxRightPosition);
        }

        // console.log("Fキー");
    }
}

// キーが離された時
function DrumUp(e) {
    // Dキー入力字は左のカ
    if (e.code === "KeyD") {
        keyD = true;
        document.getElementById("KaLeftID").src = "./images/ImageReplace.png";
        // console.log("Dキー");
    }



    // Fキー入力は左のドン
    if (e.code === "KeyF") {
        keyF = true;
        document.getElementById("DonLeftID").src = "./images/ImageReplace.png";
        // console.log("Fキー");
    }



    // Jキー入力は右のドン
    if (e.code === "KeyJ") {
        keyJ = true;
        document.getElementById("DonRightID").src = "./images/ImageReplace.png";
        // console.log("Jキー");
    }



    // Kキー入力は右のカ
    if (e.code === "KeyK") {
        keyK = true;
        document.getElementById("KaRightID").src = "./images/ImageReplace.png";
        // console.log("Kキー");
    }
}