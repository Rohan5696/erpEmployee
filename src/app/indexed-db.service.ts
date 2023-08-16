import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IndexedDbService {
  private dbName = 'myIndexedDB';
  private objectStoreName = 'items';

  openDb(): Promise<IDBDatabase> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, 1);

      request.onerror = (event:any) => {
        console.error("Error opening database:", event.target.error);
        reject(event.target.error);
      };

      request.onupgradeneeded = event => {
        const db = (event.target as IDBOpenDBRequest).result;
        const objectStore = db.createObjectStore(this.objectStoreName, { keyPath: 'id', autoIncrement: true });
      };

      request.onsuccess = event => {
        resolve((event.target as IDBOpenDBRequest).result);
      };
    });
  }

  addItem(item: any): Promise<void> {
    return new Promise(async (resolve, reject) => {
      const db = await this.openDb();
      const transaction = db.transaction([this.objectStoreName], 'readwrite');
      const objectStore = transaction.objectStore(this.objectStoreName);
      const request = objectStore.add(item);

      request.onsuccess = () => {
        resolve();
      };

      request.onerror = (event:any) => {
        console.error("Error adding item:", event.target.error);
        reject(event.target.error);
      };
    });
  }

  getAllItems(): Promise<any[]> {
    return new Promise(async (resolve, reject) => {
      const db = await this.openDb();
      const transaction = db.transaction([this.objectStoreName], 'readonly');
      const objectStore = transaction.objectStore(this.objectStoreName);
      const request = objectStore.getAll();
  
      request.onsuccess = () => {
        resolve(request.result);
      };
  
      request.onerror = (event:any) => {
        console.error("Error getting items:", event.target.error);
        reject(event.target.error);
      };
    });
  }

  deleteItem(id: number): Promise<void> {
    return new Promise(async (resolve, reject) => {
      const db = await this.openDb();
      const transaction = db.transaction([this.objectStoreName], 'readwrite');
      const objectStore = transaction.objectStore(this.objectStoreName);
      const request = objectStore.delete(id);
  
      request.onsuccess = () => {
        resolve();
      };
  
      request.onerror = (event:any) => {
        console.error("Error deleting item:", event.target.error);
        reject(event.target.error);
      };
    });
  }

  updateItemById(id: number, updatedItem: any): Promise<void> {
    return new Promise(async (resolve, reject) => {
      const db = await this.openDb();
      const transaction = db.transaction([this.objectStoreName], 'readwrite');
      const objectStore = transaction.objectStore(this.objectStoreName);
  
      const getRequest = objectStore.get(id);
      getRequest.onsuccess = (event: any) => {
        let existingItem = event.target.result;
        if (existingItem) {
          existingItem=updatedItem
  
          const updateRequest = objectStore.put(existingItem);
          updateRequest.onsuccess = () => {
            resolve();
          };
          updateRequest.onerror = (event:any) => {
            console.error("Error updating item:", event.target.error);
            reject(event.target.error);
          };
        }
      };
  
      getRequest.onerror = (event:any) => {
        console.error("Error retrieving item:", event.target.error);
        reject(event.target.error);
      };
    });
  }

  // Implement methods for other operations (retrieve, update, delete)
}
