import { useState, useEffect } from 'react';
import { ref, onValue } from 'firebase/database';
import { database } from '../config/firebase';
import { CategoryData } from '../types';

export function useCategories() {
  const [categories, setCategories] = useState<Record<string, CategoryData> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const categoriesRef = ref(database, 'pricelist');

    const unsubscribe = onValue(
      categoriesRef,
      (snapshot) => {
        const data = snapshot.val();
        setCategories(data);
        setLoading(false);
      },
      (error) => {
        console.error('Error fetching data:', error);
        setError('Failed to load categories');
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  return { categories, loading, error };
}

export function useTermsAndConditions() {
  const [terms, setTerms] = useState<string[]>([]);

  useEffect(() => {
    const termsRef = ref(database, 'quotations/meta/termsAndConditions');

    const unsubscribe = onValue(termsRef, (snapshot) => {
      const data = snapshot.val();
      if (data && Array.isArray(data)) {
        setTerms(data);
      } else {
        setTerms([
          "Prices are subject to change without notice",
          "All prices are exclusive of applicable taxes",
          "Minimum order quantity may apply",
          "Delivery charges extra"
        ]);
      }
    });

    return () => unsubscribe();
  }, []);

  return terms;
}
