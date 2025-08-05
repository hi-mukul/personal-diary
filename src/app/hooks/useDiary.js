import { create } from 'zustand'
import { diaryService } from '../lib/diaryService'
import toast from 'react-hot-toast'

const useDiaryStore = create((set, get) => ({
  entries: [],
  loading: false,
  searchTerm: '',
  selectedTags: [],
  
  setSearchTerm: (term) => set({ searchTerm: term }),
  setSelectedTags: (tags) => set({ selectedTags: tags }),
  
  fetchEntries: async (userId) => {
    set({ loading: true })
    try {
      const data = await diaryService.getEntries(
        userId,
        get().searchTerm,
        get().selectedTags
      )
      set({ entries: data, loading: false })
    } catch (error) {
      toast.error('Failed to fetch entries')
      set({ loading: false })
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
      toast.error('Failed to create entry')
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
      toast.error('Failed to update entry')
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
      toast.error('Failed to delete entry')
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