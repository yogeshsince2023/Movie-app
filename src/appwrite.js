import{Client,Databases,ID, Query } from 'appwrite';

const PROJECT_ID = import.meta.env.VITE_APPWRITE_PROJECT_ID;
const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const MOVIES_COLLECTION_ID = import.meta.env.VITE_APPWRITE_MOVIES_COLLECTION_ID;
const client = new Client();
client
  .setEndpoint('https://fra.cloud.appwrite.io/v1') // Your Appwrite Endpoint
  .setProject(PROJECT_ID);
const database = new Databases(client);

export const updateSearchCount = async (searchTerm,movie ) => {
    try {
        const response = await database.listDocuments(DATABASE_ID, MOVIES_COLLECTION_ID, [
            Query.equal('searchTerm', searchTerm),
        ]);

        if (response.total > 0) {
            const doc =response.documents[0];
            await database.updateDocument(DATABASE_ID, MOVIES_COLLECTION_ID, doc.$id, {
               count: doc.count + 1,
            });
        } else {
            await database.createDocument(DATABASE_ID, MOVIES_COLLECTION_ID, ID.unique()
, {
                searchTerm: searchTerm,
                count: 1,
                movie_id: movie.id,
                poster_url:'https://image.tmdb.org/t/p/w500' + movie.poster_path,
            });
        } 
        // Check if the movie already exists in the database
    } catch (error) {
        console.error('Error updating search count:', error);
    }
}

export const getTrendingSearches = async () => {
    try {
        const response = await database.listDocuments(DATABASE_ID, MOVIES_COLLECTION_ID, [  
            Query.limit(5),
            Query.orderDesc('count')   
        ]);
        return response.documents;
        } catch (error) {
            console.error('Error fetching trending searches:', error);
            return [];
        }
    }