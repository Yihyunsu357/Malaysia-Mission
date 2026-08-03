/*
==========================================
Malaysia Mission v3.0
Spam Dictionary
==========================================
*/

export const SPAM_WORDS = {

    // ==========================
    // URL
    // ==========================

    url:[

        "http",

        "https",

        "www",

        ".com",

        ".net",

        ".org",

        ".kr",

        ".co",

        ".io",

        ".xyz",

        "bit.ly",

        "tinyurl",

        "cutt.ly",

        "goo.gl"

    ],

    // ==========================
    // SNS
    // ==========================

    social:[

        "facebook",

        "instagram",

        "youtube",

        "tiktok",

        "x.com",

        "twitter",

        "threads",

        "telegram",

        "discord",

        "line",

        "wechat",

        "kakao",

        "open.kakao"

    ],

    // ==========================
    // 광고
    // ==========================

    advertising:[

        "광고",

        "홍보",

        "클릭",

        "무료",

        "이벤트",

        "쿠폰",

        "할인",

        "특가",

        "공짜",

        "당첨",

        "경품"

    ],

    // ==========================
    // 도박
    // ==========================

    gambling:[

        "카지노",

        "바카라",

        "슬롯",

        "파워볼",

        "토토",

        "먹튀",

        "도박",

        "casino",

        "bet",

        "gambling",

        "slot"

    ],

    // ==========================
    // 성인
    // ==========================

    adult:[

        "porn",

        "adult",

        "sex",

        "xxx",

        "야동",

        "성인",

        "19금"

    ]

};

/*
==========================================
Spam Checker
==========================================
*/

export function containsSpam(text){

    const value=text.toLowerCase();

    const words=[

        ...SPAM_WORDS.url,

        ...SPAM_WORDS.social,

        ...SPAM_WORDS.advertising,

        ...SPAM_WORDS.gambling,

        ...SPAM_WORDS.adult

    ];

    return words.some(

        word=>value.includes(word.toLowerCase())

    );

}