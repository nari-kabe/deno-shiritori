import { serve } from "https://deno.land/std@0.138.0/http/server.ts";
import { serveDir } from "https://deno.land/std@0.138.0/http/file_server.ts";



const num = Math.floor(Math.random() * 174);
const firstWord = ["あさがお", "あじさい", "あつもりそう", "あねもねあぶらな", "あまりりす", "あやめ",
    "あるすとろめりあ", "いちご", "いぶきとらのお", "うめ", "えぞえんごさく", "えぞやまざくら",
    "えぞるりむらさき", "おおいぬのふぐり", "おおがはす", "おおばこ", "おおばなのえんれいそう",
    "おおはんごんそう", "おとぎりそう", "おとめゆり", "おんしじうむ", "かき", "かきつばた",
    "かさぶらんか", "かたくり", "かたばみ", "かとれあ", "かのこゆり", "かぼちゃ", "からすのえんどう",
    "がーべら", "ききょう", "きく", "きたこぶし", "きゅうり", "きょうちくとう", "きり", "きんしばい",
    "きんせんか", "きんもくせい", "くず", "くまがいそう", "ぐらじおらす", "くり", "くれまちす",
    "くろっかす", "くろゆり", "けいとう", "げっかこう", "こうりんたんぽぽ", "こけもも", "こすもす",
    "こぶし", "こまくさ", "さくら", "さくらそう", "さざんか", "さつき", "さるすべり", "さるびあ",
    "ざぜんそう", "しゃくなげ", "しゃくやく", "しゅうめいぎく", "しらゆり", "しろつめくさ",
    "じんちょうげ", "しんびじうむ", "すだち", "すのーふれーく", "すみれ", "せいようたんぽぽ",
    "ぜらにうむ", "そめいよしの", "だりあ", "たんぽぽ", "ちごゆり", "ちしまざくら", "ちゅーりっぷ",
    "つつじ", "つばき", "つゆくさ", "でいじー", "とまと", "とりかぶと", "なし", "なす", "なずな",
    "なでしこ", "にっこうきすげ", "にら", "にんにく", "ねぎ", "ねじばな", "ねむのき", "しゃくなげ",
    "のあざみ", "のばら", "はいびすかす", "ばうひにあ", "はぎ", "はこべ", "はす", "はなしょうぶ",
    "はなずおう", "はなにら", "はなみずき", "はまぎく", "はまなす", "ばら", "ぱんじー", "ひがんばな",
    "ひなげし", "ひまわり", "ひめあやめ", "ひめおどりこそう", "ひやしんす", "ひるがお",
    "ふうせんかずら", "ぶーげんびりあ", "ふき", "ふくじゅそう", "ふじ", "ぶっそうげ", "ふよう",
    "ふりーじあ", "ぶるぐまんしあ", "べごにあ", "べにばな", "へれぼらす", "ぽいんせちあ", "ほうせんか",
    "ほおずき", "ぼけ", "ほていあおい", "ほとけのざ", "ほととぎす", "ぽぴー", "ぼろにあ",
    "まりーごーるど", "まんじゅしゃげ", "まーがれっと", "みずばしょう", "みやぎのはぎ",
    "みやまきりしま", "むくげ", "むらさきさぎごけ", "むらさきつゆくさ", "もうせんごけ", "もも",
    "やえざくら", "やぐるまぎく", "やしおつつじ", "やなぎたんぽぽ", "やまぶき", "やまゆり",
    "ゆうがお", "ゆきのした", "ゆきやなぎ", "ゆり", "よるがお", "らいらっく", "らべんだー",
    "りら", "りんご", "りんどう", "るどべきあ", "るぴなす", "るりむすかり", "れぶんうすゆきそう",
    "れんげそう", "れんげつつじ", "われもこう"];

let previousWord = firstWord[num];
let useWord = [firstWord[num]]
let count = 1;
let str;

