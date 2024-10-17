'use client';
import React, { useState } from 'react';
import ModeChangeButton from './ModeChangeButton';
import SignInForm from './SignInForm';
import SignUpForm from './SignUpForm';

export default function AuthModal() {
  const [mode, setMode] = useState(true);
  return (
    <main
      className={`w-[400px] flex-shrink-0 bg-white rounded-xl flex items-center justify-start flex-col px-5 py-6 gap-6 lg:mt-60 2xl:mt-[170px] transition-all ease-in-out duration-200 ${
        mode ? `h-[440px]` : `h-[360px]`
      } `}
    >
      <ModeChangeButton mode={mode} setMode={setMode} />
      {mode ? <SignUpForm /> : <SignInForm />}
    </main>
  );
}
