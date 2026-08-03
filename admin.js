if(sessionStorage.getItem("admin")!=="true"){

    alert("관리자만 접근 가능합니다.");

    location.href="../index.html";

}