console.log("Listening on http://localhost:8000");
serve(async (req) => {
    const pathname = new URL(req.url).pathname;
    if (req.method === "GET" && pathname === "/shiritori") {
        return new Response(previousWord);

    }
    if (req.method === "POST" && pathname === "/shiritori") {
        const requestJson = await req.json();
        const nextWord = requestJson.nextWord;
        const textWord = /^[ぁ-んー]+$/;
        const smallWord = /^[ぁぃぅぇぉゃゅょ]/;
        const wordList = "使用単語";
        const reset = "reset";
        count += 1;

        if (nextWord.length > 0 && nextWord !== reset) {
            if (previousWord.charAt(previousWord.length - 1) == "ー") {
                if (
                    smallWord.test(previousWord.charAt(previousWord.length - 2)) == false &&
                    previousWord.charAt(previousWord.length - 2) !== nextWord.charAt(0)
                ) {
                    count -= 1;
                    return new Response("'" + previousWord.charAt(previousWord.length - 2) +
                        "'" + " から始まる単語を入力してください。", { status: 400 });

                } else if (smallWord.test(previousWord.charAt(previousWord.length - 2)) == true) {
                    switch (previousWord.charAt(previousWord.length - 2)) {
                        case "ぁ":
                            str = "あ";
                            break;
                        case "ぃ":
                            str = "い";
                            break;
                        case "ぅ":
                            str = "う";
                            break;
                        case "ぇ":
                            str = "え";
                            break;
                        case "ぉ":
                            str = "お";
                            break;
                        case "ゃ":
                            str = "や";
                            break;
                        case "ゅ":
                            str = "ゆ";
                            break;
                        case "ょ":
                            str = "よ";
                            break;
                    }

                    if (nextWord.charAt(0) !== str) {
                        count -= 1;
                        return new Response(str + " から始まる単語を入力してください。", { status: 400 });
                    }

                }

            } else if (smallWord.test(previousWord.charAt(previousWord.length - 1)) == true) {
                switch (previousWord.charAt(previousWord.length - 1)) {
                    case "ぁ":
                        str = "あ";
                        break;
                    case "ぃ":
                        str = "い";
                        break;
                    case "ぅ":
                        str = "う";
                        break;
                    case "ぇ":
                        str = "え";
                        break;
                    case "ぉ":
                        str = "お";
                        break;
                    case "ゃ":
                        str = "や";
                        break;
                    case "ゅ":
                        str = "ゆ";
                        break;
                    case "ょ":
                        str = "よ";
                        break;
                }

                if (nextWord.charAt(0) !== str) {
                    count -= 1;
                    return new Response(str + " から始まる単語を入力してください。", { status: 400 });
                }

            } else if (nextWord !== wordList && textWord.test(nextWord) == false) {
                count -= 1;
                return new Response("ひらがなで入力してください。", { status: 400 });

            } else if (smallWord.test(previousWord.charAt(previousWord.length - 1)) == false &&
                wordList !== nextWord &&
                previousWord.charAt(previousWord.length - 1) !== "ー" &&
                previousWord.charAt(previousWord.length - 1) !== nextWord.charAt(0)
            ) {
                count -= 1;
                return new Response("前の単語に続いていません。", { status: 400 });

            } else if (nextWord.charAt(nextWord.length - 1) == "ん") {
                count -= 1;
                previousWord = "GAME OVER";
                return new Response("GAME OVER" + "\n" + "'ん' で終わる言葉です。", { status: 500 });

            } else if (nextWord === wordList) {
                count -= 1;
                return new Response(("使用単語数：" + count + "\n" + useWord), { status: 400 });

            } else if (useWord.includes(nextWord) == true) {
                count -= 1;
                return new Response("既に使用された単語です。", { status: 400 });

            }

        } else if (nextWord.length == 0) {
            count -= 1;
            return new Response("文字を入力してください。", { status: 400 });

        }

        if (nextWord === reset) {
            count = 1;
            previousWord = useWord[0];
            console.log(previousWord);
            useWord = [firstWord[num]];
            return new Response("リセットします", { status: 300 });
        }

        useWord.push(nextWord);
        previousWord = nextWord;
        return new Response(nextWord);
    }

    return serveDir(req, {
        fsRoot: "public",
        urlRoot: "",
        showDirListing: true,
        enableCors: true,
    });
});