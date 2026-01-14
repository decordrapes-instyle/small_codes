import { useState, useEffect } from 'react';
import Header from './components/Header';
import CategoriesView from './components/CategoriesView';
import CategoryDetailsView from './components/CategoryDetailsView';
import { useCategories, useTermsAndConditions } from './hooks/useFirebaseData';
import { CategoryData } from './types';

function App() {
  const { categories, loading, error } = useCategories();
  const terms = useTermsAndConditions();
  const [selectedCategory, setSelectedCategory] = useState<{
    name: string;
    data: CategoryData;
  } | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const categoryParam = params.get('category');

    if (categoryParam && categories) {
      const categoryData = categories[categoryParam];
      if (categoryData) {
        setSelectedCategory({ name: categoryParam, data: categoryData });
      }
    }
  }, [categories]);

  useEffect(() => {
    if (selectedCategory) {
      const url = new URL(window.location.href);
      url.searchParams.set('category', selectedCategory.name);
      window.history.pushState({}, '', url);
    } else {
      const url = new URL(window.location.href);
      url.searchParams.delete('category');
      window.history.pushState({}, '', url);
    }
  }, [selectedCategory]);

  const handleCategoryClick = (categoryName: string) => {
    if (categories) {
      setSelectedCategory({ name: categoryName, data: categories[categoryName] });
    }
  };

  const handleBack = () => {
    setSelectedCategory(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-gray-500 text-lg">Loading categories...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-red-500 text-lg">{error}</div>
      </div>
    );
  }

  if (!categories) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-gray-500 text-lg">No categories found.</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {!selectedCategory && <Header />}

      {selectedCategory ? (
        <CategoryDetailsView
          categoryName={selectedCategory.name}
          categoryData={selectedCategory.data}
          terms={terms}
          onBack={handleBack}
        />
      ) : (
        <CategoriesView categories={categories} onCategoryClick={handleCategoryClick} />
      )}
    </div>
  );
}

export default App;
