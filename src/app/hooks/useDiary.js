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
      fetchEntries(user.uid)
    }
  },
  setSelectedTags: (tags) => {
    set({ selectedTags: tags })
    // Automatically refetch entries when tags change
    const { fetchEntries } = get()
    const user = get().currentUser
    if (user) {
      fetchEntries(user.uid)
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
        message: error?.message
      })

      // Check if it's a permission or setup error
      if (error?.code === 'permission-denied' ||
        error?.message?.includes('Permission denied') ||
        error?.message?.includes('permission-denied')) {
        const errorMsg = 'Permission denied. Please make sure you are logged in.'
        toast.error(errorMsg)
        set({ loading: false, error: 'PERMISSION_DENIED' })
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
      // Firebase realtime updates come as full entries array
      if (payload.type === 'update' && payload.entries) {
        set({ entries: payload.entries })
      } else if (payload.type === 'error') {
        console.error('Subscription error:', payload.error)
      }
    })
  }
}))

export default useDiaryStore