import { db, auth } from '../lib/firebaseClient'
import { collection, getDocs, query, limit } from 'firebase/firestore'

// Test database connection and collection existence
export async function testDatabaseConnection() {
  try {
    console.log('Testing Firebase connection...')

    // Test auth connection
    const user = auth.currentUser
    console.log('Auth connection:', user ? 'Connected as ' + user.email : 'Not authenticated')

    // Test if we can access Firestore
    const q = query(collection(db, 'diary_entries'), limit(1))
    await getDocs(q)

    console.log('✅ Firebase Firestore connection successful!')
    console.log('✅ Collection "diary_entries" is accessible!')
    return true

  } catch (error) {
    console.error('Connection test failed:', error)

    if (error.code === 'permission-denied') {
      console.error('❌ Permission denied!')
      console.log('📝 Please check your Firestore security rules in the Firebase Console')
      return false
    }

    if (error.message?.includes('offline') || error.message?.includes('network')) {
      console.error('❌ Network connection issue!')
      console.log('📝 Check your internet connection')
      return false
    }

    console.error('Error details:', {
      code: error?.code,
      message: error?.message
    })
    return false
  }
}

// Check if user is authenticated and database is ready
export async function checkAppReadiness() {
  const user = auth.currentUser

  if (!user) {
    console.log('ℹ️ User not authenticated')
    return { authenticated: false, databaseReady: false }
  }

  const databaseReady = await testDatabaseConnection()

  return {
    authenticated: true,
    databaseReady,
    user
  }
}

// Export for use in components
export default testDatabaseConnection
