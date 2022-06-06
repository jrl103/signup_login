import React from "react";
import { auth, db } from "./shared//firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";

const Signup = () => {
  const id_ref = React.useRef(null);
  const name_ref = React.useRef(null);
  const pw_ref = React.useRef(null);

  const signupFB = async () => {
    // 값이 전부 멀쩡한지 확인하는 과정 : 벨리데이션
    // ex. 공백이거나 이메일이 아니거나
    if (id_ref.current.value === "") {
      return false;
    }

    // 내가 만든 내 유저정보 보려면,
    // 이 user에다가 Promise의 Resolve된 값을 갖다 넣으면 되니까
    // async await 걸어줌

    const user = await createUserWithEmailAndPassword(
      auth,
      //   "jrl@naver.com",
      id_ref.current.value,

      //   "song123"
      pw_ref.current.value
    );
    console.log(user);

    // FireStore에 저장할 때 ?
    // : 인증에서 회원가입이 실제로 끝났을 때
    // : 유저 데이터 받아다가 저장함

    // const user_doc = await addDoc(첫번째 인자(), 두번째 인자)
    // --> addDoc(콜렉션 어디 콜렉션에 저장할거야!(어느 db에 있는 콜렉션인지, "FireStore에 있는 어떤 collection을 넣을건지"), 넣을 데이터!);
    const user_doc = await addDoc(collection(db, "users"), {
      user_id: user.user.email,
      //   name: "songyi",
      name: name_ref.current.value,
    });

    console.log(user_doc.id);
    //잘 저장됐는지 아이디 확인해보기
    // --> FireStore는 자체적으로 Document 아이디를 랜덤하게 생성
    //     만약 아이디를 지정해놓는다면 그 아이디를 가져옴
    //     so, 생성이 잘됐다면 랜덤한 Document 아이다가 가져와질거임
  };

  return (
    <div>
      아이디(이메일) : <input ref={id_ref} />
      <br />
      이름 : <input ref={name_ref} />
      <br />
      비밀번호 : <input ref={pw_ref} type="password" />
      <br />
      <button onClick={signupFB}>회원가입</button>
    </div>
  );
};

export default Signup;
