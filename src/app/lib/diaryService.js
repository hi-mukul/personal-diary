import { db } from './firebaseClient'
import {
  collection,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  onSnapshot,
  getDocs,
  serverTimestamp,
  Timestamp
} from 'firebase/firestore'

// Collection reference
const DIARY_COLLECTION = 'diary_entries'

// Helper to convert Firestore timestamp to ISO string
const convertTimestamp = (timestamp) => {
  if (timestamp instanceof Timestamp) {
    return timestamp.toDate().toISOString()
  }
  return timestamp
}

// Helper to convert Firestore document to entry object
const docToEntry = (doc) => {
  const data = doc.data()
  return {
    id: doc.id,
    ...data,
    created_at: convertTimestamp(data.created_at),
    updated_at: convertTimestamp(data.updated_at)
  }
}

export const diaryService = {
  // Create entry
  async createEntry(entry) {
    try {
      const docRef = await addDoc(collection(db, DIARY_COLLECTION), {
        ...entry,
        created_at: serverTimestamp(),
        updated_at: serverTimestamp()
      })

      // Return the created entry with its ID
      return {
        id: docRef.id,
        ...entry,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }
    } catch (error) {
      console.error('DiaryService createEntry error:', error)
      throw new Error(`Failed to create entry: ${error.message || 'Unknown error'}`)
    }
  },

  // Get all entries
  async getEntries(userId, searchTerm = '', tags = []) {
    try {
      // Build query
      let q = query(
        collection(db, DIARY_COLLECTION),
        where('user_id', '==', userId),
        orderBy('updated_at', 'desc')
      )

      const querySnapshot = await getDocs(q)
      let entries = querySnapshot.docs.map(docToEntry)

      // Client-side filtering for search (Firestore doesn't support full-text search natively)
      if (searchTerm) {
        const term = searchTerm.toLowerCase()
        entries = entries.filter(entry =>
          entry.title?.toLowerCase().includes(term) ||
          entry.content?.toLowerCase().includes(term)
        )
      }

      // Client-side filtering for tags
      if (tags.length > 0) {
        entries = entries.filter(entry =>
          tags.every(tag => entry.tags?.includes(tag))
        )
      }

      return entries
    } catch (error) {
      console.error('DiaryService getEntries error:', error)

      // Handle permission errors
      if (error.code === 'permission-denied') {
        throw new Error('Permission denied. Please make sure you are logged in.')
      }

      // Handle index errors
      if (error.message?.includes('index')) {
        console.warn('Firestore index required. Please check the Firebase console for the index creation link.')
        throw new Error('Database index required. Please contact the administrator.')
      }

      throw new Error(`Database error: ${error.message || 'Unknown error'}`)
    }
  },

  // Update entry
  async updateEntry(id, updates) {
    try {
      const docRef = doc(db, DIARY_COLLECTION, id)

      // Add updated_at timestamp
      const updatesWithTimestamp = {
        ...updates,
        updated_at: serverTimestamp()
      }

      await updateDoc(docRef, updatesWithTimestamp)

      // Return updated entry
      return {
        id,
        ...updates,
        updated_at: new Date().toISOString()
      }
    } catch (error) {
      console.error('DiaryService updateEntry error:', error)
      throw new Error(`Failed to update entry: ${error.message || 'Unknown error'}`)
    }
  },

  // Delete entry
  async deleteEntry(id) {
    try {
      const docRef = doc(db, DIARY_COLLECTION, id)
      await deleteDoc(docRef)
    } catch (error) {
      console.error('DiaryService deleteEntry error:', error)
      throw new Error(`Failed to delete entry: ${error.message || 'Unknown error'}`)
    }
  },

  // Subscribe to changes (real-time updates)
  subscribeToChanges(userId, callback) {
    try {
      const q = query(
        collection(db, DIARY_COLLECTION),
        where('user_id', '==', userId),
        orderBy('updated_at', 'desc')
      )

      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const entries = querySnapshot.docs.map(docToEntry)
        callback({ entries, type: 'update' })
      }, (error) => {
        console.error('Subscription error:', error)
        callback({ error: error.message, type: 'error' })
      })

      return unsubscribe
    } catch (error) {
      console.error('DiaryService subscribeToChanges error:', error)
      return () => { } // Return empty unsubscribe function
    }
  }
}