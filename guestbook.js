import {
    containsBadWord,
    isReservedName
} from "./badwords.js";

import {
    containsSpam
} from "./spamwords.js";

let isAdmin = false;
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-app.js";

import {
  getFirestore,
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  serverTimestamp,
  doc,
  updateDoc,
  increment,
  deleteDoc
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyD-NJP9b94vdLuvnfKKdb_0DwsGuNLh2vY",
  authDomain: "malaysia-mission.firebaseapp.com",
  projectId: "malaysia-mission",
  storageBucket: "malaysia-mission.firebasestorage.app",
  messagingSenderId: "852486939709",
  appId: "1:852486939709:web:32bf862a13d91351d7b654",
  measurementId: "G-0TVJPSLTLH"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const ADMIN_PASSWORD = "malaysia2026";

const nameInput = document.getElementById("name");
const messageInput = document.getElementById("message");
const submitBtn = document.getElementById("submitBtn");
const list = document.getElementById("guestbook-list");
const toast = document.getElementById("toast");

let footerClickCount = 0;

if(sessionStorage.getItem("admin")==="true"){

    isAdmin=true;

}

submitBtn.addEventListener("click", async () => {

    const name = nameInput.value.trim();
    const message = messageInput.value.trim();

    // ===========================
    // 1. 공백 검사
    // ===========================

    if (!name || !message) {
        alert("이름과 응원메시지를 입력해주세요.");
        return;
    }

    // ===========================
    // 2. 글자 수 제한
    // ===========================

    if (name.length > 20) {
        alert("이름은 최대 20자까지 입력 가능합니다.");
        return;
    }

    if (message.length > 300) {
        alert("응원메시지는 최대 300자까지 입력 가능합니다.");
        return;
    }

    

    if (isReservedName(name)) {

    alert("사용할 수 없는 이름입니다.");

    return;

}

if (containsBadWord(name + " " + message)) {

    alert("욕설 및 비속어는 사용할 수 없습니다.");

    return;

}

if (containsSpam(name + " " + message)) {

    alert("광고 및 링크는 입력할 수 없습니다.");

    return;

}

    // ===========================
    // 4. URL 차단
    // ===========================

    const urlPattern =
    /(http:\/\/|https:\/\/|www\.|bit\.ly|tinyurl|discord\.gg|t\.me|telegram|instagram|facebook|youtube|open\.kakao)/i;

    if (urlPattern.test(message)) {

        alert("링크(URL)는 입력할 수 없습니다.");

        return;

    }

    // ===========================
    // 5. 이메일 차단
    // ===========================

    const emailPattern =
    /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i;

    if (emailPattern.test(message)) {

        alert("이메일 주소는 입력할 수 없습니다.");

        return;

    }

    // ===========================
    // 6. 전화번호 차단
    // ===========================

    const phonePattern =
    /01[016789]-?\d{3,4}-?\d{4}/;

    if (phonePattern.test(message)) {

        alert("전화번호는 입력할 수 없습니다.");

        return;

    }

    // ===========================
    // 7. 반복 문자 차단
    // ===========================

    const repeatPattern = /(.)\1{7,}/;

    if (repeatPattern.test(message)) {

        alert("같은 문자를 반복해서 사용할 수 없습니다.");

        return;

    }

    // ===========================
    // 8. 도배 방지
    // ===========================

    const lastPost = Number(localStorage.getItem("lastPostTime") || 0);

    const now = Date.now();

    if (now - lastPost < 10000) {

        alert("10초 후 다시 등록해주세요.");

        return;

    }

    localStorage.setItem("lastPostTime", now);

const lastMessage = localStorage.getItem("lastMessage");

if (lastMessage === message) {

    alert("같은 내용은 연속해서 등록할 수 없습니다.");

    return;

}

localStorage.setItem("lastMessage", message);

    try {

        await addDoc(collection(db, "guestbook"), {
            name,
            message,
            likes: 0,
            createdAt: serverTimestamp()
        });

        nameInput.value = "";
        messageInput.value = "";

toast.classList.add("show");

setTimeout(() => {
    toast.classList.remove("show");
}, 2500);

    } catch (e) {

        console.error(e);
        alert("등록 실패");

    }

});

const q = query(
    collection(db, "guestbook"),
    orderBy("createdAt", "desc")
);

onSnapshot(q, (snapshot) => {

    list.innerHTML = "";

    if (snapshot.empty) {
        list.innerHTML =
            "<p style='text-align:center;color:gray;'>아직 등록된 메시지가 없습니다.</p>";
        return;
    }

    snapshot.forEach((item) => {

        const data = item.data();

        const card = document.createElement("div");
        card.className = "guest-card";

        let date = "";

        if (data.createdAt) {
            date = getRelativeTime(data.createdAt.toDate());
        }

        card.innerHTML = `
            <h3>😊 ${data.name}</h3>

            <p>${data.message}</p>

            <small>${date}</small>

            <div class="guest-actions">

                <button class="likeBtn">
                    ❤️ ${data.likes || 0}
                </button>

                ${isAdmin ? `
<button class="deleteBtn">
🗑 삭제
</button>
` : ""}

            </div>
        `;

        const likeBtn = card.querySelector(".likeBtn");

const likeKey = "liked_" + item.id;

if (localStorage.getItem(likeKey)) {

    likeBtn.disabled = true;
    likeBtn.style.opacity = "0.6";
    likeBtn.style.cursor = "not-allowed";
likeBtn.innerHTML = "❤️ 좋아요 완료";

}

        likeBtn.onclick = async () => {

    if (localStorage.getItem(likeKey)) {

        alert("이미 좋아요를 누르셨습니다.");
        return;

    }

    await updateDoc(
        doc(db, "guestbook", item.id),
        {
            likes: increment(1)
        }
    );

    localStorage.setItem(likeKey, "true");

    likeBtn.disabled = true;
    likeBtn.style.opacity = "0.6";
    likeBtn.style.cursor = "not-allowed";
likeBtn.innerHTML = "❤️ 좋아요 완료";

};

        const deleteBtn = card.querySelector(".deleteBtn");

if(deleteBtn){

    deleteBtn.onclick = async () => {

        if(!confirm("정말 삭제하시겠습니까?")) return;

        await deleteDoc(
            doc(db,"guestbook",item.id)
        );

        alert("삭제되었습니다.");

    };

}

        list.appendChild(card);

    });

});

const footer = document.getElementById("footerAdmin");

footer.addEventListener("click",()=>{

    footerClickCount++;

    if(footerClickCount===5){

        footerClickCount=0;

        const pw=prompt("관리자 비밀번호를 입력하세요.");

        if(pw===ADMIN_PASSWORD){

            sessionStorage.setItem("admin","true");

            alert("관리자 모드가 활성화되었습니다.");

            location.reload();

        }else{

            alert("비밀번호가 틀렸습니다.");

        }

    }

});

function getRelativeTime(date) {

    const now = new Date();

    const diff = Math.floor((now - date) / 1000);

    if (diff < 60) return "방금 전";

    if (diff < 3600)
        return `${Math.floor(diff / 60)}분 전`;

    if (diff < 86400)
        return `${Math.floor(diff / 3600)}시간 전`;

    if (diff < 172800)
        return "어제";

    if (diff < 604800)
        return `${Math.floor(diff / 86400)}일 전`;

    return date.toLocaleDateString("ko-KR");

}

const charCount = document.getElementById("charCount");

messageInput.addEventListener("input", () => {

    charCount.textContent =
        `${messageInput.value.length} / 300`;

});

submitBtn.disabled = true;
submitBtn.textContent = "등록중...";

submitBtn.disabled = false;
submitBtn.textContent = "등록";

nameInput.focus();