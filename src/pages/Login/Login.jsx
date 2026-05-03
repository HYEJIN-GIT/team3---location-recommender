import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../../hooks/useAuthStore';

const Login = () => {
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    if (!email || !password) {
      setError("이메일과 비밀번호를 입력해주세요.");
      return;
    }
    setError("");
    login();
    navigate("/map");
  };


  

  return (
    <div className="min-h-screen flex items-center justify-center">
      
      <div className="w-full max-w-6xl flex flex-col lg:flex-row items-center gap-10 p-6">
        
      
      <div className="text-center lg:text-left">

<div className="flex items-center justify-center lg:justify-start gap-3">
  
  <img 
    src="/Image/image.png" 
    className="w-20 h-20 object-contain"
    alt="NearByU logo"
  />

  <h1 className="text-3xl lg:text-5xl font-extrabold text-gray-800 leading-tight">
    NearByU에서 <br className="hidden lg:block"/>
    주변을 탐색해보세요
  </h1>

</div>

<p className="mt-4 text-gray-600 text-base lg:text-lg">
  내 주변 숨은 장소를 찾고,  
  별점과 즐겨찾기로 나만의 리스트를 만들어보세요.
</p>

<div className="mt-4 text-sm text-gray-500">
  📍 카페 · 음식점 · 관광명소까지 한눈에
</div>

</div>
      
        <div className="card w-full max-w-sm bg-base-100 shadow-xl rounded-2xl">
          <div className="card-body">
            
            <h2 className="text-2xl font-bold text-center mb-4">
              로그인
            </h2>

            <fieldset className="space-y-3">
              <div>
                <label className="label">이메일</label>
                <input
                  type="email"
                  className="input input-bordered w-full"
                  placeholder="example@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
      
              </div>

              <div>
              
                <label className="label">비밀번호</label>
                <input
                  type="password"
                  className="input input-bordered w-full"
                  placeholder="비밀번호 입력"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

                <div className="text-right">
                <a className="text-xs text-gray-400 hover:underline cursor-pointer">
                  비밀번호를 잊으셨나요?
                </a>
              </div>

              {error && (
                <p className="text-red-500 text-sm mt-3">{error}</p>
              )}

              <button
                className="btn btn-info  w-full mt-2 text-white"
                onClick={handleLogin}
              >
                로그인하기
              </button>
            </fieldset>

            <p className="text-center text-sm text-gray-400 mt-4">
              아직 계정이 없으신가요?{" "}
              <span className="text-blue-500 cursor-pointer hover:underline">
                회원가입
              </span>
            </p>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
