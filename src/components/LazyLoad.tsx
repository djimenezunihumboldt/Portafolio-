import { Suspense, lazy, ComponentType } from 'react';

// Loading skeleton for sections
export const SectionLoader = () => (
  <div className="py-20 animate-pulse">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <div className="h-12 bg-gray-200 dark:bg-secondary-700 rounded-lg w-64 mx-auto mb-6"></div>
        <div className="w-24 h-1 bg-gray-200 dark:bg-secondary-700 mx-auto rounded-full mb-4"></div>
        <div className="h-6 bg-gray-200 dark:bg-secondary-700 rounded w-96 max-w-full mx-auto"></div>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-white dark:bg-secondary-800 rounded-2xl p-8 shadow-lg">
            <div className="h-8 bg-gray-200 dark:bg-secondary-700 rounded w-3/4 mb-4"></div>
            <div className="space-y-3">
              <div className="h-4 bg-gray-200 dark:bg-secondary-700 rounded"></div>
              <div className="h-4 bg-gray-200 dark:bg-secondary-700 rounded w-5/6"></div>
              <div className="h-4 bg-gray-200 dark:bg-secondary-700 rounded w-4/6"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

// Card loader for project/testimonial sections
export const CardLoader = () => (
  <div className="bg-white dark:bg-secondary-800 rounded-2xl overflow-hidden shadow-lg animate-pulse">
    <div className="h-48 bg-gray-200 dark:bg-secondary-700"></div>
    <div className="p-6">
      <div className="h-6 bg-gray-200 dark:bg-secondary-700 rounded w-3/4 mb-4"></div>
      <div className="space-y-2">
        <div className="h-4 bg-gray-200 dark:bg-secondary-700 rounded"></div>
        <div className="h-4 bg-gray-200 dark:bg-secondary-700 rounded w-5/6"></div>
      </div>
      <div className="flex gap-2 mt-4">
        <div className="h-8 bg-gray-200 dark:bg-secondary-700 rounded-full w-20"></div>
        <div className="h-8 bg-gray-200 dark:bg-secondary-700 rounded-full w-20"></div>
      </div>
    </div>
  </div>
);

// Timeline loader
export const TimelineLoader = () => (
  <div className="py-20 animate-pulse">
    <div className="max-w-4xl mx-auto px-4">
      <div className="space-y-8">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex items-start">
            <div className="w-16 h-16 bg-gray-200 dark:bg-secondary-700 rounded-full flex-shrink-0"></div>
            <div className="ml-8 flex-1 bg-white dark:bg-secondary-800 rounded-2xl p-8 shadow-lg">
              <div className="h-6 bg-gray-200 dark:bg-secondary-700 rounded w-1/2 mb-4"></div>
              <div className="h-4 bg-gray-200 dark:bg-secondary-700 rounded w-1/3 mb-4"></div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 dark:bg-secondary-700 rounded"></div>
                <div className="h-4 bg-gray-200 dark:bg-secondary-700 rounded w-5/6"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

// Higher-order component for lazy loading with error boundary
export function withLazyLoad<T extends object>(
  importFn: () => Promise<{ default: ComponentType<T> }>,
  fallback: React.ReactNode = <SectionLoader />
) {
  const LazyComponent = lazy(importFn);

  return function LazyWrapper(props: T) {
    return (
      <Suspense fallback={fallback}>
        <LazyComponent {...props} />
      </Suspense>
    );
  };
}

export default SectionLoader;
