import React from "react";
import { auth,db } from "./shared/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
// import { async } from "@firebase/util";

//-------------이름 가져와보기-----------------------
// firebase에서 db 가져오기
// : document 의 id를 알 경우에는 getDoc 사용해서 가져오면 됨
// : id를 랜덤하게 생성하도록 해놨을 경우 --> where절 이용

// where 함수 ?
// : 유저 아이디(이메일)은 고유값
// : 그 이메일이 지금 로그인 한 유저의 이메일 하고
// : 같은 것을 찾아서 가지고 오면 됨
import { getDocs, where, query, collection } from "firebase/firestore";

const Login = () => {
  const id_ref = React.useRef(null);
  const pw_ref = React.useRef(null);

  // --로그인 버튼 눌렀을 때 이 값 가져오게 하기
  const loginFB = async () => {
    console.log(id_ref.current.value, pw_ref.current.value);
    // 값 잘 들어가는지 확인

    // --로그인 한 사용자 전부 받아오기 --> 프로젝트 시 validation 꼭 하기!
    // : 유저 정보 보고 싶으면 async await 필수 ! promise 떨구기 때문 !
    // const user = signInWithEmailAndPassword(auth, email, password);
    const user = await signInWithEmailAndPassword(
      auth,
      id_ref.current.value,
      pw_ref.current.value
    );

    console.log(user);
    //유저 정보 잘 가져오는지 확인

    //--------------------이름 가져와보기 -----------------------------
    // : FireStore에 있는 docs 가져올거임

    // query ?
    // = 어느 데이터베이스에서 어떤 조건을 가지고 어떤 것을 가지고 와 !   
    const user_docs = await getDocs(
        query(
        // 콜렉션, 조건(user_id == user)
        collection(db, "users"),where("user_id", "==", user.user.email)
    )); // --> 여러개(배열)이 나옴
    
    user_docs.forEach(u => {
        console.log(u.data());
    })
  };

  return (
    <div>
      아이디(이메일) : <input ref={id_ref} />
      <br />
      비밀번호 : <input ref={pw_ref} />
      <br />
      <button onClick={loginFB}>로그인</button>
    </div>
  );
};

export default Login;
