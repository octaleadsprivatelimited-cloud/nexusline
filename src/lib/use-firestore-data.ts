import { useEffect, useState } from "react";
import { collection, doc, onSnapshot, type DocumentData } from "firebase/firestore";
import { db } from "./firebase";

/** Subscribe to a Firestore collection. Returns [] until first snapshot. */
export function useCollection<T extends DocumentData>(name: string) {
  const [items, setItems] = useState<(T & { id: string })[] | null>(null);
  useEffect(() => {
    if (!db) {
      setItems([]);
      return;
    }
    return onSnapshot(
      collection(db, name),
      (snap) => setItems(snap.docs.map((d) => ({ id: d.id, ...(d.data() as T) }))),
      (err) => {
        console.warn(`Firestore ${name} read failed:`, err.message);
        setItems([]);
      },
    );
  }, [name]);
  return items;
}

/** Subscribe to a single Firestore doc. */
export function useDoc<T extends DocumentData>(collectionName: string, id: string) {
  const [data, setData] = useState<T | null>(null);
  useEffect(() => {
    if (!db) return;
    return onSnapshot(
      doc(db, collectionName, id),
      (snap) => setData(snap.exists() ? (snap.data() as T) : null),
      (err) => {
        console.warn(`Firestore ${collectionName}/${id} read failed:`, err.message);
        setData(null);
      },
    );
  }, [collectionName, id]);
  return data;
}