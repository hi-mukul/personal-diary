import { supabase } from './supabaseClient'

export const diaryService = {
  // Create entry
  async createEntry(entry) {
    const { data, error } = await supabase
      .from('diary_entries')
      .insert([entry])
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  // Get all entries
  async getEntries(userId, searchTerm = '', tags = []) {
    let query = supabase
      .from('diary_entries')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })

    if (searchTerm) {
      query = query.or(`title.ilike.%${searchTerm}%,content.ilike.%${searchTerm}%`)
    }

    if (tags.length > 0) {
      query = query.contains('tags', tags)
    }

    const { data, error } = await query
    if (error) throw error
    return data
  },

  // Update entry
  async updateEntry(id, updates) {
    const { data, error } = await supabase
      .from('diary_entries')
      .update(updates)
      .eq('id', id)
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  // Delete entry
  async deleteEntry(id) {
    const { error } = await supabase
      .from('diary_entries')
      .delete()
      .eq('id', id)
    
    if (error) throw error
  },

  // Subscribe to changes
  subscribeToChanges(userId, callback) {
    const subscription = supabase
      .channel('diary_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'diary_entries',
          filter: `user_id=eq.${userId}`
        },
        callback
      )
      .subscribe()

    return () => subscription.unsubscribe()
  }
}