// Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";

// Firebase 설정
const firebaseConfig = {
  apiKey: "AIzaSyD-NJP9b94vdLuvnfKKdb_0DwsGuNLh2vY",
  authDomain: "malaysia-mission.firebaseapp.com",
  projectId: "malaysia-mission",
  storageBucket: "malaysia-mission.firebasestorage.app",
  messagingSenderId: "852486939709",
  appId: "1:852486939709:web:32bf862a13d91351d7b654",
  measurementId: "G-0TVJPSLTLH"
};

// Firebase 초기화
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// HTML 요소
const nameInput = document.getElementById("name");
const messageInput = document.getElementById("message");
const submitBtn = document.getElementById("submitBtn");
const list = document.getElementById("guestbook-list");

// 글 등록
submitBtn.addEventListener("click", async () => {

  const name = nameInput.value.trim();
  const message = messageInput.value.trim();

  if (!name || !message) {
    alert("이름과 응원메시지를 입력해주세요.");
    return;
  }

  try {

    await addDoc(collection(db, "guestbook"), {
      name,
      message,
      createdAt: serverTimestamp()
    });

    nameInput.value = "";
    messageInput.value = "";

  } catch (e) {

    console.error(e);
    alert("등록에 실패했습니다.");

  }

});

// 목록 불러오기
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

  snapshot.forEach((doc) => {

    const data = doc.data();

    const card = document.createElement("div");
    card.className = "guest-card";

    let date = "";

    if (data.createdAt) {

      date = data.createdAt
        .toDate()
        .toLocaleString("ko-KR");

    }

    card.innerHTML = `
      <h3>😊 ${data.name}</h3>
      <p>${data.message}</p>
      <small>${date}</small>
    `;

    list.appendChild(card);

  });

});