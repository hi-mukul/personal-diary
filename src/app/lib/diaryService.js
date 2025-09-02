import { supabase } from './supabaseClient'

export const diaryService = {
  // Create entry
  async createEntry(entry) {
    try {
      const { data, error } = await supabase
        .from('diary_entries')
        .insert([entry])
        .select()
        .single()

      if (error) {
        console.error('Supabase create error:', error)
        throw new Error(`Failed to create entry: ${error.message || 'Unknown error'}`)
      }

      return data
    } catch (error) {
      console.error('DiaryService createEntry error:', error)
      throw error
    }
  },

  // Get all entries
  async getEntries(userId, searchTerm = '', tags = []) {
    try {
      let query = supabase
        .from('diary_entries')
        .select('*')
        .eq('user_id', userId)
        .order('updated_at', { ascending: false })

      if (searchTerm) {
        query = query.or(`title.ilike.%${searchTerm}%,content.ilike.%${searchTerm}%`)
      }

      if (tags.length > 0) {
        query = query.contains('tags', tags)
      }

      const { data, error } = await query

      if (error) {
        console.error('Supabase query error:', {
          code: error?.code,
          message: error?.message,
          details: error?.details,
          hint: error?.hint,
          status: error?.status
        })

        // Check for table not found errors
        if (error.message?.includes('Could not find the table') ||
          error.message?.includes('schema cache') ||
          error.code === 'PGRST116') {
          throw new Error(`Table not found: The diary_entries table doesn't exist. Please create it in your Supabase dashboard.`)
        }

        throw new Error(`Database error: ${error.message || 'Unknown error'}`)
      }

      return data || []
    } catch (error) {
      console.error('DiaryService getEntries error:', error)
      throw error
    }
  },

  // Update entry
  async updateEntry(id, updates) {
    try {
      // Add updated_at timestamp
      const updatesWithTimestamp = {
        ...updates,
        updated_at: new Date().toISOString()
      }

      const { data, error } = await supabase
        .from('diary_entries')
        .update(updatesWithTimestamp)
        .eq('id', id)
        .select()
        .single()

      if (error) {
        console.error('Supabase update error:', error)
        throw new Error(`Failed to update entry: ${error.message || 'Unknown error'}`)
      }

      return data
    } catch (error) {
      console.error('DiaryService updateEntry error:', error)
      throw error
    }
  },

  // Delete entry
  async deleteEntry(id) {
    try {
      const { error } = await supabase
        .from('diary_entries')
        .delete()
        .eq('id', id)

      if (error) {
        console.error('Supabase delete error:', error)
        throw new Error(`Failed to delete entry: ${error.message || 'Unknown error'}`)
      }
    } catch (error) {
      console.error('DiaryService deleteEntry error:', error)
      throw error
    }
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