import { useEffect, useState } from 'react';
export function useTheme(){
  const [dark,setDark]=useState(()=>{ try{ return localStorage.getItem('glowide_theme')!=='light'; }catch{ return true; } });
  useEffect(()=>{ document.documentElement.classList.toggle('dark',dark); try{localStorage.setItem('glowide_theme',dark?'dark':'light')}catch{/* */} },[dark]);
  return {dark,toggle:()=>setDark(d=>!d)};
}
