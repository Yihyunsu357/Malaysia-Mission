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
            date = data.createdAt.toDate().toLocaleString("ko-KR");
        }

        card.innerHTML = `
            <h3>😊 ${data.name}</h3>

            <p>${data.message}</p>

            <small>${date}</small>

            <div class="guest-actions">

                <button class="likeBtn">
                    ❤️ ${data.likes || 0}
                </button>

                <button class="deleteBtn">
                    🗑 삭제
                </button>

            </div>
        `;

        const likeBtn = card.querySelector(".likeBtn");

        likeBtn.onclick = async () => {

            await updateDoc(
                doc(db, "guestbook", item.id),
                {
                    likes: increment(1)
                }
            );

        };

        const deleteBtn = card.querySelector(".deleteBtn");

        deleteBtn.onclick = async () => {

            const pw = prompt("관리자 비밀번호를 입력하세요.");

            if (pw !== ADMIN_PASSWORD) {

                alert("비밀번호가 틀렸습니다.");

                return;

            }

            if (!confirm("삭제하시겠습니까?")) return;

            await deleteDoc(
                doc(db, "guestbook", item.id)
            );

        };

        list.appendChild(card);

    });

});