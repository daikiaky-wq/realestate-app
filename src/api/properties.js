import { supabase } from '../supabase'

/**
 * 自分の物件一覧を取得する
 * RLS により、ログイン中のユーザーが登録した物件のみ返る
 */
export async function fetchProperties() {
  const { data, error } = await supabase
    .from('properties')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) throw error
  return data
}

/**
 * 物件を新規登録する
 * user_id にはログイン中のユーザーの ID を自動でセットする
 */
export async function insertProperty({ name, rent, area, floorPlan }) {
  const {
    data: { user },
  } = await supabase.auth.getUser()

  const { data, error } = await supabase
    .from('properties')
    .insert({
      user_id: user.id,
      name,
      rent: Number(rent),
      area,
      floor_plan: floorPlan,
    })
    .select()
    .single()

  if (error) throw error
  return data
}

/**
 * 物件情報を更新する
 * RLS により、自分が登録した物件のみ更新できる
 */
export async function updateProperty(id, { name, rent, area, floorPlan }) {
  const { data, error } = await supabase
    .from('properties')
    .update({
      name,
      rent: Number(rent),
      area,
      floor_plan: floorPlan,
    })
    .eq('id', id)
    .select()
    .single()

  if (error) throw error
  return data
}

/**
 * 物件を削除する
 * RLS により、自分が登録した物件のみ削除できる
 */
export async function deleteProperty(id) {
  const { error } = await supabase
    .from('properties')
    .delete()
    .eq('id', id)

  if (error) throw error
}
