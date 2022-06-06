import React from "react";
import { Route, Routes } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "./shared//firebase";
// import { collection, addDoc } from "firebase/firestore";

import Signup from "./Signup";
import Login from "./Login";
// import { async } from "@firebase/util";
// import { set } from "immer/dist/internal";

//Route 안에 div를 못 만들어서 따로 빼줌
const Home = () => {
  return (
    <div>
      <h1>환영합니다!</h1>
      <button onClick={() => {
        signOut(auth);
      }}>로그아웃</button>
    </div>
  );
};

function App() {
  const [is_login, setIsLogin] = React.useState(false);

  //----로그인 한것 체크하기----
  // firebase 인증서비스에서 제공해주는 auth 사용
  // 콘솔에 app.js로 유저정보 나오는것 확인하기 = 로그인 된 상태
  console.log(auth.currentUser);

  const loginCheck = async (user) => {
    if (user) {
      // 만약에 유저가 있다면
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  };

  React.useEffect(() => {
    onAuthStateChanged(auth, loginCheck); //--> 어떤 식으로 로그인할건지 함수넣기
  }, []);

  return (
    <div className="App">
      <Routes>
        <Route path="/signup" element={<Signup />}></Route>
        {is_login ? ( //로그인이 됐다면?
          <Route path="/" element={<Home/>}></Route>
        ) : (
          <Route path="/" element={<Login />}></Route>
        )}
      </Routes>
    </div>
  );
}

export default App;
