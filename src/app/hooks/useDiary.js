import { create } from 'zustand'
import { diaryService } from '../lib/diaryService'
import toast from 'react-hot-toast'

const useDiaryStore = create((set, get) => ({
  entries: [],
  loading: false,
  error: null,
  searchTerm: '',
  selectedTags: [],
  currentUser: null,

  setSearchTerm: (term) => {
    set({ searchTerm: term })
    // Automatically refetch entries when search term changes
    const { fetchEntries } = get()
    const user = get().currentUser
    if (user) {
      fetchEntries(user.id)
    }
  },
  setSelectedTags: (tags) => {
    set({ selectedTags: tags })
    // Automatically refetch entries when tags change
    const { fetchEntries } = get()
    const user = get().currentUser
    if (user) {
      fetchEntries(user.id)
    }
  },
  setCurrentUser: (user) => set({ currentUser: user }),

  fetchEntries: async (userId) => {
    set({ loading: true, error: null })
    try {
      const data = await diaryService.getEntries(
        userId,
        get().searchTerm,
        get().selectedTags
      )
      set({ entries: data, loading: false, error: null })
    } catch (error) {
      console.error('Fetch entries error:', error)
      console.error('Error details:', {
        code: error?.code,
        message: error?.message,
        details: error?.details,
        hint: error?.hint,
        status: error?.status
      })

      // Check if it's a table not found error
      if (error?.code === 'PGRST116' ||
        error?.message?.includes('relation "diary_entries" does not exist') ||
        error?.message?.includes('Could not find the table') ||
        error?.message?.includes('schema cache') ||
        error?.message?.includes('404') ||
        error?.status === 404) {
        const errorMsg = 'Database table not found. Please set up the database first.'
        toast.error(errorMsg)
        set({ loading: false, error: 'DATABASE_NOT_SETUP' })
      } else {
        const errorMessage = error?.message || 'Unknown error occurred'
        toast.error(`Failed to fetch entries: ${errorMessage}`)
        set({ loading: false, error: errorMessage })
      }
    }
  },

  createEntry: async (entry) => {
    try {
      const newEntry = await diaryService.createEntry(entry)
      set((state) => ({
        entries: [newEntry, ...state.entries]
      }))
      toast.success('Entry created successfully')
      return newEntry
    } catch (error) {
      console.error('Create entry error:', error)
      const errorMessage = error?.message || 'Unknown error occurred'
      toast.error(`Failed to create entry: ${errorMessage}`)
      throw error
    }
  },

  updateEntry: async (id, updates) => {
    try {
      const updatedEntry = await diaryService.updateEntry(id, updates)
      set((state) => ({
        entries: state.entries.map((entry) =>
          entry.id === id ? updatedEntry : entry
        )
      }))
      toast.success('Entry updated successfully')
      return updatedEntry
    } catch (error) {
      console.error('Update entry error:', error)
      const errorMessage = error?.message || 'Unknown error occurred'
      toast.error(`Failed to update entry: ${errorMessage}`)
      throw error
    }
  },

  deleteEntry: async (id) => {
    try {
      await diaryService.deleteEntry(id)
      set((state) => ({
        entries: state.entries.filter((entry) => entry.id !== id)
      }))
      toast.success('Entry deleted successfully')
    } catch (error) {
      console.error('Delete entry error:', error)
      const errorMessage = error?.message || 'Unknown error occurred'
      toast.error(`Failed to delete entry: ${errorMessage}`)
      throw error
    }
  },

  subscribeToChanges: (userId) => {
    return diaryService.subscribeToChanges(userId, (payload) => {
      if (payload.eventType === 'INSERT') {
        set((state) => ({
          entries: [payload.new, ...state.entries]
        }))
      } else if (payload.eventType === 'UPDATE') {
        set((state) => ({
          entries: state.entries.map((entry) =>
            entry.id === payload.new.id ? payload.new : entry
          )
        }))
      } else if (payload.eventType === 'DELETE') {
        set((state) => ({
          entries: state.entries.filter((entry) => entry.id !== payload.old.id)
        }))
      }
    })
  }
}))

export default useDiaryStore