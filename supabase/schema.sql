-- =============================================
-- 不動産管理アプリ：物件テーブルとRLSポリシー
-- Supabase の SQL Editor に貼り付けて実行してください
-- =============================================

-- 物件テーブルを作成
CREATE TABLE properties (
  id          UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id     UUID        NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name        TEXT        NOT NULL,
  rent        INTEGER     NOT NULL CHECK (rent > 0),
  area        TEXT        NOT NULL,
  floor_plan  TEXT        NOT NULL,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- RLS（行レベルセキュリティ）を有効化
-- これにより、ポリシーが存在しない操作はすべてデフォルトで拒否される
ALTER TABLE properties ENABLE ROW LEVEL SECURITY;

-- SELECT：自分が登録した物件のみ取得できる
CREATE POLICY "自分の物件のみ参照できる"
  ON properties
  FOR SELECT
  USING (auth.uid() = user_id);

-- INSERT：user_id が自分の ID である行のみ挿入できる
CREATE POLICY "自分の物件のみ登録できる"
  ON properties
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- UPDATE：自分が登録した物件のみ更新できる
CREATE POLICY "自分の物件のみ更新できる"
  ON properties
  FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- DELETE：自分が登録した物件のみ削除できる
CREATE POLICY "自分の物件のみ削除できる"
  ON properties
  FOR DELETE
  USING (auth.uid() = user_id);
