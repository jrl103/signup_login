import React from "react";
import { auth, db, storage } from "./shared//firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";
// import { async } from "@firebase/util";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const Signup = () => {
  const id_ref = React.useRef(null);
  const name_ref = React.useRef(null);
  const pw_ref = React.useRef(null);
  const file_link_ref = React.useRef(null);

  const signupFB = async () => {
    // 값이 전부 멀쩡한지 확인하는 과정 : 벨리데이션 ---------------
    // ex. 공백이거나 이메일이 아니거나
    if (id_ref.current.value === "") {
      return false;
    }

    // file_link_ref 에 뭐가 들어오는지 확인한 후 실제로 저장되도록 하기
    // console.log(file_link_ref);
    


    // 내가 만든 내 유저정보 보려면, --------------------------------
    // 이 user에다가 Promise의 Resolve된 값을 갖다 넣으면 되니까
    // async await 걸어줌

    // id, password는 필수정보! 안넣으면 createUserWithEmailAndPassword에서 에러 반환!
    // 하지만 나머지 name, image url 등은 없을 수도 있음
    // so, addDoc 쓸때 current에 url 등이 없으면 에러가 남 !
    //    --> 옵셔널 체이닝 사용하기

    const user = await createUserWithEmailAndPassword(
      auth,
      //   "jrl@naver.com",
      id_ref.current.value,

      //   "song123"
      pw_ref.current.value,
    );
    console.log(user);

    // FireStore에 저장할 때 ? ------------------------------------
    // : 인증에서 회원가입이 실제로 끝났을 때
    // : 유저 데이터 받아다가 저장함

    // const user_doc = await addDoc(첫번째 인자(), 두번째 인자)
    // --> addDoc(콜렉션 어디 콜렉션에 저장할거야!(어느 db에 있는 콜렉션인지, "FireStore에 있는 어떤 collection을 넣을건지"), 넣을 데이터!);
    const user_doc = await addDoc(collection(db, "users"), {
      user_id: user.user.email,
      //   name: "songyi",
      name: name_ref.current?.value,
      // 값이 없더라도 에러 반환하지 않도록 Optional Chaining 사용

      image_url : file_link_ref?.current.url
    });

    console.log(user_doc.id);
    //잘 저장됐는지 아이디 확인해보기
    // --> FireStore는 자체적으로 Document 아이디를 랜덤하게 생성
    //     만약 아이디를 지정해놓는다면 그 아이디를 가져옴
    //     so, 생성이 잘됐다면 랜덤한 Document 아이다가 가져와질거임
  };

  //-------------이미지 업로드---------------------------------------
  // : firebase랑 소통할 거니까 async await 걸어주기
  // : e ? event
  // import --> ref, uploadBytes, storage 가져오기
  const uploadFB = async (e) => {
    console.log(e.target.files);

    //const storageRef = ref(저장할 위치 경로1, '경로2'), 올릴 파일
    const uploaded_file = await uploadBytes(
      ref(storage, `images/${e.target.files[0].name}`),
      e.target.files[0]
    );

    console.log(uploaded_file);
    // 파일 접근 권한이 없다 에러 ?
    // : FireStore - storage - rules 들어가서 읽기, 쓰기 권한 수정(is false 삭제)

    // ref 잘 들어오는 것 확인되면 성공 !
    // --> 갖고있는 ref 에서 다운로드 URL 가져올 거임


    // 다운로드 URL 가져오기 
    // : import --> getDownloadURL
    // getDownloadURL(ref(storage, 'images/stars.jpg'))
    const file_url = await getDownloadURL(uploaded_file.ref);

    console.log(file_url);
    
    // Docs, FireStore에 저장하기
    // ref 하나 더 만들기 --> const file_link_ref = React.useRef(null);
    // : 넣고싶은 게 그냥 링크일 뿐이니, 파일 객체에 연결하지는 않을 거임
    // --> url을 current에 넣어주기
    file_link_ref.current = {url:file_url}; 
    // --> ref는 꼭 React element 랑 같이 써야 되는 것은 아님
    //     이렇게 그냥 어떤 값을 보관하기 위한 용도로도 쓸 수 있음
  };

  // -----------이미지 뿌려주기------------------------------------
  // : FireStore 에서 image_url만 가지고 올 수 있다면,
  //  getDocs 사용해서 이미지 뿌려주기 가능 

  
  return (
    <div>
      아이디(이메일) : <input ref={id_ref} />
      <br />
      이름 : <input ref={name_ref} />
      <br />
      비밀번호 : <input ref={pw_ref} type="password" />
      <br />
      이미지 : <input type="file" onChange={uploadFB} />
      <br />
      <button onClick={signupFB}>회원가입</button>
    </div>
  );
};

export default Signup;
