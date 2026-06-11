import { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { supabase } from '../supabase'

// 認証ガード：未ログインの場合はログイン画面へリダイレクトする
function PrivateRoute({ children }) {
  // undefined = 確認中、null = 未ログイン、object = ログイン済み
  const [session, setSession] = useState(undefined)

  useEffect(() => {
    // 初回マウント時に現在のセッションを取得
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    // 認証状態（ログイン・ログアウト）の変化を監視
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => subscription.unsubscribe()
  }, [])

  // セッション確認中はローディング表示
  if (session === undefined) {
    return <div className="loading">読み込み中...</div>
  }

  // 未ログインの場合はログイン画面へリダイレクト
  if (!session) {
    return <Navigate to="/login" replace />
  }

  return children
}

export default PrivateRoute
