/*
==========================================
Malaysia Mission v3.0
Bad Words Dictionary
==========================================
*/

export const BAD_WORDS = {

    // ==================================
    // 한국어 욕설
    // ==================================

    korean: [

        "시발","씨발","시1발","씨1발","씨8","ㅅㅂ","ㅆㅂ",

        "병신","븅신","빙신","비융신","ㅂㅅ",

        "개새끼","개새","새끼","개자식","개놈","개년",

        "미친","미친놈","미친년","미친새끼",

        "좆","좇","좃","좆같","좆까","좆나",

        "존나","졸라",

        "지랄","염병","꺼져","닥쳐","죽어","뒤져","디져",

        "호구","등신","또라이","멍청이","바보새끼",

        "씹새끼","씹년","씹놈",

        "썅","썅년","썅놈",

        "걸레","걸레년",

        "창녀","창놈",

        "보지","자지",

"개소리",
"개소리하네",
"개소리좀",
"개소리하지마",
"개지랄",
"개판",
"개망",
"개노답",
"개빡",
"개빡침",
"개같다",
"개같네",
"개같은",
"개같이",
"개같아서",
"노답",
"씹노답",
"극혐",
"혐오",
"극혐이다",
"역겹",
"역겨워",
"역겹다",
"토나온다",
"토나와",
"구역질",
"한심",
"한심하다",
"한심하네",
"찌질",
"찌질이",
"재수없",
"재수없다",
"재수없네",
"꼴보기싫",
"꼴도보기싫",
"꺼져",
"꺼져라",
"꺼져버려",
"닥쳐",
"닥쳐라",
"입닥쳐",
"입다물어",
"죽어",
"죽어라",
"뒤져",
"디져",
"뒤져라",
"죽을래",
"망해라",
"망해",
"엿먹어",
"엿이나먹어",
"썩어",
"썩어라",
"돌아이",
"또라이",
"미치광이",
"정신병자",
"정신나갔",
"멍청",
"멍청이",
"멍청한",
"등신",
"호구",
"호구새끼",
"바보",
"바보같",
"바보냐",
"병맛",
"관종",
"찐따",
"찐따새끼",
"루저",
"패배자",
"인간쓰레기",
"쓰레기",
"폐급",
"벌레",
"벌레같",
"벌레새끼"

    ],

    // ==================================
    // 초성
    // ==================================

    initials: [

        "ㅅㅂ",

        "ㅂㅅ",

        "ㅈㄴ",

        "ㄲㅈ",

        "ㅈㄹ",

"ㄱㅅㄹ",
"ㄱㅈㄹ",
"ㄲㅈ",
"ㄷㅊ",
"ㅁㅊ",
"ㅁㅊㄴ",
"ㅁㅊㄴㅇ",
"ㅈㄹ",
"ㅈㄴ",
"ㄴㄷ",
"ㅎㄱ",
"ㄸㄹㅇ",
"ㅉㅉ",
"ㅉㄷ",
"ㅂㅂ",
"ㅂㅅㅇ",
"ㅆㄴ",
"ㅆㄲ",
"ㅅㄲ",
"ㄱㅅㄲ",
"ㅈㅅㄲ"

    ],

    // ==================================
    // 영어
    // ==================================

    english: [

        "fuck",

        "fucking",

        "fucker",

        "motherfucker",

        "mf",

        "shit",

        "bullshit",

        "bitch",

        "bitches",

        "ass",

        "asshole",

        "bastard",

        "cunt",

        "dick",

        "cock",

        "pussy",

        "slut",

        "whore",

        "damn",

        "wtf",

        "stfu",

        "idiot",

        "loser",

"motherfucking",
"motherfuker",
"fuk",
"fck",
"fk",
"fu",
"fuking",
"fukin",
"fuc",
"fukoff",
"fuckoff",
"fuckyou",
"fucc",
"fucker",
"fvck",
"phuck",

"sh1t",
"shithead",
"shitface",
"shitbag",
"shitass",

"b1tch",
"b!tch",
"biatch",
"beatch",

"asshat",
"asswipe",
"jackass",
"dumbass",
"smartass",

"retard",
"retarded",

"moron",
"stupid",
"jerk",
"scumbag",
"trash",

"pieceofshit",
"sonofabitch",
"motherfucker",

"faggot",
"nigga",
"nigger"

    ],

    // ==================================
    // 관리자 예약어
    // ==================================

    reservedNames:[

        "관리자",

        "운영자",

        "admin",

        "administrator",

        "master",

        "gm",

        "root",

"admin1",
"system",
"manager",
"webmaster",
"operator",
"mod",
"moderator",
"official",
"support",
"helpdesk",
"wrc",
"missionadmin"

    ]

};

/*
==========================================
Normalize
==========================================
*/

export function normalizeText(text){

    return text

        .toLowerCase()

        // 공백 제거
        .replace(/\s+/g,"")

        // 특수문자 제거
        .replace(/[^가-힣a-z0-9]/g,"")

        // 반복 문자 축소
        .replace(/(.)\1{1,}/g,"$1")

.replace(/[０]/g,"0")
.replace(/[１]/g,"1")
.replace(/[２]/g,"2")
.replace(/[３]/g,"3")
.replace(/[４]/g,"4")
.replace(/[５]/g,"5")
.replace(/[６]/g,"6")
.replace(/[７]/g,"7")
.replace(/[８]/g,"8")
.replace(/[９]/g,"9")

.replace(/0/g,"o")
.replace(/1/g,"i")
.replace(/3/g,"e")
.replace(/4/g,"a")
.replace(/5/g,"s")
.replace(/7/g,"t")
.replace(/8/g,"b")
.replace(/\$/g,"s")
.replace(/@/g,"a")
.replace(/!/g,"i")

        .trim();

}

/*
==========================================
Bad Word Checker
==========================================
*/

export function containsBadWord(text){

console.log("NEW BADWORDS.JS LOADED");

    const value = normalizeText(text);

    const words = [

        ...BAD_WORDS.korean,

        ...BAD_WORDS.initials,

        ...BAD_WORDS.english

    ];

    return words.some(word => {

    const normalized = normalizeText(word);

    if (!normalized) return false;

    return value.includes(normalized);

});

}

export function isReservedName(name){

    const value = normalizeText(name);

    return BAD_WORDS.reservedNames.some(

        word=>value===normalizeText(word)

    );

}
